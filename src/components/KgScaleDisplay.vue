<template>
<div>Scale: {{scale}}</div>
</template>

<script>
export default {
  name: "KgScaleDisplay",
  data(){
    return{
      scale: 1,
    };
  },
  methods:{
    setScale(scale){
      this.scale = scale;
    },

    emitScaleChangeEvent(){
      this.$emit("scale-change", this.scale);
    },
  },
};
</script>

<style scoped>

</style>