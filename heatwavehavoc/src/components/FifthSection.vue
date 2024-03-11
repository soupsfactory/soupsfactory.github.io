<script setup lang="ts">
import "../assets/sharedHomePage.css";
</script>
<template>
  <div class="fifth-section">
    <div class="">
      <h3 class="features">
        We are currently <br />
        <span class="bold-text large-text">PLAYTESTING</span>
      </h3>
      <div class="grid-2">
        <div class="col1">
          <div class="features">Join us?</div>
          <div>
            Would you like to help us with our playtestings, email us
            <a href="mailto:supriya.dutta@apu.edu.in">here</a>.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fifth-section {
  margin-top: 10rem;
  margin-bottom: 10rem;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 15vw;
  padding-right: 15vw;
  background-color: var(--color-text);
  color: white;
  height: 70vh;
  display: grid;
  align-items: center;
}
.fifth-section > div {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr;
}

.fifth-section > div > .grid-2 {
  padding-top: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
.fifth-section > div > .grid-2 > .col1 {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1fr;
}
</style>
