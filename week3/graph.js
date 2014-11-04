"use strict";

var assert = require("assert");

function DirectedGraph(graph){
  this.graph = graph;
  this.path = [];
}

DirectedGraph.prototype.addEdge = function(nodeA, nodeB){
   this.graph[nodeA] = this.graph[nodeA] || [];
   this.graph[nodeB] = this.graph[nodeB] || [];
   this.graph[nodeA].push(nodeB);
  }

DirectedGraph.prototype.getNeighborsFor = function(node){
    return this.graph[node];
  }

DirectedGraph.prototype.pathBetween = function(nodeA, nodeB){

  var contains = function(arr, el){
    return arr.some(function(elem){
      return elem === el; });
  }

  if (contains(this.graph[nodeA],nodeB)) {
      return true;
    }
  //else{
    if (this.graph[nodeA] !== []){
        var that = this;
        this.graph[nodeA].forEach(function(neighbor){

          if (!contains(that.path,neighbor)){
            that.path.push(neighbor);
            if(that.pathBetween(neighbor,nodeB)){
              return true;
            }
          }
        });
    }
    else{
      return false;
    }
    //}
return false;
  }


DirectedGraph.prototype.toString = function(){
    return JSON.stringify(this.graph);
  }

exports.DirectedGraph = DirectedGraph
