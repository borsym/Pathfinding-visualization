import sys
from src.persistance.Fields import Fields
from src.algorithms.common_propertys import CommonPropertys
import gc
sys.path.append("..")


# Function to perform DFS
# Traversal on the matrix grid[]
class DFS(CommonPropertys):
    def start_dfs(self, Node=None):
        # Iterate until the
        # stack is not empty
        while len(self.stack):
            # Pop the top pair
            curr = self.stack.pop(len(self.stack) - 1)
            row = curr[0]
            col = curr[1]

            # Check if the current popped
            # cell is a valid cell or not

            if (row, col) in self.vis:
                continue
            # Mark the current
            # cell as visited
            self.order_of_visited_nodes.append((row, col))
            self.vis.add((row, col))

            self.grid.get_node(row, col).set_previous_node(Node)
            Node = self.grid.get_node(row, col)

            # Push all the adjacent cells
            for dr, dc in self.directions:
                adjx = row + dr
                adjy = col + dc
                if not self.isValid(
                    adjx, adjy, self.grid.get_row_size(), self.grid.get_column_size()
                ):
                    continue

                self.stack.append((adjx, adjy))

                if self.grid.get_node(row, col) == self.end:
                    self.ptr = self.grid.get_node(row, col)
                    del self.stack
                    gc.collect()
                    return (
                        self.order_of_visited_nodes,
                        self.get_nodes_in_shortest_path_order(),
                    )
        return self.order_of_visited_nodes, []

