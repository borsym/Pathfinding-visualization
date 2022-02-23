

import heapq  # priory que
import sys
sys.path.append("..")
from persistance.Fields import Fields
from persistance.Table import Table
from persistance.Node import Node
# TODO FIXME: this is not working properly, when we are tracking back the shortesth path when there are weighted nodes
# nagyon bugos....

class Dijkstra:
    def __init__(self, grid, start, end):
        start.set_distance(0)
        self.pq = [start] 
        heapq.heapify(self.pq)
        self.visited = set()
        self.__order_of_visited_nodes = [] 
        self.__order_of_visited_nodes.append((start.get_x(), start.get_y()))
        self.end = end
        self.grid = grid
        self.ptr = None

    def get_nodes_in_shortest_path_order(self):
        nodes_in_shortest_path_order = []
        current_node = self.ptr  # ez a pointer nem ugyan az ami fentebb van beállítva
        while current_node is not None:
            # print(current_node.get_x(), current_node.get_y())
            nodes_in_shortest_path_order.insert(0, (current_node.get_x(), current_node.get_y()))
            current_node = current_node.previous_node
            
        return nodes_in_shortest_path_order

    def start_dijsktra(self):
        while len(self.pq) > 0:
            node = heapq.heappop(self.pq)
            c, row, col, distance = node.get_weight(), node.get_x(), node.get_y(), node.get_distance()
            if (row,col) in self.visited:
                continue
       
            self.visited.add((row,col))
            self.__order_of_visited_nodes.append((row, col))

            if (row,col) == (self.end.get_x(), self.end.get_y()):
                self.ptr = node
                return self.__order_of_visited_nodes, self.get_nodes_in_shortest_path_order()

            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                rr = row + dr
                cc = col + dc
                if not (0 <= rr < self.grid.get_row_size() and 0 <= cc < self.grid.get_column_size()): # ez lehet forditva
                    continue
                if self.grid.get_node_field(rr, cc) == Fields.WALL:
                    continue
                if (rr,cc) in self.visited:
                    continue
                self.grid.get_node(rr,cc).set_distance(distance + 1 + self.grid.get_node_weight(rr,cc))
                self.grid.get_node(rr,cc).set_previous_node(node)

                heapq.heappush(self.pq, self.grid.get_node(rr,cc))
        return self.__order_of_visited_nodes, []


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













