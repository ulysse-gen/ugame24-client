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
import store from '@/store';
import _ from 'lodash';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameView',
  async mounted() {
      store.commit("CanvasSet", document.getElementById("GameCanvas"));
      this.Tick();
  },
  computed: {
    uGame: () => store.state.uGame
  },
  methods: {
    Tick() {
      if (!this.uGame.Canvas || !this.uGame.Context)return;
      this.uGame.Canvas.height = window.innerHeight;
      this.uGame.Canvas.width = window.innerWidth;
      this.uGame.Context.save();

      if (this.uGame.Client && this.uGame.Client.Character) {
        this.uGame.Context.translate((this.uGame.Canvas.width/2-this.uGame.Client.Character.position.x) - this.uGame.Client.Character.DisplayCharacter.size.x/2, (this.uGame.Canvas.height/2-this.uGame.Client.Character.position.y) - this.uGame.Client.Character.DisplayCharacter.size.y/2);
      }

      this.uGame.Context.clearRect(0, 0, this.uGame.Canvas.width, this.uGame.Canvas.height);

      this.uGame.Context.imageSmoothingEnabled = false;

      if (this.uGame.Map && this.uGame.Map.isLoaded)this.uGame.Map.Draw();

      this.uGame.Clients.forEach(otherPlayer => {
        if (!otherPlayer.Character || !otherPlayer.Character.DisplayCharacter || !otherPlayer.Character.DisplayCharacter.isLoaded || !this.uGame.Context || (this.uGame.Client && (otherPlayer.username == this.uGame.Client.username)))return;
        this.uGame.Context.font = "20px Arial";
        this.uGame.Context.fillStyle = 'black';
        this.uGame.Context.textAlign = "center";
        this.uGame.Context.fillText(otherPlayer.pseudo, otherPlayer.Character.position.x+(otherPlayer.Character.size.x/2), otherPlayer.Character.position.y-20);
        otherPlayer.Character.Tick();
      })

      if (this.uGame.Client && this.uGame.Client.Character && this.uGame.Client.Character.DisplayCharacter && this.uGame.Client.Character.DisplayCharacter.isLoaded)this.uGame.Client.Character.Tick();
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
    if (!store.state.uGame.Client || !store.state.uGame.Client.Character)return
    if (shiftKey.includes(e.keyCode))store.state.uGame.Client.Character.Movement.dash = true;
    if (moveUp.includes(e.keyCode))store.state.uGame.Client.Character.Movement.up = true;
    if (moveRight.includes(e.keyCode))store.state.uGame.Client.Character.Movement.right = true;
    if (moveDown.includes(e.keyCode))store.state.uGame.Client.Character.Movement.down = true;
    if (moveLeft.includes(e.keyCode))store.state.uGame.Client.Character.Movement.left = true;
}
document.addEventListener('keyup',release)
function release(e: any){
    //if (typing)return;
    if (!store.state.uGame.Client || !store.state.uGame.Client.Character)return;
    if (shiftKey.includes(e.keyCode))store.state.uGame.Client.Character.Movement.dash = false;
    if (moveUp.includes(e.keyCode))store.state.uGame.Client.Character.Movement.up = false;
    if (moveRight.includes(e.keyCode))store.state.uGame.Client.Character.Movement.right = false;
    if (moveDown.includes(e.keyCode))store.state.uGame.Client.Character.Movement.down = false;
    if (moveLeft.includes(e.keyCode))store.state.uGame.Client.Character.Movement.left = false;
}
window.addEventListener("blur", () => {
    if (!store.state.uGame.Client || !store.state.uGame.Client.Character)return;
    _.mapValues(store.state.uGame.Client.Character.Movement, val=>false);
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game {
  position: absolute;
  height: 100vh;
  width: 100vw;
}
</style>