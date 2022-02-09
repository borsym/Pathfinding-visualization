from .Node import Node
from .Fields import Fields


class Table:
    def __init__(self, size_x, size_y, start, end): # (0,0) (0,0) s,b
        self.start = start
        self.end = end
        self.size_x = size_x
        self.size_y = size_y
        self.__grid = self.__make_matrix(size_x, size_y)
        self.__put_start_end()

    @staticmethod
    def __make_matrix(size_x, size_y):
        matrix = [[Node(x, y, Fields.EMPTY) for y in range(size_y)] for x in range(size_x)]
        return matrix

    def __put_start_end(self):
        self.__grid[self.start.x][self.start.y].set_field(Fields.START)
        self.__grid[self.end.x][self.end.y].set_field(Fields.END)

    def get_grid(self):
        return self.__grid

    def change_start(self,x,y):
        self.start = Node(x,y,Fields.START)
        self.__grid[x][y].set_field(Fields.START)

    def change_end(self,x,y):
        self.end = Node(x,y,Fields.END)
        self.__grid[x][y].set_field(Fields.END)

    def get_grid_for_ui(self): 
        return [[ [row,cell,0] for cell in row] for row in self.__grid] 

    def get_row_size(self):
        return len(self.__grid) 

    def get_column_size(self):
        return len(self.__grid[0]) 

    def get_node_weight(self, x, y):
        return self.__grid[x][y].get_weight()

    def set_node_weight(self, x, y, value):
        self.__grid[x][y].set_weight(value)

    def get_start(self):
        return self.start

    def get_node(self, x, y):
        return self.__grid[x][y]
    
    def get_node_field(self, x, y):
        return self.__grid[x][y].field

    def set_node_field(self, x, y, field):
        self.__grid[x][y].set_field(field)

    def get_end(self):
        return self.end

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
        self.__grid = self.__make_matrix(self.size_x, self.size_y)
        self.__grid[start_x][start_y].set_field(Fields.START)
        self.start = Node(start_x, start_y, Fields.START)
        self.__grid[end_x][end_y].set_field(Fields.END)
        self.end = Node(end_x, end_y, Fields.END)

    def print_grid(self):
        print('\n'.join(['\t'.join([str(cell.weight) for cell in row]) for row in self.__grid]))

    def print_grid_2(self):
        print('\n'.join(['\t'.join([str(cell.distance) for cell in row]) for row in self.__grid]))

# Test = Table(20, 50, Node(10,15,Fields.START), Node(10,35,Fields.END))
# Test.print_grid()

# print(Test.get_column_size())
# print(Test.get_row_size())