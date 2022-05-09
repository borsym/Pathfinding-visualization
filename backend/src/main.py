from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.model import (
    AnswersQuestions,
    UserId,
    UserIdName,
    CordinatesItem,
    CordinatesStartMove,
)
from src.persistance.Table import Table
from src.algorithms.bfs import BFS
from src.algorithms.dfs import DFS
from src.algorithms.astar import Astar
from src.algorithms.dijkstra import Dijkstra
from src.algorithms.recursive_division import RecursiveDivison
from src.algorithms.random_maze import RandomMaze
from src.algorithms.distances import Distance
from src.persistance.Node import Node
from src.persistance.Fields import Fields
from src.database_firebase import (
    get_solution_qtype_id,
    set_user_points,
    set_user_points_zero,
    new_user,
)
import gc
start_x, start_y, end_x, end_y, map_x, map_y = 10, 15, 10, 35, 20, 50
start = Node(start_x, start_y, Fields.START)
end = Node(end_x, end_y, Fields.END)
table = Table(map_x, map_y, start, end)
distance = Distance()

# change the heuristic
class Distance(BaseModel):
    distance: str

    def get_distance_formula(self):
        return self.distance


# refresh the board
class InitialState(BaseModel):
    is_refreshed: bool

    def refresh_board(self, is_refreshed, start_x, start_y, end_x, end_y):
        if is_refreshed:
            table.refresh_board(start_x, start_y, end_x, end_y)


app = FastAPI()
app.distance_formula = "Euclidean"

origins = ["http://localhost:3000", "localhost:3000"]
# define CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# if the user visited the site refresh the board
@app.post("/", tags=["root"])
async def get_table(refreshed: InitialState):
    refreshed.refresh_board(refreshed.is_refreshed, start_x, start_y, end_x, end_y)


# clear the board, before starting the maze generation
@app.post("/api/clearForMaze", tags=["clearforMaze"])
async def clear_for_maze(refreshed: InitialState):
    refreshed.refresh_board(
        refreshed.is_refreshed,
        table.start.get_x(),
        table.start.get_y(),
        table.end.get_x(),
        table.end.get_y(),
    )


# Maze solvers
@app.get("/api/BFS", tags=["BFS"])
async def get_bfs() -> dict:
    bfs = BFS(table, table.get_start())
    order, shorthest_path = bfs.start_bfs()
    return {"path": order, "shortestPath": shorthest_path}


@app.get("/api/Dijkstra", tags=["function"])
async def get_dijkstra() -> dict:
    dijkstra = Dijkstra(table, table.get_start(), table.get_end())
    order, shorthest_path = dijkstra.start_dijsktra()
    return {"path": order, "shortestPath": shorthest_path}


@app.get("/api/DFS", tags=["DFS"])
async def get_dfs() -> dict:
    dfs = DFS(table, table.get_start())
    order, shorthest_path = dfs.start_dfs()
    return {"path": order, "shortestPath": shorthest_path}


@app.get("/api/Astar", tags=["Astar"])
async def get_astar() -> dict:
    astar = Astar(
        table,
        table.get_start(),
        table.get_end(),
        distance.get_distance(app.distance_formula),
    )
    order, shorthest_path = astar.start_astar()
    return {"path": order, "shortestPath": shorthest_path}


# Maze Generation
@app.get("/api/RecursiveDivision", tags=["Maze generation"])
async def get_recursive_divison() -> dict:
    recdiv = RecursiveDivison(
        table,
        0,
        0,
        table.get_column_size(),
        table.get_row_size(),
        table.get_start(),
        table.get_end(),
    )
    order = recdiv.start_divide()
    return {"order": order}


@app.get("/api/Random", tags=["Maze generation"])
async def get_random_maze() -> dict:
    random_maze = RandomMaze(
        table,
        0,
        0,
        table.get_column_size(),
        table.get_row_size(),
        table.get_start(),
        table.get_end(),
    )
    order = random_maze.generate()
    return {"order": order}


# Types
@app.get("/api/getTypes", tags=["Types"])
async def get_types() -> dict:
    d = {}
    for i in table.get_grid():
        for j in i:
            if j.get_weight() > 0 and j.get_weight() < 100:
                d[f"node-{j.get_x()}-{j.get_y()}"] = j.get_weight()
    return {"dict": d}


# Restart points
@app.post("/api/restartpoints", tags=["Restart Points"])
async def restart_points(items: UserId):
    set_user_points_zero(items.get_uid())


# user
@app.post("/api/user", tags=["Restart Points"])
async def user(items: UserIdName):
    new_user(items.get_uid(), items.get_name())


# Quize
@app.post("/api/quize/{algorithm}", tags=["DragAndDrop"])
async def post_solution_quize(items: AnswersQuestions):
    result = {}
    response = get_solution_qtype_id(
        items.get_algorithm(), items.get_questionType(), items.get_id()
    )
    idx = 0
    points = 0

    for key, value in items.get_answers().items():
        if value:
            result[key] = value == response
            points += 1 if value == response else 0
        idx += 1
    set_user_points(items.get_uid(), points)

    return result


# Dnd
@app.post("/api/dnd/{algorithm}", tags=["DragAndDrop"])
async def post_solution_dnd(items: AnswersQuestions):
    result = {}
    response = get_solution_qtype_id(
        items.get_algorithm(), items.get_questionType(), items.get_id()
    )
    idx = 0
    points = 0
    for key, value in items.get_answers().items():
        if value:
            result[key] = value == response[idx]
            points += 1 if value == response[idx] else 0
        idx += 1
    set_user_points(items.get_uid(), points)
    return result


# DropDown
@app.post("/api/dropdown/{algorithm}", tags=["DropDown"])
async def post_solution_dropdown(items: AnswersQuestions):
    result = {}
    response = get_solution_qtype_id(
        items.get_algorithm(), items.get_questionType(), items.get_id()
    )

    points = 0
    for key, value in items.get_answers().items():
        result[key] = response[key] == value
        points += 1 if response[key] == value else 0
    set_user_points(items.get_uid(), points)
    return result


# Others
@app.post("/api/wallUpdate")
async def refresh_table(item: CordinatesItem):
    list = item.get_list()
    type = Fields.get_field_by_name(item.get_type())
    for i in range(table.get_row_size() + 1):
        for j in range(table.get_column_size() + 1):
            if [i, j] in list:
                field_type = (
                    Fields.EMPTY if table.get_node_field(i, j) == type else type
                )
                if [i, j] not in [[start_x, start_y], [end_x, end_y]]:
                    table.set_node_field(i, j, field_type)
    del list
    gc.collect()
    return item


@app.post("/api/changeDistance")
async def set_distance_formula(item: Distance):
    app.distance_formula = item.get_distance_formula()
    return item


@app.post("/api/moveStartEnd")
async def move_start_end(item: CordinatesStartMove):
    end = item.get_end()
    start = item.get_start()

    field_type = Fields.START if item.get_type() == -1 else Fields.END

    table.set_node_field(end[0], end[1], field_type)
    table.change_start(
        end[0], end[1]
    ) if field_type == Fields.START else table.change_end(end[0], end[1])
    table.set_node_field(start[0], start[1], Fields.EMPTY)

    return item


# ./backend -> uvicorn src.main:app --reload
