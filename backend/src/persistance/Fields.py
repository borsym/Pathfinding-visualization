from enum import Enum
import sys
sys.path.append("..")

class Fields(Enum):
    EMPTY = 0
    WALL = 99999  # float('inf')
    START = -1  # ez probléma lehet
    END = -2    # ezzel együtt
    GRASS = 3
    WATER = 5
    STONE = 8

    def get_field_by_name(value):
        for field in Fields:
            if field.value == value:
                return field
        return None
