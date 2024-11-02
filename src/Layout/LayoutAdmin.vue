<!-- <script setup>
    import { ref } from 'vue';
    import Sidebar from "@/components/Admin/Sidebar.vue";
    import Header from '@/components/Admin/Header.vue';

    const isSidebarOpen = ref(false);

    const toggleSidebar = (e) => {
        e.preventDefault();
        isSidebarOpen.value = !isSidebarOpen.value;
};
</script> -->
<template>
  <Sidebar :isSidebarOpen=" isSidebarOpen " />

  <main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main"
    :class=" { active: isSidebarOpen } ">
    <Header :toggleSidebar=" toggleSidebar " />

    <slot />
  </main>
</template>
<script>
import Sidebar from '@/components/Admin/Sidebar.vue'
import Header from '@/components/Admin/Header.vue'
import { decodeToken } from '@/service/decodeToken'

export default {
  components: {
    Sidebar,
    // eslint-disable-next-line vue/no-reserved-component-names
    Header
  },

  data () {
    return {
      isSidebarOpen: false,
      boxChatShow: false,
      inputMessage: null,
      messages: [],
      socket: null,
      userSocketId: 12,
      userList: [],
      srcAvtUser: '/src/assets/img/1666170056423.jpg',
      currentTime: null,
      bellShow: false,
      adminId: null
    }
  },
  created () {
    // this.socket = new WebSocket('ws://localhost:9001');
    // this.socket.onopen = () => {
    //   console.log('Kết nối tới WebSocket server');
    // };

    // this.socket.onmessage = (event) => {
    //   const messageData = JSON.parse(event.data);
    //   this.messages.push(messageData); // Nhận và lưu trữ tin nhắn từ người dùng
    //   // thông báo khi có tin nhắn mới
    //   const userId = messageData['from'];
    //   if (!this.userList.includes(userId))
    //   {
    //     this.userList.push(userId);
    //   }
    //   // this.userList.push(userId)
    //   this.bellShow = true
    //   this.scrollToBottom()
    // };

  },
  methods: {
    toggleSidebar (e) {
      e.preventDefault()
      this.isSidebarOpen = !this.isSidebarOpen
    },
    ToggleChatBox () {
      this.boxChatShow = !this.boxChatShow
      this.bellShow = false
    },
    scrollToBottom () {
      this.$nextTick(() => {
        const chatbox = this.$refs.messages
        if (chatbox)
        {
          chatbox.scrollTop = chatbox.scrollHeight;
        }
        // tự động cuộn xuống dưới
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
      };
      const formatter = new Intl.DateTimeFormat('vi-VN', options);
      return formatter.format(new Date(date));
    },
    sendMessage () {
      this.currentTime = this.formatToHanoiTime((new Date()))
      const user = decodeToken();
      this.adminId = user.data.id
      if (this.inputMessage !== '')
      {
        try
        {
          const message = {
            message: this.inputMessage,
            to: this.userSocketId,
            from: this.adminId,
            time: this.currentTime,
            sender: 'admin'
          }
          if (this.socket.readyState === WebSocket.OPEN)
          {
            this.messages.push(message)
            console.log(JSON.stringify(message))
            this.socket.send(JSON.stringify(message)) // gửi tin nhắn đi
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
      } else
      {
        alert('Vui lòng nhập tin nhắn')
      }
    }
  }
}
</script>
<style lang="css"></style>
