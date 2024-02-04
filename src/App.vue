<template>
  <GameView/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameView from './views/GameView.vue';

export default defineComponent({
  name: 'App',
  components: {
    GameView
  }
});
</script>

<style lang="scss">
@import url('@/assets/css/reset.scss');

html, body {
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
