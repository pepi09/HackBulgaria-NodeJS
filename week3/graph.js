"use strict";

var assert = require("assert");

function DirectedGraph(graph){
  this.graph = graph;
}

DirectedGraph.prototype.addEdge = function(nodeA, nodeB){
   graph.nodeA = graph.nodeA || [];
   graph.nodeB = graph.nodeB || [];
   graph.nodeA.push(nodeB);
  }

DirectedGraph.prototype.getNeighborsFor = function(node){
    return graph.node;
  }

DirectedGraph.prototype.pathBetween = function(nodeA, nodeB){
    if (graph.nodeA.contains(nodeB)){
      return true;
    }
    else{
      return false;
    }

  }


DirectedGraph.prototype.toString = function(){
    return graph;
  }

module.exports = DirectedGraph
