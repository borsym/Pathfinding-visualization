from algorithms.common_propertys import CommonPropertys
from persistance.Fields import Fields
import sys
import gc
sys.path.append("..")


class Astar(CommonPropertys):
    def start_astar(self):
        # Initialize both open and closed list
        # Add the self.start node
        self.open_list.append(self.start)

        # Loop until you find the end
        while len(self.open_list):
            current_node = self.open_list[0]
            current_index = 0
            for index, item in enumerate(self.open_list):
                if item.f < current_node.f:
                    current_node = item
                    current_index = index

            # Pop current off open list, add to closed list
            self.visited_nodes_order.append(
                (current_node.get_x(), current_node.get_y())
            )
            self.open_list.pop(current_index)
            self.closed_list.append(current_node)

            # Found the goal
            if current_node == self.end:
                path = []
                current = current_node
                while current is not None:
                    path.append((current.get_x(), current.get_y()))
                    current = current.previous_node
                del self.open_list
                del self.closed_list
                gc.collect()
                return (
                    list(self.visited_nodes_order),
                    path[::-1],
                )  # Return reversed path

            for dr, dy in self.directions:  # Adjacent squares

                # Get node position
                currx, curry = (current_node.get_x() + dr, current_node.get_y() + dy)

                # Make sure within range

                if not self.isValid(
                    currx, curry, self.grid.get_row_size(), self.grid.get_column_size()
                ):
                    continue

                # Create new node
                new_node = self.grid.get_node(currx, curry)
                in_closed_list = False
                for node in self.closed_list:
                    if (
                        node.get_x() == new_node.get_x()
                        and node.get_y() == new_node.get_y()
                    ):
                        in_closed_list = True
                        break
                if in_closed_list:
                    continue

                new_node.set_previous_node(current_node)

                new_node.g = current_node.g + 1 + new_node.get_weight()
                new_node.h = self.distance(self.end, new_node)
                new_node.f = new_node.g + new_node.h

                is_valid = True
                for node in self.open_list:
                    if (
                        node.get_x() == new_node.get_x()
                        and node.get_y() == new_node.get_y()
                    ):
                        is_valid = False
                        break

                if is_valid:
                    self.open_list.append(new_node)
        return list(self.visited_nodes_order), []
