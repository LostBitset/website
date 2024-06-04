<template>
    <div
        class="project" @click="goToLink()"
        @mouseover="hover = true" @mouseleave="hover = false"
    >
        <div class="tags">
            <div class="tag-item" v-for="tag in proj.tags" v-bind:key="tag">
                <TagPill v-model="tags" :tagName="tag" :showEnabled="false" :centered="false" />
            </div>
        </div>
        <div class="project-name">
            <h5><span v-if="hasLink && hover">
                <font-awesome-icon icon="link" />
            </span> {{ proj.name }}</h5>
        </div>
    </div>
</template>

<script setup lang="ts">
const { proj } = defineProps<{
    proj: Project,
}>();
const imageUrlCss = `url(${proj.imageUrl})`;

const tags = defineModel<Map<string, boolean>>();

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
  position: relative;
}

.project .tags {
    display: flex;
    place-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
}

.project .tags .tag-item {
    margin: 10px;
}

.project .project-name {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
}

.project .project-name h5 {
    font-size: 17pt;
    text-align: center;
}
</style>
