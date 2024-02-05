<template>
    <div class="loading" :class="{'login-modal-visible': !loggedIn}">
        <img src="/assets/imgs/mage.gif" alt="logo">
    </div>
</template>
  
<script lang="ts">
  import store from '@/store';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
  
  export default defineComponent({
    name: 'LoadingView',
    computed: {
    ...mapGetters([
      "loggedIn"
    ])
    }
  });
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading {
  position: absolute;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
  z-index: 999;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &.login-modal-visible {
    backdrop-filter: blur(5px);
  }

  img {
    width: 15%;
    image-rendering: pixelated;
  }
}
</style>