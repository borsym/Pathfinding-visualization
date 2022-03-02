from enum import Enum


class Fields(Enum):
    EMPTY = 0
    WALL = 99999  # float('inf')
    START = -1  # ez probléma lehet
    END = -2    # ezzel együtt
    GRASS = 10
    WATER = 20
    STONE = 30

    def get_field_by_name(value):
        for field in Fields:
            if field.value == value:
                return field
        return None
