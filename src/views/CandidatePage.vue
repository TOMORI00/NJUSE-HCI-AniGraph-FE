<template>
  <div id="candidate-page-body" v-title data-title="AniGraph | 搜索候选">
    <GlobalHeader id="candidate-page-header" :current-page="currentPage"></GlobalHeader>
    <div v-if="loadingCandidateContent" id="candidate-page-main-none-match">
      <a-spin size="large" style="color: #fb7299"></a-spin>
    </div>
    <div v-if="noneCandidateContent" id="candidate-page-main-no-result">
      <CandidateNotFoundTip></CandidateNotFoundTip>
    </div>
    <div id="candidate-page-main">
      <div v-for="(item, i) in candidateContent"
           id="candidate-page-list"
           :key="i"
           class="candidate-page-list-content">
        <img :src="getImageSrc(item.image)"
             alt=""
             class="candidate-page-list-content-background">
        <div style="text-align: center; width: 120px; height: 120px;">
          <img :src="getImageSrc(item.image)"
               alt="图片加载失败"
               class="candidate-page-list-content-img"
               @click="toGraph(item.id, item.name_cn)">
        </div>
        <div class="candidate-page-list-content-description">
          <div class="candidate-page-list-content-title">
            <div class="candidate-page-list-content-title-name-cn"
                 @click="toGraph(item.id, item.name_cn)">{{ item.name_cn }}
            </div>
            <div class="candidate-page-list-content-title-name">{{ item.name }}</div>
          </div>
          <div class="candidate-page-list-content-summary">
            {{ decodeURIComponent(String(item.summary).replace(/%/g, "%25")) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Spin as ASpin} from "ant-design-vue";
import GlobalHeader from "@/components/GlobalHeader";
import CandidateNotFoundTip from "@/components/CandidateNotFoundTip";
import {searchEntityByNameAPI} from "@/api";

export default {
  name: "CandidatePage",
  components: {CandidateNotFoundTip, GlobalHeader, ASpin},
  data() {
    return {
      currentPage: "CandidatePage",
      candidateContent: [],
      loadingCandidateContent: false,
      noneCandidateContent: false,

      nullImageSrc: "https://mjh1.oss-cn-hangzhou.aliyuncs.com/hci/no-image.png", //todo 上服务器
    };
  },
  computed: {},
  mounted() {
    this.loadingCandidateContent = true;
    searchEntityByNameAPI(decodeURIComponent(String(this.$route.query.q)))
      .then((res) => {
        this.candidateContent = res.data.content;
        this.loadingCandidateContent = false;
        if (this.candidateContent.length === 0) {
          this.noneCandidateContent = true;
        }
      });
  },
  methods: {
    toGraph(id, name_cn) {
      this.$router.push({path: "/graph", query: {entityId: id, q: name_cn}});
    },

    getImageSrc(image) {
      return image !== null ? image.replace("http", "https") : this.nullImageSrc;
    },
  },
};
</script>

<style scoped>
#candidate-page-header {
  position: sticky;
  top: 0;
  z-index: 999;
}

#candidate-page-main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5vh;
}

.candidate-page-list-content {
  width: 50vw;
  min-width: 500px;
  margin-bottom: 35px;
  display: flex;
  padding: 5px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 4px 5px 0 rgba(150, 150, 150, 1);
  z-index: 2;
  overflow: hidden;
}

.candidate-page-list-content:hover {
  bottom: 3px;
}

.candidate-page-list-content-background {
  position: absolute;
  object-fit: cover;
  object-position: 50% 25%;
  top: 1px;
  left: 1px;
  width: 100%;
  height: 98%;
  opacity: 20%;
  filter: blur(20px);
  z-index: -1;
}

.candidate-page-list-content-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  object-position: top left;
}

.candidate-page-list-content-img:hover {
  cursor: pointer;
}

.candidate-page-list-content-description {
  margin-left: 10px;
}

.candidate-page-list-content-title {
  display: flex;
  flex-direction: column;
}

.candidate-page-list-content-title-name-cn {
  font-size: large;
  color: #fb7299;
  font-weight: bold;
  margin-right: 10px;
}

.candidate-page-list-content-title-name {
  font-style: italic;
  color: rgba(80, 80, 80, 0.8);
}

.candidate-page-list-content-title-name-cn:hover {
  cursor: pointer;
  text-decoration: underline;
}

.candidate-page-list-content-summary {
  color: rgba(0, 0, 0, 0.80);
  margin-top: 5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  white-space: pre-line;
  font-size: small
}

.candidate-page-list-content-summary:before {
  content: "简介:";
  color: black;
  display: inline-block;
}

#candidate-page-main-none-match {
  margin-top: 40vh;
  display: flex;
  align-content: center;
  justify-content: center;
}

/deep/ .ant-spin-dot-item {
  background-color: #fb7299;
}

#candidate-page-main-no-result {
  margin-top: 30vh;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>