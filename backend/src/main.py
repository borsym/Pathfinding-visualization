from http.client import OK
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from persistance.Table import Table
from algorithms.bfs import BFS
from algorithms.dfs import DFS
from algorithms.astar import Astar
from algorithms.dijkstra import Dijkstra
from algorithms.recursive_division import RecursiveDivison
from algorithms.random_maze import RandomMaze
from algorithms.distances import Distance 
from persistance.Node import Node
from persistance.Fields import Fields
from model import Questions, Solutions
from database import (
    fetch_one_question,
    fetch_all_questions,
    create_question,
    # update_question,
    fetch_one_solution,
    fetch_all_solutions,
    create_solution,
)

from database_firebase import (get_solution_qtype_id, set_user_points, set_user_points_zero, new_user)

start_x, start_y, end_x, end_y, map_x, map_y = 10,15,10,35,20,50
start = Node(start_x, start_y , Fields.START)
end = Node(end_x, end_y, Fields.END)
table = Table(map_x, map_y, start, end)
distance = Distance()



class CordinatesItem(BaseModel):
    cordinates : list
    type : int

    def print_cords(self):
        for i in self.cordinates:
            print(i)

    def get_list(self):
        return self.cordinates
    
    def get_type(self):
        return self.type

class CordinatesStartMove(BaseModel):
    start : list
    end: list
    type : int

    def print_cords(self):
        for i in self.start:
            print(i)
        for i in self.end:
            print(i)

    def get_start(self):
        return self.start
    
    def get_end(self):
        return self.end
    
    def get_type(self):
        return self.type

class InitialState(BaseModel):
    is_refreshed : bool
    
    def refresh_board(self,is_refreshed, start_x, start_y, end_x, end_y):
        print(is_refreshed)
        if is_refreshed:
            table.refresh_board(start_x, start_y, end_x, end_y)

class Distance(BaseModel):
    distance : str

    def get_distance_formula(self):
        return self.distance

class DropDownAnswers(BaseModel):
    answers : dict
    algorithm : str
    questionsType : str
    id: str
    uid: str

    def get_id(self):
        return self.id

    def get_answers(self):
        return self.answers

    def get_algorithm(self):
        return self.algorithm
    
    def get_questionType(self):
        return self.questionsType

    def get_uid(self):
        return self.uid

class UserId(BaseModel):
    uid : str

    def get_uid(self):
        return self.uid

class UserIdName(BaseModel):
    uid: str
    name: str

    def get_uid(self):
        return self.uid

    def get_name(self):
        return self.name

app = FastAPI()
app.distance_formula = "Euclidean"

origins = [
    'http://localhost:3000',
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/", tags=["root"])
async def get_table(refreshed : InitialState):
    refreshed.refresh_board(refreshed.is_refreshed, start_x,start_y,end_x,end_y)

@app.post("/api/clearForMaze", tags=["clearforMaze"])  # itt át kell adnom a start.x,y end.x.y és ugy már jónak kell lennie de akkor új initialState kell
async def clear_for_maze(refreshed : InitialState):
    refreshed.refresh_board(refreshed.is_refreshed, table.start.get_x(),table.start.get_y(), table.end.get_x(), table.end.get_y())

#Maze solvers
@app.get("/api/BFS", tags=["BFS"])
def get_bfs() -> dict:
    bfs = BFS(table, (table.get_start().get_x(), table.get_start().get_y()))
    order, shorthest_path = bfs.start_bfs()
    return {
        "path":order,
        "shortestPath":shorthest_path
    }

@app.get("/api/Dijkstra", tags=["function"])
async def get_dijkstra() -> dict:
    dijkstra = Dijkstra(table,table.get_start(),table.get_end())
    order,shorthest_path = dijkstra.start_dijsktra()
    return {
        "path": order,
        "shortestPath": shorthest_path
    }

@app.get("/api/DFS", tags=["DFS"])
async def get_dfs() -> dict:
    dfs = DFS(table, table.get_start())
    order,shorthest_path = dfs.start_dfs()
    return {
        "path": order,
        "shortestPath": shorthest_path
    }

@app.get("/api/Astar", tags=["Astar"])
async def get_astar() -> dict:
    astar = Astar(table, table.get_start(), table.get_end(), distance.get_distance(app.distance_formula))
    # print(table.get_start().get_x(), table.get_start().get_y())
    order, shorthest_path = astar.start_astar()
    return {
        "path": order,
        "shortestPath": shorthest_path
    }

#Maze Generation
@app.get("/api/RecursiveDivision", tags=["Maze generation"]) # lehet szóköz az elérési útban?
async def get_recursive_divison() -> dict:
    recdiv = RecursiveDivison(table,0,0,table.get_column_size(), table.get_row_size() ,table.get_start(), table.get_end())
    order = recdiv.start_divide()
    return {
        "order": order # mazelesz ebből
    }

@app.get("/api/Random", tags=["Maze generation"]) # lehet szóköz az elérési útban?
async def get_random_maze() -> dict:
    random_maze = RandomMaze(table,0,0,table.get_column_size(), table.get_row_size() ,table.get_start(), table.get_end())
    order = random_maze.generate()
    return {
        "order": order # mazelesz ebből
    }

@app.get("/api/getTypes", tags=["Types"])
async def get_types() -> dict:
    d = {}
    for i in table.get_grid():
        for j in i:
            if j.get_weight() > 0 and j.get_weight() < 100:
                d[f"node-{j.get_x()}-{j.get_y()}"] = j.get_weight() # x-y valami ilyen formába kell átadni
    return {
        "dict": d
    }

#Restart points
@app.post("/api/restartpoints", tags=["Restart Points"])
async def restart_points(items : UserId):
    set_user_points_zero(items.get_uid())
     
#user
@app.post("/api/user", tags=["Restart Points"])
async def user(items : UserIdName):
    new_user(items.get_uid(), items.get_name())
    
#Quize
@app.post("/api/quize/{algorithm}", tags=["DragAndDrop"])
async def post_solution(items: DropDownAnswers):
    result = {}
    response = get_solution_qtype_id(items.get_algorithm(), items.get_questionType(), items.get_id())
    idx = 0
    points = 0

    for key, value in items.get_answers().items():
        if value:
            result[key] = value == response
            points +=  1 if value == response else 0 
        idx += 1
    set_user_points(items.get_uid(), points)
    
    return result

#Dnd 
@app.post("/api/dnd/{algorithm}", tags=["DragAndDrop"])
async def post_solution(items: DropDownAnswers):
    result = {}
    response = get_solution_qtype_id(items.get_algorithm(), items.get_questionType(), items.get_id())
    idx = 0
    points = 0
    for key, value in items.get_answers().items():
        if value:
            result[key] = value == response[idx]
            points += 1 if value == response[idx] else 0
        idx += 1
    set_user_points(items.get_uid(), points)
    return result

#DropDown
@app.post("/api/dropdown/{algorithm}", tags=["DropDown"])
async def post_solution(items: DropDownAnswers):
    result = {}
    response = get_solution_qtype_id(items.get_algorithm(), items.get_questionType(), items.get_id())
    print(response)
    points = 0;
    for key, value in items.get_answers().items():
        result[key] = response[key] == value
        points += 1 if response[key] == value else 0
    set_user_points(items.get_uid(), points)
    return result

#Solutions itt irokálom majd át
@app.get("/api/solutions/{algorithm}", tags=["Solutions"])
async def get_solution(algorithm : str) -> dict:
    response = await fetch_one_solution(algorithm)
    if response:
        return response
    return HTTPException(404, "Not found")

#Questions:
@app.get("/api/questions/{algorithm}", tags=["Questions"])
async def get_questions(algorithm : str) -> dict: # request from backend?
    response = await fetch_one_question(algorithm)
    if response:
        return response
    
    return HTTPException(404, "Not found")

#Others
@app.post("/api/wallUpdate")
async def refresh_table(item: CordinatesItem):
    list = item.get_list()
    type = Fields.get_field_by_name(item.get_type())
    for i in range(table.get_row_size() + 1):
        for j in range(table.get_column_size() + 1):
            if [i,j] in list: # type
                field_type = Fields.EMPTY if table.get_node_field(i,j) == type else type
                # print(field_type)
                if [i,j] not in [[start_x,start_y], [end_x,end_y]]:
                    table.set_node_field(i, j, field_type)
        
    return item

@app.post("/api/changeDistance")
async def set_distance_formula(item: Distance):
    app.distance_formula = item.get_distance_formula()
    return item

@app.post("/api/moveStartEnd")
async def refresh_table(item: CordinatesStartMove):
    item.print_cords()
    end = item.get_end()
    start = item.get_start()
    print(start)
    field_type = Fields.START if item.get_type() == -1 else Fields.END
   
    table.set_node_field(end[0], end[1], field_type)
    table.change_start(end[0], end[1]) if field_type == Fields.START else table.change_end(end[0], end[1])
    table.set_node_field(start[0], start[1], Fields.EMPTY)
    print(table.count_start())
    print(table.get_node_field(start[0], start[1]))
    return item




# uvicorn main:app --reload
#https://developer.redis.com/develop/python/fastapi/
# el kell indítani a dockert is mongodbvel