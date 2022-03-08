from persistance.Fields import Fields
from algorithms.common_propertys import CommonPropertys
import sys

sys.path.append("..")


class Dijkstra(CommonPropertys):
    def start_dijsktra(self):
        # Initialize both open and closed list
        # Add the self.start node
        self.open_list.append(self.start)

        # Loop until you find the end
        while len(self.open_list):
            current_node = self.open_list[0]
            current_index = 0

            for index, item in enumerate(self.open_list):
                if (
                    item.get_weight() + item.get_distance()
                    < current_node.get_weight() + current_node.get_distance()
                ):
                    current_node = item
                    current_index = index
            distance = current_node.get_distance()
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

                is_valid = True
                for node in self.open_list:
                    if (
                        node.get_x() == new_node.get_x()
                        and node.get_y() == new_node.get_y()
                    ):
                        is_valid = False
                        break

                if is_valid:
                    new_node.set_distance(1 + distance)
                    self.open_list.append(new_node)
        return list(self.visited_nodes_order), []
