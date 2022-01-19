import heapq  # priory que
import sys
sys.path.append("..")
from collections import defaultdict
from persistance.Fields import Fields
from persistance.Node import Node
from persistance.Table import Table
import time

def dijkstra(grid,start,end):
    unvisited_set = set()
    for i in range(grid.get_row_size()):
        for j in range(grid.get_column_size()):
            unvisited_set.add(grid.get_node(i,j))
    grid.get_node(10,15).set_distance(0)

    while len(unvisited_set) > 0:
        u = get_lowest_distance_node(unvisited_set)
        unvisited_set.remove(u)
        for neighbor in get_neighbors(u,grid):
            alt = u.get_distance() + u.get_weight()
            if alt < neighbor.get_distance():
                neighbor.set_distance(alt)
                neighbor.set_previous_node(u)

    return get_path(grid.get_node(10,35))

    #     unvisited_set.remove(current_node)
    #     if current_node == end:
    #         return get_nodes_in_shortest_path_order(current_node)
    #     update_neighbors_distance(current_node, grid)
    # return []

def get_path(end):
    path = []
    current_node = end
    while current_node:
        path.append(current_node)
        current_node = current_node.get_previous_node()
    return list(reversed(path))

def get_neighbors(u, grid):
    row,col = u.get_x(), u.get_y()
    neighbours = []
    for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        rr = row + dr
        cc = col + dc
        if not (0 <= rr < grid.get_row_size() and 0 <= cc < grid.get_column_size()): # ez lehet forditva
            continue
        neighbours.append(grid.get_node(rr, cc))

    return neighbours

def get_lowest_distance_node(unvisited_set):
    lowest_distance = float('inf')
    result = None
    for node in unvisited_set:
        if node.get_distance() < lowest_distance:
            result = node
            lowest_distance = node.get_distance()
    return result


    
start = Node(10,15 , Fields.START)
end = Node(10, 35, Fields.END)
table = Table(20, 50, start, end)

a = dijkstra(table, start, end)

for i in a:
    print((i.get_x(),i.get_y()), end=",")
