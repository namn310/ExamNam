<template>
  <div class="LayoutClient">
    <NavBarView />
    <div class="LayoutBody">
      <div class="site-content-wrapper container-fluid">
        <div class="content-header pb-0 gray-bg"></div>
        <div class="content-wrapper mt-4 ms-4 me-4">
          <div class="d-flex flex-column flex-wrap" >
            <slot />
          </div>
        </div>
        <!-- box chat -->
      </div>
    </div>
    <FooterView />
  </div>
</template>
<script setup>
import FooterView from '@/components/FooterView.vue'
import NavBarView from '@/components/NavBarView.vue'
import { getCategoryExamList } from '@/service/examsService'
import { onMounted, ref } from 'vue'
// import { useRoute } from 'vue-router'
// import HomeView from '@/views/HomeView.vue';

// const route = useRoute()
// const id = ref()
const dataCetegory = ref([])
const fetchDataCatgory = async () => {
  const result = await getCategoryExamList()
  if (result) {
    dataCetegory.value = result['data']['data']
  }
}

onMounted(() => {
  fetchDataCatgory()
})
</script>

<style scoped>
.site-content-wrapper {
  padding-top: 80px;
  position: relative;
}

*,
:after,
:before {
  box-sizing: border-box;
}

.content-header {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.gray-bg,
.sp-today-todolist {
  background-color: #f8f9fa !important;
}

.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}

.content-header [class*='container'] {
  padding-bottom: 0;
}

.container,
.lg-container,
.md-container,
.mm-container,
.sm-container,
.xl-container,
.xs-container {
  width: 100%;
  max-width: 1170px;
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}

@media (min-width: 992px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .lg-container,
  .md-container,
  .mm-container,
  .sm-container,
  .xl-container,
  .xs-container {
    max-width: 960px;
  }
}

@media (min-width: 768px) {
  .container,
  .container-md,
  .container-sm,
  .lg-container,
  .md-container,
  .mm-container,
  .sm-container,
  .xl-container,
  .xs-container {
    max-width: 720px;
  }
}

@media (min-width: 576px) {
  .container,
  .container-sm,
  .lg-container,
  .md-container,
  .mm-container,
  .sm-container,
  .xl-container,
  .xs-container {
    max-width: 540px;
  }

  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .lg-container,
  .md-container,
  .mm-container,
  .sm-container,
  .xl-container,
  .xs-container {
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
}

@media (min-width: 768px) {
  .order-md-2 {
    order: 2;
  }
}

@media (min-width: 768px) {
  .col-md-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }

  .col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 768px) {
  .order-md-1 {
    order: 1;
  }
}

@media (min-width: 768px) {
  .col-md-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }

  .col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

.nav-pills {
  flex-wrap: nowrap;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

ol,
p,
ul {
  margin-bottom: 1rem;
}

dl,
ol,
ul {
  margin-top: 0;
}

address,
dl,
ol,
ul {
  margin-bottom: 1rem;
}

.nav-pills .nav-item {
  margin-right: 0.4rem;
}

.w-auto {
  width: auto !important;
}

.nav-pills .nav-link.active {
  background-color: #e8f2ff;
  color: #35509a;
  font-weight: 500;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #35509a;
}

.nav-pills .nav-link {
  padding: 4px 15px;
  background-color: #f8f9fa;
  border-radius: 25px;
  white-space: nowrap;
  color: #1a1a1a;
}

.nav-pills .nav-link {
  border-radius: 0.35rem;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
}

a {
  cursor: pointer;
}

a {
  color: #35509a;
  text-decoration: none;
  background-color: transparent;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
}
</style>
