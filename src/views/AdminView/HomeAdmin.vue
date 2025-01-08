<template>
    <div class="ms-3 mb-3 mt-4">
        <!-- các đề thi được làm nhiều nhất -->
        <div>
            <!-- danh sách bài thi được làm nhiều nhất -->
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div class="card">
                            <div class="card-header p-3 pt-2">
                                <div
                                    class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                                    <i class="fa-solid fa-table-cells fa-lg"></i>
                                </div>
                                <div class="text-end pt-1">
                                    <p class="text-sm mb-0 text-capitalize">Dữ liệu câu hỏi và đề thi</p>
                                    <!-- <h4 class="mb-0"><?php echo $OrderToday ?></h4> -->
                                </div>
                            </div>
                            <hr class="dark horizontal my-0">
                            <div class="card-footer p-3">
                                <div class="p-2">
                                    <div class="card-title">
                                        <select class="form-select" @change=" changeIdSubject ">
                                            <option value="0">Tất cả</option>
                                            <option v-for="   e in listSubject   " :key=" e.id " :value=" e.id ">{{
                                                e.title
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="card-body mt-3">
                                        <p>Tổng số câu hỏi: <strong class="text-danger">{{ TotalQuestionn }}</strong></p>
                                        <p class="mt-3">Tổng số đề thi: <strong class="text-danger">{{ TotalExam
                                                }}</strong></p>
                                    </div>
                                </div>
                                <!-- <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+55% </span>so với
                                    tuần trước</p> -->
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div class="card">
                            <div class="card-header p-3 pt-2">
                                <div
                                    class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                                    <i class="fa-solid fa-user-check" style="color: #74C0FC;"></i>
                                </div>
                                <div class="text-end pt-1">
                                    <p class="text-sm mb-0 text-capitalize">Dữ liệu người dùng </p>

                                </div>
                            </div>
                            <hr class="dark horizontal my-0">
                            <div class="card-footer p-3">
                                <p class="mb-0" style="font-size:1vh;font-size: 1vw;font-weight: 500;">Số học sinh:
                                    <span class="text-danger font-weight-bolder">{{ TotalStudent }}</span>
                                </p>
                                <p class="mb-0" style="font-size:1vh;font-size: 1vw;font-weight: 500;">Số giáo viên:
                                    <span class="text-danger font-weight-bolder">{{ TotalTeacher }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-4 mt-5">
                    <div class="col-lg-12 col-md-12 mb-md-0 mb-4">
                        <div class="card" style="border:1px solid black">
                            <div class="card-header pb-0">
                                <div class="row">
                                    <div class="col-lg-6 col-7">
                                        <h4 class="text-primary text-lg font-bold ">Đề thi làm nhiều nhất</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-0 pb-2">
                                <div class="table-responsive text-center">
                                    <table class="table align-items-center mb-0 table-bordered p-3">
                                        <thead class="table-primary">
                                            <tr>
                                                <th class=" text-xxs font-weight-bolder opacity-7">
                                                    Mã đề thi</th>
                                                <th class=" text-xxs font-weight-bolder opacity-7 ps-2">
                                                    Đề thi</th>
                                                <th class="text-center text-xxs font-weight-bolder opacity-7">
                                                    Tổng số câu hỏi</th>
                                                <th class="text-center text-xxs font-weight-bolder opacity-7">
                                                    Lượt làm</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for=" e in ListExamDoMore  " :key=" e.id ">
                                                <td>{{ e.id }}</td>
                                                <td>{{ e.title }}</td>
                                                <td>{{ e.totalQuestion }}</td>
                                                <td>{{ e.count_user_do }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getCategoryExamList, getTotalExam, getListExamDoMore } from '@/service/examsService'
import { TotalQuestion } from '@/service/questionsService';
import { getTotalStudent } from '@/service/usersService';
export default {
    data () {
        return {
            listSubject: [],
            TotalQuestionn: 0,
            SucjectSelected: '',
            IdSubjectSelected: 0,
            TotalExam: 0,
            TotalStudent: 0,
            TotalTeacher: 0,
            ListExamDoMore: []
        }
    },
    created () {
        this.getListSubject()
        this.getTotal()
    },
    methods: {
        async getTotal () {
            const result = await TotalQuestion(this.IdSubjectSelected)
            this.TotalQuestionn = result.totalQues
            const result2 = await getTotalExam(this.IdSubjectSelected)
            this.TotalExam = result2.total
            const result3 = await getTotalStudent()
            // console.log(result3[0].total)
            this.TotalStudent = result3[0].total
            this.TotalTeacher = result3[1].total
            const result4 = await getListExamDoMore()
            // console.log(result4)
            this.ListExamDoMore = result4
            console.log(result4)
        },
        changeIdSubject (event) {
            this.IdSubjectSelected = event.target.value
            this.getTotalQuestion(this.IdSubjectSelected)
        },
        async getListSubject () {
            const result = await getCategoryExamList()
            if (result)
            {
                this.listSubject = result.data.data
            }
            // console.log(this.listSubject)
        }
    }

}
</script>