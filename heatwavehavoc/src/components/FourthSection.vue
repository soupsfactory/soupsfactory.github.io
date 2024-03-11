<script setup lang="ts">
import "../assets/sharedHomePage.css";
</script>
<template>
  <div class="fourth-section">
    <div class="grid-colrow28">
      <div id="left1" class="left">
        <div>
          <span class="bold-text">
            <span class="large-text heatattack-text red-text">Own</span>
            <br />
            your own cute cuddly little babies
          </span>
          <br />
          Enjoy, cuddle, dance and eat with your cuddly kids
        </div>
      </div>
      <div id="right1" class="cell-image">
        <img src="@/images/havecharacters.png" />
      </div>
      <div class="cell-image" id="left2">
        <img src="@/images/hwwave.gif" />
      </div>
      <div class="right" id="right2">
        <div>
          <span class="bold-text">
            <span class="large-text red-text heatattack-text"
              >HEAT ATTACKS</span
            >
          </span>
          <br />
          ... Untill heat wave strikes, at which point kids health point
          decreases and they ....(might) die
        </div>
      </div>
      <div class="" id="left3">
        <div>
          <span class="bold-text">Protect and </span><br />
          <span class="large-text red-text heatattack-text">ADAPT</span>
          <br />
          Adapt to heatwave by taking individual measures (food, drinks, living
          environment) and community level measures
        </div>
      </div>
      <div class="cell-image" id="right3">
        <img src="@/images/protctadapt.png" alt="" />
      </div>
      <div class="cell-image" id="left4">
        <img src="@/images/share.png" alt="" />
      </div>
      <div class="" id="right4">
        <div>
          <span class="bold-text">Share and</span><br />
          <span class="large-text red-text heatattack-text">Help</span>
          <br />
          Share your resources with you neighbors
        </div>
      </div>
      <div class="" id="left5">
        <div>
          <span class="bold-text">Become the great big</span><br />
          <span class="large-text red-text heatattack-text">SAVIOR</span>
          <br />
          The team to construct all the folk musical instruments first, WINS!
        </div>
      </div>
      <div class="cell-image" id="right5">
        <img src="@/images/hero.gif" alt="" />
      </div>
      <div class="cell-image" id="left6">
        <img src="@/images/win.gif" alt="" />
      </div>
      <div class="" id="right6">
        <div>
          <span class="large-text red-text heatattack-text">WIN</span><br />
          <span class="bold-text">together against heat-attacks</span>
          <br />
          Win together with your neighbors and friends and Adapt well to
          heatwave.
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fourth-section {
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 15vw;
  padding-right: 15vw;
}

@media only screen and (min-width: 551px) {
  .fourth-section > .grid-colrow28 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.5fr 0.5fr 0.5fr 0.5fr;
    grid-template-areas:
      "left1 right1"
      "left2 right2"
      "left3 right3"
      "left4 right4"
      "left5 right5"
      "left6 right6";
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;
    padding-top: 10rem;
    margin: 0 auto;
    padding-left: auto;
    padding-right: auto;
  }
}

#left1 {
  grid-area: left1;
  display: grid;
  place-items: center;
}
#left2 {
  grid-area: left2;
  display: grid;
  place-items: center;
}
#left3 {
  grid-area: left3;
  display: grid;
  place-items: center;
}
#left4 {
  grid-area: left4;
  display: grid;
  place-items: center;
}
#left5 {
  grid-area: left5;
  display: grid;
  place-items: center;
}
#left6 {
  grid-area: left6;
  display: grid;
  place-items: center;
}

#right1 {
  grid-area: right1;
  display: grid;
  place-items: center;
}
#right2 {
  grid-area: right2;
  display: grid;
  place-items: center;
}
#right3 {
  grid-area: right3;
  display: grid;
  place-items: center;
}
#right4 {
  grid-area: right4;
  display: grid;
  place-items: center;
}
#right5 {
  grid-area: right5;
  display: grid;
  place-items: center;
}
#right6 {
  grid-area: right6;
  display: grid;
  place-items: center;
}
.cell-image > img {
  max-width: 100%;
  height: auto;
}

@media only screen and (max-width: 550px) {
  .fourth-section > .grid-colrow28 {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr;
    grid-template-areas:
      "left1"
      "right1"
      "right2"
      "left2"
      "left3"
      "right3"
      "right4"
      "left4"
      "left5"
      "right5"
      "right6"
      "left6";
    grid-row-gap: 4rem;
    /*margin: 0 auto;*/
    padding-top: 10rem;
    padding-left: auto;
    padding-right: auto;
  }
}
</style>
