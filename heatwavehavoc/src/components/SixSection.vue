<script setup lang="ts">
import "../assets/sharedHomePage.css";
</script>
<template>
  <div class="six-section">
    <div class="text-div">
      <span class="bold-text red-text title-text"
        >Why<br /> <span class="title-text heatattack-text"> HEATWAVE Havoc</span>?</span
      ><br /><br />
      <p>
        How might we make the younger generation aware of the impacts of
        <span class="features red-text">heatwaves?</span> HEATWAVE Havoc is a
        collaborative multiplayer card game to introduce players to the
        individual and community level adaptation measures during Heatwaves.
        <br />
        Interested to learn more about the project? Please email us at
        <a href="mailto:supriya.dutta@apu.edu.in" class="features-link"
          >supriya.dutta(at)apu.edu.in</a
        >
      </p>
    </div>

    <div class="foot-space"></div>
  </div>
</template>
<style scoped>
.six-section {
  margin-top: 10rem;
  margin-bottom: 10rem;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 15vw;
  padding-right: 15vw;
  height: 70vh;
  display: grid;
  align-items: center;
}
.six-section > .text-div {
  display: grid;
  grid-template-columns: 1fr;
  font-size: 20px;
}
.title-text {
  line-height: 1.2;
  font-size: 3rem;
}

.foot-space {
  height: 4vh;
}
</style>
