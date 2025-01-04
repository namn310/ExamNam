<!-- eslint-disable vue/no-unused-vars -->
<template>
    <div class="text-[30px] text-center text-500">Danh sách lớp học</div>
    <button class="btn btn-success ms-2 mb-2" data-bs-toggle="modal" data-bs-target="#ModalCreateClass">Tạo lớp học
        mới</button>
    <!-- modal tạo lớp học -->
    <div class="modal fade" id="ModalCreateClass" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Danh mục</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div>
                            <label class="form-label me-2" for="nameCat"><strong>Lớp học </strong></label>
                            <input class="form-control border border-secondary w-30" id="nameCat"
                                placeholder="Nhập lớp học" v-model=" ClassForm.class " />
                        </div>
                        <div>
                            <label class="form-label me-2" for="desCat"><strong>Mô tả: </strong></label>
                            <input class="form-control border border-secondary w-30" id="desCat"
                                placeholder="Nhập mô tả (có thể bỏ trống)" v-model=" ClassForm.description " />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="submitCreateClass()">
                        Tạo
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="pt-8 ms-2 me-2">
        <table class="table table-hover table-bordered text-center table-responsive" id="sampleTable"
            v-if=" ListClass.length > 0 ">
            <thead>
                <tr class="table-secondary text-center">
                    <th style="width: 20%">Mã</th>
                    <th style="width: 40%">Lớp</th>
                    <th style="width:30%">Mô tả</th>
                    <th style="width: 10%">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="        e in ListClass        "
                    :key=" e.id ">
                    <td data-bs-toggle="modal" data-bs-target="#modalUpdate" @click="ClassSelectedCurrent( e.id, e.class, e.description )">
                        {{ e.id }}
                    </td>
                    <td data-bs-toggle="modal" data-bs-target="#modalUpdate" @click="ClassSelectedCurrent( e.id, e.class, e.description )">{{ e.class }}</td>
                    <td data-bs-toggle="modal" data-bs-target="#modalUpdate" @click="ClassSelectedCurrent( e.id, e.class, e.description )">{{ e.description }}</td>
                    <td>
                        <button class="btn btn-danger" @click="deleteClassFetch( e.id )">x</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Không có lớp học nào !</p>
    </div>
    <div class="mb-4">
        <ul class="pagination justify-content-center">
            <li style="cursor: pointer"><a @click="prePage()" class="page-link"><i
                        class="fa-solid fa-angles-left"></i></a>
            </li>
            <li style="cursor: pointer" class="page-item" :class=" { active: page == currentPage } "
                v-for="(      page, index) in ListPages" :key=" index ">
                <a class="page-link" @click="changePage( page )">{{ page }}</a>
            </li>
            <li style="cursor: pointer"><a @click="nextPage()" class="page-link"><i
                        class="fa-solid fa-angles-right"></i></a>
            </li>
        </ul>
    </div>
    <!-- Modal hiển thị chi tiết danh mục dùng cho việc cập nhật thông tin danh mục -->
    <div class="modal fade" id="modalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Danh mục</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div>
                            <label class="form-label me-2" for="nameCat"><strong>Lớp học </strong></label>
                            <input class="form-control border border-secondary w-30" id="nameCat"
                                v-model=" ClassSelect.class " placeholder="Nhập tên danh mục" />
                        </div>
                        <div>
                            <label class="form-label me-2" for="desCat"><strong>Mô tả: </strong></label>
                            <input class="form-control border border-secondary w-30" id="desCat"
                                v-model=" ClassSelect.description " placeholder="Nhập mô tả (có thể bỏ trống)" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="updateClassFetch()">
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
import { getClassList, createClass, deleteClass, updateClass } from '@/service/class';
import { ElNotification } from 'element-plus'
export default {
    data () {
        return {
            ListClass: [],
            ClassForm: {
                class: '',
                description: ''
            },
            ClassSelect: {
                id: '',
                class: '',
                description: ''
            },
            ListPages: [],
            TotalPage: 0,
            TotalClass: 0,
            currentPage: 1
        }
    },
    created () {
        this.fetchClasList()
    },
    methods: {
        async fetchClasList () {
            const result = await getClassList(1)
            if (result)
            {
                this.ListClass = result.data
                this.TotalClass = result.record_total
                this.TotalPage = result.total_page
                this.listpage()
            }
        },
        listpage () {
            // for (var i = 1; i <= this.TotalPage; i++)
            // {
            //     this.ListPages.push(i)
            // }
            this.ListPages = [] // Reset ListPages

            if (this.TotalPage <= 7)
            {
                // Hiển thị tất cả các trang nếu số trang <= 7
                for (let i = 1; i <= this.TotalPage; i++)
                {
                    this.ListPages.push(i)
                }
            } else
            {
                // Hiển thị phân trang dạng 12 ... 89
                if (this.currentPage <= 4)
                {
                    // Nếu đang ở các trang đầu
                    for (let i = 1; i <= 5; i++)
                    {
                        this.ListPages.push(i)
                    }
                    this.ListPages.push('...')
                    this.ListPages.push(this.TotalPage)
                } else if (this.currentPage >= this.TotalPage - 3)
                {
                    // Nếu đang ở các trang cuối
                    this.ListPages.push(1)
                    this.ListPages.push('...')
                    for (let i = this.TotalPage - 4; i <= this.TotalPage; i++)
                    {
                        this.ListPages.push(i)
                    }
                } else
                {
                    // Nếu đang ở giữa
                    this.ListPages.push(1)
                    this.ListPages.push('...')
                    for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++)
                    {
                        this.ListPages.push(i)
                    }
                    this.ListPages.push('...')
                    this.ListPages.push(this.TotalPage)
                }
            }
        },
        ClassSelectedCurrent (id, classElement, description) {
            this.ClassSelect.id = id
            this.ClassSelect.class = classElement
            this.ClassSelect.description = description

        },
        async changePage (page) {
            this.currentPage = page
            if (page === '...')
            {
                return
            }
            else
            {
                await this.getClassByPage(page)
                this.listpage()
            }
        },
        async nextPage () {
            if (this.currentPage === this.TotalPage)
            {
                return
            }
            else
            {
                await this.changePage(this.currentPage + 1)
            }

        },
        async prePage () {
            if (this.currentPage === 1)
            {
                return
            }
            else
            {
                await this.changePage(this.currentPage - 1)
            }

        },
        async getClassByPage (page) {
            const result = await getClassList(page)
            if (result)
            {
                this.ListClass = result.data
            } else
            {
                alert('Có lỗi xảy ra')
            }
        },
        // tạo lớp mới
        async submitCreateClass () {
            if (this.ClassForm.class !== '' || this.ClassForm.class !== null)
            {
                const result = await createClass(this.ClassForm)
                if (result)
                {
                    console.log(result);
                    if (result.status === 'success')
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: "Thêm lớp học mới thành công",
                            type: 'success'
                        })
                        var element = {}
                        element.id = result.id
                        element.class = result.class
                        element.description = result.description
                        this.ListClass.push(element)
                    }
                    else
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: "Có lỗi xảy ra !",
                            type: 'success'
                        })
                    }
                }
            }
            else
            {
                alert("Vui lòng nhập đầy đủ thông tin")
            }

        },
        // xóa lớp học
        async deleteClassFetch (id) {
            if (confirm("Xác nhận xóa lớp học này ?"))
            {
                const result = await deleteClass(id)
                if (result)
                {

                    if (result.status === 'success')
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: "Xóa lớp học thành công",
                            type: 'success'
                        })
                        this.ListClass = this.ListClass.filter(e => e.id !== id)
                    }
                    else
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: "Có lỗi xảy ra",
                            type: 'error'
                        })
                    }
                }
            }
            else
            {
                return
            }
        },
        // update lớp học
        async updateClassFetch () {
            if (this.ClassSelect.class === '' && this.ClassSelect.class === null)
            {
                alert("Vui lòng nhập lớp")
            }
            else
            {
                const result = await updateClass(this.ClassSelect.id, this.ClassSelect)
                if (result)
                {
                    if (result.status === 'success')
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: "Cập nhật lớp học thành công",
                            type: 'success'
                        })
                        this.ListClass.forEach(e => {
                            if (e.id === this.ClassSelect.id)
                            {
                                e.class = result.class
                                e.description = result.description
                            }
                        })
                    }
                    else
                    {
                        ElNotification({
                            title: 'Thông báo',
                            message: "Có lỗi xảy ra",
                            type: 'success'
                        })
                    }

                }
                else
                {
                    alert("Có lỗi xảy ra !")
                }
            }
        }
    }
}
</script>
