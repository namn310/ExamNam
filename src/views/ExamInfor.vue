<template>
  <div class="row p-5">
    <div class="col-12 col-md-9">
      <div class="practice-test-wrapper contentblock">
        <h1 id="ielts-simulation-listening-test-1" style="font-size:x-large;font-weight: 700;">{{ data.title }}</h1>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="test-info" role="tabpanel">
            <br />

            <div>
              <span class="far fa-clock mr-1"></span>
              <span>Thời gian làm bài: {{data.duration}} phút</span> |
              <span>{{ data.totalQuestion }} câu hỏi</span>

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
                   <RouterLink :to="`/test/start/${id}`"><button class="ms-3 btn btn-primary">Xác nhận</button></RouterLink>
                </template>
             </ModalView>
            </div>
          </div>
        </div>
      </div>
      <br/>
    </div>
    <div class="col-12 col-md-9">
      <div class="border border-gray-500 p-3 rounded-lg">
        <div class="text-lg font-semibold mb-2">Bình luận</div>
        <div class="flex items-center gap-2" v-if="checkLogin">
          <el-input
            v-model="input1"
            class="w-full"
            size="large"
            placeholder="Chia sẻ cảm nghĩ của bạn"
          />
          <el-button type="info" size="large" @click="handleComment()" >Gửi</el-button>
        </div>  

        <div class="mt-3">
          <div class="flex items-start gap-2" v-for="item in listComments" :key="item.id">
            <div class="text-base font-bold rounded-[50%] flex justify-center items-center bg-gray-300 w-8 h-8">C</div>
            <div class="flex-1">
              <div class="font-semibold">{{item.name}} , <span class="font-normal">{{item.created_at}}</span></div>
              <div class="text-base">{{ item.comment_text }}</div>
              <Popover class="relative " v-if="checkLogin">
                <PopoverButton><div class="text-[#35509a] font-bold">Trả lời</div></PopoverButton>

                <PopoverPanel>
                  <div class="flex items-center gap-2">
                    <el-input
                      v-model="input2"
                      class="w-full"
                      size="large"
                      placeholder="Trả lời"
                    />
                    <el-button type="info" size="large" @click="handleRepComment(item.id)" >Gửi</el-button>
                  </div>  
                </PopoverPanel>
              </Popover>

              <div class="ml-5 mt-3" v-for="item2 in getChildComments(item.id)" :key="item2.id" >
                <div class="flex items-start gap-2">
                  <div class="text-base font-bold rounded-[50%] flex justify-center items-center bg-gray-300 w-8 h-8">C</div>
                  <div class="flex-1">
                    <div class="font-semibold">{{item2.name}} , <span class="font-normal">{{item2.created_at}}</span></div>
                    <div class="text-base">{{ item2.comment_text }}</div>
                    <Popover class="relative" v-if="checkLogin">
                      <PopoverButton><div class="text-[#35509a] font-bold">Trả lời</div></PopoverButton>

                      <PopoverPanel>
                        <div class="flex items-center gap-2">
                          <el-input
                            v-model="input2"
                            class="w-full"
                            size="large"
                            placeholder="Trả lời"
                          />
                          <el-button type="info" size="large" @click="handleRepComment(item.id)" >Gửi</el-button>
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
  import ModalView from '@/components/ModalView.vue';
  import { createComment, getChildCommentsList, getCommentsList } from '@/service/commentsService';
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
  import { getExamDetail } from '@/service/examsService';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { decodeTokenStudent } from '@/service/decodeToken'
  import Cookies from 'js-cookie';
  
  const input1 = ref('')
  const input2 = ref('')

  const showModal = ref(false);
  const route = useRoute();
  const id = route.params.id;
  const data = ref([]);
  const listComments = ref([]);
  const listChildComments = ref([])
  
  const checkLogin = ref(false);
  

  const toggleModal =  () => {
    showModal.value = !showModal.value
  } 

  const fetchListComment = async () =>{
    const result = await getCommentsList(id);
    if(result){
      listComments.value = result.data;
      console.log(result.data);
      
    }
  }
  const getChildComments = (parentId) => {
      return listChildComments.value.filter(comment => comment.parent_id === parentId);
    }

  const fetchListChildComment = async () =>{
    const result = await getChildCommentsList(id);
    if(result){
      listChildComments.value = result.data;
    }
  }

  const fetchData = () =>{
    const fetchApi = async () => {
        const result = await getExamDetail(id);
        if(result){
          data.value = result.data
          
        }
    }
    fetchApi();
  }
    onMounted(() => {
        fetchData();
        fetchListComment();
        fetchListChildComment();
        checkLogin.value = !!Cookies.get('tokenStudent');
    });

    const handleComment = async () =>{
      const user = decodeTokenStudent()
      const result = await createComment({
        exam_id : id,
        user_id : user.data.id,
        comment_text : input1.value,
      })
      if(result){
        fetchListComment();
        input1.value = ''
      }
    }

    const handleRepComment = async (parentId) =>{
      const user = decodeTokenStudent()
      const result = await createComment({
        exam_id : id,
        user_id : user.data.id,
        comment_text : input2.value,
        parent_id : parentId
      })
      if(result){
        fetchListChildComment();
        input2.value = ''
      }
    }





</script>
<style scoped>
.row {
  margin-top: 50px;
}

</style>
