<template>
    <div class="LayoutClient">
        <NavBarView/>
        <div class="LayoutBody">
            <RouterView></RouterView>
        </div>
            <FooterView/>
    </div>
</template>
<script>
import FooterView from '@/components/FooterView.vue';
import NavBarView from '@/components/NavBarView.vue';
// import MainView from '@/components/MainView.vue';
export default {
    components: {
        FooterView,
        NavBarView,
        // MainView
    }
}
</script>