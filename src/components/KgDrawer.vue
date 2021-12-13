<template>
  <div class="drawer">
    <div :class="maskClass" @click="closeByMask"></div>
    <div :class="mainClass" :style="mainStyle" class="main">
      <div class="drawer-head">
        <span>{{ title }}</span>
        <span v-show="closable" class="close-btn" @click="closeByButton">X</span>
      </div>
      <div class="drawer-body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否打开
    display: {
      type: Boolean
    },
    // 标题
    title: {
      type: String,
      default: "标题"
    },
    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },
    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },
    // 是否点击遮罩关闭
    maskClosable: {
      type: Boolean,
      default: true
    },
    // 宽度(支持百分比)
    width: {
      type: String,
      default: "400px"
    },
    // 是否在父级元素中打开
    inner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maskClass: function () {
      return {
        "mask-show": (this.mask && this.display),
        "mask-hide": !(this.mask && this.display),
        "inner": this.inner
      };
    },
    mainClass: function () {
      return {
        "main-show": this.display,
        "main-hide": !this.display,
        "inner": this.inner
      };
    },
    mainStyle: function () {
      return {
        width: this.width,
        right: this.display ? "0" : `-${this.width}`,
        borderLeft: this.mask ? "none" : "1px solid #eee"
      };
    }
  },
  mounted() {
    if (this.inner) {
      let box = this.$el.parentNode;
      box.style.position = "relative";
    }
  },
  methods: {
    closeByMask() {
      this.maskClosable && this.$emit("update:display", false);
    },
    closeByButton() {
      this.$emit("update:display", false);
    }
  }
};
</script>

<style scoped>
</style>

<style lang="scss" scoped>
.drawer {
  /* 遮罩 */
  .mask-show {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
    transition: opacity .5s;
    cursor: pointer;
  }

  .mask-hide {
    opacity: 0;
    transition: opacity .5s;
  }

  /* 滑块 */
  .main {
    border-radius: 10px 0 0 10px;
    position: fixed;
    z-index: 10;
    bottom: 25px;
    height: 85vh;
    backdrop-filter: saturate(100%) blur(10px);
    background: rgba(250, 250, 250, 0.8);
    box-shadow: 0 10px 10px rgba(220, 220, 220, 0.7);
    transition: all 0.5s;
  }

  .main-show {
    opacity: 1;
  }

  .main-hide {
    opacity: 0;
  }

  /* 某个元素内部显示 */
  .inner {
    position: absolute;
  }

  /* 其他样式 */
  .drawer-head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;

    .close-btn {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      padding-left: 20px;
    }
  }

  .drawer-body {
    padding: 15px;
    overflow-y: auto;
    height: 90%;
  }

  .drawer-body::-webkit-scrollbar {
    width: 10px;
    height: 1px;
  }

  .drawer-body::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 3px rgba(100, 100, 100, 0.2);
    background: #fb7299;
  }

  .drawer-body::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
  }
}
</style>