from .Node import Node
from .Fields import Fields
import sys
sys.path.append("..")

class Table:
    def __init__(self, size_x, size_y, start, end):
        self.start = start
        self.end = end
        self.size_x = size_x
        self.size_y = size_y
        self.__grid = self.__make_matrix(size_x, size_y)
        self.__put_start_end()

    @staticmethod
    def __make_matrix(size_x, size_y):
        return [
            [Node(x, y, Fields.EMPTY) for y in range(size_y)] for x in range(size_x)
        ]

    def __put_start_end(self):
        self.__grid[self.start.x][self.start.y].set_field(Fields.START)
        self.__grid[self.end.x][self.end.y].set_field(Fields.END)

    def get_grid(self):
        return self.__grid

    def is_not_valid(self, x, y):
        return x < 0 or x >= self.get_row_size() or y < 0 or y >= self.get_column_size()
    
    def change_start(self, x, y):
        if self.is_not_valid(x,y):
            raise Exception("Invalid position, out of range")

        self.__grid[self.start.get_x()][self.start.get_y()].set_field(Fields.EMPTY)
        self.start = Node(x, y, Fields.START)
        self.__grid[x][y].set_field(Fields.START)

    def change_end(self, x, y):
        if self.is_not_valid(x,y):
            raise Exception("Invalid position, out of range")

        self.__grid[self.end.get_x()][self.end.get_y()].set_field(Fields.EMPTY)
        self.end = Node(x, y, Fields.END)
        self.__grid[x][y].set_field(Fields.END)

    def get_grid_for_ui(self):
        return [[[row, cell, 0] for cell in row] for row in self.__grid]

    def get_row_size(self):
        return len(self.__grid)

    def get_column_size(self):
        return len(self.__grid[0])

    def get_node_weight(self, x, y):
        if self.is_not_valid(x,y):
            raise Exception("Invalid position, out of range")
        return self.__grid[x][y].get_weight()

    def set_node_weight(self, x, y, value):
        if self.is_not_valid(x,y):
            raise Exception("Invalid position, out of range")
        self.__grid[x][y].set_weight(value)

    def get_start(self):
        return self.start

    def get_node(self, x, y):
        if self.is_not_valid(x,y):
            raise Exception("Invalid position, out of range")
        return self.__grid[x][y]

    def get_node_field(self, x, y):
        if self.is_not_valid(x,y):
            raise Exception("Invalid position, out of range")
        return self.__grid[x][y].field

    def set_node_field(self, x, y, field):
        if self.is_not_valid(x,y):
            raise Exception("Invalid position, out of range")
        self.__grid[x][y].set_field(field)

    def get_end(self):
        return self.end

    def count_start(self):
        count = 0
        for row in self.__grid:
            for node in row:
                if node.field == Fields.START:
                    count += 1
        return count

    def set_node_distance(self, x, y, val):
        self.__grid[x][y].set_distance(val)

    def get_all_nodes(self):
        nodes = []
        for row in self.__grid:
            for node in row:
                nodes.append(node)
        return nodes

    def print_path(self, path):
        for i in path:
            self.__grid[i.x][i.y].set_field(Fields.PATH)
        self.print_grid()

    def refresh_board(self, start_x, start_y, end_x, end_y):
        if self.is_not_valid(start_x,start_y) or self.is_not_valid(end_x,end_y):
            raise Exception("Invalid position, out of range")
        if (start_x == end_x and start_y == end_y) or (start_y == end_x and start_x == end_y):
            raise Exception("Start and end are on the same cell")
            
        self.__grid = self.__make_matrix(self.size_x, self.size_y)
        self.__grid[start_x][start_y].set_field(Fields.START)
        self.start = Node(start_x, start_y, Fields.START)
        self.__grid[end_x][end_y].set_field(Fields.END)
        self.end = Node(end_x, end_y, Fields.END)

    def print_grid(self):
        f = open("its_me.txt", "w")
        for row in self.__grid:
            for cell in row:
                f.write(str(cell.weight) + " ")
            f.write("\n")
        print(
            "\n".join(
                ["\t".join([str(cell.weight) for cell in row]) for row in self.__grid]
            )
        )

    def print_grid_2(self):
        print(
            "\n".join(
                ["\t".join([str(cell.distance) for cell in row]) for row in self.__grid]
            )
        )
