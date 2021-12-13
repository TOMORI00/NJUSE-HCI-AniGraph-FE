<template>
  <div id="kg-wrapper" @contextmenu.prevent>
    <kg-link-brief-introduction v-show="currentLinkInfoVisible" id="kg-link-brief-introduction" :link="currentLink"/>
    <kg-node-brief-introduction v-show="currentNodeInfoVisible" id="kg-node-brief-introduction" :node="currentNode"/>
    <KgDrawer :display.sync="drawerDisplay" :width="drawerWidth" title="节点详情">
      <KgDrawerContent :data="drawerData"></KgDrawerContent>
    </KgDrawer>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import * as d3 from "d3";
import { getRelationsByEntityIdAPI } from "../api/relations";
import KgLinkBriefIntroduction from "./KgLinkBriefIntroduction";
import KgNodeBriefIntroduction from "./KgNodeBriefIntroduction";
import KgDrawer from "@/components/KgDrawer";
import KgDrawerContent from "@/components/KgDrawerContent";

export default {
  name: "KnowledgeGraph",
  components: {
    KgDrawerContent,
    KgDrawer,
    KgLinkBriefIntroduction,
    KgNodeBriefIntroduction
  },
  data() {
    return {
      drawerDisplay: false,
      drawerWidth: "500px",
      drawerData: {
        image: null,
        name_cn: null,
        name: null,
        summary: null,
      },

      nodes: null,
      links: null,
      series: [],
      //
      w: null,
      h: null,
      svg: null,
      g: null,
      //
      nodeRadius: 13,
      //
      lastZoomEvent: null,
      //
      currentLink: null,
      currentLinkInfoVisible: false,
      linkTimer: null,
      //
      nodeTimer: null,
      currentNode: null,
      currentNodeInfoVisible: false,
    };
  },
  computed: {},
  async mounted() {
    let entityId = this.$route.query.entityId;
    let res = await getRelationsByEntityIdAPI(entityId);
    this.nodes = res.data.content.Entities;
    this.links = res.data.content.Relations;
    this.w = document.body.clientWidth;
    this.h = document.body.clientHeight - Math.max(32, Math.min(64, document.body.clientHeight * 0.08));
    let headerHeight = Math.max(32, Math.min(64, document.body.clientHeight * 0.08));

    let kgWrapper = document.getElementById("kg-wrapper");
    kgWrapper.style.height = this.h + "px";

    this.svg = d3.select("#kg-wrapper")
      .append("svg")
      .attr("id", "kgSvg")
      .attr("viewBox", [0, 0, Math.max(this.w, 800), this.h]);
    this.initPage();
    window.onresize = function () {
      let w = document.documentElement.clientWidth;
      let h = document.body.clientHeight - Math.max(32, Math.min(64, document.body.clientHeight * 0.08));
      this.w = w;
      this.h = h;
      d3.select("#kgSvg").attr("viewBox", [0, 0, Math.max(w, 800), h]);
    };
  },
  methods: {
    initPage() {
      const _this = this;
      _this.initGraph({
        nodes: _this.nodes,
        links: _this.links,
      }, {
        nodeFill: _this.setNodeFill,
        nodeTitle: d => d.name,
        nodeStrength: _this.setNodeStrength,
        nodeRadius: _this.setNodeRadius(null),
        // nodeCollision: _this.setNodeCollision,
        linkStroke: _this.setLinkFill,
        linkStrength: _this.setLinkStrength,
        linkDistance: _this.setLinkDistance,
        fontSize: 13,
        width: _this.w,
        height: _this.h,
      });
    },

    initGraph({ nodes, links },
              {
                nodeTitle,
                nodeFill,
                nodeStroke = "rgb(255,255,255)",
                nodeStrokeWidth = 2,
                nodeStrokeOpacity = 1,
                nodeRadius = 12,
                nodeStrength,
                nodeCollision,
                linkStroke = "#999",
                linkStrokeOpacity = 0.35,
                linkStrokeWidth = 3,
                linkStrokeLinecap = "round",
                linkStrength,
                linkDistance,
                markerSize = 6,
                markerScale = 1,
                fontSize = 12,
                width,
                height,
                invalidation,
              } = {}) {
      const _this = this;

      if (height === undefined || width === undefined) {
        return;
      }

      const forceNode = d3.forceManyBody();
      if (nodeStrength !== undefined) {
        forceNode.strength(nodeStrength);
      }
      const forceCollision = d3.forceCollide();
      if (nodeCollision !== undefined) {
        forceCollision.radius(nodeCollision);
      }
      const forceLink = d3.forceLink(links).id(d => d.id);
      if (linkStrength !== undefined) {
        forceLink.strength(linkStrength);
      }
      if (linkDistance !== undefined) {
        forceLink.distance(linkDistance);
      }
      let wCenter = width / 2;
      let hCenter = height / 2;
      const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("collision", forceCollision)
        .force("center", d3.forceCenter(wCenter, hCenter))
        .on("tick", ticked);

      _this.g = _this.svg.append("g");
      let g = _this.g;

      let markerEnd = g.append("g")
        .append("marker")
        .attr("id", "arrowheadEnd")
        .attr("viewBox", "0 -" + String(markerSize) + " " + String(2 * markerSize) + " " + String(2 * markerSize))
        .attr("refX", (2 * markerSize + (nodeRadius + nodeStrokeWidth / 2 - linkStrokeWidth) / markerScale))
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", markerSize * markerScale)
        .attr("markerHeight", markerSize * markerScale)
        .attr("xoverflow", "visible")
        .append("svg:path")
        .attr("d", "M 0,-" + String(markerSize) + " L " + String(2 * markerSize) + ",0 L 0," + String(markerSize))
        .attr("stroke-opacity", 0.8)
        .attr("fill", "darkgrey");

      let markerStart = g.append("g")
        .append("marker")
        .attr("id", "arrowheadStart")
        .attr("viewBox", "0 -" + String(markerSize) + " " + String(2 * markerSize) + " " + String(2 * markerSize))
        .attr("refX", (0 - nodeRadius - nodeStrokeWidth / 2 + linkStrokeWidth) / markerScale)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", markerSize * markerScale)
        .attr("markerHeight", markerSize * markerScale)
        .attr("xoverflow", "visible")
        .append("svg:path")
        .attr("d", "M " + String(2 * markerSize) + ",-" + String(markerSize) + " L 0,0 L " + String(2 * markerSize) + "," + String(markerSize))
        .attr("stroke-opacity", 0.8)
        .attr("fill", "darkgrey");

      let link = g.append("g")
        .selectAll(".link")
        .data(links)
        .join("path")
        .attr("stroke", linkStroke)
        .attr("stroke-width", function (d) {
          return typeof linkStrokeWidth !== "function" ? String(linkStrokeWidth) + "px" : linkStrokeWidth(d);
        })
        .attr("stroke-dasharray", _this.setLinkStrokeDashArray)
        .attr("id", function (d) {
          return ("link-" + d.id);
        })
        .attr("stroke-opacity", linkStrokeOpacity)
        .attr("stroke-linecap", linkStrokeLinecap)
        .on("mouseover", function (event, d) {
          window.clearTimeout(_this.linkTimer);
          _this.linkTimer = window.setTimeout(async function () {
            await _this.setLinkBriefIntroductionVisible(event, d);
            await _this.handleLinkBriefIntroductionMouseout("kg-link-brief-introduction");
            await _this.setLinkBriefIntroductionLocation(event, d);
          }, 0);
        })
        .on("mouseout", function (event, d) {
          // eslint-disable-next-line no-empty
          if (event.toElement.id === "kg-link-brief-introduction") {

          } else {
            window.clearTimeout(_this.linkTimer);
            _this.linkTimer = window.setTimeout(function () {
              _this.setLinkBriefIntroductionVisible(event, d);
            }, 0);
          }
        })
        .on("mousemove", function (event, d) {
          _this.setLinkBriefIntroductionLocation(event, d);
        })
        .attr("class", "link");

      let node = g.append("g")
        .selectAll(".node")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .attr("stroke", nodeStroke)
        .attr("stroke-width", nodeStrokeWidth)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("z-index", -100)
        .attr("fill", nodeFill)
        .attr("class", "node")
        .attr("id", function (d) {
          return "node-" + d.id;
        })
        .on("dblclick", _this.handleNodeDblclick)
        .on("mouseover", function (event, d) {
          if (d === _this.currentNode) {
            window.clearTimeout(_this.nodeTimer);
          }
          _this.nodeTimer = window.setTimeout(async function () {
            handleNodeMouseover(event, d);
            await _this.setNodeBriefIntroductionVisible(event, d);
            await _this.handleNodeBriefIntroductionMouseout("kg-node-brief-introduction");
            await _this.setNodeBriefIntroductionLocation(event, d);
          }, 100);
        })
        .on("mousemove", function (event, d) {
          _this.setNodeBriefIntroductionLocation(event, d);
        })
        .on("mouseout", function (event, d) {
          _this.setNodeBriefIntroductionVisible(event, d);
          window.clearTimeout(_this.nodeTimer);
          _this.nodeTimer = window.setTimeout(function () {
            if (!_this.currentNodeInfoVisible) {
              handleNodeMouseout(event, d);
            }
          }, 100);
        })
        .on("contextmenu", function (event, d) {
          _this.drawerDisplay = true;
          _this.drawerData = d;
        })
        .on("click", function (event, d) {
          // let transformK = _this.lastZoomEvent.transform.k;
          // let transformX = _this.lastZoomEvent.transform.x;
          // let transformY = _this.lastZoomEvent.transform.y;
          // let k = 1.5;
          // _this.svg.call(svgZoom.transform, d3.zoomIdentity
          //   .scale(k)
          //   .translate(((k / transformK) * (transformX - width * 0.5) + width * 0.5) / k, ((k / transformK) * (transformY - height * 0.5) + height * 0.5) / k)
          // );

          // wCenter = wCenter + width / 2 - d.x;
          // hCenter = hCenter + height / 2 - d.y;
          // simulation.force("center", d3.forceCenter(wCenter, hCenter));
          // simulation.restart();
          // _this.svg.call(svgZoom.transform, d3.zoomIdentity);
        })
        .call(drag(simulation));
      // // 如果设置了nodeTitle的函数，那么将为每个节点添加相关的title
      // if (nodeTitle !== undefined) {
      //   node.append("title")
      //     .text(function (d) {
      //       return nodeTitle(d);
      //     });
      // }

      let defs = g.append("defs");
      let circleTextFilter = defs
        .append("filter")
        .attr("id", "nodeTextBg")
        .attr("x", -0.05)
        .attr("y", -0.05)
        .attr("width", 1.1)
        .attr("height", 1.1);

      circleTextFilter.append("feFlood")
        .attr("flood-color", "#fff")
        .attr("flood-opacity", "1");

      circleTextFilter.append("feComposite")
        .attr("in", "SourceGraphic")
        .attr("operator", "over");

      let linkText = g.append("g")
        .selectAll(".linkText")
        .data(links)
        .join("text")
        .attr("id", d => "linkText-" + d.id)
        .attr("font-size", fontSize)
        .attr("display", "none")
        .attr("dy", "-0.5em")
        .attr("class", "linkText")
        .append("textPath")
        .attr("xlink:href", function (d) {
          return ("#link-" + d.id);
        })
        .style("text-anchor", "middle")
        .attr("startOffset", "50%")
        .text(d => d.name);

      let nodeText = g.append("g")
        .selectAll(".nodeText")
        .data(nodes)
        .join("text")
        .text(d => d.name_cn)
        .attr("id", d => "nodeText-" + d.id)
        .attr("font-size", fontSize)
        .attr("dx", function () {
          return String(this.getBoundingClientRect().width / fontSize / 2 * -1) + "em";
        })
        .attr("dy", "2em")
        .attr("filter", "url(#nodeTextBg)")
        .attr("class", "nodeText");

      let svgZoom = d3.zoom().extent([[0, 0], [width, height]]).scaleExtent([0.125, 8]).on("zoom", zoom);

      _this.svg
        .call(svgZoom)
        .on("dblclick.zoom", null);

      if (_this.lastZoomEvent !== null) {
        zoom(_this.lastZoomEvent);
      } else {
        _this.svg.call(svgZoom.transform, d3.zoomIdentity);
      }

      if (invalidation != null) invalidation.then(() => simulation.stop());

      function zoom(event) {
        g.attr("transform", event.transform);
        _this.lastZoomEvent = event;
        if (event.transform.k >= 1) {
          g.selectAll("circle")
            .attr("r", nodeRadius / event.transform.k)
            .attr("stroke-width", nodeStrokeWidth / event.transform.k);
          g.selectAll("path")
            .attr("stroke-width", linkStrokeWidth / event.transform.k);
          g.selectAll(".nodeText")
            .attr("font-size", fontSize / event.transform.k);
          g.selectAll(".linkText")
            .attr("font-size", fontSize / event.transform.k);
        }
      }

      function ticked() {
        link
          .attr("d", function (d) {
            if (d.source.x < d.target.x) {
              return "M " + d.source.x + " " + d.source.y + " L " + d.target.x + " " + d.target.y;
            } else {
              return "M " + d.target.x + " " + d.target.y + " L " + d.source.x + " " + d.source.y;
            }
          });

        // link.filter(d => d.type !== "series")
        //   .attr("marker-end", function (d) {
        //     if (d.source.x < d.target.x) {
        //       return "url(#arrowheadEnd)";
        //     } else {
        //       return null;
        //     }
        //   })
        //   .attr("marker-start", function (d) {
        //     if (d.source.x < d.target.x) {
        //       return null;
        //     } else {
        //       return "url(#arrowheadStart)";
        //     }
        //   });

        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);

        nodeText
          .attr("x", d => d.x)
          .attr("y", d => d.y);
      }

      function drag(simulation) {
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }

        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }

        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }

        return d3.drag()
          .on("start", function (event) {
            _this.currentNodeInfoVisible = false;
            _this.currentNode = null;
            dragstarted(event);
          })
          .on("drag", dragged)
          .on("end", dragended);
      }

      function handleNodeMouseover(event, d) {
        let relatedNodes = [];
        for (let i = 0; i < link._groups[0].length; i++) {
          let l = link._groups[0][i].__data__;
          // if (l.source.id === d.id || (l.type ==="series" && l.target.id === d.id)) {
          if (l.source.id === d.id || l.target.id === d.id) {
            relatedNodes.push(l.source.id);
            relatedNodes.push(l.target.id);
            d3.select("#link-" + l.id)
              .attr("stroke", "#096dd9");
            d3.select("#linkText-" + l.id)
              .attr("display", "unset");
          }
        }
        relatedNodes = Array.from(new Set(relatedNodes));
        for (let i = 0; i < node._groups[0].length; i++) {
          let n = node._groups[0][i].__data__;
          if (relatedNodes.indexOf(n.id) !== -1) {
            d3.select("#node-" + n.id)
              .attr("stroke-width", (nodeStrokeWidth / Math.max(1, _this.lastZoomEvent.transform.k)))
              .attr("stroke", "#096dd9");
          }
        }
      }

      function handleNodeMouseout(event, d) {
        let relatedNodes = [];
        for (let i = 0; i < link._groups[0].length; i++) {
          let l = link._groups[0][i].__data__;
          // if (l.source.id === d.id || (l.type ==="series" && l.target.id === d.id)) {
          if (l.source.id === d.id || l.target.id === d.id) {
            relatedNodes.push(l.source.id);
            relatedNodes.push(l.target.id);
            d3.select("#link-" + l.id)
              .attr("stroke", linkStroke);
            d3.select("#linkText-" + l.id)
              .attr("display", "none");
          }
        }
        relatedNodes = Array.from(new Set(relatedNodes));
        for (let i = 0; i < node._groups[0].length; i++) {
          let n = node._groups[0][i].__data__;
          if (relatedNodes.indexOf(n.id) !== -1) {
            d3.select("#node-" + n.id)
              .attr("stroke-width", nodeStrokeWidth / Math.max(1, _this.lastZoomEvent.transform.k))
              .attr("stroke", nodeStroke);
          }
        }
      }
    },

    setLinkStrokeDashArray(d) {
      return d.type === "series" ? "5,5" : "1,0";
    },

    setNodeFill(d) {
      let type = String(d.id)[0];
      switch (type) {
        case "1":
          // return "rgb(250, 114, 125)";
          return "#ff7875";
        case "2":
          return "rgb(45, 183, 245)";
        case "3":
          return "rgb(112, 212, 69)";
        case "4":
          // return "rgb(255, 138, 12)";
          return "#ffa940";
        default:
          return "#fb7299";
      }
    },

    setNodeStrength(d) {
      return d.name_cn.length * -3 * this.nodeRadius;
    },

    setNodeCollision(d) {
      let nodeTextLen = d.name_cn.length;
      return nodeTextLen / 2 * 8;
    },

    setNodeRadius(d) {
      return this.nodeRadius;
    },

    setLinkStrength(d) {
      return 0.15;
    },

    setLinkDistance(d) {
      return d.type !== "series" ? this.nodeRadius * 8 : this.nodeRadius * 20;
    },

    setLinkFill(d) {
      switch (d.type) {
        case "series":
          return "#ff7875";
        default:
          return "#999";
      }
    },

    setLinkStrokeWidth(d) {
      return 2.75;
    },

    async handleNodeDblclick(event, d) {
      let res = await getRelationsByEntityIdAPI(d.id);
      let newNodes = [];
      let newLinks = [];
      let nodeIds = [];
      let linkIds = [];

      for (let link of this.links) {
        newLinks.push({
          id: link.id,
          source: link.source.id,
          target: link.target.id,
          name: link.name,
          type: link.type,
        });
        linkIds.push(link.id);
      }
      for (let node of this.nodes) {
        newNodes.push({
          id: node.id,
          url: node.url,
          name: node.name,
          name_cn: node.name_cn,
          summary: node.summary,
          image: node.image,
          image_grid: node.image_grid,
          alias: node.alias,
          ep_num: node.ep_num,
          air_date: node.air_date,
          x: node.x,
          y: node.y,
        });
        nodeIds.push(node.id);
      }

      for (let newLink of res.data.content.Relations) {
        if (linkIds.indexOf(newLink.id) !== -1) {
          continue;
        }
        // if (newLink.type === "series" &&
        //   nodeIds.indexOf(newLink.source) !== -1 &&
        //   nodeIds.indexOf(newLink.target) !== -1) {
        //   continue;
        // }
        newLinks.push(newLink);
      }
      this.links = newLinks;

      for (let newNode of res.data.content.Entities) {
        if (nodeIds.indexOf(newNode.id) !== -1) {
          continue;
        }
        newNode.x = 0;
        newNode.y = 0;
        newNodes.push(newNode);
      }
      this.nodes = newNodes;

      // let parent = document.getElementsByClassName("kg-wrapper")[0];
      // let child = document.getElementById("kgSvg");
      // parent.removeChild(child);
      this.currentLinkInfoVisible = false;
      this.currentLink = null;
      this.currentNodeInfoVisible = false;
      this.currentNode = null;
      this.g.remove();
      this.initPage();
    },

    setLinkBriefIntroductionVisible(event, d) {
      const _this = this;
      if (event.type === "mouseover") {
        _this.currentLink = d;
        _this.currentLinkInfoVisible = true;
      } else if (event.type === "mouseout") {
        _this.currentLink = null;
        _this.currentLinkInfoVisible = false;
      }
    },

    setLinkBriefIntroductionLocation(event, d) {
      const _this = this;
      if (_this.currentLinkInfoVisible) {
        let linkBriefIntroduction = document.getElementById("kg-link-brief-introduction");
        linkBriefIntroduction.style.top = String(event.offsetY - linkBriefIntroduction.offsetHeight) + "px";
        linkBriefIntroduction.style.left = String(event.offsetX) + "px";
      }
    },

    handleLinkBriefIntroductionMouseout(id) {
      const _this = this;
      let element = document.getElementById(id);
      element.onmouseout = function (event) {
        if (event.toElement.id !== "link-" + String(_this.currentLink.id)) {
          _this.currentLinkInfoVisible = false;
          _this.currentLink = null;
        }
      };
    },

    setNodeBriefIntroductionVisible(event, d) {
      const _this = this;
      if (event.type === "mouseover") {
        _this.currentNode = d;
        _this.currentNodeInfoVisible = true;
      } else if (event.type === "mouseout") {
        _this.currentNode = null;
        _this.currentNodeInfoVisible = false;
      }
    },

    setNodeBriefIntroductionLocation(event, d) {
      const _this = this;
      if (_this.currentNodeInfoVisible) {
        let nodeBriefIntroduction = document.getElementById("kg-node-brief-introduction");
        nodeBriefIntroduction.style.top = String(event.offsetY - nodeBriefIntroduction.offsetHeight - 6) + "px";
        nodeBriefIntroduction.style.left = String(event.offsetX + 6) + "px";
      }
    },

    handleNodeBriefIntroductionMouseout(id) {
      const _this = this;
      let element = document.getElementById(id);
      element.onmouseout = function (event) {
        if (event.toElement.id !== "node-" + String(_this.currentNode.id)) {
          _this.currentLNodeInfoVisible = false;
          _this.currentLNode = null;
        }
      };
    },
  }
};
</script>

<style>
#kg-wrapper {
  position: relative;
  margin: 0;
  padding: 0;
}

#kg-link-brief-introduction {
  position: absolute;
  backdrop-filter: saturate(100%) blur(10px);
  background: rgba(240, 240, 240, 0.7);
  box-shadow: 0 10px 10px rgba(220, 220, 220, 0.7);
  border-radius: 5px;
  padding: 5px;
  display: flex;
}

#kg-node-brief-introduction {
  position: absolute;
  backdrop-filter: saturate(100%) blur(10px);
  background: rgba(240, 240, 240, 0.7);
  box-shadow: 0 10px 10px rgba(220, 220, 220, 0.7);
  border-radius: 5px;
  padding: 5px;
  display: flex;
}
</style>