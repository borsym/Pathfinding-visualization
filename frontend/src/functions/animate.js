function animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, speed) {
  //   // ez már fix nem ide kell...
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      // eljutot a végére...
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, speed * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node[0]}-${node[1]}`).className =
        "node-style bg-visited-node-blue animate-fillBoxVisited";
    }, speed * i);
  }
}

function animateShortestPath(nodesInShortestPathOrder) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node[0]}-${node[1]}`).className =
        "node-style bg-yellow-100";
    }, 50 * i);
  }
}
