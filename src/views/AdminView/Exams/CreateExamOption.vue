<template>
   <div class="d-flex justify-content-center" style="margin-top:80px" v-if=" loadingShow ">
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
  <div v-else class="mx-auto container bg-color-white">
    <div class="mt-2 ms-2">
      <RouterLink :to="{ name: 'exams' }">
        <button class="btn btn-secondary"><i class="fa-solid fa-arrow-left"></i></button>
      </RouterLink>
    </div>
    <div class="text-[30px] text-center">Thêm bài kiểm tra</div>
    <el-form class="w-full p-3" label-width="auto" size="large">
      <el-form-item label="Tên bài thi">
        <el-input v-model="Exam.title" />
      </el-form-item>
      <el-form-item label="Mô tả">
        <el-input v-model="Exam.description" />
      </el-form-item>
      <el-form-item label="Danh mục bài thi">
        <el-select v-model="Exam.category" style="width: 240px">
          <el-option
            v-for="(item, index) in listCategory"
            :key="index"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Thời hạn làm bài">
        <el-input v-model="Exam.expire_time" />
        <div class="demo-datetime-picker">
          <div class="block">
            <el-date-picker
              type="datetime"
              placeholder="Select date and time"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="MMM DD, YYYY"
              time-format="HH:mm"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Thời gian làm bài (Phút)">
        <el-input v-model="Exam.duration" />
      </el-form-item>
      <el-form-item label="Lớp học">
        <el-select v-model="Exam.class" clearable placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in ListClass"
            :key="item.id"
            :label="item.class"
            :value="item.id"
          />
        </el-select>
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
import { getAllClass } from '@/service/class'
import { useRouter } from 'vue-router'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import { list } from 'postcss'
import { isNumber } from '@vueuse/shared'
import router from '@/router'
export default {
  data() {
    return {
      loadingShow:true,
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
      },
      ListClass: []
    }
  },
  methods: {
    async getClass() {
      const result = await getAllClass()
      if (result) {
        this.ListClass = result.data
      }
    },
    async getCategoryList() {
      try {
        var listCategoryFetch = await getCategoryExamList()
        if (listCategoryFetch) {
          this.listCategory = listCategoryFetch.data.data
          // console.log(listCategoryFetch,this.listCategory)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async fetchData () {
      try
      {
        this.getCategoryList()
        this.getClass()
        this.loadingShow = false
      }
      catch (e)
      {
        this.loadingShow = false
        alert("Có lỗi xảy ra trong quá trình lấy dữ liệu !")
      }
    },
    async onSubmit () {
      try
      {
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
            router.replace({ name: 'AddQuestion-into-Exam', params: { id: LastInsertIdExam } })
          } else
          {
            this.loadingShow = false
            ElNotification({
              title: 'Thông báo',
              message: 'Tạo bài kiểm tra thất bại. Có lỗi xảy ra',
              type: 'error'
            })
          }
        }
        this.loadingShow = false
      }
      catch (e)
      {
        this.loadingShow = false
         ElNotification({
              title: 'Thông báo',
              message: 'Tạo bài kiểm tra thất bại. Có lỗi xảy ra',
              type: 'error'
            })
      }
    }
  },
  created() {
    this.fetchData()
    // console.log(this.idUserCreate,this.listCategory)
  }
}
</script>
<style scoped>
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
