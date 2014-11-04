"use strict";

var Graph = require("./graph").DirectedGraph,
    assert = require("chai").assert;

describe('Graph', function(){

  beforeEach(function(){
    var graph =  Graph({"pepa" : ["mimeto"], "mimeto" : ["pepa"]});
  });


  describe("#addEdge()", function(){
    it('should add new edge to the graph', function(){
      var expected = {"pepa" : ["mimeto", "mimi"], "mimeto" : ["pepa"], "mimi" : []};
      graph.addEdge("pepa", "mimi");
      assert.deepEqual(graph,expected,"Edge added correctly!");
      done();
    })
});
});

