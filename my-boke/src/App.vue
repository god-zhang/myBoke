<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Look</router-link> |
      <router-link to="/home">Home</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
