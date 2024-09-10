import { defineAsyncComponent } from "vue";

export function registerGlobalComponents(app) {
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('default', defineAsyncComponent(() => import("@/Layout/LayoutClient.vue")))
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('admin', defineAsyncComponent(() => import("@/Layout/LayoutAdmin.vue")))
    app.component('home', defineAsyncComponent(() => import("@/Layout/LayoutHome.vue")))
}