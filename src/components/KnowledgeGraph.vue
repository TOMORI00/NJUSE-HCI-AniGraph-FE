<template>
  <div class="graph-wrapper"></div>
</template>

<script>
/* eslint-disable no-unused-vars */
import * as d3 from "d3";
import {getRelationsByEntityIdAPI} from "../api/relations";

export default {
  name: "KnowledgeGraph",
  components: {},
  data() {
    return {
      nodes: null,
      links: null,
      series: [],

      nodeRadius: 13,

      lastZoomEvent: null,

      w: null,
      h: null,
      svg: null,
      g: null,
    };
  },
  computed: {},
  async mounted() {
    let entityId = this.$route.query.entityId;
    let res = await getRelationsByEntityIdAPI(entityId);
    this.nodes = res.data.content.Entities;
    this.links = res.data.content.Relations;
    this.w = document.body.clientWidth;
    this.h = document.body.clientHeight - 64;
    this.svg = d3.select(".graph-wrapper")
      .append("svg")
      .attr("id", "kgSvg")
      .attr("viewBox", [0, 0, Math.max(this.w, 800), this.h]);
    console.log(this.svg);
    this.initPage();
    window.onresize = function () {
      let w = document.documentElement.clientWidth;
      let h = document.documentElement.clientHeight - 64;
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
        nodeTitle: d => d.id,
        nodeStrength: _this.setNodeStrength,
        nodeRadius: _this.setNodeRadius(null),
        // nodeCollision: _this.setNodeCollision,
        linkStroke: _this.setLinkFill,
        linkStrength: _this.setLinkStrength,
        linkDistance: _this.setLinkDistance,
        linkStrokeWidth: _this.setLinkStrokeWidth(null),
        fontSize: 13,
        width: _this.w,
        height: _this.h,
      });
    },

    initGraph({nodes, links}, {
      nodeTitle,
      nodeFill,
      nodeStroke = "rgb(255,255,255)",
      nodeStrokeWidth = 1.5,
      nodeStrokeOpacity = 1,
      nodeRadius = 12,
      nodeStrength,
      nodeCollision,
      linkStroke = "#999",
      linkStrokeOpacity = 0.35,
      linkStrokeWidth = 2,
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
      const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("collision", forceCollision)
        .force("center", d3.forceCenter(width / 2, height / 2))
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
          return typeof linkStrokeWidth !== "function" ? linkStrokeWidth : linkStrokeWidth(d);
        })
        .attr("stroke-dasharray", _this.setLinkStrokeDashArray)
        .attr("id", function (d) {
          return ("link-" + d.id);
        })
        .attr("stroke-opacity", linkStrokeOpacity)
        .attr("stroke-linecap", linkStrokeLinecap)
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
        .on("dblclick", _this.handleNodeDblclick)
        .call(drag(simulation));
      // 如果设置了nodeTitle的函数，那么将为每个节点添加相关的title
      if (nodeTitle !== undefined) {
        node.append("title")
          .text(function (d) {
            return nodeTitle(d);
          });
      }

      let nodeText = g.append("g")
        .selectAll(".nodeText")
        .data(nodes)
        .join("text")
        .text(d => {
          return (d.name_cn !== "" && d.name_cn !== null) ? d.name_cn : d.name;
        })
        .attr("font-size", fontSize)
        .attr("dx", function () {
          return String(this.getBoundingClientRect().width / fontSize / 2 * -1) + "em";
        })
        .attr("dy", "2em")
        .attr("class", "nodeText");

      // let linkText = g.append("g")
      //   .selectAll(".linkText")
      //   .data(links)
      //   .join("text")
      //   .attr("dy", -5)
      //   .attr("id", d => "linkText" + d.id)
      //   .attr("font-size", fontSize)
      //   .attr("display", "unset")
      //   .attr("class", "linkText")
      //   .append("textPath")
      //   .attr("xlink:href", function (d) {
      //     return ("#link-" + d.id);
      //   })
      //   .style("text-anchor", "middle")
      //   .attr("startOffset", "50%")
      //   .text(d => d.name);

      let svgZoom = d3.zoom().extent([[0, 0], [width, height]]).scaleExtent([0.5, 4]).on("zoom", zoom);

      _this.svg
        .call(svgZoom)
        .on("dblclick.zoom", null);

      if (_this.lastZoomEvent !== null) {
        zoom(_this.lastZoomEvent);
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
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
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
      return 0.1;
    },

    setLinkDistance(d) {
      return d.type !== "series" ? this.nodeRadius * 4 : this.nodeRadius * 16;
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

      // let parent = document.getElementsByClassName("graph-wrapper")[0];
      // let child = document.getElementById("kgSvg");
      // parent.removeChild(child);
      this.g.remove();
      this.initPage();
    },
  }
};
</script>

<style scoped>

</style>