<!-- eslint-disable vue/no-v-text-v-html-on-component -->

<template>
    <div class="p-10">
      <div style="margin-bottom: 15px">Danh sách câu hỏi: <el-switch v-model="fill" /></div>
      <el-space :fill="fill" wrap>
        <el-card v-for="(i, index) in question" :key="i"  class="box-card">
          <template #header>
            <div class="card-header d-flex">
              <span>Câu {{ index + 1 }}:</span>
              <span class="ms-2"  text v-html="i.title" ></span>
            </div>
          </template>
          <div >  
            
          <div v-for="(ans,index2) in i.answerlist" :key="index2" class="text item">
            <span>{{ getLabel(index2) }}. {{ ans }}</span>
          </div>

          </div>
          <!-- <div class="text item">A : {{ i.A }}</div>
          <div class="text item">B : {{ i.B }}</div>
          <div class="text item">C : {{ i.C }}</div>
          <div class="text item">D : {{ i.D }}</div> -->
          <div class="text item text-blue-700 font-semibold">Đáp án : {{ i.correctAns }}</div>
        </el-card>
      </el-space>
    </div>
  </template>
  
<script lang="ts" setup>
  import { getQuestionExam } from '@/service/examsService';
// import { a } from 'vitest/dist/suite-IbNSsUWN';
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router';

  const question = ref([]);
  const route = useRoute();
const id = route.params.id;
// const answer = ref( [] );
  
const fill = ref( false )
  const getLabel = (index) => {
      return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
    }
  const fetchData = async () =>{
    const result = await getQuestionExam(id)
    if(result){
      question.value = result['data'];
      // answer.value = result['data'];
      console.log( question.value )
      question.value.forEach( ( e ) => {
        e.answerlist = JSON.parse( e.answerlist );
        // answer.value.push( {'idQues':e.id,'listAns':e.answerlist} );
      })
      // console.log( answer.value )
      console.log( question.value );
    }
  }
  onMounted(fetchData);
</script>
  