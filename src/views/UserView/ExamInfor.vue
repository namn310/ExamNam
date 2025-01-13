<template>
  <div class="d-flex justify-content-center" style="margin-top:100px" v-if="loadingShow">
    <div> <svg viewBox="0 0 240 240" height="120" width="120" class="pl ms-2">
        <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000"
          fill="none" r="105" cy="120" cx="120" class="pl__ring pl__ring--a"></circle>
        <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000"
          fill="none" r="35" cy="120" cx="120" class="pl__ring pl__ring--b"></circle>
        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
          cy="120" cx="85" class="pl__ring pl__ring--c"></circle>
        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
          cy="120" cx="155" class="pl__ring pl__ring--d"></circle>
      </svg>
      <p>Loading ... </p>
    </div>
  </div>
  <div class="row p-5">
    <div class="col-12 col-md-9">
      <div class="practice-test-wrapper contentblock">
        <h1 id="ielts-simulation-listening-test-1" style="font-size: x-large; font-weight: 700">
          {{ data.title }}
        </h1>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="test-info" role="tabpanel">
            <br />

            <div>
              <span class="far fa-clock mr-1"></span>
              <span>Thời gian làm bài: {{ data.duration }} phút</span> |
              <span>{{ data.totalQuestion }} câu hỏi</span>

              | <span>{{ totalComment }} bình luận</span>
            </div>

            <div>
              <i class="fa-solid fa-user-pen me-2"></i>
              {{ data.count_user_do }} người đã luyện tập đề thi này
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
                <button class="btn btn-primary" type="submit" @click=" toggleModal ">LÀM BÀI</button>
              </div>
              <!-- Modal here -->

              <ModalView :visible=" showModal " @close=" toggleModal ">
                <template v-slot:modal-body>
                  <p>Bạn có xác nhận làm đề thi này không ?</p>
                </template>
                <template v-slot:buttonConfirm>
                  <RouterLink :to=" `/test/start/${ id }` "><button class="ms-3 btn btn-primary">Xác nhận</button>
                  </RouterLink>
                </template>
              </ModalView>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
    
    <div v-if=" decodeTokenStudent() == null ">
      <RouterLink :to=" { name: 'Login' } "><strong>Hãy đăng nhập để bình luận !</strong></RouterLink>
    </div>
    <div class="col-12 col-md-9 mt-2">
      <div class="border border-gray-500 p-3 rounded-lg">
        <div class="text-lg font-semibold mb-2">Bình luận</div>
        <div class="flex items-center gap-2" v-if=" decodeTokenStudent() !== null ">
          <input v-model=" input1 " class="form-control border border-secondary" size="large"
            placeholder="Chia sẻ cảm nghĩ của bạn" />
          <el-button type="success" size="large" @click="handleComment()">Gửi</el-button>
        </div>
        <div class="mt-3">
          <div class="flex items-start gap-2 mb-3" v-for="  item in listComments  " :key=" item.id ">
            <div class="text-base font-bold rounded-[50%] flex justify-center items-center bg-gray-300 w-8 h-8">
              C
            </div>
            <div class="flex-1">
              <div class="font-semibold">
                {{ item.id !== idUser ? item.name : 'You' }} 
                <span class="font-normal" style="font-size:10px"><i>{{ item.created_at }}</i></span>
              </div>
              <div class="text-base">{{ item.comment_text }}</div>
              <Popover class="relative" v-if=" decodeTokenStudent() !== null ">
                <PopoverButton>
                  <div class="text-[#35509a] font-bold">Trả lời</div>
                </PopoverButton>

                <PopoverPanel>
                  <div class="flex items-center gap-2">
                    <el-input v-model=" input2 " class="w-full" size="large" placeholder="Trả lời" />
                    <el-button type="primary" size="large" @click="handleRepComment( item.id )">Gửi</el-button>
                  </div>
                </PopoverPanel>
              </Popover>

              <div class="ml-5 mt-3" v-for="  item2 in getChildComments( item.id )  " :key=" item2.id ">
                <div class="flex items-start gap-2">
                  <div class="text-base font-bold rounded-[50%] flex justify-center items-center bg-gray-300 w-8 h-8">
                    C
                  </div>
                  <div class="flex-1 mb-2">
                    <div class="font-semibold">
                      {{ item2.id !== idUser ? item2.name : 'You' }} 
                      <span class="font-normal" style="font-size:10px"><i>{{ item2.created_at }}</i></span>
                    </div>
                    <div class="text-base">{{ item2.comment_text }}</div>
                    <Popover class="relative" v-if=" decodeTokenStudent() !== null ">
                      <PopoverButton>
                        <div class="text-[#35509a] font-bold">Trả lời</div>
                      </PopoverButton>

                      <PopoverPanel>
                        <div class="flex items-center gap-2">
                          <el-input v-model=" input2 " class="w-full" size="large" placeholder="Trả lời" />
                          <el-button type="primary" size="large" @click="handleRepComment( item.id )">Gửi</el-button>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ModalView from '@/components/ModalView.vue'
import { createComment, getChildCommentsList, getCommentsList } from '@/service/commentsService'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { getExamDetail } from '@/service/examsService'
// eslint-disable-next-line no-unused-vars
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { decodeTokenStudent } from '@/service/decodeToken'
import Cookies from 'js-cookie'

const input1 = ref('')
const input2 = ref('')
const idUser = ref('')
const loadingShow = ref(true)
const showModal = ref(false)
const route = useRoute()
const id = route.params.id
const data = ref([])
const totalComment = ref()
const listComments = ref([])
const listChildComments = ref([])

const checkLogin = ref(false)
const toggleModal = () => {
  showModal.value = !showModal.value
}
const fetchListComment = async () => {
  const result = await getCommentsList(id)
  if (result)
  {
    listComments.value = result.data
    // console.log(result.data);
  }
}
const getChildComments = (parentId) => {
  return listChildComments.value.filter((comment) => comment.parent_id === parentId)
}
const fetchListChildComment = async () => {
  const result = await getChildCommentsList(id)
  if (result)
  {
    listChildComments.value = result.data
  }
}
const fetchData = () => {
  const fetchApi = async () => {
    const result = await getExamDetail(id)
    if (result)
    {
      loadingShow.value = false
      data.value = result.result
      totalComment.value = result.Totalcomment.total
    }
  }
  fetchApi()
}
onMounted(() => {
  const user = decodeTokenStudent()
  if (user !== null)
  {
    idUser.value = user.data.id
  } else
  {
    idUser.value = 0
  }
  fetchData()
  fetchListComment()
  fetchListChildComment()
  checkLogin.value = !Cookies.get('tokenStudent')
})
const handleComment = async () => {
  if (input1.value != '')
  {
    const user = decodeTokenStudent()
    const result = await createComment({
      exam_id: id,
      user_id: user.data.id,
      comment_text: input1.value
    })
    if (result)
    {
      fetchListComment()
      input1.value = ''
    }
  }
}
const handleRepComment = async (parentId) => {
  const user = decodeTokenStudent()
  if (input2.value != '')
  {
    const result = await createComment({
      exam_id: id,
      user_id: user.data.id,
      comment_text: input2.value,
      parent_id: parentId
    })
    if (result)
    {
      fetchListChildComment()
      input2.value = ''
    }
  }
}
</script>
<style scoped>
.row {
  margin-top: 50px;
}

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
