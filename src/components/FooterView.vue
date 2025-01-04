<template>
  <div class="footerwrapper">
    <div class="footercontainer">
      <footer>
        <hr class="mb-3" />
        <div class="d-flex justify-content-around" style="margin-left: 100px; margin-right: 100px">
          <div class="me-3">
            <div class="footer-title d-flex flex-column align-items-center">
              <span style="font-size: 3vw; font-size: 3vh">
                <strong>ExamTutor</strong>
              </span>
              <span class="navbar-brand">
                <a class="topnav-brand ms-4" href="/">
                  <img :src=" imgageLogo " style="width: 150px; height: 150px" class="topnav-logo image-fluid" />
                </a>
              </span>
              <p>
                <strong> Công ty TNHH Giáo dục</strong>
              </p>
              <p>
                <strong> Địa chỉ: Ngã Tư Sở, Hà Nội </strong>
              </p>
            </div>
          </div>
          <div class="text-center d-none d-lg-block ms-5 me-5">
            <div class="footer-title mb-2">
              <strong style="font-size: 3vw; font-size: 3vh">Các lớp học</strong>
            </div>
            <div class="grid-container">
              <div v-for="             e in ListClass             " :key=" e.id " class="grid-item">
                <span v-if=" e.class % 1 === 0 "> Lớp:</span> {{ e.class }}
              </div>
            </div>
          </div>
          <div class="ms-3">
            <div class="footer-title">
              <strong style="font-size: 3vw; font-size: 3vh">Thông tin liên hệ</strong>
            </div>
            <div class="mt-2">
              <p><i class="fa-solid fa-phone me-1"></i><span class="me-2">:</span>0123456789</p>
              <p class="mt-2">
                <i class="fa-solid fa-envelope me-1"></i><span class="me-2">:</span>Exam@gmail.com
              </p>
              <p class="mt-4"><strong>Chính sách bảo mật</strong></p>
              <p class="mt-2"><strong>Điều khoản sử dụng</strong></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    <!-- box chat -->
    <div style="position: fixed; right: 0; bottom: 0; margin-right: 20px; padding: 2px; z-index: 20" class="d-flex">
      <Picker v-if=" showEmojiTable " v-model=" inputMessage " :data=" emojiIndex " set="twitter" @select=" addEmoji " />
      <div v-if=" boxChatShow " class="me-2 border border-secondary bg-white"
        style="width: 350px; box-shadow: 1px 1px grey;border-radius: 10px;">
        <!-- header chat -->
        <div class="d-flex bg-primary p-2 text-center"
          style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
          <button class="btn btn-light">
            <i class="fa-solid fa-user-tie fa-lg" style="color: black"></i>
          </button>
          <p class="ms-3 text-white">Admin</p>
        </div>
        <!-- body chat -->

        <div style="max-height: 320px; background-color: #ffffff; overflow-y: hidden">
          <!-- line chat -->
          <div style="overflow-y: auto; height: 300px" class="mt-3 chatbox" ref="messages">
            <div v-for="(             message, index) in messages" :key=" index ">
              <!-- tin nhắn của admin ở bên trái -->
              <div v-if=" message.type_sender === 'admin' " class="align-items-left ms-1 me-3 d-flex p-1"
                id="message-admin">
                <!-- ảnh account -->
                <div class="ms-1 me-2" style="height: 40px; width: 40px; border-radius: 10px">
                  <img :src=" srcAvtUser " class="img-fluid" style="border-radius: 15px" />
                </div>

                <!-- tin nhắn -->
                <div v-if=" message.type_message === 'text' " class="ms-2">
                  <div style="
                      background-color: #1e90ff;
                      color: white;
                      border-radius: 10px;
                      width: fit-content;
                    ">
                    <p class="ms-1 me-2">{{ message.message }}</p>
                  </div>
                  <!-- thời gian nhắn tin -->
                  <div>
                    <small style="font-size: xx-small" class="">{{ message.create_at }}</small>
                  </div>
                </div>
                <div v-if=" message.type_message === 'image' ">
                  <img v-if=" !message.message_preview " :src=" API_Port + message.message "
                    style="width:100px;height:80px">
                  <img v-else :src=" message.image " style="width:100px;height:80px">
                  <!-- thời gian nhắn tin -->
                  <div>
                    <small style="font-size: xx-small" class="">{{ message.create_at }}</small>
                  </div>
                </div>
              </div>
              <!-- tin nhắn của user ở bên phải -->
              <div id="message-user" v-else class="d-flex justify-content-end me-1 ms-3 d-flex">
                <!-- tin nhắn text -->
                <div v-if=" message.type_message === 'text' " class="ms-2">
                  <div style="
                      background-color: #cdc9c9;
                      color: black;
                      border-radius: 10px;
                      width: fit-content;
                      float: right;
                    ">
                    <p class="ms-2 me-2">{{ message.message }}</p>
                  </div>
                  <br />
                  <!-- thời gian nhắn tin -->
                  <div>
                    <small style="font-size: xx-small" class="">{{ message.create_at }}</small>
                  </div>
                </div>
                <!-- tin nhắn hình ảnh -->
                <div v-if=" message.type_message === 'image' ">
                  <img v-if=" message.message !== '' && message.message !== null "
                    :src=" API_Port + ( message.message ) " style="width:170px;height:120px">
                  <img v-else :src=" ( message.message_preview ) " style="width:170px;height:120px">
                  <!-- thời gian nhắn tin -->
                  <div style="float: right;">
                    <small style="font-size: xx-small" class="">{{ message.create_at }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- footer chat -->
        <div class="d-flex mt-2 ms-1 me-1">
          <div class="input-group mb-1">
            <!-- Hiển thị tên tệp đã chọn -->
            <!-- <p class="file-name">{{ selectedFileName }}</p> -->
            <!-- hiển thị preview ảnh khi người dùng gửi ảnh -->
            <div style="position: relative;" v-if=" previewImage ">
              <img class="ms-5" :src=" previewImage " alt="Preview" style="
                  max-width: 100px;
                  max-height: 70px;
                  margin-left: 15px;
                  border-radius: 5px;
                  border: 1px solid black;
                " />
              <button @click=" deleteImageMessageSend " v-if=" previewImage "
                style="background-color: red; color: white; padding-left: 5px;padding-right:5px;border-radius: 3px;position: absolute;z-index: 2000;right:50px;top:1px;right:1px">x</button>
            </div>
            <!-- custom button input type file -->
            <div class="input-group">
              <div class="custom-file-upload">
                <!-- Nhãn để mô phỏng nút tải lên -->
                <label for="fileInput" class="btn btn-white">
                  <i class="fa-regular fa-image"></i>
                </label>
                <!-- Phần tử input file bị ẩn -->
                <input type="file" id="fileInput" @change=" handleFileChange " style="display: none" />
              </div>
              <!-- button hiển thị danh sách emoji -->

              <textarea :disabled=" previewImage !== null "
                style="word-wrap: break-word; resize: none; height: 50px;border-radius: 10px;" v-model=" inputMessage "
                @keyup.enter=" sendMessage " type="text" class="form-control ms-2 me-1"
                placeholder="Nhập tin nhắn của bạn...">
              </textarea>
              <button @click=" function () {
                showEmojiTable = !showEmojiTable
              } " class="me-1"><i class="fa-regular fa-face-smile fa-lg"></i></button>
              <div class="input-group-append">
                <button class="ms-2" style="margin-top:13px;padding-right:2px;border-radius: 5px;" type="button"
                  @click=" sendMessage ">
                  <i class="fa-regular fa-paper-plane fa-lg" style="color: black"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- icon chat -->

      <div>
        <button class="btn btn-primary" @click=" ToggleChatBox ">
          <i class="fa-solid fa-comments fa-lg" style="color: white"></i>
          <span v-if=" bellShow "
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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
import { ChatByUserId } from '@/service/chatService'
import Cookies from 'js-cookie'
import LogoWeb from '@/assets/img/LogoWeb.png'
import { getAllClass } from '@/service/class'
// thư viện hiển thị emoji
// all emoji sets.
import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";

var emojiIndex = new EmojiIndex(data);
export default {
  components: { Picker },
  data () {
    return {
      emojiIndex: emojiIndex,
      emojisOutput: "",
      showEmojiTable: false,
      API_Port: import.meta.env.VITE_API_PORT_FILE_IMAGE_MESSAGE,
      boxChatShow: false,
      inputMessage: '',
      messages: [],
      socket: null,
      adminId: 8,
      userId: null,
      srcAvtUser: '/src/assets/img/3781986.png',
      currentTime: null,
      bellShow: false,
      imgageLogo: LogoWeb,
      ListClass: [],
      previewImage: null,
      // biến lưu trữ ảnh tin nhắn người dùng nếu người dùng gửi ảnh
      ImageSelected: null
    }
  },
  mounted () {
    this.getClassFunction()
    // tạo websocket
    this.socket = new WebSocket(import.meta.env.VITE_WEBSOCKET)
    this.socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data)
      const userId = messageData['to']
      if (userId == this.userId)
      {
        this.messages.push(messageData) // nhận và lưu trữ tin nhắn
        // console.log(messageData)
        // thông báo nếu có tin nhắ
        this.bellShow = true
        this.scrollToBottom()
      }
    }

    this.socket.onopen = () => {
      this.getListChat()
      console.log('Connected')
    }

    this.socket.onclose = () => {
      console.log('Disconnected')
    }
  },
  beforeUnmount () {
    // Đảm bảo đóng kết nối WebSocket
    if (this.socket)
    {
      this.socket.close();
    }
  },
  methods: {
    showEmoji (emoji) {
      this.emojisOutput = this.emojisOutput + emoji.native;
    },
    addEmoji (emoji) {
      this.inputMessage += emoji.native; // Thêm emoji vào chuỗi tin nhắn
      // console.log(emoji.native)
    },
    handleFileChange (event) {
      const file = event.target.files[0]; // Lấy tệp được chọn
      if (file)
      {
        // Kiểm tra xem tệp có phải là ảnh không
        const fileType = file.type.split('/')[0]; // Lấy loại tệp, chỉ lấy phần đầu (image,)

        if (fileType === 'image')
        { // Nếu là ảnh
          if (file.size < 5 * 1024 * 1024)
          { // Kiểm tra kích thước tệp dưới 5MB
            this.ImageSelected = file;
            this.previewImage = URL.createObjectURL(file); // Tạo URL tạm thời để hiển thị ảnh
          } else
          {
            alert("Chỉ gửi ảnh dưới 5MB");
          }
        } else
        {
          alert("Vui lòng chọn ảnh hợp lệ");
          // Nếu tệp không phải là ảnh, xóa thông tin hiển thị
          this.selectedFileName = '';
          this.ImageSelected = null;
          this.previewImage = null;
        }
      } else
      {
        // Nếu không có tệp, xóa thông tin hiển thị
        this.selectedFileName = '';
        this.ImageSelected = null;
        this.previewImage = null;
        alert("Vui lòng chọn ảnh");
      }
    },
    deleteImageMessageSend () {
      this.previewImage = null
      this.ImageSelected = null
    },
    async getClassFunction () {
      const listClassFetch = await getAllClass()
      if (listClassFetch)
      {
        this.ListClass = listClassFetch.data
      }
    },
    async getListChat () {
      if (Cookies.get('tokenStudent'))
      {
        const user = decodeTokenStudent()
        this.userId = user.data.id
        const data = await ChatByUserId(this.userId)
        if (data !== null)
        {
          // console.log(data)
          this.messages = data
        }
      }
    },
    ToggleChatBox () {
      const token = Cookies.get('tokenStudent')
      if (token)
      {
        this.boxChatShow = !this.boxChatShow
        this.bellShow = false
        this.scrollToBottom()
      } else
      {
        this.$router.push({ name: 'Login' })
      }
    },
    scrollToBottom () {
      this.$nextTick(() => {
        const chatbox = this.$refs.messages
        if (chatbox)
        {
          chatbox.scrollTop = chatbox.scrollHeight
          // tự động cuộn xuống dưới
        }
      })
    },
    formatToHanoiTime (date) {
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
    sendMessage () {
      if (decodeTokenStudent !== null)
      {
        this.currentTime = this.formatToHanoiTime(new Date())
        if (this.inputMessage !== '')
        {
          try
          {
            const message = {
              message: this.inputMessage,
              image: '',
              to: this.adminId,
              from: this.userId,
              time: this.currentTime,
              sender: 'user',
              type_sender: 'user',
              type_message: 'text',
              create_at: this.currentTime
            }
            if (this.socket.readyState === WebSocket.OPEN)
            {
              this.socket.send(JSON.stringify(message)) // gửi tin nhắn đi
              this.messages.push(message)
              this.inputMessage = '' // reset ô input sau khi gửi
              this.scrollToBottom()
            } else
            {
              alert('Đang kết nối với máy chủ. Vui lòng đợi !')
            }
          } catch (e)
          {
            console.log(e)
          }
        }
        else if (this.inputMessage === '' && this.ImageSelected !== null && this.ImageSelected !== '')
        {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Image = reader.result; // Kết quả Base64 của ảnh
            const message = {
              message: '',
              image: base64Image, // Ảnh ở dạng Base64
              to: this.adminId,
              from: this.userId,
              time: this.currentTime,
              sender: 'user',
              type_sender: 'user',
              type_message: 'image',
              create_at: this.currentTime,
              // giá trị lưu ảnh tạm thời để hiện thị lên khi send tin nhắn đi
              message_preview: this.previewImage,
              type_image: 'image_send'
            };

            // Kiểm tra kết nối của socket
            if (this.socket.readyState === WebSocket.OPEN)
            {
              this.socket.send(JSON.stringify(message));
              this.messages.push(message); // Lưu tin nhắn vào danh sách hiển thị
              this.inputMessage = ''; // Reset ô input
              this.ImageSelected = null; // Reset ảnh
              this.previewImage = null
              this.scrollToBottom(); // Cuộn xuống dưới cùng
            } else
            {
              alert('Đang kết nối với máy chủ. Vui lòng đợi!');
            }
          };

          // Đọc file và chuyển thành Base64
          reader.readAsDataURL(this.ImageSelected);
        }
        else
        {
          alert('Vui lòng nhập tin nhắn')
        }
      } else
      {
        alert('Vui lòng đăng nhập để có thể chat')
      }
    }
  }
}
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* 3 cột có độ rộng bằng nhau */
  gap: 16px;
  /* Khoảng cách giữa các phần tử */
}

.grid-item {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  text-align: center;
}

.custom-file-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-file-upload .btn {
  cursor: pointer;
}

.custom-file-upload label {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: white;
  color: black;
  border-radius: 5px;
}

.file-name {
  font-size: 14px;
  color: #555;
  display: none;
}

.emoji-mart-emoji {
  /* color:red; */
  display: none;
}
</style>
