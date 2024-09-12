<!-- eslint-disable vue/no-v-text-v-html-on-component -->

<template>
    <div class="p-10">
      <div style="margin-bottom: 15px">Danh sách câu hỏi: <el-switch v-model="fill" /></div>
      <el-space :fill="fill" wrap>
        <el-card v-for="(i, index) in question" :key="i" class="box-card">
          <template #header>
            <div class="card-header">
              <span>Câu {{ index + 1 }}</span>
              <el-button class="button" text v-html="i.title" ></el-button>
            </div>
          </template>
          <div class="text item">A : {{ i.A }}</div>
          <div class="text item">B : {{ i.B }}</div>
          <div class="text item">C : {{ i.C }}</div>
          <div class="text item">D : {{ i.D }}</div>
          <div class="text item text-blue-700 font-semibold">Đáp án : {{ i.correctAns }}</div>
        </el-card>
      </el-space>
    </div>
  </template>
  
<script lang="ts" setup>
  import { getQuestionExam } from '@/service/examsService';
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router';

  const question = ref([]);
  const route = useRoute();
  const id = route.params.id;
  
  const fill = ref(false)

  const fetchData = async () =>{
    const result = await getQuestionExam(id)
    if(result){
      question.value = result['data'];
    }
  }
  onMounted(fetchData);
</script>
  