<template>
    <div class="project">
        <h5>{{ proj.name }}</h5>
    </div>
</template>

<script setup lang="ts">
const { proj } = defineProps<{
    proj: {
        readonly name: string,
        readonly imageUrl: string,
        readonly desc: string,
        readonly tags: readonly string[],
    }
}>();
const imageUrlCss = `url(${proj.imageUrl})`;
</script>

<style scoped>
.project {
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
  width: 266px;
  height: 200px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.25) 60%,
    rgba(0, 0, 0, 0.75) 100%
  ), v-bind("imageUrlCss");
  background-repeat: round round;
  background-color: grey;
}

.project h5 {
    font-size: 17pt;
    text-align: center;
    margin-top: calc(200px - 50px);
}
</style>
