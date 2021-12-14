<template>
  <div id="kg-drawer-content-body">
    <img id="kg-drawer-content-img" :src="getImageSrc(data.image)" alt="">
    <div id="kg-drawer-content-info">
      <div id="kg-drawer-content-info-name-cn">
        {{ data.name_cn }}
      </div>
      <div id="kg-drawer-content-info-name">
        {{ data.name }}
      </div>
      <div v-if="String(data.id)[0] === '1'">
        开播时间: {{ data.air_date }}
      </div>
      <div v-if="String(data.id)[0] === '1'">
        集数: {{ data.ep_num }}
      </div>
      <div id="kg-drawer-content-info-summary">{{ data.summary }}
      </div>
      <a id="kg-drawer-content-info-button" :href="data.url" target="_blank">
        <span>前往 Bangumi</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "KgDrawerContent",
  props: {
    data: Object,
  },
  data() {
    return {
      nullImageSrc: "https://mjh1.oss-cn-hangzhou.aliyuncs.com/hci/null.svg", //todo 上服务器
    };
  },
  methods: {
    getImageSrc(image) {
      return image !== null ? image.replace("http", "https") : this.nullImageSrc;
    },
  },
};
</script>

<style scoped>
#kg-drawer-content-body {
  display: flex;
  flex-direction: column;
}

#kg-drawer-content-img {
  object-fit: contain;
  width: 300px;
  height: 300px;
  margin: auto;
  border-radius: 5px;
}

#kg-drawer-content-info {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  padding: 10px;
}

#kg-drawer-content-info-name-cn {
  font-size: large;
  color: #fb7299;
  font-weight: bold;
}

#kg-drawer-content-info-name {
  font-style: italic;
  color: rgba(80, 80, 80, 0.8);
  margin-bottom: 10px;
}

#kg-drawer-content-info-summary {
  margin-top: 5px;
  display: inline-block;
  height: auto;
  white-space: pre-wrap;
}

#kg-drawer-content-info-button {
  outline: none;
  border: none;
  width: 120px;
  height: 30px;
  background: #fb7299;
  border-radius: 5px;
  margin: 20px auto auto;
  padding-left: 15px;
  padding-top: 5px;
  color: white;
}

#kg-drawer-content-info-button:hover {
  background: #e8658b;
  cursor: pointer;
}
</style>