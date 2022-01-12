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
from persistance.Node import Node
from persistance.Fields import Fields

start_x, start_y, end_x, end_y, map_x, map_y = 10,15,10,35,20,50
start = Node(start_x, start_y , Fields.START)
end = Node(end_x, end_y, Fields.END)
table = Table(map_x, map_y, start, end)


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

class InitialState(BaseModel):
    is_refreshed : bool

    def refresh_board(self,is_refreshed):
        print(is_refreshed)
        if is_refreshed:
            table.refresh_board()


app = FastAPI()

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
    refreshed.refresh_board(refreshed.is_refreshed)

#Maze solvers
@app.get("/BFS", tags=["BFS"])
def get_bfs() -> dict:
    bfs = BFS(table, (start_x, start_y))
    order, shorthest_path = bfs.start_bfs()
    return {
        "path":order,
        "shortestPath":shorthest_path
    }
@app.get("/Dijkstra", tags=["function"])
async def get_dijkstra() -> dict:
    dijkstra = Dijkstra(table, Node(start_x, start_y, Fields.START), Node(end_x,end_y, Fields.END))
    order,shorthest_path = dijkstra.start_dijsktra()
    return {
        "path": order,
        "shortestPath": shorthest_path
    }

@app.get("/DFS", tags=["DFS"])
async def get_dfs() -> dict:
    dfs = DFS(table, Node(start_x, start_y, Fields.START))
    order,shorthest_path = dfs.start_dfs()
    return {
        "path": order,
        "shortestPath": shorthest_path
    }

@app.get("/Astar", tags=["Astar"])
async def get_astar() -> dict:
    astar = Astar(table, Node(start_x, start_y, Fields.START), Node(end_x,end_y, Fields.END))
    order,shorthest_path = astar.start_astar()
    return {
        "path": order,
        "shortestPath": shorthest_path
    }

#Maze Generation
@app.get("/Recursive Division", tags=["Recursive Division"]) # lehet szóköz az elérési útban?
async def get_recursive_divison() -> dict:
    recdiv = RecursiveDivison(table,0,0,table.get_column_size(), table.get_row_size())
    order = recdiv.start_divide()
    return {
        "order": order # mazelesz ebből
    }





#Others
@app.post("/wallUpdate") # mostmár átküldöm a typeot is majd ugyhogy ez változik szám vagy szöveg
async def refresh_table(item: CordinatesItem):
    # a = "GRASS"
    # table.set_node_field(0,0,Fields.get_field_by_name(a))
    # print(table.get_node_field(0,0))
    list = item.get_list()
    type = Fields.get_field_by_name(item.get_type())
    for i in range(table.get_row_size() + 1):
        for j in range(table.get_column_size() + 1):
            if [i,j] in list: # type
                field_type = Fields.EMPTY if table.get_node_field(i,j) == type else type
                table.set_node_field(i, j, field_type)
    f = open("demofile2.txt", "w")
    count = 0
    for node in table.get_all_nodes():
        if(node.x != count):
            count += 1
            f.write("\n")
        f.write(str(node.weight) + " ")
        
    return item


@app.post("/moveStart")
async def refresh_table(item: CordinatesItem):
    item.print_cords()
    return item

@app.post("/moveEnd")
async def refresh_table(item: CordinatesItem):
    item.print_cords()
    return item

@app.post("/placeType")
async def refresh_table(item: CordinatesItem):
    return item


# uvicorn main:app --reload