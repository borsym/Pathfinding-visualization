from http.client import OK
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from persistance.Table import Table
from algorithms.bfs import BFS
from algorithms.dfs import DFS
from algorithms.astar import Astar
from algorithms.dijkstra import Dijkstra
from algorithms.recursive_division import RecursiveDivison
from algorithms.distances import Distance 
from persistance.Node import Node
from persistance.Fields import Fields

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

app = FastAPI()
app.distance_formula = "Euclidean-mine"

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
    order,shorthest_path = astar.start_astar()
    return {
        "path": order,
        "shortestPath": shorthest_path
    }

#Maze Generation
@app.get("/api/Recursive Division", tags=["Recursive Division"]) # lehet szóköz az elérési útban?
async def get_recursive_divison() -> dict:
    recdiv = RecursiveDivison(table,0,0,table.get_column_size(), table.get_row_size() ,table.get_start(), table.get_end())
    order = recdiv.start_divide()
    return {
        "order": order # mazelesz ebből
    }



#Questions:
def get_question(algorithm): # tmp
    return {

    }

@app.get("/api/questions/{algorithm}")
async def get_questions(algorithm : str) -> dict: # request from backend?
    print(algorithm)
    questions = get_question(algorithm)
    return {
        "questions": questions
    }

# @app.post("sendAnswers/api/${state.algorithm}/api/${state.questionType}/api/${state.id}")
# async def send_answers(state : VALAMI):
#     # updateCheckAnswers() #?
#     return 200

@app.get("/api/checkedAnswers")
async def get_checked_answers() -> dict:
    return {
        "checkedAnswers": [] # id-1: true, id-2: false, id-3: true 
    }

#Others
@app.post("/api/wallUpdate")
async def refresh_table(item: CordinatesItem):
    list = item.get_list()
    type = Fields.get_field_by_name(item.get_type())
    for i in range(table.get_row_size() + 1):
        for j in range(table.get_column_size() + 1):
            if [i,j] in list: # type
                field_type = Fields.EMPTY if table.get_node_field(i,j) == type else type
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
    field_type = Fields.START if item.get_type() == -1 else Fields.END
    for i in range(table.get_row_size() + 1):
        for j in range(table.get_column_size() + 1):
            if [i,j] == end: 
                table.set_node_field(i, j, field_type)
                table.change_start(i,j) if field_type == Fields.START else table.change_end(i,j)
            if [i,j] == start:
                table.set_node_field(i, j, field_type)
   
    return item




# uvicorn main:app --reload