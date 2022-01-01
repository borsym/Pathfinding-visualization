from .Fields import Fields

class Node:
    def __init__(self, x, y, field):
        self.distance = float('inf')
        self.previous_node = None
        self.x = x
        self.y = y
        self.field = field
        self.weight = field.value
        self.is_wall = field == Fields.WALL

    def set_field(self, field):
        self.field = field
        self.weight = field.value
        self.is_wall = field == Fields.WALL

    def get_x(self):
        return self.x

    def get_y(self):
        return self.y

    def set_distance(self, dist):
        self.distance = dist

    def get_weight(self):
        return self.weight

    def set_weight(self, w):
        self.weight = w

    def set_previous_node(self, node):
        self.previous_node = node