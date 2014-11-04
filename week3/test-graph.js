"use strict";

var Graph = require("./graph").DirectedGraph,
    assert = require("chai").assert,graph;

describe('Graph', function(){

  beforeEach(function(){
    graph =  new Graph({"pepa" : ["mimi"], "mimi" : ["pepa"]});
  });

  describe("#addEdge()", function(){
    it("should add new edge to the graph", function(){
      var expected = {"pepa" : ["mimi", "lqlq"], "mimi" : ["pepa"], "lqlq" : []};

      graph.addEdge("pepa", "lqlq");
      assert.deepEqual(graph.graph,expected,"Edge added correctly!");
    })
});

  describe("#getNeighborsFor()", function(){
    it("should return all neighbors of the edge", function(){
      var expected = ["mimi", "lqlq"];
      graph.addEdge("pepa", "lqlq");
      assert.deepEqual(graph.getNeighborsFor("pepa"), expected, "Returning neighbors correctly!");
    })
  });

  describe("#toString()", function(){
    it("should print the graph",function(){
      var expected = '{"pepa":["mimi"],"mimi":["pepa"]}';
      assert.equal(graph.toString(),expected,"Printed correctly!");
    })
  });

  describe("#pathBetween()",function(){
    it("should return true if the eges are neighbors",function(){
      assert.isTrue(graph.pathBetween("pepa","mimi"),"Path found!");
    })
  });

  describe("#pathBetween()", function(){
    it("should return true if there is a path between the edges", function(){
      graph.addEdge("mimi", "lqlq");
      console.log(graph);
      assert.isTrue(graph.pathBetween("pepa","lqlq"),"Path found!")
    })
  });
});

