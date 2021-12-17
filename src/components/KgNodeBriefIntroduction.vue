<template>
  <div id="kg-node-introduction-body">
    <img id="kg-node-introduction-img"
         :src="getImageSrc(node.image)"
         alt="图片加载失败">
    <div id="kg-node-introduction-info">
      <div id="kg-node-introduction-info-name-cn">{{ node.name_cn }}</div>
      <div id="kg-node-introduction-info-name">{{ node.name }}</div>
      <div></div>
      <div id="kg-node-introduction-info-tip2"><span style="color: #fb7299">双击</span>节点扩展图谱</div>
      <div id="kg-node-introduction-info-tip1"><span style="color: #fb7299">单击/右击</span>节点查看更多信息</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KgNodeBriefIntroduction",
  data() {
    return {
      tempImageSrc: "https://mjh1.oss-cn-hangzhou.aliyuncs.com/hci/null.svg",
      nullImageSrc: "https://mjh1.oss-cn-hangzhou.aliyuncs.com/hci/no-image.png",
    };
  },
  props: {
    node: Object,
  },
  methods: {
    getImageSrc(image) {
      return image !== null ? image.replace("http", "https") : this.nullImageSrc;
    },
  }
};
</script>

<style scoped>
#kg-node-introduction-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#kg-node-introduction-img {
  width: 100px;
  height: 100px;
  margin-right: 5px;
  object-fit: cover;
  object-position: top left;
}

#kg-node-introduction-info-name-cn {
  font-size: large;
  color: #fb7299;
  font-weight: bold;
  margin-right: 10px;
}

#kg-node-introduction-info-name {
  font-style: italic;
  color: rgba(80, 80, 80, 0.8);
}

#kg-node-introduction-info-name-cn:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>