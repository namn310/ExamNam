<!-- eslint-disable vue/no-unused-vars -->
<template>
    <div class="text-[30px] text-center text-500">Danh mục bài thi</div>
    <button class="btn btn-success ms-2 mb-2" @click=" toogleFormCreateCat ">Tạo mới danh mục</button>
    <div class="ms-2" v-if=" FormCreateCategoryShow ">
        <form @submit.prevent=" SubmitCreateCategory ">
            <div>
                <label class="form-label me-2" for="nameCat"><strong>Tên danh mục: </strong></label>
                <input class="form-control border border-secondary w-25" id="nameCat" placeholder="Nhập tên danh mục"
                    v-model=" CategoryForm.title " />
            </div>
            <div>
                <label class="form-label me-2" for="desCat"><strong>Mô tả: </strong></label>
                <input class="form-control border border-secondary w-25" id="desCat"
                    placeholder="Nhập mô tả (có thể bỏ trống)" v-model=" CategoryForm.description " />
            </div>

            <button class="btn btn-primary ms-2 mt-2">Tạo</button>
        </form>
    </div>
    <div class="pt-8 ms-2 me-2">
        <table class="table table-hover table-bordered text-center table-responsive" id="sampleTable"
            v-if=" ListCategory.length > 0 ">
            <thead>
                <tr class="table-secondary text-center">
                    <th style="width: 20%">Mã</th>
                    <th style="width: 70%">Danh mục</th>
                    <!-- <th>Người tạo</th> -->
                    <th style="width: 10%">Chức năng</th>
                </tr>
            </thead>
            <tbody id="table-product" v-for="   cat in ListCategory   " :key=" cat.id ">
                <tr style="cursor: pointer">
                    <td>{{ cat.id }}</td>
                    <td data-bs-toggle="modal" data-bs-target="#exampleModal"
                        @click="detailCategory( cat.id, cat.title, cat.description )">
                        <p v-html=" cat.title "></p>
                    </td>
                    <td>
                        <!-- button delete -->
                        <button class="btn btn-danger btn-sm trash mb-2" type="button" @click="deleteCat( cat.id )"
                            title="Xóa">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <!-- <button class="btn btn-success btn-sm edit" @click="changeQuestion( question.id )" type="button" title="Sửa"
              id="show-emp">
              <i class="fas fa-edit"></i>
            </button> -->
                        <!-- <p>{{ errorPost }}</p> -->
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Không có danh mục nào !</p>
    </div>
    <div class="mb-4">
        <ul class="pagination justify-content-center">
            <li style="cursor: pointer" class="page-item" :class=" { active: page == currentPage } "
                v-for="(   page, index) in ListPages" :key=" index ">
                <a class="page-link" @click="changePage( page )">{{ page }}</a>
            </li>
        </ul>
    </div>
    <!-- Modal hiển thị chi tiết danh mục dùng cho việc cập nhật thông tin danh mục -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Danh mục</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div>
                            <label class="form-label me-2" for="nameCat"><strong>Tên danh mục: </strong></label>
                            <input class="form-control border border-secondary w-30" id="nameCat"
                                placeholder="Nhập tên danh mục" v-model=" CategorySelect.title " />
                        </div>
                        <div>
                            <label class="form-label me-2" for="desCat"><strong>Mô tả: </strong></label>
                            <input class="form-control border border-secondary w-30" id="desCat"
                                placeholder="Nhập mô tả (có thể bỏ trống)" v-model=" CategorySelect.description " />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="updateCat( CategorySelect.id )">
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { RouterLink } from 'vue-router'
import {
    // eslint-disable-next-line no-unused-vars
    getCategoryExamList,
    deleteCategory,
    createCategory,
    getCategoryExamListByPage,
    updateCategory
} from '@/service/examsService'
import { ElNotification } from 'element-plus'
export default {
    data () {
        return {
            ListCategory: [],
            CategoryForm: {
                title: '',
                description: ''
            },
            CategorySelect: {
                id: '',
                title: '',
                description: ''
            },
            FormCreateCategoryShow: false,
            ListPages: [],
            TotalPage: 0,
            TotalCategory: 0,
            currentPage: 1
        }
    },
    created () {
        this.fetchCategory()
    },
    methods: {
        toogleFormCreateCat () {
            this.FormCreateCategoryShow = !this.FormCreateCategoryShow
        },
        detailCategory (id, title, description) {
            this.CategorySelect.title = title
            this.CategorySelect.description = description
            this.CategorySelect.id = id
        },
        async fetchCategory () {
            const result = await getCategoryExamListByPage(1)
            if (result)
            {
                this.ListCategory = result['data']['data']
                this.TotalPage = result['data']['total_page']
                this.TotalCategory = result['data']['record_total']
                this.listpage()
                // console.log(result,this.TotalCategory,this.TotalPage)
            }
        },
        listpage () {
            for (var i = 1; i <= this.TotalPage; i++)
            {
                this.ListPages.push(i)
            }
        },
        async changePage (page) {
            this.currentPage = page
            await this.getCategoryByPage(page)
        },
        async getCategoryByPage (page) {
            const category = await getCategoryExamListByPage(page)
            if (category)
            {
                this.ListCategory = category['data']['data']
            } else
            {
                alert('Có lỗi xảy ra')
            }
        },
        // tạo mới danh mục
        async SubmitCreateCategory () {
            if (this.CategoryForm.title == '' || this.CategoryForm.title == null)
            {
                alert('Vui lòng nhập tên danh mục')
            } else
            {
                console.log(this.CategoryForm)
                const result = await createCategory(this.CategoryForm)
                if (result.status === 'success')
                {
                    ElNotification({
                        title: 'Thông báo',
                        message: 'Thêm danh mục thành công',
                        type: 'success'
                    })
                    var element = {}
                    element.id = result.id
                    element.title = result.title
                    element.description = result.description
                    this.ListCategory.push(element)
                } else
                {
                    ElNotification({
                        title: 'Thông báo',
                        message: 'Thêm danh mục thất bại',
                        type: 'error'
                    })
                }
            }
        },
        // xóa danh mục
        async deleteCat (id) {
            if (confirm('Xác nhận xóa danh mục này ?'))
            {
                const result = await deleteCategory(id)
                if (result)
                {
                    const message = result.message
                    if (message === 'Xóa danh mục bài thi thành công !')
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: message,
                            type: 'success'
                        })
                        this.ListCategory = this.ListCategory.filter((e) => e.id !== id)
                    } else
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: message,
                            type: 'error'
                        })
                    }
                } else
                {
                    ElNotification({
                        title: 'Thông báo',
                        message: 'Có lỗi xảy ra !',
                        type: 'error'
                    })
                }
            } else
            {
                return
            }
        },
        // cập nhật danh mục
        async updateCat (id) {
            if (this.CategorySelect.title !== null || this.CategorySelect.title !== '')
            {
                const result = await updateCategory(id, this.CategorySelect)
                if (result)
                {
                    var message = result.message
                    if (message === 'Cập nhật danh mục bài thi thành công !')
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: message,
                            type: 'success'
                        })
                    }
                    this.ListCategory.forEach(e => {
                        if (e.id === id)
                        {
                            e.title = this.CategorySelect.title
                            e.description = this.CategorySelect.description
                        }
                    })
                }
                else
                {
                    ElNotification({
                        title: 'Thông báo',
                        message: "Có lỗi xảy ra !",
                        type: 'error'
                    })
                }

            }
            else
            {
                console.log("Tên danh mục không được bỏ trống")
            }
        }
    }
}
</script>
