<script setup lang="ts"></script>
<template>
  <div class="first-section">
    <div class="grid-colrow23">
      <div class="last-row">
        <!-- <img src="@/images/all_characters.png" alt="" /> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.first-section {
  height: 70vh;
  background-image: url("@/images/firstbanner.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.first-section > .grid-colrow23 {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-column-gap: 4rem;
  margin: 0 auto;
}

.first-section > .grid-colrow23 > .last-row {
  grid-column: 1 / span 2;
  grid-row: 3 / span 1;
  display: grid;
  place-items: center;
  align-items: end;
}
.first-section > .grid-colrow23 > .last-row > img {
  max-width: 100%;
  height: auto;
}
</style>
