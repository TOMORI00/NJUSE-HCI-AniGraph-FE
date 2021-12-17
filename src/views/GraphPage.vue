<template>
  <div class="graph-page">
    <global-header :current-page="'GraphPage'" @show-modal="visible=true;"/>
    <knowledge-graph/>

    <a-modal id="kg-tips" v-model="visible" title="图谱教程" @ok="handleOk"
             :footer="null"
             :width="880">
      <a-carousel :after-change="onChange" arrows>
        <div
          slot="prevArrow"
          class="custom-slick-arrow"
          style="left: -33px;z-index: 1"
        >
          <a-icon type="left-circle"/>
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="right: -31px">
          <a-icon type="right-circle"/>
        </div>
        <div>
          <img class="kg-tip-img" src="../assets/search.png">
        </div>
        <div>
          <img class="kg-tip-img" src="../assets/legend-filter.png">
        </div>
        <div>
          <img class="kg-tip-img" src="../assets/scale-display.png">
        </div>
        <div>
          <img class="kg-tip-img" src="../assets/mouseover.png">
        </div>
        <div>
          <img class="kg-tip-img" src="../assets/nodeclick.png">
        </div>
        <div>
          <img class="kg-tip-img" src="../assets/nodedblclick.png">
        </div>
      </a-carousel>
    </a-modal>
  </div>
</template>

<script>
import Vue from "vue";
import GlobalHeader from "../components/GlobalHeader";
import KnowledgeGraph from "../components/KnowledgeGraph";
import "ant-design-vue/dist/antd.css";
import {Modal as AModal, Carousel as ACarousel, Icon as AIcon} from "ant-design-vue";

Vue.use(AModal);
Vue.use(ACarousel);
Vue.use(AIcon);

export default {
  name: "GraphPage",
  components: {
    GlobalHeader,
    KnowledgeGraph,
    AModal,
    ACarousel,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },

    onChange(a, b, c) {
      console.log(a, b, c);
    },
  },
  mounted() {
    document.styleSheets[0].insertRule("#app {overflow-y: scroll;}", 0);
    document.styleSheets[0].insertRule("#app::-webkit-scrollbar {width: 0;}", 0);
  },
  beforeDestroy() {
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].deleteRule(0);
  },
};
</script>
<style scoped>
.graph-page {
  height: 100%;
}

.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 450px;
  line-height: 160px;
  background: ghostwhite;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fb7299;
  /*background-color: rgba(31, 45, 61, 0.11);*/
  opacity: 0.5;
}

.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}

.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.8;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

.kg-tip-img{
  width: 800px;
  height: 450px;
  object-position: 50% 50%;
}

/deep/ .ant-modal-body{
  padding-left: 40px;
  padding-right: 40px;
  background: ghostwhite;
}

/deep/ .ant-modal-header{
  background: ghostwhite;
}

/deep/ .ant-modal{
  top: 15vh;
}
</style>