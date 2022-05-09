from collections import deque as queue
from src.persistance.Node import Node
from src.persistance.Fields import Fields
import sys
sys.path.append(".")

class CommonPropertys:
    def __init__(self, grid, start, end=Node( 10, 35, Fields.END), distance="Euclidean"):
        start.set_distance(0)
        self.grid = grid
        self.start = start
        self.end = end
        self.open_list = []
        self.closed_list = []
        self.distance = distance
        self.directions = [(0, -1), (0, 1), (-1, 0), (1, 0)]
        self.vis = set()
        self.visited_nodes_order = queue() 
        self.stack = []
        self.stack.append((start.get_x(), start.get_y()))
        self.ptr = None
        self.q = queue()
        self.q.append((start.get_x(), start.get_y()))
        self.order_of_visited_nodes = []
        self.order_of_visited_nodes.append((start.get_x(), start.get_y()))

    def get_nodes_in_shortest_path_order(self):
        nodes_in_shortest_path_order = []
        current_node = self.ptr
        while current_node is not None:
            nodes_in_shortest_path_order.insert(
                0, (current_node.get_x(), current_node.get_y())
            )
            if current_node.get_field() == Fields.START:
                break
            current_node = current_node.previous_node
            
        
        return nodes_in_shortest_path_order

    def isValid(self, rr, cc, size_x, size_y):
        if (
            not (0 <= rr < size_x and 0 <= cc < size_y)
            or self.grid.get_node_field(rr, cc).value == Fields.WALL.value  # in the testing section every time the setup generates a new object from fields and they can't be comperd only just value
        ):
            return False
        return False if (rr, cc) in self.visited_nodes_order else True