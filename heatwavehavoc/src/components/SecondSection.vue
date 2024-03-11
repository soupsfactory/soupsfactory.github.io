<script setup lang="ts">
import "../assets/sharedHomePage.css";
</script>
<template>
  <div class="second-section">
    <div class="grid-colrow36">
      <div class="cell-span2 align-center-start">
        <img src="@/images/fullcharacters.png" class="" />
      </div>

      <div class="cell-span61 align-center-start">
        <div class="text-align-center">
          Players live happy healthy lives with their kids,<br />
          until heatwaves strike,<br />and they
          <span class="red-text features heatattack-text"
            >all die of heat strokes</span
          >. <br />Or they adapt, with their healthy lifestyle measures and
          community actions.<br />
          <span class="red-text features heatattack-text">Collaborate</span
          ><br />
          with your neighbors,<br />
          share your resources, protect and help your neighbors, and<br />
          <span class="red-text features heatattack-text"
            >adapt well to to heatwaves.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.second-section {
  padding-top: 5vh;
  padding-bottom: 5vh;
  padding-left: auto;
  padding-right: auto;
}

.second-section > .grid-colrow36 {
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.3fr;
  grid-template-rows: 0.2fr 1fr;
  margin: 0 auto;
  font-size: 15px;
}
.grid-colrow36 > .cell-span2 {
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}
.second-section > .grid-colrow36 > .cell-span2 > img {
  max-width: 50%;
  height: auto;
}
.second-section > .grid-colrow36 > .cell-span61 {
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  padding-top: 0;
  padding-bottom: 0;
}
.second-section > .grid-colrow36 > .cell-span61 > div {
  font-size: 20px;
}
</style>
