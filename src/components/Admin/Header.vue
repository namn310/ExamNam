<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
    <button type="button" class="text-lg text-gray-600 sidebar-toggle max-md:hidden" @click=" toggleSidebar ">
      <i class="ri-menu-line"></i>
    </button>

    <ul class="flex items-center text-sm ml-4">
      <li class="mr-2">
        <a href="#" class="text-gray-400 hover:text-gray-600 font-medium">Admin</a>
      </li>
      <li class="text-gray-600 mr-2 font-medium"></li>
      <li class="text-gray-600 mr-2 font-medium"></li>
    </ul>
    <ul class="ml-auto flex items-center">
      <button type="button" class="text-lg text-gray-600 sidebar-toggle md:hidden me-3" @click=" toggleSidebar ">
        <i class="ri-menu-line"></i>
      </button>
    </ul>
    <div>
      <button @click="showListChatHandle()" class="btn btn-primary" style="border-radius: 18px">
        <i class="fa-brands fa-rocketchat fa-lg" style="color: white"></i>
      </button>
      <!-- list chat dropdown -->
      <div style="
          width: 400px;
          height: 400px;
          position: absolute;
          right: 20px;
          top: 50px;
          background-color: white;
          overflow-y: scroll;
          border-radius: 10px;
          box-shadow: 5px 5px 10px #ffcccc;
        " class="p-2" v-if=" showListChat ">
        <!-- header -->
        <div>
          <p style="font-size: 2.5vw; font-size: 2.5vh"><strong>Đoạn chat</strong></p>
        </div>
        <!-- ô tìm kiếm -->
        <div class="d-flex border border-danger mt-2" style="border-radius: 15px">
          <button class="btn btn-white"><i class="fa-solid fa-magnifying-glass"></i></button>
          <input class="form-control me-2" id="inputBox" v-model=" searchPersonChatInput " @input="searchChat()"
            type="text" placeholder="Tìm kiếm..." />
        </div>
        <!-- body -->
        <div class="mt-2" style="height: 400px; border-radius: 20px">
          <!-- <p v-if="isnull">Không có người dùng nào</p> -->
          <!-- chat element -->
          <div style="width: 370px; box-shadow: 2px 1px 2px #ff9966; border-radius: 15px;cursor: pointer;"
            class="mt-2 d-flex chatElement" v-for="(   user, index) in userList" :key=" index "
            @click="showUserBoxChat( user.id_user )">
            <!-- avt user -->
            <div class="p-2">
              <img :src=" srcAvtUser " class="img-fluid"
                style="max-height: 45px; max-height: 45px; border-radius: 15px" />
            </div>
            <!-- tên và tin nhắn user -->
            <div class="d-flex flex-column" style="width: 300px">
              <p class="ms-2" style="font-size: 3vw; font-size: 3vh">
                <strong>{{ user.name }}</strong>
              </p>
              <div class="d-flex justify-content-between">
                <p style="font-size: 2.7vw; font-size: 2.7vh" class="ms-2" v-if=" user.isRead === 0 ">
                  <small><strong>{{ user.newMess }}</strong></small>
                </p>
                <p style="font-size: 2.7vw; font-size: 2.7vh" class="ms-2" v-else>
                  <small>{{ user.newMess }}</small>
                </p>
                <p style="font-size: 1.5vw; font-size: 1.5vh">
                  <small>{{ user.dateNewMess }}</small>
                </p>
              </div>
            </div>
          </div>
          <!-- nếu length của userlist bằng 0 thì hiện dòng này ra -->
          <p v-if=" userList.length < 1 ">Không có người dùng nào</p>
        </div>
      </div>
    </div>
  </div>

  <!-- box chat -->
  <div style="position: fixed; right: 0; bottom: 0; margin-right: 20px; padding: 2px; z-index: 100" class="d-flex">
    <div v-if=" boxChatShow " class="me-2 border border-secondary bg-white"
      style="width: 300px; box-shadow: 1px 1px grey">
      <!-- header chat -->
      <div class="d-flex bg-primary p-2 text-center">
        <img :src=" srcAvtUser " class="img-fluid" style="width: 30px; height: 30px" />
        <p class="ms-3 text-white">{{ currentUserBoxChatNameShow }}</p>
      </div>
      <!-- body chat -->

      <div style="max-height: 320px; background-color: white; overflow-y: hidden">
        <!-- line chat -->
        <div class="chatbox mt-3" ref="messages" style="overflow-y: auto; height: 300px">
          <div v-for="(   message, index) in currentListUserChatShow" :key=" index ">
            <!-- tin nhắn của user ở bên trái -->
            <div v-if=" message.type_sender !== 'admin' " class="align-items-left ms-1 me-3 d-flex p-1"
              id="message-admin">
              <!-- ảnh account -->
              <div style="height: 40px; width: 40px">
                <img :src=" srcAvtUser " class="img-fluid" />
              </div>

              <!-- tin nhắn -->
              <div class="ms-2">
                <div style="
                    background-color: lightseagreen;
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
            </div>
            <!-- tin nhắn của admin ở bên phải -->
            <div id="message-user" v-else class="d-flex justify-content-end me-1 ms-3 d-flex">
              <!-- tin nhắn -->
              <div class="ms-2">
                <div style="
                    background-color: #33b319;
                    color: white;
                    border-radius: 10px;
                    width: fit-content;
                    float: right;
                  ">
                  <p class="ms-2 me-2">{{ message.message }}</p>
                </div>
                <br />
                <!-- thời gian nhắn tin -->
                <div style="float: right">
                  <small style="font-size: xx-small" class="ms-4">{{ message.create_at }}</small>
                </div>
              </div>
              <!-- <div class="ms-1 me-2">
                  <button><i class="fa-regular fa-user fa-lg" style="color: #33b319"></i></button>
                </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- footer chat -->
      <div class="d-flex ms-1 me-1">
        <div class="input-group mb-1">
          <!-- <div>
            <input class="custom-file-input" type="file" hidden>
          </div> -->
          <input v-model=" inputMessage " @keyup.enter=" sendMessage " type="text" class="form-control"
            placeholder="Nhập tin nhắn của bạn" style="text-wrap: wrap;" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click=" sendMessage ">
              <i class="fa-regular fa-paper-plane fa-lg" style="color: #74c0fc"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- icon chat -->
    <div>
      <button class="btn btn-primary" @click=" ToggleChatBox ">
        <i class="fa-solid fa-comments fa-lg" style="color: white"></i>
        <span v-if=" countMessageNotRead != 0 "
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ countMessageNotRead }}
          <i class="fa-regular fa-bell"></i>
        </span>
      </button>
    </div>
  </div>
</template>
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { createPopper } from '@popperjs/core'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { decodeToken } from '@/service/decodeToken'
import { getUserDetail } from '@/service/usersService'
import { ListChat, updateIsread } from '@/service/chatService'
export default {
  props: {
    toggleSidebar: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      isDropdownOpen: false,
      popperInstance: null,
      showListChat: false,
      boxChatShow: false,
      inputMessage: null,
      // messages: [],
      socket: null,
      userSocketId: 12,
      userList: [],
      // mảng dữ liệu user chat để dùng cho tìm kiếm
      userListOrigin: [],
      srcAvtUser: '/src/assets/img/1666170056423.jpg',
      currentTime: null,
      bellShow: false,
      adminId: null,
      // mảng dòng tin nhắn mới nhất
      currentUserBoxChatNameShow: null,
      currentListUserChatShow: [],
      searchPersonChatInput: null,
    }
  },
  created () {
    this.getUserChat()
    const user = decodeToken()
    this.adminId = user.data.id
    this.socket = new WebSocket('ws://localhost:9001')
    this.socket.onopen = () => {
      console.log('Kết nối tới WebSocket server')
    }

    // hàm nhận tin nhắn
    this.socket.onmessage = async (event) => {
      const messageData = JSON.parse(event.data)
      // this.messages.push(messageData); // Nhận và lưu trữ tin nhắn từ người dùng
      // thông báo khi có tin nhắn mới
      const userId = messageData['from']
      // tin nhắn vừa nhận
      const NewMessage = messageData['message']
      // kiểm tra xem người nhắn tin đến có tồn tại trong danh sách những người nhắn tin chưa
      const user = this.userList.find((e) => e.id_user === userId && e.id_user !== this.adminId)
      if (user)
      {
        // nếu rồi thì cập nhật giá trị newMess là tin nhắn vừa gửi đến và push tin nhắn mới vào cuối mảng tin nhắn
        user.newMess = NewMessage
        user.dateNewMess = messageData['create_at']
        if (user.list_message)
        {
          user.list_message.push(messageData)
        } else
        {
          // nếu chưa tồn tại thì tạo mảng list_message mới và push messageData vào
          user.list_message = []
          user.list_message.push(messageData)
        }

        // cập nhật trạng thái isRead của đoạn chat thành 0
        const updateIsRead = await updateIsread(userId)
        if (updateIsRead && updateIsRead.response === 1)
        {
          user.isRead = 0
        }
      } else
      {
        // nếu là người mới nhắn tin lần đầu thì thêm mới người dùng vào danh sách chat
        // lấy thông tin người dùng bằng id
        const newUser = await this.getDetailUser(userId)
        //tạo data người dùng và tin nhắn để thêm vào mảng list user
        const newUserListData = {
          dataNewMess: messageData['create_at'],
          id_user: userId,
          isread: false,
          isRead: 0,
          lengthListMess: 1,
          list_message: [
            {
              message: messageData['message'],
              status: 0,
              create_at: messageData['create_at'],
            }
          ],
          name: newUser.name,
          newMess: messageData['message']
        }
        // console.log(newUserListData, this.userList)
        // push vào manngr
        this.userList.push(newUserListData)

        // cập nhật trạng thái isRead của đoạn chat thành 0
        const updateIsRead = await updateIsread(userId)
        if (updateIsRead && updateIsRead.response === 1)
        {
          user.isRead = 0
        }
      }
      // sao chép mảng user origin 
      this.userListOrigin = this.userList
      // sắp xếp thứ tự tin nhắn theo thời gian tin nhắn mới nhất
      this.sortListChatUser
      // hiện chuông thông báo
      this.bellShow = true
      // tự động scroll xuống tin nhắn mới nhất
      this.scrollToBottom()
    }
  },
  computed: {
    BreakCurmp () {
      return this.$route.name.toUpperCase()
    },
    countMessageNotRead () {
      var count = 0
      if (this.userList !== null)
      {
        this.userList.forEach(e => {
          if (e.isRead === 0)
          {
            count++
          }
        })
      }
      return count
    }
  },
  methods: {
    // tìm kiếm đoạn chat người dùng
    searchChat () {
      const input = this.searchPersonChatInput.trim()
      if (input !== '')
      {
        this.userList = this.userListOrigin.filter(e => e.name.toLowerCase().includes(input.toLowerCase()))
      }
      else
      {
        this.userList = this.userListOrigin
      }
    },
    // sắp xếp danh sách người nhắn tin theo thứ tự tin nhắn mới nhất
    sortListChatUser () {
      for (let i = 0; i < this.userList.length - 1; i++)
      {
        for (let j = 0; j < this.userList.length - i - 1; j++)
        {
          // Lấy độ dài của list_message cho user hiện tại và user tiếp theo
          const lengthListMess1 = this.userList[j].list_message
            ? this.userList[j].list_message.length
            : 0
          const lengthListMess2 = this.userList[j + 1].list_message
            ? this.userList[j + 1].list_message.length
            : 0

          // Kiểm tra xem có tin nhắn chưa
          if (lengthListMess1 > 0 && lengthListMess2 > 0)
          {
            const lastMessageTime1 = new Date(
              this.userList[j].list_message[lengthListMess1 - 1].create_at
            )
            const lastMessageTime2 = new Date(
              this.userList[j + 1].list_message[lengthListMess2 - 1].create_at
            )
            if (lastMessageTime1 < lastMessageTime2)
            {
              // Hoán đổi hai phần tử
              const temp = this.userList[j]
              this.userList[j] = this.userList[j + 1]
              this.userList[j + 1] = temp
            }
          }
        }
      }
    },
    // click chọn người chat và hiển thị ô chat ra
    async showUserBoxChat (id) {
      const user = this.userList.find((e) => e.id_user === id)
      if (user)
      {
        const updateIsRead = await updateIsread(id)
        if (updateIsRead && updateIsRead.response === 1)
        {
          user.isRead = 1
        }
        // user.isread = true
        this.userSocketId = id
        this.currentUserBoxChatNameShow = user.name
        this.currentListUserChatShow = user.list_message
        this.boxChatShow = true
        this.scrollToBottom()
      }
    },
    // lấy danh sách người dùng chat user
    async getUserChat () {
      const data = await ListChat()
      // nếu data không null thì thêm dữ liệu vào mảng user list
      if (data !== null)
      {
        this.userList = data
        // lấy độ dài mảng tin nhắn
        this.userList.forEach((e) => {
          if (e.list_message)
          {
            e.lengthListMess = Object.keys(e.list_message).length
            e.newMess = e.list_message[e.lengthListMess - 1].message
            e.dateNewMess = e.list_message[e.lengthListMess - 1].create_at
            e.isread = false
          }
        })
        this.sortListChatUser()
        // hiển thị ban đầu là user chat đầu tiên
        const user = this.userList[0]
        this.userSocketId = user.id_user
        this.currentUserBoxChatNameShow = user.name
        this.currentListUserChatShow = user.list_message
        // this.boxChatShow = true
        // sao chép ra user list ra mảng list user origin
        this.userListOrigin = this.userList
      }
    },
    // toogle box chat
    ToggleChatBox () {
      this.boxChatShow = !this.boxChatShow
      this.bellShow = false
      this.scrollToBottom()
    },
    // tự động lướt view xuống cuối box chat
    scrollToBottom () {
      this.$nextTick(() => {
        const chatbox = this.$refs.messages
        if (chatbox)
        {
          chatbox.scrollTop = chatbox.scrollHeight
        }
        // tự động cuộn xuống dưới
      })
    },
    // format ngày giờ theo giờ Hà Nội
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
    // lấy thông tin người dùng
    async getDetailUser (id) {
      const data = await getUserDetail(id)
      return data.data
    },
    // gưi tin nhắn đi

    sendMessage () {
      this.currentTime = this.formatToHanoiTime(new Date())
      if (this.inputMessage !== '')
      {
        try
        {
          const message = {
            message: this.inputMessage,
            to: this.userSocketId,
            from: this.adminId,
            time: this.currentTime,
            sender: 'admin',
            type_sender: 'admin',
            create_at: this.currentTime
          }
          if (this.socket.readyState === WebSocket.OPEN)
          {
            this.socket.send(JSON.stringify(message)) // gửi tin nhắn đi
            const userCurrent = this.userList.find((e) => e.id_user === this.userSocketId)
            if (userCurrent)
            {
              userCurrent.list_message.push(message)
            }
            // this.messages.push(message)
            // console.log(JSON.stringify(message))

            // console.log(this.userList)
            this.inputMessage = '' // reset ô input sau khi gửi
            this.userListOrigin = this.userList
            this.scrollToBottom()
          } else
          {
            alert('Đang kết nối với máy chủ. Vui lòng đợi !')
          }
        } catch (e)
        {
          console.log(e)
        }
      } else
      {
        alert('Vui lòng nhập tin nhắn')
      }
    },
    showListChatHandle () {
      this.showListChat = !this.showListChat
    },
    handleLogout () {
      // eslint-disable-next-line no-unused-vars
      const router = useRouter()
      localStorage.removeItem('token')
    },
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
      if (this.isDropdownOpen)
      {
        this.showPopper()
      } else
      {
        this.hidePopper()
      }
    },
    showPopper () {
      if (!this.popperInstance)
      {
        this.popperInstance = createPopper(this.$refs.toggle, this.$refs.menu, {
          modifiers: [
            { name: 'offset', options: { offset: [0, 8] } },
            { name: 'preventOverflow', options: { padding: 24 } }
          ],
          placement: 'bottom-end'
        })
      }
    },
    hidePopper () {
      if (this.popperInstance)
      {
        this.popperInstance.destroy()
        this.popperInstance = null
      }
    },
    handleClickOutside () {
      this.isDropdownOpen = !this.isDropdownOpen
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.handleClickOutside)
    if (this.popperInstance)
    {
      this.popperInstance.destroy()
    }
  }
}
</script>

<style lang="css" scoped>
#inputBox:focus {
  border-color: white;
  box-shadow: 0 0 0 0 white;
  /* Đổ bóng màu khi focus */
  outline: none;
}

;

.chatElement:hover {
  background-color: #d3d3d3;
  color: white;
}

;

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'Select some files';
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}

.custom-file-input:hover::before {
  border-color: black;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>