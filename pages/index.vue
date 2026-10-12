<template>
    <div class="header">
      <h1 class="hello">Hi, I'm <FlipBoard initialText="BITSET" desiredText="LANDON" />!</h1>
      <h3>I'm an undergrad <TagFilter tag="research" text="researcher"/> and <TagFilter tag="dev" text="developer"/>, interested in <TagFilter tag="physics" text="Physics"/>, <TagFilter tag="mat sci" text="Materials Science"/>, and <TagFilter tag="comp sci" text="Comp Sci"/>.</h3>
    </div>
    <template v-for="projgroup in projectgroups">
      <TransitionGroup tag="div" class="projects" name="list">
        <template v-for="proj in projgroup" v-bind:key="proj.name">
          <ProjectCard :proj="proj"/>
        </template>
      </TransitionGroup>
      <p/>
    </template>
</template>

<script setup lang="ts">
const projectData = (
  await queryContent('/projects').findOne()
) as unknown as ProjectList;
let allProjects = readonly(ref(
  projectData.body
));
let allTags = ['research', 'dev', 'physics', 'comp sci', 'mat sci'];
let tags = ref(new Map(allTags.map(
  tag => [tag, true]
)));
provide('enabled-tags', tags);
let projects = computed(() => allProjects.value.filter(
  x => tagsMatch(x.tags, tags.value)
));
let projectgroups = computed(() => {
  let chunkSize = 5;
  let proj = projects.value.toReversed();
  return Array.from(
    {length: Math.ceil(projects.value.length / chunkSize)},
    () => proj.splice(0, chunkSize).toReversed()
  ).toReversed();
});

function permutationsOf(arr) {
  let res = [];
  const permute = (arr, m = []) => {
     if (arr.length === 0) {
       res.push(m);
     } else {
       for (let i = 0; i < arr.length; i++) {
         let curr = arr.slice();
         let next = curr.splice(i, 1);
         permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(arr);
  return res;
}

const SINGLED = [['research', 'dev'], ['physics', 'comp sci', 'mat sci']];
const ALL_PAIRS = SINGLED.flatMap(permutationsOf);

function tagsMatch(my: readonly string[], enabled: Map<string, boolean>): boolean {
  for (const [x, alt] of ALL_PAIRS) {
    if (enabled.get(x) && !enabled.get(alt) && !my.includes(x) && my.includes(alt)) {
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
  padding: 5px;
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
