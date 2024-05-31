<template>
    <div
        class="project" @click="goToLink()"
        @mouseover="hover = true" @mouseleave="hover = false"
    >
        <h5><span v-if="hasLink && hover">
            <font-awesome-icon icon="link" />
        </span> {{ proj.name }}</h5>
    </div>
</template>

<script setup lang="ts">
const { proj } = defineProps<{
    proj: Project,
}>();
const imageUrlCss = `url(${proj.imageUrl})`;

const hasLink = (proj.link !== null) && (proj.link !== undefined);
const hover = ref(false);

function goToLink() {
    if (!hasLink) return;
    window.location.href = proj.link;
}
</script>

<style scoped>
.project {
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
  width: 300px;
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
