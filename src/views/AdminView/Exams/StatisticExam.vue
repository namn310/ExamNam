<template>
  <div class="m-3">
    <div class="mb-3">
      <p>
        <strong>Số người làm bài kiểm tra : {{ exam.count_user_do }} </strong>
      </p>
    </div>
    <table class="table table-hover table-bordered text-center table-responsive">
      <thead class="table-primary">
        <tr>
          <th>ID câu hỏi</th>
          <th>Câu hỏi</th>
          <th>Số người làm sai</th>
          <th>Tỷ lệ trả lời đúng câu hỏi</th>
          <th>Độ khó của câu hỏi</th>
        </tr>
      </thead>
      <tbody v-for="(ques, index) in question" :key="index">
        <tr>
          <td>
            {{ ques.id }}
          </td>
          <td class="text-start" v-html="ques.title"></td>
          <td>
            {{ ques.count_do_wrong }}
          </td>

          <td
            v-if="
              -Math.log(
                (1 - ques.count_do_wrong / exam.count_user_do) /
                  (ques.count_do_wrong / exam.count_user_do)
              ) !== Infinity &&
              -Math.log(
                (1 - ques.count_do_wrong / exam.count_user_do) /
                  (ques.count_do_wrong / exam.count_user_do)
              ) !== -Infinity &&
              !isNaN(
                -Math.log(
                  (1 - ques.count_do_wrong / exam.count_user_do) /
                    (ques.count_do_wrong / exam.count_user_do)
                )
              )
            "
            :class="{
              'text-danger': 100 - (ques.count_do_wrong / exam.count_user_do) * 100 < 50,
              'text-success': 100 - (ques.count_do_wrong / exam.count_user_do) * 100 >= 50
            }"
          >
            {{ (100 - (ques.count_do_wrong / exam.count_user_do) * 100).toFixed(2) }}%
          </td>
          <td v-else-if="ques.count_do_wrong / exam.count_user_do === 1" class="text-danger">0%</td>
          <td v-else>Chưa có dữ liệu</td>

          <td v-if="ques.difficulty !== ''">
            <!-- <input class="form-control" v-model="ques.difficulty"> -->
            {{ ques.difficulty }}
          </td>
          <td v-else>Chưa có dữ liệu</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="m-3 text-end">
    <button class="btn btn-primary">Cập nhật dữ liệu độ khó câu hỏi</button>
  </div>
</template>
<script>
// import router from '@/router'
import { getQuestionExam, getCountDoWrong } from '@/service/examsService'
import { getExamDetail } from '@/service/examsService'

export default {
  data() {
    return {
      originData:[],
      question: [],
      exam: [],
      id: this.$route.params.id,
      ListDifficultyQuestion:[]
    }
  },
  created() {
    this.renderMath(), this.fetchData()
  },
  methods: {
    renderMath() {
      // Kiểm tra xem MathJax đã được tải chưa
      if (window.MathJax) {
        this.$nextTick(() => {
          window.MathJax.typesetPromise()
            .then(() => {
              // console.log("MathJax rendering completed");
            })
            .catch((err) => console.error('MathJax rendering error:', err))
        })
      }
    },
    async fetchData() {
      const result = await getQuestionExam(this.id)
      const result2 = await getExamDetail(this.id)
      const result3 = await getCountDoWrong(this.id)
      if (result2) {
        this.exam = result2['data']
      }
      if (result) {
        // console.log(result3)
        this.question = result['data']
        this.originData=result['data']
        if (result3) {
          this.question.forEach((e) => {
            var result = result3.find((e2) => e2.id_question === e.id)
            if (result) {
              e.count_do_wrong = result.number_do_wrong
            }
            // kiểm tra xem giá trị có NaN hay vô cực không
            if (
              -Math.log(
                (1 - e.count_do_wrong / this.exam.count_user_do) /
                  (e.count_do_wrong / this.exam.count_user_do)
              ) !== Infinity &&
              -Math.log(
                (1 - e.count_do_wrong / this.exam.count_user_do) /
                  (e.count_do_wrong / this.exam.count_user_do)
              ) !== -Infinity &&
              !isNaN(
                -Math.log(
                  (1 - e.count_do_wrong / this.exam.count_user_do) /
                    (e.count_do_wrong / this.exam.count_user_do)
                )
              )
            ) {
              // độ khó câu hỏi
              e.difficulty = -Math.log(
                (1 - e.count_do_wrong / this.exam.count_user_do) /
                  (e.count_do_wrong / this.exam.count_user_do)
              ).toFixed(2)
            } else {
              e.difficulty = ''
            }
          })
        }
        console.log(this.question)
      }
      this.renderMath()
    }
  }
}
</script>
<style lang="css" scoped></style>
