<template>
  <main>
    <div>
      <slot></slot>
    </div>
  </main>
</template>

<style>
body {
  background-color: #0d0d0d;
  color: snow;
  font-family: sans-serif;
  margin: 0;
}

main {
  display: flex;
  place-content: center;
  align-items: center;
  height: 100vh;
}
</style>
