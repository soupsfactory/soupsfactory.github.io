<script setup lang="ts">
import "../assets/sharedHomePage.css";
</script>
<template>
  <div class="third-section">
    <div class="grid-colrow21">
      <div id="cell-colrow12">
        <img src="@/images/secondbanner.png" alt="" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.third-section {
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 1vw;
  padding-right: auto;
  background-color: #f0474b;
}
.third-section > .grid-colrow21 {
  display: grid;
  place-items: center;
}
#cell-colrow12 > img {
  max-width: 100%;
  height: auto;
}
</style>
