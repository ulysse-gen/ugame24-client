<template>
  <LoadingView v-if="!mapLoaded || !loggedIn ||  !connected"/>
  <GameView/>
  <LoginView v-if="!loggedIn"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameView from './views/GameView.vue';
import LoginView from './views/LoginView.vue';
import LoadingView from './views/LoadingView.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    GameView, LoginView, LoadingView
  },
  computed: {
    ...mapGetters([
      "loggedIn", "mapLoaded", "connected"
    ])
  }
});
</script>

<style lang="scss">
@import url('@/assets/css/fonts.scss');
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
