<template>
    <div class="p-5 mt-5">
        <div class="sm-container">
            <!-- User Profile Section -->
            <div class="mx-md-auto mb-3 mt-4 text-center">
                <div class="profile-cover-avatar">
                    <img class="avatar-img img-fluid" style="max-width:200px;max-height: 200px;"
                        src="/src/assets/img/avtUserDefault.webp">
                </div>
                <h1 class="h3 profile-header-title">Username</h1>

                <div class="profile-header-content">
                    <p></p>
                </div>
            </div>
            <!-- End User Profile Section -->
            <ul class="nav nav-tabs mb-4">
                <li class="nav-item">
                    <a class="nav-link active" style="font-weight: 700;">Kết quả luyện thi</a>
                </li>
            </ul>
            <div v-for="(exam,index) in listExam" :key="index">
                <div class="user-test">
                    <h2 class="h5" id="new-economy-toeic-test-10">{{ exam.ExamName }}</h2>
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
                                        {{ exam.dateStartExam }}
                                    </td>
                                    <td>
                                        {{ exam.ExamScore }}
                                    </td>
                                    <td>{{ exam.ExamDuration }}</td>
                                    <td>
                                        <RouterLink :to="{name:'detailResultExam',params:{id:index+1}}">
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
            <nav class="jqpages">
                <div class="pagination">
                    <span class="page-item active">
                        <a class="page-link" href="?page=1">1</a>
                    </span>
                    <span class="page-item ">
                        <a class="page-link" href="?page=2">2</a>
                    </span>
                    <span class="page-item ">
                        <a class="page-link" href="?page=3">3</a>
                    </span>
                    <span class="page-item">
                        <a class="page-link" href="?page=2"><i class="fas fa-chevron-right"></i></a>
                    </span>

                </div>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            listExam: [
                {
                    ExamName: 'Đề thi Toán trung học phổ thông quốc gia năm 2023',
                    dateStartExam: '20/7/2024',
                    ExamScore: '10',
                    ExamDuration: '0:50:2',
                },
                {
                    ExamName: 'Đề thi Tiếng Anh trung học phổ thông quốc gia năm 2023',
                    dateStartExam: '20/7/2024',
                    ExamScore: '7',
                    ExamDuration: '0:50:2',
                },
                {
                    ExamName: 'Đề thi Hóa học trung học phổ thông quốc gia năm 2023',
                    dateStartExam: '20/7/2024',
                    ExamScore: '10',
                    ExamDuration: '0:53:2',
                },
                {
                    ExamName: 'Đề thi Ngữ Văn trung học phổ thông quốc gia năm 2023',
                    dateStartExam: '20/7/2024',
                    ExamScore: '9,5',
                    ExamDuration: '0:50:2',
                },
                {
                    ExamName: 'Đề thi Vật lý trung học phổ thông quốc gia năm 2023',
                    dateStartExam: '20/7/2024',
                    ExamScore: '8',
                    ExamDuration: '0:52:2',
                },
            ]
        }
    }
}
</script>
<style></style>