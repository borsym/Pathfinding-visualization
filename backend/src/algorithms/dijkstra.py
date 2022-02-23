

import heapq  # priory que
import sys
sys.path.append("..")
from persistance.Fields import Fields
from persistance.Table import Table
from persistance.Node import Node
# TODO FIXME: this is not working properly, when we are tracking back the shortesth path when there are weighted nodes
# nagyon bugos....

# class Dijkstra:
#     def __init__(self, grid, start, end):
#         start.set_distance(0)
#         self.pq = [start] 
#         heapq.heapify(self.pq)
#         self.visited = set()
#         self.__order_of_visited_nodes = [] 
#         self.__order_of_visited_nodes.append((start.get_x(), start.get_y()))
#         self.end = end
#         self.grid = grid
#         self.ptr = None

#     def get_nodes_in_shortest_path_order(self):
#         nodes_in_shortest_path_order = []
#         current_node = self.ptr  # ez a pointer nem ugyan az ami fentebb van beállítva
#         while current_node is not None:
#             # print(current_node.get_x(), current_node.get_y())
#             nodes_in_shortest_path_order.insert(0, (current_node.get_x(), current_node.get_y()))
#             current_node = current_node.previous_node
            
#         return nodes_in_shortest_path_order

#     def start_dijsktra(self):
#         while len(self.pq) > 0:
#             node = heapq.heappop(self.pq)
#             c, row, col, distance = node.get_weight(), node.get_x(), node.get_y(), node.get_distance()
#             if (row,col) in self.visited:
#                 continue
       
#             self.visited.add((row,col))
#             self.__order_of_visited_nodes.append((row, col))

#             if (row,col) == (self.end.get_x(), self.end.get_y()):
#                 self.ptr = node
#                 return self.__order_of_visited_nodes, self.get_nodes_in_shortest_path_order()

#             for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
#                 rr = row + dr
#                 cc = col + dc
#                 if not (0 <= rr < self.grid.get_row_size() and 0 <= cc < self.grid.get_column_size()): # ez lehet forditva
#                     continue
#                 if self.grid.get_node_field(rr, cc) == Fields.WALL:
#                     continue
#                 if (rr,cc) in self.visited:
#                     continue
#                 self.grid.get_node(rr,cc).set_distance(distance + 1 + self.grid.get_node_weight(rr,cc))
#                 self.grid.get_node(rr,cc).set_previous_node(node)

#                 heapq.heappush(self.pq, self.grid.get_node(rr,cc))
#         return self.__order_of_visited_nodes, []

from collections import deque as queue
import sys
sys.path.append("..")
import math
from persistance.Fields import Fields
from persistance.Node import Node
from persistance.Table import Table

class Dijkstra:
    def __init__(self, grid,start,end):
        self.grid = grid
        start.set_distance(0)
        self.start = start
        self.end = end
        self.visited_nodes_oreder = queue()
        self.open_list = []
        self.closed_list = []


    def start_dijsktra(self):
        # Initialize both open and closed list
        # Add the self.start node
        self.open_list.append(self.start)

        # Loop until you find the end
        while len(self.open_list):
            current_node = self.open_list[0]
            current_index = 0
            
            for index, item in enumerate(self.open_list):
                if item.get_weight() + item.get_distance() < current_node.get_weight() + current_node.get_distance():
                    current_node = item
                    current_index = index
            distance = current_node.get_distance()
            # Pop current off open list, add to closed list
            self.visited_nodes_oreder.append((current_node.get_x(), current_node.get_y()))
            self.open_list.pop(current_index)
            self.closed_list.append(current_node)
            
            # Found the goal
            if current_node == self.end:
                path = []
                current = current_node
                while current is not None:
                    path.append((current.get_x(), current.get_y()))
                    current = current.previous_node
                return list(self.visited_nodes_oreder), path[::-1] # Return reversed path

        
            for dr,dy in [(0, -1), (0, 1), (-1, 0), (1, 0)]: # Adjacent squares

                # Get node position
                currx, curry = (current_node.get_x() + dr, current_node.get_y() + dy)

                # Make sure within range
                if not (0 <= currx < self.grid.get_row_size() and 0 <= curry < self.grid.get_column_size()) or self.grid.get_node_field(currx, curry) == Fields.WALL:
                    continue

                # Create new node
                new_node = self.grid.get_node(currx, curry)
                in_closed_list = False
                for node in self.closed_list:
                    if node.get_x() == new_node.get_x() and node.get_y() == new_node.get_y():
                        in_closed_list = True
                        break
                if in_closed_list:
                    continue

                new_node.set_previous_node(current_node)

                # new_node.g = current_node.g + 1 + new_node.get_weight()
                # new_node.h = self.distance(self.end,new_node)
                # new_node.f = new_node.g + new_node.h
                
                is_valid = True
                for node in self.open_list:
                    if node.get_x() == new_node.get_x() and node.get_y() == new_node.get_y():
                        is_valid = False
                        break
                    
                if is_valid:
                    new_node.set_distance(1 + distance)
                    self.open_list.append(new_node)
        return list(self.visited_nodes_oreder), []



# self.start = Node(10,15 , Fields.self.START)
# end = Node(10, 35, Fields.END)
# table = Table(20, 50, self.start, end)
# table.print_grid()


# visited, path = astar(table, self.start, end)
# print(visited)
# print(path)


# start = Node(10,15 , Fields.START)
# end = Node(10, 35, Fields.END)
# table = Table(20, 50, start, end)
# start = Node(0, 0, Fields.START)
# end = Node(0, 2, Fields.END)
# table = Table(6, 6, start, end)



# table.print_grid()
# # # print(table.get_row_size())
# # # print(table.get_column_size())
# # # print()

# dijkstra = Dijkstra(table, start, end)
# a,b = dijkstra.start_dijsktra()
# # print(a)
# # print()
# print(b)
# table.print_grid()













