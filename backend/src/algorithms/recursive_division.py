import sys
import math
from collections import deque as queue
from persistance.Fields import Fields
from random import randrange

# https://www.youtube.com/watch?v=sVcB8vUFlmU labirintusok

sys.path.append("..")


class RecursiveDivison:
    def __init__(self, grid, x, y, width, height, start, end):
        self.S, self.E = 1, 2
        self.HORIZONTAL, self.VERTICAL = 1, 2
        self.grid, self.x, self.y, self.width, self.height = grid, x, y, width, height
        self.order = queue()
        self.start = start
        self.end = end

    def start_divide(self):
        self.divide(
            self.grid,
            self.x,
            self.y,
            self.width,
            self.height,
            self.choose_orientation(self.width, self.height),
        )
        return list(self.order)

    def choose_orientation(self, width, height):
        if width < height:
            return self.HORIZONTAL  # horizontal
        elif height < width:
            return self.VERTICAL  # vertical
        else:
            return self.HORIZONTAL if randrange(2) == 0 else self.VERTICAL

    def divide(self, grid, x, y, width, height, orientation):
        if (
            width < 2 or height < 2
        ):  # first checks to see if the maze has reached the target
            return
        horizontal = orientation == self.HORIZONTAL

        truewidth = math.floor((width - 1) / 2)
        # le vagy fel kerekit?
        trueheight = math.floor((height - 1) / 2)
        # where will the wall be drawn from?
        wx = x + (
            0 if horizontal else (0 if truewidth == 0 else 2 * randrange(truewidth) + 1)
        )  # lehet + 1 minden range-ben
        wy = y + (
            (2 * randrange(trueheight) + 1 if trueheight > 0 else 0)
            if horizontal
            else 0
        )
        # where will the passage through the wall exist?
        px = wx + (
            (2 * randrange(truewidth) if truewidth > 0 else 0) if horizontal else 0
        )
        py = wy + (
            0 if horizontal else (2 * randrange(trueheight) if trueheight > 0 else 0)
        )
        # what direction will the wall be drawn?
        dx = 1 if horizontal else 0
        dy = 0 if horizontal else 1

        # how long will the wall be?
        length = width if horizontal else height  # ez lehet fordíva

        for _ in range(length):
            if wx != px or wy != py:
                if not (
                    wy == self.start.get_x()
                    and wx == self.start.get_y()
                    or wy == self.end.get_x()
                    and wx == self.end.get_y()
                ):
                    grid.set_node_field(wy, wx, Fields.WALL)
                    self.order.append((wy, wx))
            wx += dx
            wy += dy

        nx, ny = x, y
        w, h = [width, wy - y] if horizontal else [wx - x, height]
        self.divide(grid, nx, ny, w, h, self.choose_orientation(w, h))

        nx, ny = [x, wy + 1] if horizontal else [wx + 1, y]
        w, h = (
            [width, y + height - wy - 1] if horizontal else [x + width - wx - 1, height]
        )
        self.divide(grid, nx, ny, w, h, self.choose_orientation(w, h))
