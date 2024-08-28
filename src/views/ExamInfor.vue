<template>
  <div class="row p-5">
    <div class="col-12 col-md-9">
      <div class="practice-test-wrapper contentblock">
        <h1 id="ielts-simulation-listening-test-1">IELTS Simulation Listening test 1</h1>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="test-info" role="tabpanel">
            <br />

            <div>
              <span class="far fa-clock mr-1"></span>
              <span>Thời gian làm bài: 40 phút</span> | <span>4 phần thi</span> |
              <span>40 câu hỏi</span>

              | <span>1806 bình luận</span>
            </div>

            <div>
               <i class="fa-solid fa-user-pen me-2"></i>
              567453 người đã luyện tập đề thi này
            </div>
            <br />
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-practice" role="tabpanel">
                <div class="alert alert-success">
                  <span class="far fa-lightbulb-on mr-2"></span>Pro tips: Hình thức luyện tập từng
                  phần và chọn mức thời gian phù hợp sẽ giúp bạn tập trung vào giải đúng các câu hỏi
                  thay vì phải chịu áp lực hoàn thành bài thi.
                </div>
                <br />
                <button class="btn btn-primary" type="submit" @click="toggleModal" >LÀM BÀI</button>
              </div>
            <!-- Modal here -->
             <ModalView :visible="showModal" @close="toggleModal">
                <template v-slot:modal-body>
                    <p>Xác nhận làm bài thi này </p>
                </template>
                <template v-slot:buttonConfirm>
                   <RouterLink :to="{ name: 'testStart', params: { id: 1 } }"><button class="ms-3 btn btn-primary">Xác nhận</button></RouterLink>
                </template>
             </ModalView>
            </div>
          </div>
        </div>
      </div>
      <br/>
    </div>
  </div>
</template>
<script>
import ModalView from '@/components/ModalView.vue';
export default {
    name:'ExamInfor',
    components: {
        ModalView
    },
    data () {
        return {
            showModal:false
        }
    },
    methods: {
        toggleModal () {
            this.showModal = !this.showModal;
        }
    }
}
</script>
<style scoped>
.row {
  margin-top: 50px;
}

</style>
