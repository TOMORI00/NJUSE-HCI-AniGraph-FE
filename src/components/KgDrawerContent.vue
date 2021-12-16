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
      <div v-if="data.alias!==''" id="kg-drawer-content-info-alias">
        别名: {{ data.alias }}
      </div>
      <div v-if="String(data.id)[0] === '1'">
        开播时间: {{ data.air_date }}
      </div>
      <div v-if="String(data.id)[0] === '1'">
        集数: {{ data.ep_num }}
      </div>
      <div id="kg-drawer-content-info-summary">{{ data.summary }}
      </div>
      <div style="display: flex;flex-direction: row">
        <a id="kg-drawer-content-info-button-1" :href="data.url" target="_blank">
          <span>前往 Bangumi</span>
        </a>

        <a id="kg-drawer-content-info-button-2" :href="'https://search.bilibili.com/all?keyword='+data.name_cn"
           target="_blank">
          <span>前往 B站</span>
        </a>

        <a id="kg-drawer-content-info-button-3" :href="'https://www.acfun.cn/search?keyword='+data.name_cn"
           target="_blank">
          <span>前往 A站</span>
        </a>
      </div>
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
      tempImageSrc: "https://mjh1.oss-cn-hangzhou.aliyuncs.com/hci/null.svg",
      noImageSrc: "https://mjh1.oss-cn-hangzhou.aliyuncs.com/hci/noImage.png",
    };
  },
  methods: {
    getImageSrc(image) {
      return image !== null ? image.replace("http", "https") : this.noImageSrc;
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

#kg-drawer-content-info-button-1 {
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

#kg-drawer-content-info-button-1:hover {
  background: #e8658b;
  cursor: pointer;
}

#kg-drawer-content-info-button-2 {
  outline: none;
  border: none;
  width: 86px;
  height: 30px;
  background: #fb7299;
  border-radius: 5px;
  margin: 20px auto auto;
  padding-left: 15px;
  padding-top: 5px;
  color: white;
}

#kg-drawer-content-info-button-2:hover {
  background: #e8658b;
  cursor: pointer;
}

#kg-drawer-content-info-button-3 {
  outline: none;
  border: none;
  width: 86px;
  height: 30px;
  background: #fb7299;
  border-radius: 5px;
  margin: 20px auto auto;
  padding-left: 15px;
  padding-top: 5px;
  color: white;
}

#kg-drawer-content-info-button-3:hover {
  background: #e8658b;
  cursor: pointer;
}
</style>