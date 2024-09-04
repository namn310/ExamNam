<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute()
    return {
      layout : computed( () => route.meta.layout || "default")
    }
  }
}
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

