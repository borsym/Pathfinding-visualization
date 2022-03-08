import sys
from persistance.Fields import Fields
from algorithms.common_propertys import CommonPropertys

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
            self.visited_nodes_order.append((row, col))
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

                if self.grid.get_node_field(row, col) == Fields.END:
                    self.ptr = self.grid.get_node(row, col)
                    return (
                        list(self.visited_nodes_order),
                        self.get_nodes_in_shortest_path_order(),
                    )  # es majd egy backtracking
        return list(self.visited_nodes_order), []


# table = Table(20,50, Node(10,15,Fields.START), Node(10,35,Fields.END))
# dfs = DFS(table, Node(10,15,Fields.START))
# a,b = dfs.start_dfs()
# print(a)
# print()
# print(b)
