import Blank from "../components/DnD/Blank";
/* eslint import/no-anonymous-default-export: [2, {"allowArray": true}] */
export default [
  [
    {
      Astar: {
        taskId: "dnd-1",
        words: [
          "logaritmikus",
          "negyzetes",
          "sulyozott",
          "nem sulyozott",
          "Astar",
        ],
        text: [
          "Ez egy teszt mi itt a valasz: ",
          <Blank solution={["negyzetes"]} />,
          "ha behuztad akkor huzd mar be ide is pls ",
          <Blank solution={["sulyozott", "logaritmikus"]} />,
          "nagyon ugyes vagyok",
        ],
      },
    },
  ],
  [
    {
      Dijkstra: {
        taskId: "dnd-4",
        words: [
          "logaritmikus",
          "negyzetes",
          "sulyozott",
          "nem sulyozott",
          "Dijkstra",
        ],
        text: [
          "Ez egy teszt mi itt a valasz:",
          <Blank solution={["negyzetes"]} />,
          "ha behuztad akkor huzd mar be ide is pls ",
          <Blank solution={["sulyozott", "cica"]} />,
          "nagyon ugyes vagyok",
        ],
      },
    },
  ],
  [
    {
      BFS: {
        taskId: "dnd-2",
        words: [
          "logaritmikus",
          "negyzetes",
          "sulyozott",
          "nem sulyozott",
          "BFS",
        ],
        text: [
          "Ez egy teszt mi itt a valasz:",
          <Blank solution={["negyzetes"]} />,
          "ha behuztad akkor huzd mar be ide is pls ",
          <Blank solution={["sulyozott", "cica"]} />,
          "nagyon ugyes vagyok",
        ],
      },
    },
  ],
  [
    {
      DFS: {
        taskId: "dnd-3",
        words: [
          "logaritmikus",
          "negyzetes",
          "sulyozott",
          "nem sulyozott",
          "DFS",
        ],
        text: [
          "Ez egy teszt mi itt a valasz:",
          <Blank solution={["negyzetes"]} />,
          "ha behuztad akkor huzd mar be ide is pls ",
          <Blank solution={["sulyozott", "cica"]} />,
          "nagyon ugyes vagyok",
        ],
      },
    },
  ],
];
