import sys
from src.persistance.Fields import Fields
from src.algorithms.common_propertys import CommonPropertys
import gc
sys.path.append("..")


class BFS(CommonPropertys):
    def start_bfs(self):
        while len(self.q):
            arr = self.q.popleft()
            x = arr[0]
            y = arr[1]
            self.visited_nodes_order.append((x,y))
            # Go to the adjacent cells
            for dr, dc in self.directions:
                
                adjx = x + dr
                adjy = y + dc
                if self.isValid(
                    adjx, adjy, self.grid.get_row_size(), self.grid.get_column_size()
                ):
                    self.grid.get_node(adjx, adjy).set_previous_node(
                        self.grid.get_node(x, y)
                    )
                    tmp = (adjx, adjy)
                    self.q.append(tmp)
                    self.visited_nodes_order.append(tmp)
                    if self.grid.get_node(adjx, adjy) == self.end:
                        self.ptr = self.grid.get_node(adjx, adjy)
                        del self.q
                        gc.collect()
                        return (
                            list(self.visited_nodes_order),
                            self.get_nodes_in_shortest_path_order(),
                        )

        return list(self.visited_nodes_order), []
