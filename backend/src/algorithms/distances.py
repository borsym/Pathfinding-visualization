import math


class Distance:
    def __init__(self):
        pass

    # choose the distance function you want to use by the name
    def get_distance(self, name="Euclidean"):
        if name == "Euclidean":
            return self.euclidean
        elif name == "Manhattan":
            return self.manhattan
        elif name == "Chebyshev":
            return self.chebyshev

    def euclidean(self, end, new_node):
        return math.sqrt(
            (abs(new_node.get_x() - end.get_x()) ** 2)
            + (abs(new_node.get_y() - end.get_y()) ** 2)
        )

    def manhattan(self, end, new_node):
        return abs(new_node.get_x() - end.get_x()) + abs(new_node.get_y() - end.get_y())

    def chebyshev(self, end, new_node):  # leglassabb
        return max(
            abs(new_node.get_x() - end.get_x()), abs(new_node.get_y() - end.get_y())
        )
