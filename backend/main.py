from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from persistance.Table import Table
from algorithms.bfs import BFS
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
    return {
        # "path": table.dfs(start).path,
        # "shortestPath": table.dfs(start).shortestPath,
         "path":[(10, 15), (9, 15), (10, 14), (10, 16), (11, 15), (8, 15), (9, 14), (9, 16), (10, 13), (11, 14), (10, 17), (11, 16), (12, 15), (7, 15), (8, 14), (8, 16), (9, 13), (9, 17), (10, 12), (11, 13), (12, 14), (10, 18), (11, 17), (12, 16), (13, 15), (6, 15), (7, 14), (7, 16), (8, 13), (8, 17), (9, 12), (9, 18), (10, 11), (11, 12), (12, 13), (13, 14), (10, 19), (11, 18), (12, 17), (13, 16), (14, 15), (5, 15), (6, 14), (6, 16), (7, 13), (7, 17), (8, 12), (8, 18), (9, 11), (9, 19), (10, 10), (11, 11), (12, 12), (13, 13), (14, 14), (10, 20), (11, 19), (12, 18), (13, 17), (14, 16), (15, 15), (4, 15), (5, 14), (5, 16), (6, 13), (6, 17), (7, 12), (7, 18), (8, 11), (8, 19), (9, 10), (9, 20), (10, 9), (11, 10), (12, 11), (13, 12), (14, 13), (15, 14), (10, 21), (11, 20), (12, 19), (13, 18), (14, 17), (15, 16), (16, 15), (3, 15), (4, 14), (4, 16), (5, 13), (5, 17), (6, 12), (6, 18), (7, 11), (7, 19), (8, 10), (8, 20), (9, 9), (9, 21), (10, 8), (11, 9), (12, 10), (13, 11), (14, 12), (15, 13), (16, 14), (10, 22), (11, 21), (12, 20), (13, 19), (14, 18), (15, 17), (16, 16), (17, 15), (2, 15), (3, 14), (3, 16), (4, 13), (4, 17), (5, 12), (5, 18), (6, 11), (6, 19), (7, 10), (7, 20), (8, 9), (8, 21), (9, 8), (9, 22), (10, 7), (11, 8), (12, 9), (13, 10), (14, 11), (15, 12), (16, 13), (17, 14), (10, 23), (11, 22), (12, 21), (13, 20), (14, 19), (15, 18), (16, 17), (17, 16), (18, 15), (1, 15), (2, 14), (2, 16), (3, 13), (3, 17), (4, 12), (4, 18), (5, 11), (5, 19), (6, 10), (6, 20), (7, 9), (7, 21), (8, 8), (8, 22), (9, 7), (9, 23), (10, 6), (11, 7), (12, 8), (13, 9), (14, 10), (15, 11), (16, 12), (17, 13), (18, 14), (10, 24), (11, 23), (12, 22), (13, 21), (14, 20), (15, 19), (16, 18), (17, 17), (18, 16), (19, 15), (0, 15), (1, 14), (1, 16), (2, 13), (2, 17), (3, 12), (3, 18), (4, 11), (4, 19), (5, 10), (5, 20), (6, 9), (6, 21), (7, 8), (7, 22), (8, 7), (8, 23), (9, 6), (9, 24), (10, 5), (11, 6), (12, 7), (13, 8), (14, 9), (15, 10), (16, 11), (17, 12), (18, 13), (19, 14), (10, 25), (11, 24), (12, 23), (13, 22), (14, 21), (15, 20), (16, 19), (17, 18), (18, 17), (19, 16), (0, 14), (0, 16), (1, 13), (1, 17), (2, 12), (2, 18), (3, 11), (3, 19), (4, 10), (4, 20), (5, 9), (5, 21), (6, 8), (6, 22), (7, 7), (7, 23), (8, 6), (8, 24), (9, 5), (9, 25), (10, 4), (11, 5), (12, 6), (13, 7), (14, 8), (15, 9), (16, 10), (17, 11), (18, 12), (19, 13), (10, 26), (11, 25), (12, 24), (13, 23), (14, 22), (15, 21), (16, 20), (17, 19), (18, 18), (19, 17), (0, 13), (0, 17), (1, 12), (1, 18), (2, 11), (2, 19), (3, 10), (3, 20), (4, 9), (4, 21), (5, 8), (5, 22), (6, 7), (6, 23), (7, 6), (7, 24), (8, 5), (8, 25), (9, 4), (9, 26), (10, 3), (11, 4), (12, 5), (13, 6), (14, 7), (15, 8), (16, 9), (17, 10), (18, 11), (19, 12), (10, 27), (11, 26), (12, 25), (13, 24), (14, 23), (15, 22), (16, 21), (17, 20), (18, 19), (19, 18), (0, 12), (0, 18), (1, 11), (1, 19), (2, 10), (2, 20), (3, 9), (3, 21), (4, 8), (4, 22), (5, 7), (5, 23), (6, 6), (6, 24), (7, 5), (7, 25), (8, 4), (8, 26), (9, 3), (9, 27), (10, 2), (11, 3), (12, 4), (13, 5), (14, 6), (15, 7), (16, 8), (17, 9), (18, 10), (19, 11), (10, 28), (11, 27), (12, 26), (13, 25), (14, 24), (15, 23), (16, 22), (17, 21), (18, 20), (19, 19), (0, 11), (0, 19), (1, 10), (1, 20), (2, 9), (2, 21), (3, 8), (3, 22), (4, 7), (4, 23), (5, 6), (5, 24), (6, 5), (6, 25), (7, 4), (7, 26), (8, 3), (8, 27), (9, 2), (9, 28), (10, 1), (11, 2), (12, 3), (13, 4), (14, 5), (15, 6), (16, 7), (17, 8), (18, 9), (19, 10), (10, 29), (11, 28), (12, 27), (13, 26), (14, 25), (15, 24), (16, 23), (17, 22), (18, 21), (19, 20), (0, 10), (0, 20), (1, 9), (1, 21), (2, 8), (2, 22), (3, 7), (3, 23), (4, 6), (4, 24), (5, 5), (5, 25), (6, 4), (6, 26), (7, 3), (7, 27), (8, 2), (8, 28), (9, 1), (9, 29), (10, 0), (11, 1), (12, 2), (13, 3), (14, 4), (15, 5), (16, 6), (17, 7), (18, 8), (19, 9), (10, 30), (11, 29), (12, 28), (13, 27), (14, 26), (15, 25), (16, 24), (17, 23), (18, 22), (19, 21), (0, 9), (0, 21), (1, 8), (1, 22), (2, 7), (2, 23), (3, 6), (3, 24), (4, 5), (4, 25), (5, 4), (5, 26), (6, 3), (6, 27), (7, 2), (7, 28), (8, 1), (8, 29), (9, 0), (9, 30), (11, 0), (12, 1), (13, 2), (14, 3), (15, 4), (16, 5), (17, 6), (18, 7), (19, 8), (10, 31), (11, 30), (12, 29), (13, 28), (14, 27), (15, 26), (16, 25), (17, 24), (18, 23), (19, 22), (0, 8), (0, 22), (1, 7), (1, 23), (2, 6), (2, 24), (3, 5), (3, 25), (4, 4), (4, 26), (5, 3), (5, 27), (6, 2), (6, 28), (7, 1), (7, 29), (8, 0), (8, 30), (9, 31), (12, 0), (13, 1), (14, 2), (15, 3), (16, 4), (17, 5), (18, 6), (19, 7), (10, 32), (11, 31), (12, 30), (13, 29), (14, 28), (15, 27), (16, 26), (17, 25), (18, 24), (19, 23), (0, 7), (0, 23), (1, 6), (1, 24), (2, 5), (2, 25), (3, 4), (3, 26), (4, 3), (4, 27), (5, 2), (5, 28), (6, 1), (6, 29), (7, 0), (7, 30), (8, 31), (9, 32), (13, 0), (14, 1), (15, 2), (16, 3), (17, 4), (18, 5), (19, 6), (10, 33), (11, 32), (12, 31), (13, 30), (14, 29), (15, 28), (16, 27), (17, 26), (18, 25), (19, 24), (0, 6), (0, 24), (1, 5), (1, 25), (2, 4), (2, 26), (3, 3), (3, 27), (4, 2), (4, 28), (5, 1), (5, 29), (6, 0), (6, 30), (7, 31), (8, 32), (9, 33), (14, 0), (15, 1), (16, 2), (17, 3), (18, 4), (19, 5), (10, 34), (11, 33)],
        "shortestPath":[(10, 15) ,(10, 16) ,(10, 17) ,(10, 18) ,(10, 19) ,(10, 20) ,(10, 21), (10, 22), (10, 23), (10, 24), (10, 25), (10, 26), (10, 27), (10, 28), (10, 29), (10, 30), (10, 31), (10, 32), (10, 33) ,(10, 34),(10, 35)],
    }

@app.get("/Astar", tags=["Astar"])
async def get_astar() -> dict:
    return {
        # "path": table.astar(start, goal).path,
        # "shortestPath": table.astar(start, goal).shortestPath,
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