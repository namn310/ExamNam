<template class="mt-5" style="margin-top:200px">
     <!-- exam test -->
        <div class="testitem-wrapper mt-2 me-2 p-3" style="width:300px;height:200px">
          <a class="text-dark" href="">
            <h2 class="testitem-title mb-2" id="ielts-simulation-listening-test-1">
                <!-- tên bài thi -->
                 <strong> {{ title }}</strong>
            </h2>
            <div class="testitem-info-wrapper">
              <div>
                <span class="testitem-info">
                    <!-- Time -->
                  <span class="far fa-clock mr-1 me-2"></span>{{ expire_time }} phút |
                  <!-- số người làm bài thi -->
                  <i class="fa-solid fa-user-pen me-2"></i>{{ countUserDo }} 
                  <!-- Số người bình luận bài thi -->
                </span>
              </div>
              <div>
                <!-- số lượng câu hỏi trong bài thi -->
                <span class="testitem-info"> {{ countQuestion }} câu hỏi </span>
              </div>
            </div>
            <br />
          </a>
          <div class="testitem-start-test">
            <a class="text-dark"> </a>
            <RouterLink :to=" { name: 'testDetail', params: { id: idQues } } " class="btn btn-block btn-outline-primary">Chi tiết
            </RouterLink>
          </div>
        </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            Required: true,
            default: ' IELTS Simulation Listening test 1'
        },
        description: {
            type: String,
        },
        expire_time: {
            type: Number,
            default:40
        },
        countUserDo: {
            type: Number,
            default: 3456
        },
        countQuestion: {
            type: Number,
            default: 50
        },
        idQues: {
            type: Number,
            default:1
        }
    }
}
</script>

<style scoped>
.testitem-wrapper {
  border: 1px solid black;
  border-radius: 5px;
  max-width: 350px;
  min-width: 300px;
  margin-left: 20px;
}

.testitem-start-test {
  margin-bottom: 10px
}
</style>