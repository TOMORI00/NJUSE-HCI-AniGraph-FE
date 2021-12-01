<template>
  <div class="graph-wrapper"></div>
</template>

<script>
import * as d3 from "d3";
import {getRelationsByEntityIdAPI} from "../api/relationApi";

export default {
  name: "KnowledgeGraph",
  components: {},
  data() {
    return {
      nodes: null,
      links: null,
    };
  },
  computed: {},
  async mounted() {
    // let entityId = this.$route.query.entityId;
    console.log(this.$route.query.entityId);
    let entityId = 261103;
    let res = await getRelationsByEntityIdAPI(entityId);
    this.nodes = res.data.content.Entities;
    this.links = res.data.content.Relations;
    const _this = this;
    _this.initPage();
  },
  methods: {
    initPage() {
      const _this = this;
      let w = document.body.clientWidth;
      let h = document.body.clientHeight - 64;
      _this.initGraph({
        nodes: _this.nodes,
        links: _this.links,
      }, {
        nodeFill: _this.getNodeFill,
        nodeTitle: d=>d.id,
        nodeStrength: -200,
        linkStrength: 0.1,
        width: w,
        height: h,
      });
      window.onresize = function () {
        _this.watchWindowSize();
      };
    },

    initGraph({nodes, links}, {
      nodeTitle,
      nodeFill,
      nodeStroke = "rgb(0,0,0)",
      nodeStrokeWidth = 1.5,
      nodeStrokeOpacity = 1,
      nodeRadius = 12,
      nodeStrength,
      linkStroke = "#999",
      linkStrokeOpacity = 0.6,
      linkStrokeWidth = 2,
      linkStrokeLinecap = "round",
      linkStrength,
      markerSize = 6,
      markerScale = 1,
      fontSize = 12,
      width,
      height,
      invalidation
    } = {}) {
      if (height === undefined || width === undefined) {
        return;
      }

      let svg = d3.select(".graph-wrapper")
        .append("svg")
        .attr("id", "kgSvg")
        .attr("viewBox", [0, 0, width, height]);

      const forceNode = d3.forceManyBody();
      const forceLink = d3.forceLink(links).id(d => d.id);
      if (nodeStrength !== undefined) {
        forceNode.strength(nodeStrength);

      }
      if (linkStrength !== undefined) {
        forceLink.strength(linkStrength);
      }
      const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

      let g = svg.append("g");

      // eslint-disable-next-line no-unused-vars
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

      // eslint-disable-next-line no-unused-vars
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
        .attr("fill", function (d) {
          return nodeFill === undefined ? "#e15759" : nodeFill(d.id);
        })
        .attr("class", "node")
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

      // eslint-disable-next-line no-unused-vars
      let linkText = g.append("g")
        .selectAll(".linkText")
        .data(links)
        .join("text")
        //.attr("dx", function () {
        //return this.getBoundingClientRect().width / 2 * (-1)
        //})
        .attr("dy", -5)
        .attr("id", d => "linkText" + d.id)
        .attr("font-size", fontSize)
        .attr("display", "unset")
        .attr("class", "linkText")
        .append("textPath")
        .attr("xlink:href", function (d) {
          return ("#link-" + d.id);
        })
        .style("text-anchor", "middle")
        .attr("startOffset", "50%")
        .text(d => d.name);

      svg.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([0.5, 4])
        .on("zoom", zoom))
        .on("dblclick.zoom", null);


      if (invalidation != null) invalidation.then(() => simulation.stop());

      function zoom(event) {
        g.attr("transform", event.transform);
      }

      function ticked() {
        link.attr("marker-end", function (d) {
          if (d.source.x < d.target.x) {
            return "url(#arrowheadEnd)";
          } else {
            return null;
          }
        })
          .attr("marker-start", function (d) {
            if (d.source.x < d.target.x) {
              return null;
            } else {
              return "url(#arrowheadStart)";
            }
          })
          .attr("d", function (d) {
            if (d.source.x < d.target.x) {
              return "M " + d.source.x + " " + d.source.y + " L " + d.target.x + " " + d.target.y;
            } else {
              return "M " + d.target.x + " " + d.target.y + " L " + d.source.x + " " + d.source.y;
            }
          });

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

    watchWindowSize() {
      let w = document.documentElement.clientWidth;
      let h = document.documentElement.clientHeight - 64;
      d3.select("#kgSvg").attr("viewBox", [0, 0, Math.max(w, 700), h]);
    },

    getNodeFill(id) {
      let type = String(id)[0];
      switch (type) {
        case "1":
          return "rgb(250, 114, 125)";
        case "2":
          return "rgb(45, 183, 245)";
        case "3":
          return "rgb(112, 212, 69)";
        case "4":
          return "rgb(255, 138, 12)";
      }
    },
  },
};
</script>

<style scoped>

</style>