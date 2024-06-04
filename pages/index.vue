<template>
    <div class="header">
      <h1 class="hello">Hi, I'm <FlipBoard initialText="BITSET" desiredText="LANDON" />!</h1>
      <h3>I'm a <TagFilter v-model="tags" tag="research" text="researcher"/> and <TagFilter v-model="tags" tag="software" text="developer"/>, currently studying <TagFilter v-model="tags" tag="physics" text="Physics"/> and <TagFilter v-model="tags" tag="cs" text="Comp Sci"/>.</h3>
    </div>
    <TransitionGroup tag="div" class="projects" name="list">
        <template v-for="proj in projects" v-bind:key="proj.name">
          <ProjectCard :proj="proj"/>
        </template>
    </TransitionGroup>
</template>

<script setup lang="ts">
const projectData = (
  await queryContent('/projects').findOne()
) as unknown as ProjectList;
let allProjects = readonly(ref(
  projectData.body
));
let allTags = ['research', 'software', 'physics', 'cs'];
let tags = ref(new Map(allTags.map(
  tag => [tag, true]
)));
let projects = computed(() => allProjects.value.filter(
  x => tagsMatch(x.tags, tags.value)
));

function tagsMatch(my: readonly string[], enabled: Map<string, boolean>): boolean {
  for (const [x, alt] of [
    ['software', 'research'],
    ['research', 'software'],
    ['cs', 'physics'],
    ['physics', 'cs'],
  ]) {
    if (enabled.get(x) && !enabled.get(alt) && !my.includes(x)) {
      return false;
    }
  }
  return true;
}
</script>

<style scoped>
.header {
  --font-size: 60pt;
}

.header h1 {
  font-size: var(--font-size);
}

.header h3 {
  font-size: 25pt;
}

.header * {
  text-align: center;
}

.projects {
  display: flex;
  place-content: center;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
