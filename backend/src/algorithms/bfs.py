import sys
from persistance.Fields import Fields
from algorithms.common_propertys import CommonPropertys

sys.path.append("..")


class BFS(CommonPropertys):
    def start_bfs(self):
        while len(self.q):
            arr = self.q.popleft()
            x = arr[0]
            y = arr[1]

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
                    self.order_of_visited_nodes.append(tmp)
                    if self.grid.get_node_field(adjx, adjy) == Fields.END:
                        self.ptr = self.grid.get_node(adjx, adjy)
                        return (
                            self.order_of_visited_nodes,
                            self.get_nodes_in_shortest_path_order(),
                        )

        return self.order_of_visited_nodes, []


# start = Node(10,15 , Fields.START)
# end = Node(10, 35, Fields.END)
# table = Table(20, 50, start, end)

# # start = Node(1,0 , Fields.START)
# # end = Node(9, 8, Fields.END)
# # table = Table(10, 10, start, end)
# # table.print_grid()
# # # table.set_node_field(10, 16, Fields.WALL)
# # # table.set_node_field(9, 16, Fields.WALL)
# # print(table.get_row_size())
# # print(table.get_column_size())
# # print()
# bfs = BFS(table, (10, 15))
# order, path = bfs.start_bfs()
# # # # print("hallo\n")
# print(order, '\n', path)
