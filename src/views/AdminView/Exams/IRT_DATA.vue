<template>
  <div class="m-3 mb-5">
    <div class="mb-3">
      <button class="btn btn-primary" @click="buttonIRT_ThongKe()">Thống kê dữ liệu độ khó theo IRT </button>
      <button class="btn btn-secondary ms-4" @click="button_IRT_P()">Thống kê xác xuất trả lời câu hỏi của thí
        sinh</button>
    </div>
    <!-- thông báo đang lấy dữ liệu -->
    <div v-if=" showAlert == true "
      class="d-flex justify-content-center align-item-center mb-4 alert alert-primary w-50">
      <div class="spinner-border" role="status">
      </div>
      <div class="ms-2">
        <span>Đang lấy dữ liệu. Vui lòng chờ !</span>
      </div>
    </div>
    <!-- thống báo số liệu thí sinh làm bài chưa đủ -->
    <div v-if=" showAlertEnoughDataIRT == true "
      class="d-flex justify-content-center align-item-center mb-4 alert alert-danger w-50">
      <div class="ms-2">
        <span>Bài thi không đủ dữ liệu thí sinh. Vui lòng chọn đề thi khác!</span>
      </div>
    </div>
    <!-- bảng dữ liệu thống kê IRT -->
    <div class="table-thongkeIRT" v-if=" table_IRT_ThongKe_show == true ">
      <p><strong>Dữ liệu IRT</strong> </p>
      <button v-if=" showAlertEnoughDataIRT == false && showAlert == false " class="btn btn-success mt-2 mb-3"
        style="float:right" @click="exportExcel()"><i class="fa-solid fa-file-excel fa-lg me-2"></i>Xuất Excel</button>
      <table v-if=" showTableDataIrt == true " class="table table-hover table-bordered text-center table-responsive">
        <thead class="table-primary">
          <tr>
            <th>Số thứ tự</th>
            <th>ID thí sinh</th>
            <th v-for="(  e, index) in totalQuestion" :key=" index ">Câu {{ index + 1 }}</th>
            <!-- <th style="max-width:150px">Theta (θ)</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(  e1, index2) in dataIRT" :key=" index2 ">
            <td>
              {{ index2 + 1 }}
            </td>
            <td>
              {{ e1.id_user }}
            </td>
            <td class="text-center" v-for="(  e2, index3) in totalQuestion" :key=" index3 ">
              {{ e1.data && e1.data[index3] ? e1.data[index3].state : 'N/A' }}
            </td>
            <!-- <td>{{ e1.theta }}</td> -->
            <!-- <td>{{ dataDifficulity[0] }}</td> -->
          </tr>
          <!-- Nếu chưa có dữ liệu độ khó câu hỏi thì hiện dòng này -->
          <tr v-if=" dataDifficulity === null ">
            <td :colspan=" totalQuestion.length + 2 " class="text-center text-danger">Chưa có dữ liệu độ khó câu hỏi
            </td>
          </tr>
          <!-- nếu tồn tại dữ liệu độ khó thì hiển thị ra -->
          <tr v-else>
            <td class="text-center text-danger" colspan="2" style="font-weight: 500;">
              Độ khó
            </td>
            <td class="text-center" style="font-weight: 500;" v-for="(  e2, index4) in totalQuestion" :key=" index4 ">
              {{ dataDifficulity[index4] }}
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <!-- bảng dữ liệu thống kê xác suất thí sinh trả lời đúng câu hỏi -->
    <div class="mt-4" v-if=" table_IRT_P_show == true ">
      <p class="mb-2">
        <strong>Xác suất học sinh trả lời đúng câu hỏi theo năng lực Theta (θ) </strong>
      </p>
      <button v-if=" showAlertEnoughDataIRT == false && showAlert == false " class="btn btn-success mt-2 mb-3"
        style="float:right"><i class="fa-solid fa-file-excel fa-lg me-2"></i>Xuất Excel</button>
      <table class="table table-hover table-bordered text-center table-responsive">
        <thead class="table-primary">
          <tr>
            <th>ID thí sinh</th>
            <th v-for="(    e, index) in totalQuestion" :key=" index ">Câu {{ index + 1 }}</th>
            <th style="max-width:150px">Theta (θ)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(    e1, index2) in dataIRT" :key=" index2 ">
            <td>
              {{ e1.id_user }}
            </td>
            <td class="text-center" v-for="(    e2, index3) in totalQuestion" :key=" index3 ">
              {{ caculateP( e1.data[index3].id_question, e1.id_user ) }}
            </td>
            <td>{{ e1.theta }}</td>
            <!-- <td>{{ dataDifficulity[0] }}</td> -->
          </tr>

        </tbody>
      </table>
    </div>
  </div>
  <button class="btn btn-primary ms-2 mb-2 ">Cập nhật dữ liệu độ khó câu hỏi</button>
</template>
<script>
// import router from '@/router'
import {
  IRTGet_user_do_exam,
  IRTGet_result_detail_by_student,
  getIRT_diffuculity
} from '@/service/IRTService'
// thư viện xuất excel
// eslint-disable-next-line no-unused-vars
import * as XLSX from "xlsx";
export default {
  data () {
    return {
      id: this.$route.params.id,
      totalQuestion: [],
      dataIRT: [],
      dataDifficulity: [],
      showAlert: true,
      P_value_IRT: [],
      table_IRT_ThongKe_show: true,
      table_IRT_P_show: false,
      countStudent: 0,
      showAlertEnoughDataIRT: true,
      showTableDataIrt: false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try
      {
        const data = await IRTGet_user_do_exam(this.id)
        // console.log(data)
        // kiểm tra dữ liệu thí sinh làm bài kiểm tra phải trên 5 thì mới có dữ liệu IRT
        if (data && data !== null && data.data.length > 5)
        {
          this.showAlertEnoughDataIRT = false
          this.showTableDataIrt = true
          this.dataIRT = data.data
          // lấy dữ liệu độ khó theo id bài kiểm tra
          const dataDif = await getIRT_diffuculity(this.id);
          if (dataDif)
          {
            if (data.dataIrt !== null)
            {
              this.dataDifficulity = dataDif.dataIrt
            }
            else
            {
              this.dataDifficulity = null
            }

          }
          // eslint-disable-next-line no-unused-vars
          for (const [index, e] of this.dataIRT.entries())
          {
            try
            {
              // lấy dữ liệu kết quả của từng người dùng trong danh sách các học sinh làm bài kiểm tra
              var idUser = e.id_user
              // eslint-disable-next-line no-unused-vars
              var idExam = e.id_exam
              var idResult = e.resultID
              const dataResultDetailByUser = await IRTGet_result_detail_by_student(
                idUser,
                idExam,
                idResult
              )
              if (dataResultDetailByUser)
              {
                e.data = dataResultDetailByUser.data
              }
              this.countStudent += 1

              this.totalQuestion = data.TotalQuestion
              this.showAlert = false;
              this.totalQuestion.forEach((e, index) => {
                e.difficulity = this.dataDifficulity[index]
              });
            }
            catch (e)
            {
              this.showTableDataIrt = false
              console.log(e)
              break
            }

          }
          console.log(this.dataIRT, this.totalQuestion, this.dataDifficulity)
        }
        else
        {
          this.showAlert = false
          this.showAlertEnoughDataIRT = true
          // this.showTableDataIrt = false
        }
      }
      catch (e)
      {
        this.showTableDataIrt = false
        this.showAlert = false
        alert("Có lỗi xảy ra trong quá trình lấy dữ liệu")
      }
    },
    buttonIRT_ThongKe () {
      this.table_IRT_ThongKe_show = true
      this.table_IRT_P_show = false
    },
    button_IRT_P () {
      this.table_IRT_ThongKe_show = false
      this.table_IRT_P_show = true
    },
    caculateP (id_ques, id_user) {
      const item = this.totalQuestion.find(e => e.id_ques === id_ques)
      const user = this.dataIRT.find(e => e.id_user === id_user)
      if (item && user)
      {
        const theta = user.theta
        const diff = parseFloat(item.difficulity)
        return (1 / (1 + Math.pow(Math.E, -(theta - diff)))).toFixed(4)
      }
      else
      {
        return 0
      }
    },
    exportExcel () {
      // console.log(this.dataIRT)
      const dataExcel = []
      this.dataIRT.forEach(e => {
        var item = {}
        item['ID Câu hỏi'] = e.id_exam
        item['ID thí sinh'] = e.id_user
        e.data.forEach((e1, index) => {
          item[`Câu ${index + 1}`] = e1.state
        })
        dataExcel.push(item)
      })
      var item2 = {}
      item2['ID Câu hỏi'] = ''
      item2['ID thí sinh'] = 'Độ khó'
      this.dataDifficulity.forEach((e, index) => {
        item2[`Câu ${index + 1}`] = e
      })
      dataExcel.push(item2)
      const ws = XLSX.utils.json_to_sheet(dataExcel);
      // Tạo workbook và thêm worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Xuất file Excel
      XLSX.writeFile(wb, "dataIRT.xlsx");
    }
  }
}
</script>
<style lang="css" scoped></style>
