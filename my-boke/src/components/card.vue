<template>
  <div class="card" :style="'height:'+height+'px'">
    card
  </div>
</template>

<script>
export default {
    props:{
        height: {
            type: String,
            default: '400'
        }
    }
}
</script>

<style lang="less" scoped>
    .card{
        width: 100%;
        background-color: rgba(255, 255, 255, .5);
        color: #fff;
        box-shadow: 0px 0px 40px 0px #fff;
    }
</style>