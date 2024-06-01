<template>
    <div class="header">
      <h1 class="hello">Hi, I'm <FlipBoard initialText="BITSET" desiredText="LANDON" />!</h1>
      <h3>
        <span class="subheading-row">
          <span class="cell">I'm a </span><TagFilter v-model="tags" tag="research" text="researcher"/><span class="cell"> and </span><TagFilter v-model="tags" tag="software" text="developer"/><span class="cell">, currently studying </span><TagFilter v-model="tags" tag="physics" text="Physics"/><span class="cell"> and </span><TagFilter v-model="tags" tag="cs" text="Comp Sci"/><span class="cell">.</span>
        </span>
        <span class="subheading-row">
          <span class="cell"></span>
          <template v-for="tag in allTags" v-bind:key="tag">
            <span class="cell">
              <TagPill :tagName="tag" />
            </span>
            <span class="cell"></span>
          </template>
        </span>
      </h3>
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
  tag => [tag, false]
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
  display: table;
}

.header .subheading-row {
  display: table-row;
}

.header .cell {
  display: table-cell;
}

.header .hello {
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
