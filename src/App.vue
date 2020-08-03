<template>
  <div id="app">
    <img src="./res/stage525.png" style="display:block;" width="100%" alt="">
    <div id="stage"></div>
  </div>
</template>

<script>
import seats from './views/seats/index'
export default {
  name: 'App',
  mounted(){
    seats()
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 500px;
  width: 100%;
  border:1px solid #ccc;
}
#stage{
  margin-top: 10px;
  height: 440px;
  width: 100%;
}
#debug{
  width:100%;  
  padding: 0 15px;
  overflow:auto;
}
</style>
