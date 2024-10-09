<script lang="ts">
import Home from './views/Home.vue';

import { defineComponent } from "vue";

export default defineComponent({
  components: { Home },
});
</script>

<template>
  <div id = "app">
    <Home/>
  </div>

</template>

<style scoped>


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}
</style>
