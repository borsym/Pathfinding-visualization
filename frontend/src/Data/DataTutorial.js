/* eslint import/no-anonymous-default-export: [2, {"allowArray": true}] */
export default [
  [
    {
      title: "Welcome to Pathfinding Visualizer!",
      subtitle:
        "This short tutorial will walk you through all of the features of this application.",
      text: [
        'If you want to dive right in, feel free to press the close button below. Otherwise, press "Next"!',
      ],
    },
  ],
  [
    {
      title: "What is a pathfinding algorithm?",
      subtitle:
        "At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!",
      text: [
        'All of the algorithms on this application are adapted for a 2D grid, from a node to another have a "cost" of 1 in deafult.',
      ],
    },
  ],
  [
    {
      title: "Picking an algorithm",
      subtitle: 'Choose an algorithm from the "Algorithms" drop-down menu.',
      text: [
        "Note that some algorithms are unweighted, while others are weighted. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path.",
      ],
    },
  ],
  [
    {
      title: "Meet the algorithms",
      subtitle: "My favorite algorithms are Dijkstra's and A*.",
      text: [
        "Dijkstra's Algorithm (weighted): the father of pathfinding algorithms; guarantees the shortest path",
        "A* Search (weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm",
        "Breath-first Search (unweighted): a great algorithm; guarantees the shortest path",
        "Depth-first Search (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path",
      ],
    },
  ],
  [
    {
      title: "Adding walls and weights",
      subtitle:
        'Click on the grid to add a wall. Click on the grid while pressing Ctrl to add a weight. Generate mazes and patterns from the "Maze" drop-down menu.',
      text: [
        "Walls are impenetrable, meaning that a path cannot cross through them. Weights, however, are not impassable.",
        'They are simply more "costly" to move through. In this application, moving through a weight nodes has differenct "cost"',
      ],
    },
  ],
];
