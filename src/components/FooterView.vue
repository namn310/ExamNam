<template>
  <div class="footerwrapper p-4">
    <div class="footercontainer">
      <footer>
        <hr class="mb-3" />
        <div class="row">
          <div class="col-6 col-md">
            <div class="footer-title">Chương trình học</div>
          </div>
          <div class="col-6 col-md">
            <div class="footer-title">Tài nguyên</div>
          </div>
          <div class="col-6 col-md">
            <div class="footer-title">Hỗ trợ</div>
          </div>
          <div class="col-6 col-md">
            <div class="footer-title">ExamTutor</div>
          </div>
        </div>
      </footer>
    </div>
    <!-- box chat -->
    <div
      style="position: fixed; right: 0; bottom: 0; margin-right: 20px; padding: 2px; z-index: 20"
      class="d-flex"
    >
      <div
        v-if="boxChatShow"
        class="me-2 border border-secondary bg-white"
        style="width: 300px; box-shadow: 1px 1px grey"
      >
        <!-- header chat -->
        <div class="d-flex bg-primary p-2 text-center">
          <button class="btn btn-light">
            <i class="fa-solid fa-user-tie fa-lg" style="color: black"></i>
          </button>
          <p class="ms-3 text-white">Admin</p>
        </div>
        <!-- body chat -->

        <div style="max-height: 320px; background-color: #ffffff; overflow-y: hidden">
          <!-- line chat -->
          <div style="overflow-y: auto; height: 300px" class="mt-3 chatbox" ref="messages">
            <div v-for="(message, index) in messages" :key="index">
              <!-- tin nhắn của admin ở bên trái -->
              <div
                v-if="message.type_sender === 'admin'"
                class="align-items-left ms-1 me-3 d-flex p-1"
                id="message-admin"
              >
                <!-- ảnh account -->
                <div class="ms-1 me-2" style="height: 40px; width: 40px; border-radius: 10px">
                  <img :src="srcAvtUser" class="img-fluid" style="border-radius: 15px" />
                </div>

                <!-- tin nhắn -->
                <div class="ms-2">
                  <div
                    style="
                      background-color: #1e90ff;
                      color: white;
                      border-radius: 10px;
                      width: fit-content;
                    "
                  >
                    <p class="ms-1 me-2">{{ message.message }}</p>
                  </div>
                  <!-- thời gian nhắn tin -->
                  <div>
                    <small style="font-size: xx-small" class="">{{ message.create_at }}</small>
                  </div>
                </div>
              </div>
              <!-- tin nhắn của user ở bên phải -->
              <div id="message-user" v-else class="d-flex justify-content-end me-1 ms-3 d-flex">
                <!-- tin nhắn -->
                <div class="ms-2">
                  <div
                    style="
                      background-color: #cdc9c9;
                      color: black;
                      border-radius: 10px;
                      width: fit-content;
                      float: right;
                    "
                  >
                    <p class="ms-2 me-2">{{ message.message }}</p>
                  </div>
                  <br />
                  <!-- thời gian nhắn tin -->
                  <div>
                    <small style="font-size: xx-small" class="">{{ message.create_at }}</small>
                  </div>
                </div>
                <!-- <div class="ms-1 me-2" style="height:40px;width:40px;border-radius: 10px;">
                 <img :src="srcAvtUser" class="img-fluid" style="border-radius: 15px;">
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- footer chat -->
        <div class="d-flex mt-2 ms-1 me-1">
          <div class="input-group mb-1">
            <input
              v-model="inputMessage"
              @keyup.enter="sendMessage"
              type="text"
              class="form-control"
              placeholder="Nhập tin nhắn của bạn"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="sendMessage">
                <i class="fa-regular fa-paper-plane fa-lg" style="color: #74c0fc"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- icon chat -->
      <div>
        <button class="btn btn-primary" @click="ToggleChatBox">
          <i class="fa-solid fa-comments fa-lg" style="color: white"></i>
          <span
            v-if="bellShow"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            <i class="fa-regular fa-bell"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// import Cookies from 'js-cookie';
import { decodeTokenStudent } from '@/service/decodeToken'
import { ChatByUserId} from '@/service/chatService'
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      boxChatShow: false,
      inputMessage: null,
      messages: [],
      socket: null,
      adminId: 8,
      userId: null,
      srcAvtUser: '/src/assets/img/3781986.png',
      currentTime: null,
      bellShow: false
    }
  },
  created() {
    // tạo websocket
    this.getListChat()
    this.socket = new WebSocket('ws://localhost:9001')
    this.socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data)
      const userId = messageData['to']
      if (userId == this.userId) {
        this.messages.push(messageData) // nhận và lưu trữ tin nhắn
        // console.log(messageData)
        // thông báo nếu có tin nhắ
        this.bellShow = true
        this.scrollToBottom()
      }
    }

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server')
    }

    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket server')
    }
  },
  methods: {
    async getListChat () {
      if (Cookies.get('tokenStudent'))
      {
        const user = decodeTokenStudent()
        this.userId = user.data.id
        const data = await ChatByUserId(this.userId)
        this.messages = data
        console.log(this.messages)
      }
    },
    ToggleChatBox () {
      const token = Cookies.get('tokenStudent')
      if (token)
      {
        this.boxChatShow = !this.boxChatShow
        this.bellShow = false
        this.scrollToBottom()
      }
      else
      {
        this.$router.push({name:'Login'})
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatbox = this.$refs.messages
        if (chatbox) {
          chatbox.scrollTop = chatbox.scrollHeight
          // tự động cuộn xuống dưới
        }
      })
    },
    formatToHanoiTime(date) {
      const options = {
        timeZone: 'Asia/Bangkok', // Múi giờ Hà Nội
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      const formatter = new Intl.DateTimeFormat('vi-VN', options)
      return formatter.format(new Date(date))
    },
    sendMessage() {
      if (this.inputMessage !== '') {
        this.currentTime = this.formatToHanoiTime(new Date())
        try {
          const message = {
            message: this.inputMessage,
            to: this.adminId,
            from: this.userId,
            time: this.currentTime,
            sender: 'user',
            type_sender: 'user',
            create_at: this.currentTime
          }
          if (this.socket.readyState === WebSocket.OPEN) {
            this.messages.push(message)
            this.socket.send(JSON.stringify(message)) // gửi tin nhắn đi
            this.inputMessage = '' // reset ô input sau khi gửi
            this.scrollToBottom()
          } else {
            alert('Đang kết nối với máy chủ. Vui lòng đợi !')
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('Vui lòng nhập tin nhắn')
      }
    }
  }
}
</script>
<style></style>
