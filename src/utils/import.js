import { defineAsyncComponent } from "vue";

export function registerGlobalComponents(app) {
    app.component('default', defineAsyncComponent(() => import("@/Layout/LayoutClient.vue")))
    app.component('admin', defineAsyncComponent(() => import("@/Layout/LayoutAdmin.vue")))
}