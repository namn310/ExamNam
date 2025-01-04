<template>
    <div class="ms-3 mb-3 mt-4">
        <!-- các thẻ thống kê tổng câu hỏi, tổng đề thi -->
        <div>
            <!-- tổng câu hỏi -->
            <div style="width:300px;height:200px;border: 1px solid black;border-radius: 5px;">
                <div class="p-2">
                    <div class="card-title">
                        <select class="form-select">
                            <option v-for="e in listSubject" :key="e.id" :value="e.title">{{ e.title }}</option>
                        </select>
                    </div>
                    <div class="card-body mt-3">
                        <p>Tổng số câu hỏi</p>
                        <br>
                        <p>6</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getCategoryExamList } from '@/service/examsService'
export default {
    data () {
        return {
            listSubject: [],
            TotalQuestion: 0,
            SucjectSelected: '',
            IdSubjectSelected:0
        }
    },
    created () {
        this.getListSubject()
    },
    methods: {
        async getListSubject () {
            const result = await getCategoryExamList()
            if (result)
            {
                this.listSubject = result.data.data
            }
            console.log(this.listSubject)
        }
    }

}
</script>