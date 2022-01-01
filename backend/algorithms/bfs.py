from collections import deque as queue
import sys
sys.path.append("..")

from persistance.Fields import Fields
from persistance.Node import Node
from persistance.Table import Table
# insert at 1, 0 is the script path (or '' in REPL)


class BFS:
    def __init__(self, grid, start):
        self.__q = queue()
        self.__q.append(start)

        self.__order_of_visited_nodes = [] # lehet stack
        self.__order_of_visited_nodes.append(start)

        self.grid = grid

        self.dircetion_row = [-1, 0, 1, 0]
        self.direction_col = [0, 1, 0, -1]
        self.ptr = None


    def isValid(self, row, col, size_x, size_y):
        if row < 0 or col < 0 or row > size_x or col > size_y or self.grid.get_node_field(row, col) == Fields.WALL:
            return False
        return False if (row, col) in self.__order_of_visited_nodes else True

    def get_nodes_in_shortest_path_order(self):
        nodes_in_shortest_path_order = []
        current_node = self.ptr  # ez a pointer nem ugyan az ami fentebb van beállítva
        while current_node is not None:
            nodes_in_shortest_path_order.insert(0, (current_node.get_x(), current_node.get_y()))
            current_node = current_node.previous_node
            
        return nodes_in_shortest_path_order

    def start_bfs(self):
        while len(self.__q) > 0:
            arr = self.__q.popleft()
        
            x = arr[0]
            y = arr[1]
            
            # Go to the adjacent cells
            for i in range(4):
                adjx = x + self.dircetion_row[i]
                adjy = y + self.direction_col[i]
                
                if self.isValid(adjx, adjy, self.grid.get_row_size(), self.grid.get_column_size()):
                    self.grid.get_node(adjx,adjy).set_previous_node(self.grid.get_node(x,y))
                    tmp = (adjx, adjy)
                    self.__q.append(tmp)
                    self.__order_of_visited_nodes.append(tmp)
                    if self.grid.get_node_field(adjx, adjy) == Fields.END:
                        self.ptr = self.grid.get_node(adjx, adjy)
                        return self.__order_of_visited_nodes, self.get_nodes_in_shortest_path_order()

        return self.__order_of_visited_nodes, []


# start = Node(10,15 , Fields.START)
# end = Node(10, 35, Fields.END)
# table = Table(20, 50, start, end)
# table.print_grid()
# table.change_node_field(10, 16, Fields.WALL)
# table.change_node_field(9, 16, Fields.WALL)
# print(table.get_row_size())
# print(table.get_column_size())
# print()
# bfs = BFS(table, (10, 15))
# order, path = bfs.start_bfs()
# # # print("hallo\n")
# print(order, '\n', path)
