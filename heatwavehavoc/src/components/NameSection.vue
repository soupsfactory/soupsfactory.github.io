<script setup lang="ts">
import "../assets/sharedHomePage.css";
</script>
<template>
  <div class="name">
    <div class="name-center">
      <span class="big-size-title heatattack-text red-text align-center"
        >HEATWAVE<br />Havoc</span
      >
      <span class="normal-text bold-text">
        a collaborative MULTIPLAYER card game</span
      >
      <div class="grid-3">
        <div class="cell1">
          <div class="align-center">
            <span>
              <font-awesome-icon icon="fa-solid fa-users" />
              <span class="normal-text bold-text"> 2-8</span>
            </span>
          </div>
        </div>
        <div class="cell2">
          <div class="align-center">
            <span>
              <font-awesome-icon icon="fa-solid fa-user" />
              <span class="normal-text bold-text"> 8+ years</span>
            </span>
          </div>
        </div>
        <div class="cell3">
          <div class="align-center">
            <span>
              <font-awesome-icon icon="fa-solid fa-hourglass-half" />
              <span class="normal-text bold-text"> 10 mins</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.name {
  padding-top: 10rem;
  padding-left: 10vw;
  padding-right: 10vw;
}
.name > .name-center {
  display: grid;
  place-items: center;
}
.name > .name-center > .big-size-text {
  font-size: 15vw;
  line-height: 1;
}

.normal-text {
  font-size: 1.5vw;
}
.name > .name-center > .grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  padding-left: 20vw;
  padding-right: 20vw;
}
.name > .name-center > .grid-3 > .cell1 {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
}
.name > .name-center > .grid-3 > .cell2 {
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}
.name > .name-center > .grid-3 > .cell3 {
  grid-column: 3 / span 1;
  grid-row: 1 / span 1;
}
.align-center {
  text-align: center;
}
</style>
