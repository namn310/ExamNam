<template>

    <div class="mx-auto container bg-color-white">
        <div class="text-[50px] text-center">
            Thêm câu hỏi
        </div>
        <form class="mb-5" @submit.prevent>
            <div class="class">
                <label for="class" class="form-label">
                    Lớp
                </label>
                <input v-model=" question.class " id="class" type="text" class="form-control">
            </div>

            <div class="Subject">
                <label for="subject" class="form-label">
                    Môn học
                </label>
                <input v-model=" question.Subject " id="subject" type="text" class="form-control">
            </div>

            <div class="Subject">
                <label for="subject" class="form-label">
                    Đề bài
                </label>
                <br>
               <Ckeditor :editor="editor" v-model="question.title"  />
            </div>

            <div class="answer mb-2 mt-3">
                Đáp án
                <div>
                    <span>A:<input class="form-control" v-model=" question.A " type="text" id="answerA"></span>
                </div>
                <div>
                    <span>B:<input class="form-control" v-model=" question.B " type="text" id="answerB"></span>
                </div>
                <div>
                    <span>C:<input class="form-control" v-model=" question.C " type="text" id="answerC"></span>
                </div>
                <div>
                    <span>D:<input class="form-control" v-model=" question.D " type="text" id="answerD"></span>
                </div>
            </div>

            <div class="correctAnswer">
                <label for="correctAnswer">Đáp án câu hỏi</label>
                <input type="text" id="correctAnswer" class="form-control" v-model=" question.correctAns ">
            </div>

            <div class="mt-3">
                <button type="submit" class="btn btn-primary" @click=" postQuestion ">Tạo câu hỏi</button>
            </div>
            <!-- <p>{{ new }}</p> -->
        </form>
    </div>
</template>
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script>
import { decodeToken } from '@/service/decodeToken';
import { PostData} from '@/service/questionsService';
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ElNotification } from 'element-plus'

export default {
    components: {
        Ckeditor
    },
    data () {
        return {
            editor: ClassicEditor,
            question: {
                class: '11',
                Subject: 'Tiếng Anh',
                title: '',
                A: '',
                B: '',
                C: '',
                D: '',
                correctAns: '',
                created_at: new Date().toLocaleDateString(),
                created_by: '',
            }
        }
    },
    created () {
        this.getId()
    },
    methods: {
        getId () {
            const id = decodeToken();
            this.question.created_by = id.data.id
        },

        async postQuestion () {
            try
            {
                const post = await PostData(this.question);
                if (!post)
                {
                    ElNotification({
                        title: 'Error',
                        message: 'Có lỗi xảy ra. Vui lòng thử lại sau !',
                        type:'error',
                    })
                }
                ElNotification({
                    title: 'Success',
                    message: 'Thêm câu hỏi thành công !',
                    type:'success'
                })
                this.$router.push({ name: 'cauhoi' });

            }
            catch (Error)
            {
                alert("Có lỗi xảy ra ".Error);
            }
        }
    }
}
// const data = ref({ permissions: [] });
//   const sizeForm = reactive({
//     title: '',
//     description: '',
//     time: '',
//     oldPrice : '',
//   })

</script>
<style scoped>
/* .Subject .ck-editor__editable_inline {
    min-height: 400px;
    /* Set the minimum height for the editor */
/* } * */
</style>