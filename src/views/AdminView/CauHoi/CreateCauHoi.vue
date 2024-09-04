<template>
    
    <div class="mx-auto container bg-color-white"> 
        <div class="text-[50px] text-pink-500  text-center">
            Thêm câu hỏi
        </div>
        <form>
            <div class="class">
                <label for="class" class="form-label">
                    Lớp
                </label>
                <input v-model="question.class" id="class" type="text" class="form-control">
            </div>

            <div class="Subject">
                <label for="subject" class="form-label">
                    Môn học
                </label>
                <input v-model="question.class" id="subject" type="text" class="form-control">
            </div>

             <div class="Subject">
                <label for="subject" class="form-label">
                    Đề bài
                </label>
                <Ckeditor/>
            </div>
        </form>
    </div>
  </template>
  <!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Ckeditor } from '@ckeditor/ckeditor5-build-classic';
import 'ckeditor5/ckeditor5.css';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
export default {
    components: {
        Ckeditor
    },
    data () {
        return {
            // editor: ClassicEditor,
            question: {
                class: '',
                Subject: '',
                title: '',
                A: '',
                B: '',
                C: '',
                D: '',
                correctAns: '',
                created_at: new Date().toLocaleDateString(),
                created_by:'',
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

  