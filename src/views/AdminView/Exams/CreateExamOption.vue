<template>
    <div class="mx-auto container bg-color-white">
        <div class="text-[50px] text-center">Thêm bài kiểm tra</div>
        <el-form class="w-full p-3" label-width="auto" size="large">
            <el-form-item label="Tên bài thi">
                <el-input v-model=" Exam.title " />
            </el-form-item>
            <el-form-item label="Mô tả">
                <el-input v-model=" Exam.description " />
            </el-form-item>
            <el-form-item label="Danh mục bài thi">
                <el-select v-model=" Exam.category " style="width: 240px">
                    <el-option v-for="( item, index) in listCategory" :key=" index " :label=" item.title "
                        :value=" item.id " />
                </el-select>
            </el-form-item>
            <el-form-item label="Thời hạn làm bài">
                <el-input v-model=" Exam.expire_time " />
                <div class="demo-datetime-picker">
                    <div class="block">
                        <el-date-picker type="datetime" placeholder="Select date and time" format="YYYY-MM-DD HH:mm:ss"
                            date-format="MMM DD, YYYY" time-format="HH:mm" />
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="Thời gian làm bài (Phút)">
                <el-input v-model=" Exam.duration " />
            </el-form-item>
            <el-form-item label="Lớp học">
                <el-input v-model=" Exam.class " />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit()">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script>
import { decodeToken } from '@/service/decodeToken'
import { createExam, getCategoryExamList, createExamOption } from '@/service/examsService'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import { list } from 'postcss'
import { isNumber } from '@vueuse/shared'
import router from '@/router'
export default {
    data () {
        return {
            idUserCreate: decodeToken().data.id,
            listCategory: null,
            Exam: {
                title: '',
                description: '',
                class: '',
                expire_time: '',
                duration: '',
                category: '',
                id_user: 8
            }
        }
    },
    methods: {
        async getCategoryList () {
            try
            {
                var listCategoryFetch = await getCategoryExamList()
                if (listCategoryFetch)
                {
                    this.listCategory = listCategoryFetch.data.data
                    // console.log(listCategoryFetch,this.listCategory)
                }
            } catch (e)
            {
                console.log(e)
            }
        },
        async onSubmit () {
            const result = await createExamOption(this.Exam)
            if (result)
            {
                if (result.status == 'success')
                {
                    var LastInsertIdExam = result.result
                    ElNotification({
                        title: 'Thông báo',
                        message: 'Tạo bài kiểm tra thành công',
                        type: 'success'
                    })
                    router.replace({ name: 'AddQuestion-into-Exam', params: {id:LastInsertIdExam} })
                }
                else
                {
                    ElNotification({
                        title: 'Thông báo',
                        message: 'Tạo bài kiểm tra thất bại. Có lỗi xảy ra',
                        type: 'error'
                    })
                }
                console.log(this.Exam, result)
            }
        }
    },
    created () {
        this.getCategoryList()
        // console.log(this.idUserCreate,this.listCategory)
    }
}
</script>
