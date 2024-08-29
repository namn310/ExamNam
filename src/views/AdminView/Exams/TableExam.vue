<!-- eslint-disable vue/no-unused-vars -->
<template>
    <div class="text-[50px] text-pink-500 font-great text-center">
            Danh sách bài kiểm tra
        </div>
    <div class="flex justify-between">
        <RouterLink :to="{ name : 'create-exam'}">
            <el-button type="primary" plain>Create bài kiểm tra</el-button>
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
            <el-table-column label="Tên bài kiểm tra"  />
            <el-table-column label="Môn học"  />
            <el-table-column label="Mô tả"  />
            <el-table-column label="Thời gian làm bài" />
            <el-table-column label="Trạng thái"  />
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