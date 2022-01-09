from .Fields import Fields

class Node:
    def __init__(self, x, y, field, parent=None):
        self.distance = float('inf')
        self.previous_node = None
        self.parent = parent
        self.x = x
        self.y = y
        self.field = field
        self.weight = field.value
        self.is_wall = field == Fields.WALL
        self.g = 0
        self.h = 0
        self.f = 0
        self.visited = False

    def __key(self):
        return (self.x, self.y, self.weight, self.is_wall)

    def __hash__(self):
        return hash(self.__key())

    def __eq__(self, other):
        return (self.distance) == (other.get_distance())

    def __lt__(self, other):
        return self.distance < other.distance # vagy <=?
    
    def __repr__(self):
        return f'(d={self.distance}, w={self.weight}, x={self.x}, y={self.y})'

    def set_field(self, field):
        self.field = field
        self.weight = field.value
        self.is_wall = field == Fields.WALL

    def get_x(self):
        return self.x

    def get_y(self):
        return self.y

    def set_distance(self, dist):
        # print("elotte: ", self.distance)
        self.distance = dist
    
    def get_distance(self):
        return self.distance

    def get_weight(self):
        return self.weight

    def set_weight(self, w):
        self.weight = w

    def set_previous_node(self, node):
        self.previous_node = node

    def get_previous_node(self):
        return self.previous_node
        
    def get_field(self):
        return self.field

    def get_visited(self):
        return self.visited

    def set_visited(self):
        self.visited = True