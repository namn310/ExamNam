<!-- eslint-disable vue/no-unused-vars -->
<template>
    <div class="text-[50px] text-pink-500 font-great text-center">
            Danh sách câu hỏi
        </div>
    <div class="flex justify-between">
        <RouterLink :to="{ name : 'create-cauhoi'}">
            <el-button type="primary" plain>Create câu hỏi</el-button>
        </RouterLink>
    </div>
    <div class="pt-8">
        <div class="m-4">
            <el-select
                v-model="value"
                value-key="id"
                placeholder="Sắp xếp"
                style="width: 240px"
            >
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item"
            />
            </el-select>
        </div>
        <el-table :data="filterTableData">
            <el-table-column type="selection" width="55" />
            <el-table-column label="Tên câu hỏi"  />
            <el-table-column label="Bài kiểm tra"  />
            <el-table-column label="Thời gian tạo" />
            <el-table-column label="Đáp án"  />
            <el-table-column align="right">
                <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                <el-button size="small">
                    <RouterLink :to="`/`">
                        Edit
                    </RouterLink>   
                    </el-button>
                <el-button
                    size="small"
                    type="danger"
                >
                    Delete
                </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination background layout="prev, pager, next" :total="totalPage * 10" @current-change="handlePageChange"/> -->
    </div>
</template>

<script setup>
    
</script>

<style lang="scss" scoped>

</style>