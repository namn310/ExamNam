<script>
import { ElNotification } from 'element-plus';
import { deleteUser, getUserList, getUserDetail } from '@/service/usersService'
import { decodeToken } from '@/service/decodeToken'
export default {
    data () {
        return {
            loadingShow:true,
            ListUser: [],
            ListPages: [],
            TotalPage: 0,
            TotalUser: 0,
            currentPage: 1,
            roleAccount: 'Role'
        }
    },
    created () {
        this.fetchData(1, this.roleAccount)
        this.getDetail()
    },
    methods: {
        async getDetail () {
            const a = decodeToken()
            const data2 = await getUserDetail(a.data.id)
            if (data2.data.role !== 'admin')
            {
                this.$router.push({ name: 'homeAdmin' })
            }
        },

        async fetchData (page, role) {
            try
            {
                const result = await getUserList(page, role)
                if (result)
                {
                    this.ListUser = result.data.data
                    this.TotalPage = result.data.total_page
                    this.TotalUser = result.data.record_total
                    this.listpage()
                    this.loadingShow = false
                }
            }
            catch (e)
            {
                this.loadingShow = false
                alert("Có lỗi trong quá trình lấy dữ liệu !")
            }
        },
        listpage () {
            // for (var i = 1; i <= this.TotalPage; i++)
            // {
            //   this.ListPages.push(i)
            // }
            this.ListPages = [] // Reset ListPages

            if (this.TotalPage <= 6)
            {
                // Hiển thị tất cả các trang nếu số trang <= 7
                for (let i = 1; i <= this.TotalPage; i++)
                {
                    this.ListPages.push(i)
                }
            } else
            {
                // Hiển thị phân trang dạng 12 ... 89
                if (this.currentPage <= 4)
                {
                    // Nếu đang ở các trang đầu
                    for (let i = 1; i <= 5; i++)
                    {
                        this.ListPages.push(i)
                    }
                    this.ListPages.push('...')
                    this.ListPages.push(this.TotalPage)
                } else if (this.currentPage >= this.TotalPage - 3)
                {
                    // Nếu đang ở các trang cuối
                    this.ListPages.push(1)
                    this.ListPages.push('...')
                    for (let i = this.TotalPage - 4; i <= this.TotalPage; i++)
                    {
                        this.ListPages.push(i)
                    }
                } else
                {
                    // Nếu đang ở giữa
                    this.ListPages.push(1)
                    this.ListPages.push('...')
                    for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++)
                    {
                        this.ListPages.push(i)
                    }
                    this.ListPages.push('...')
                    this.ListPages.push(this.TotalPage)
                }
            }
        },
        async changePage (page) {
            this.currentPage = page
            if (page === '...')
            {
                return
            } else
            {
                await this.fetchData(page)
                this.listpage()
            }
        },
        async nextPage () {
            if (this.currentPage === this.TotalPage)
            {
                return
            } else
            {
                await this.changePage(this.currentPage + 1)
            }
        },
        async prePage () {
            if (this.currentPage === 1)
            {
                return
            } else
            {
                await this.changePage(this.currentPage - 1)
            }
        },
        detailUser (id) {
            this.$router.replace({ name: 'changeUser', params: { id: id } })
        },
        async delUserFetch (id) {
            if (confirm('Xác nhận xóa người dùng này ?'))
            {
                const result = await deleteUser(id)
                if (result)
                {
                    if (result.message === 'Xóa thông tin người dùng thành công !')
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: 'Xóa người dùng thành công !',
                            type: 'success'
                        })
                        this.ListUser = this.ListUser.filter(e => e.id !== id)
                    }
                    else
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: 'Có lỗi xảy ra !',
                            type: 'error'
                        })
                    }
                }
                else
                {
                    ElNotification({
                        title: 'Thông báo',
                        message: 'Có lỗi xảy ra !',
                        type: 'error'
                    })
                }
            } else
            {
                return
            }
        },
        async getUserByRole (event) {
            this.roleAccount = event.target.value
            this.fetchData(this.currentPage, this.roleAccount)
        }
    }
}
</script>

<template>
     <div class="d-flex justify-content-center" v-if=" loadingShow ">
      <div> <svg viewBox="0 0 240 240" height="120" width="120" class="pl ms-2">
          <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20"
            stroke="#000" fill="none" r="105" cy="120" cx="120" class="pl__ring pl__ring--a"></circle>
          <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20"
            stroke="#000" fill="none" r="35" cy="120" cx="120" class="pl__ring pl__ring--b"></circle>
          <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
            cy="120" cx="85" class="pl__ring pl__ring--c"></circle>
          <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
            cy="120" cx="155" class="pl__ring pl__ring--d"></circle>
        </svg>
        <p>Loading ... </p>
      </div>
    </div>
    <div v-else>
        <div class="text-[30px] text-center">Danh sách người dùng</div>
        <div class="flex justify-between">
            <RouterLink :to=" { name: 'create-user' } ">
                <el-button type="primary" plain>Tạo người dùng</el-button>
            </RouterLink>
        </div>
        <div class="pt-8 ms-2 me-2">
            <table class="table table-hover table-bordered text-center table-responsive" id="sampleTable">
                <thead>
                    <tr class="table-secondary text-center">
                        <th style="width: 20%">Mã</th>
                        <th style="width: 30%">Tên</th>
                        <th style="width: 30%">Email</th>
                        <th style="width: 10%">
                            <select v-model=" roleAccount " class="form-select" @change=" getUserByRole ">
                                <option selected>Role</option>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </th>
                        <th style="width: 10%">Chức năng</th>
                    </tr>
                </thead>
                <tbody v-if=" ListUser.length > 0 ">
                    <tr v-for="     e in ListUser     " :key=" e.id ">
                        <td @click="detailUser( e.id )">{{ e.id }}</td>
                        <td @click="detailUser( e.id )">{{ e.name }}</td>
                        <td @click="detailUser( e.id )">{{ e.email }}</td>
                        <td @click="detailUser( e.id )">{{ e.role }}</td>
                        <td><button @click="delUserFetch( e.id )" class="btn btn-danger">X</button></td>
                    </tr>
                </tbody>
            </table>
            <p v-if=" ListUser.length <= 0 ">Không có tài khoản nào !</p>
        </div>
        <div v-if=" ListUser.length > 0 " class="mb-4">
            <ul class="pagination justify-content-center">
                <li style="cursor: pointer">
                    <a @click="prePage()" class="page-link"><i class="fa-solid fa-angles-left"></i></a>
                </li>
                <li style="cursor: pointer" class="page-item" :class=" { active: page == currentPage } "
                    v-for="(     page, index) in ListPages" :key=" index ">
                    <a class="page-link" @click="changePage( page )">{{ page }}</a>
                </li>
                <li style="cursor: pointer">
                    <a @click="nextPage()" class="page-link"><i class="fa-solid fa-angles-right"></i></a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>

/* loading */
.pl {
  width: 3em;
  height: 3em;
}

.pl__ring {
  animation: ringA 2s linear infinite;
}

.pl__ring--a {
  stroke: orange;
}

.pl__ring--b {
  animation-name: ringB;
  stroke: blue;
}

.pl__ring--c {
  animation-name: ringC;
  stroke: greenyellow;
}

.pl__ring--d {
  animation-name: ringD;
  stroke: red;
}

/* Animations */
@keyframes ringA {

  from,
  4% {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -330;
  }

  12% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -335;
  }

  32% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -595;
  }

  40%,
  54% {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -660;
  }

  62% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -665;
  }

  82% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -925;
  }

  90%,
  to {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -990;
  }
}

@keyframes ringB {

  from,
  12% {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -110;
  }

  20% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -115;
  }

  40% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -195;
  }

  48%,
  62% {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  70% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  90% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -305;
  }

  98%,
  to {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -330;
  }
}

@keyframes ringC {
  from {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: 0;
  }

  8% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -5;
  }

  28% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -175;
  }

  36%,
  58% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  66% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  86% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -395;
  }

  94%,
  to {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -440;
  }
}

@keyframes ringD {

  from,
  8% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: 0;
  }

  16% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -5;
  }

  36% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -175;
  }

  44%,
  50% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  58% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  78% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -395;
  }

  86%,
  to {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -440;
  }
}
</style>
