<template>
  <div>
    <div style="display: inline-block;height: 300px;margin-left: 70px">
      <a-slider v-model="scale"
                :default-value="30"
                :tipFormatter="tipFormatter"
                @change="changeScale"
                tooltipPlacement="right"
                vertical/>
    </div>
  </div>
</template>

<script>
import {Slider as ASlider,} from "ant-design-vue";

export default {
  name: "KgScaleDisplay",
  data() {
    return {
      scale: 50,
    };
  },
  components: {
    ASlider,
  },
  methods: {
    tipFormatter() {
      if (this.scale >= 50) {
        return (this.scale - 50) / 50 * 7 + 1;
      } else {
        return 1 / ((50 - this.scale) / 50 * 7 + 1);
      }
    },

    setScale(k) {
      if (k >= 1) {
        this.scale = (k - 1) / 7 * 50 + 50;
      }else{
        this.scale = 50 - (1 / k - 1) / 7 * 50;
      }
    },

    emitScaleChangeEvent(scale) {
      this.$emit("scale-change", scale);
    },

    changeScale(current) {
      let k;
      if (current >= 50) {
        k = (current - 50) / 50 * 7 + 1;
      } else {
        k = 1 / ((50 - current) / 50 * 7 + 1);
      }
      this.emitScaleChangeEvent(k);
    },
  },
};
</script>

<style scoped>

</style>