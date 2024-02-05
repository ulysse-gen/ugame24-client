<template>
    <div class="login-modal">
        <img src="/assets/imgs/mage.gif" alt="logo" class="logo">
        <form method="POST" class="login-form">
          <input name="username" placeholder="Username" id="username-input">
          <input name="password" placeholder="Password" type="password" id="password-input">
          <input type="submit" value="PLAY" class="submit-button" @click.prevent="login">
        </form>
        <a class="forgot-pass" href="">Forgot password ?</a>
      </div>
</template>
  
<script lang="ts">
  import store from '@/store';
import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'LoginView',
    methods: {
      login: async () => {
        let username = (document.getElementById("username-input") as HTMLInputElement).value;
        let AuthToken = "";
        if (username == "test")AuthToken = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MDY5OTA5OTgsImV4cCI6MTcxNDc2Njk5OH0.7O-b57btCWEBfjiI2c9MXciM6GHc51HtcINg8a-REasnmgD65597v2XykIyvMFbE8Ke25fcEZFypCACQTiSqMg";
        if (username == "test2")AuthToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWF0IjoxNzA3MTA3OTIxfQ.sblnYSssJhwXbGfUaNsDeiTAq5-QfMvALEnLKW0X83U";
        await store.dispatch("ConnectToServer", AuthToken);
        await store.dispatch("AttachEvents");
        return true;
      }
    }
  });
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .login-modal {
      z-index: 1000;
      padding: 50px;
      position: absolute;
      background-color: rgba(255, 255, 255, 0.50);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 80vh;
      width: 60vw;
      margin: 10vh 20vw 10vw 20vw;
      backdrop-filter: blur(10px);

      .logo {
        width: 120px;
        height: 120px;
        margin-bottom: 20px;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: space-between;
        height: 70%;
        width: 100%;
        #username-input, #password-input {
          padding-left: 5px;
          border: none;
          background-color: transparent;
          border-bottom: solid 1px #ccc;
          font-family: futura;
          font-size: 2rem;
          width: 100%;
          padding-bottom: 10px;
          color: white;
          margin-bottom: 20px;

          &::placeholder {
            color: #ccc;
            font-family: futura;
            font-size: 2rem;
          }
        }

        .submit-button {
          border: none;
          background-color: rgb(248, 43, 104);;
          padding: 20px 10px;
          margin-top: 20px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1.5rem;
        }
      }

      .forgot-pass {
        color: #ccc;
        font-size: 1.2rem;
      }
    }
</style>