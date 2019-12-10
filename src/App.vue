<template>
  <div id="app">
    <header v-if="$route.path !== '/'">
      <a href="/">
        <img src="./assets/snarly-logo.png" />
      </a>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

@import './styles/_variables';

body {
  margin: 0;
}

header {
  background: white;
  padding: 40px 40px 20px;

  img {
    width: 40px;
    height: auto;
    margin: auto;
  }
}

#app {
  font-family: 'HK Grotesk', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111111;
  height: 100vh;
}
</style>
