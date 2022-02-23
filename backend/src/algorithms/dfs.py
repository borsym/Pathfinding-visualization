import sys
sys.path.append("..")
from collections import deque as queue
from persistance.Fields import Fields
from persistance.Table import Table
from persistance.Node import Node

# Function to perform DFS
# Traversal on the matrix grid[]
class DFS:
    def __init__(self, grid, start):
        self.grid = grid
        self.vis = set()
        self.visited_order = queue()
        self.stack = []
        self.stack.append((start.get_x(), start.get_y()))
        self.ptr = None

    def get_nodes_in_shortest_path_order(self):
        nodes_in_shortest_path_order = []
        current_node = self.ptr
        while current_node is not None:
            # print(current_node.get_x(), current_node.get_y())
            nodes_in_shortest_path_order.insert(0, (current_node.get_x(), current_node.get_y()))
            current_node = current_node.previous_node
        return nodes_in_shortest_path_order

    def start_dfs(self, Node = None):
        # Iterate until the
        # stack is not empty
        while len(self.stack):
            # Pop the top pair
            curr = self.stack.pop(len(self.stack) - 1)
            row = curr[0]
            col = curr[1]
    
            # Check if the current popped
            # cell is a valid cell or not
            
            if (row,col) in self.vis:
                continue
            # Mark the current
            # cell as visited
            self.visited_order.append((row, col))
            self.vis.add((row,col))

            self.grid.get_node(row,col).set_previous_node(Node)
            Node = self.grid.get_node(row,col)

    
            # Push all the adjacent cells
            for dr, dc in [(0, -1), (0, 1), (1, 0), (-1, 0)]:
                adjx = row + dr
                adjy = col + dc
                if not (0 <= adjx < self.grid.get_row_size() and 0 <= adjy < self.grid.get_column_size()) or self.grid.get_node_field(adjx, adjy) == Fields.WALL:
                    continue
                self.stack.append((adjx, adjy))
    
                if self.grid.get_node(row, col).get_field() == Fields.END:
                    self.ptr = self.grid.get_node(row, col)
                    return list(self.visited_order), self.get_nodes_in_shortest_path_order() # es majd egy backtracking
        return list(self.visited_order), []
    

# table = Table(20,50, Node(10,15,Fields.START), Node(10,35,Fields.END))
# dfs = DFS(table, Node(10,15,Fields.START))
# a,b = dfs.start_dfs()
# print(a)
# print()
# print(b)