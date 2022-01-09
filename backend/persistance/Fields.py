from enum import Enum

class Fields(Enum):
    EMPTY = 0
    WALL = 99999 #float('inf')
    START = -1
    END = -1
    PATH = 0
    GRASS = 3
    WATER = 10
    STONE = 80




