<!-- eslint-disable vue/no-v-text-v-html-on-component -->

<template>
  <div class="p-10">
    <div>
      <RouterLink :to=" { name: 'thongke', params: { id: id } } ">
        <button class="btn btn-primary mb-3">Thống kê dữ liệu làm bài kiểm tra</button>
      </RouterLink>
      <button @click="exportPDF()" class="btn btn-danger ms-3 mb-3">Xuất pdf<i
          class="ms-2 fa-solid fa-file-pdf fa-lg"></i></button>
    </div>
    <div style="margin-bottom: 15px" ref="dataQuestion" class="dataQuestion">
      <!-- Danh sách câu hỏi: <el-switch v-model="fill" /> -->
      <el-space :fill=" fill " wrap>
        <el-card v-for="(  i, index) in question" :key=" i " class="box-card">
          <template #header>
            <div class="card-header d-flex">
              <span>Câu {{ index + 1 }}:</span>
              <span class="ms-2" text v-html=" i.title "></span>
            </div>
          </template>
          <div v-if=" i.ImageQuestionUrl !== '' && i.ImageQuestionUrl !== null ">
            <div style="width: 30%; height: 30%; position: relative">
              <img :src=" i.ImageQuestionUrl " style="border: 1px solid black; border-radius: 5px" class="img-fluid" />
            </div>
          </div>
          <div>
            <div v-for="(  ans, index2) in i.answerlist" :key=" index2 " class="text item">
              <span>{{ getLabel( index2 ) }}. {{ ans }}</span>
              <div>
                <div style="position: relative; width: 30%; height: 30%" v-if="
                  i.ListImageAnswerUrl && i.ListImageAnswerUrl.length > 0 && i.ListImageAnswerUrl[index2].imageUrl
                ">
                  <img :src=" i.ListImageAnswerUrl[index2].imageUrl " class="img-fluid" />
                </div>
              </div>

            </div>
          </div>
          <div class="text item text-blue-700 font-semibold">Đáp án : {{ ( i.correctAns ) }}</div>
        </el-card>
      </el-space>
    </div>
  </div>
</template>

<script lang="js" setup>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { getQuestionExam } from '@/service/examsService'
import { getImageAnswer } from '@/service/questionsService'
// import { a } from 'vitest/dist/suite-IbNSsUWN';
import { onMounted, ref, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
// thư viện pdfmake
// import PdfPrinter from 'pdfmake'
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas'
// eslint-disable-next-line no-unused-vars
import jsPDF from 'jspdf'
const question = ref([])
const route = useRoute()
// const ListImageAnswer = ref([])
// const ListImageAnswerUrl = ref([])
// const imgUrl = ref([])
const id = route.params.id
// const answer = ref( [] );
const fill = ref(true)
const getLabel = (index) => {
  return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
}
const renderMath = () => {
  // Kiểm tra xem MathJax đã được tải chưa
  if (window.MathJax)
  {
    nextTick(() => {
      window.MathJax.typesetPromise()
        .then(() => {

        })
        .catch((err) => console.error('MathJax rendering error:', err))
    })
  }
}
const dataQuestion = ref(null)
// const exportPDF = async () => {
//   try
//   {
//     const doc = new jsPDF()
//     if (dataQuestion.value)
//     {
//       await doc.html(dataQuestion.value, {
//         callback: (doc) => {
//           doc.save("document.pdf"); // Lưu file PDF
//         },
//         x: 10, // Khoảng cách từ bên trái
//         y: 10, // Khoảng cách từ trên
//         width: 190, // Chiều rộng
//         windowWidth: 1024, // Chiều rộng của cửa sổ 
//         // html2canvas: {
//         //   scale: 2,
//         //   useCORS: true // cho phép truy cập hình ảnh từ nguồn khác để tránh báo lỗi CORS
//         // }
//       });
//     }
//     else
//     {
//     console.log("Có lỗi xảy ra")
//   }
//   }
//   catch (e)
//   {
//     console.log(e)
//   }
// }
const exportPDF = async () => {
  const result = await fetch('http://localhost:8080/assets/image/AnswerQuestion/1727429989_Screenshot 2024-09-27 163718.png',{
    method: 'GET',
    // mode: 'no-cors',  
    // headers: { 'Accept': 'image/png' }
  });
  console.log(result.json())
  // const blob = await result.blob();
  // console.log(blob)

  // try
  // {
  // const doc = new jsPDF();
    

    // if (dataQuestion.value)
    // {
    //   await doc.html(dataQuestion.value, {
    //     callback: async (doc) => {
    //       const imgElements = dataQuestion.value.querySelectorAll('box-card .img-fluid');
    //       for (var i = 0; i < imgElements.length; i++)
    //       {
    //         const img = imgElements[i];
    //         const imgUrl = img.src;
    //         console.log(imgUrl)
    //         // try
    //         // {
    //           // Fetch image as a blob
    //           const response = await fetch(imgUrl, {
    //             method: 'GET',
    //             mode: 'no-cors',
    //           });
    //           console.log(imgUrl)
    //           const blob = await response.blob();

    //           // Convert blob to Base64
    //           const reader = new FileReader();
    //           reader.onloadend = () => {
    //             const imgData = reader.result;

    //             // Set image position and dimensions
    //             const x = parseFloat(img.getAttribute("data-x") || 10);
    //             const y = parseFloat(img.getAttribute("data-y") || 10);
    //             const width = parseFloat(img.getAttribute("data-width") || 50);
    //             const height = parseFloat(img.getAttribute("data-height") || 50);

    //             // Add image to PDF
    //             doc.addImage(imgData, "JPEG", x, y, width, height);
    //           };
    //           reader.readAsDataURL(blob); // Convert blob to Base64
    //         // } catch (error)
    //         // {
    //         //   console.error("Error fetching or converting image:", error);
    //         // }
    //       }

    //       // Save the PDF
    //       doc.save("document.pdf");
    //     },
    //     x: 10,
    //     y: 10,
    //     width: 190,
    //     windowWidth: 1024
    //   });
    // } else
    // {
    //   console.log("Có lỗi xảy ra");
    // }
  // } catch (e)
  // {
  //   console.log(e);
  // }
};
// lấy dữ liệu từ api
const fetchData = async () => {
  const result = await getQuestionExam(id)
  if (result)
  {
    question.value = result['data']
    // lấy danh sách câu hỏi
    // khi dùng await trong for thì nên dùng for of để xử lý hoàn tất hàm bất đồng bộ trước khi sang phần tử mới
    // eslint-disable-next-line no-unused-vars
    for (const [index, e] of question.value.entries())
    {
      e.answerlist = JSON.parse(e.answerlist)
      // answer.value.push( {'idQues':e.id,'listAns':e.answerlist} );
      if (!e.ImageQuestionUrl)
      {
        e.ImageQuestionUrl = ''
      }
      if (e.image !== '' && e.image !== null)
      {
        const imgUrl = `http://localhost:8080/assets/image/Question/${e.image}`
        // tạo mảng chứa url ảnh câu hỏi
        e.ImageQuestionUrl = imgUrl
      }

      var idQues = e.id
      // Lấy danh sách hình ảnh câu trả lời
      var fetchImageAnswer = await getImageAnswer(idQues)
      var imageAnswerQuestion = fetchImageAnswer.data
      // nếu chưa tồn tại list url ảnh thì khởi tạo mảng
      if (!e.ListImageAnswerUrl)
      {
        e.ListImageAnswerUrl = []
      }
      for (var img of imageAnswerQuestion.entries())
      {
        const imageAnsUrl = `http://localhost:8080/assets/image/AnswerQuestion/${img[1].imageAns}`
        const element = { imageUrl: imageAnsUrl, stt: img[1].stt }
        if (img[1].idQues === e.id)
        {
          e.ListImageAnswerUrl.push(element)
        }
      }
      // renderMath()
    }
    renderMath()
  }
}
onMounted(fetchData)
</script>
