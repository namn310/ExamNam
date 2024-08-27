<template class="app">
  <Navbar></Navbar>
  <RouterView></RouterView>
  <Footer></Footer>
</template>
<script>
import NavBarView from './components/NavBarView.vue';
// import MainView from './components/MainView.vue';
import FooterView from './components/FooterView.vue';
export default {
  name: "App",
  components: {
    Navbar: NavBarView,
    // eslint-disable-next-line vue/no-reserved-component-names
    // Main: MainView,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer:FooterView,
  },
};
</script>
<style lang="css">
.app{
  display: flex;
  flex-direction: column;
}
</style>

