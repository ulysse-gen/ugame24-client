<template>
    <div class="game">
      <canvas id="GameCanvas">
        <!--
        ╔══════╗
        ║ Game ║
        ╚══════╝
        -->
      </canvas>
    </div>
</template>
  
<script lang="ts">
import Vector2D from '@/assets/classes/Vector2D';
import store from '@/store';
import _ from 'lodash';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameView',
  async mounted() {
      await store.dispatch("ConnectToServer");
      await store.dispatch("AttachEvents");
      store.commit("CanvasSet", document.getElementById("GameCanvas"));
      if (store.state.map)store.state.map.image.onload = () => {
        if (!store.state.map)return;
        store.state.map.isLoaded = true;
        store.state.map.Draw();
      }
      this.Tick();
  },
  methods: {
    Tick() {
      if (!store.state.canvas || !store.state.context)return;
      store.state.canvas.height = window.innerHeight;
      store.state.canvas.width = window.innerWidth;
      store.state.context.save();
      if (store.state.client && store.state.client.Character)store.state.context.translate((store.state.canvas.width/2-store.state.client.Character.position.x) - store.state.client.Character.DisplayCharacter.size.x/2, (store.state.canvas.height/2-store.state.client.Character.position.y) - store.state.client.Character.DisplayCharacter.size.y/2);
      store.state.context.clearRect(0, 0, store.state.canvas.width, store.state.canvas.height);

      store.state.context.imageSmoothingEnabled = false;

      if (store.state.map && store.state.map.isLoaded)store.state.map.Draw(); 
      if (store.state.client && store.state.client.Character && store.state.client.Character.DisplayCharacter && store.state.client.Character.DisplayCharacter.isLoaded)store.state.client.Character.Tick();
      setTimeout(this.Tick.bind(this), 16.6);
    }
  }
});

var moveUp = [90, 38]; // default Z
var moveDown = [83, 40]; // default S
var moveLeft = [81, 37]; // default Q
var moveRight = [68, 39]; // default D
var shiftKey = [16]; // default Space

document.addEventListener('keydown',press)
function press(e: any){
    //if (typing)return;
    if (!store.state.client || !store.state.client.Character)return;
    if (shiftKey.includes(e.keyCode))store.state.client.Character.Movement.dash = true;
    if (moveUp.includes(e.keyCode))store.state.client.Character.Movement.up = true;
    if (moveRight.includes(e.keyCode))store.state.client.Character.Movement.right = true;
    if (moveDown.includes(e.keyCode))store.state.client.Character.Movement.down = true;
    if (moveLeft.includes(e.keyCode))store.state.client.Character.Movement.left = true;
}
document.addEventListener('keyup',release)
function release(e: any){
    //if (typing)return;
    if (!store.state.client || !store.state.client.Character)return;
    if (shiftKey.includes(e.keyCode))store.state.client.Character.Movement.dash = false;
    if (moveUp.includes(e.keyCode))store.state.client.Character.Movement.up = false;
    if (moveRight.includes(e.keyCode))store.state.client.Character.Movement.right = false;
    if (moveDown.includes(e.keyCode))store.state.client.Character.Movement.down = false;
    if (moveLeft.includes(e.keyCode))store.state.client.Character.Movement.left = false;
}
window.addEventListener("blur", () => {
    if (!store.state.client || !store.state.client.Character)return;
    _.mapValues(store.state.client.Character.Movement, val=>false);
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>