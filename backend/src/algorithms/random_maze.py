import sys
sys.path.append("..")

from persistance.Fields import Fields
from persistance.Table import Table
from persistance.Node import Node
from collections import deque as queue
from random import seed
from random import random
seed(1)
class RandomMaze:

    def __init__(self, grid, x, y, width, height,start,end):
        self.grid, self.x, self.y, self.width, self.height = grid, x, y, width, height
        self.start = start
        self.end = end
        self.order = queue()

    def generate(self):
        for i in range(self.height): # lehet fordiva
            for j in range(self.width):
                if random() < 0.3 and not (i == self.start.get_x() and j == self.start.get_y() or i == self.end.get_x() and j == self.end.get_y()):
                    self.grid.set_node_field(i,j,Fields.WALL)
                    self.order.append((i, j))
        return self.order
