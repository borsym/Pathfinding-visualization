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
  [
    {
      title: "Different Types!",
      subtitle:
        "There are many different type of weights which can be added to the grid. You can add a weight to a node by clicking on it while pressing Ctrl.",
      text: ['You can choose the weights from the "Type" drop-down menu'],
    },
  ],
  [
    {
      title: "Questions!",
      subtitle:
        "For each algorithm there are a few questions that you can solve.",
      text: [
        "Click on the question button to see the question.",
        "There are 3 types of questions.",
        "Multiple choice questions - Dropdown answer questions - Drag and Drop",
      ],
    },
  ],
  [
    {
      title: "Enjoy!",
      subtitle:
        "I hope you have just as much fun playing around with this visualization tool as I had building it!",
      text: ["Contact me at:", "borsymatee@gmail.com - github.com/borsym"],
    },
  ],
];
