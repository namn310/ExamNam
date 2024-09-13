<template>
    <div class="p-5 mt-5">
        <div class="sm-container">
            <!-- User Profile Section -->
            <div class="mx-md-auto mb-3 mt-4 d-flex justify-content-center flex-column align-items-center">
                <div class="profile-cover-avatar text-center">
                    <img class="avatar-img img-fluid" style="max-width:200px;max-height: 200px;"
                        src="/src/assets/img/avtUserDefault.webp">
                </div>
                <h1 class="h3 profile-header-title">{{ this.userName }}</h1>
            </div>
            <!-- End User Profile Section -->
            <ul class="nav nav-tabs mb-4">
                <li class="nav-item">
                    <a class="nav-link active" style="font-weight: 700;">Kết quả luyện thi</a>
                </li>
            </ul>
            <div v-for="(exam,index) in listExam" :key="index">
                <div class="user-test">
                    <h3  style="font-weight: 600;font-size:2vh;font-size:2vw" id="new-economy-toeic-test-10">{{ exam.title }}</h3>
                    <div class="table-wrapper">
                        <table class="table table-sm table-striped">
                            <thead>
                                <tr>
                                    <th style="min-width:150px">Ngày làm</th>
                                    <th style="min-width:100px">Kết quả</th>
                                    <th style="min-width:150px;">Thời gian làm bài</th>
                                    <th style="min-width:150px;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {{ exam.created_at }}
                                    </td>
                                    <td>
                                        {{ exam.score }}
                                    </td>
                                    <td>{{ exam.duration }}</td>
                                    <td>
                                        <RouterLink :to="{name:'detailResultExam',params:{id:exam.id}}">
                                            Xem chi tiết
                                        </RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
                <hr>
            </div>
            <div class="mb-4">
    <ul class="pagination justify-content-center">
      <li style="cursor: pointer" class="page-item" :class=" { active: page == currentPage } "
        v-for="( page, index) in ListPages" :key=" index ">
        <a class="page-link" @click="changePage( page )">{{ page }}</a>
      </li>
    </ul>
  </div>
        </div>
    </div>
</template>
<script>
import { decodeTokenStudent } from '@/service/decodeToken'
import { getUserListResult,getUserListResultByPage } from '@/service/resultServeice';
export default {
    data () {
        return {
            userName:'',
            listExam: [],
            recordTotal: '',
            totalPage: '',
            currentPage:''
        }
    },
    created () {
        this.getListResult()     
    },
    methods: {
        async getListResult () {
            const user = decodeTokenStudent()
            this.userName = user.data.name
            const result = await getUserListResult(user.data.id)
            this.listExam = result.data
            this.recordTotal=result.total_page
            console.log(result);
        }
    }

}
</script>
<style></style>