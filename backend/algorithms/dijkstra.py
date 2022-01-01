from Structure.Persistance.Fields import Fields
from Structure.Persistance.Node import Node
from Structure.Persistance.Table import Table


# max graffa lakitás
# EZ SZARUL MŰKÖDIK, VALAMI FIXET KI KELL TALANI VAGY ÁTALAKÍTANI AZ EGÉSZET GRÁFFÁ?
# TODO ezt valahogy javitani kell mivel nemtudom hogy kéne a súlyozást megoldani, jelenleg distance+weight rendézésnél csinálom meg
# lehet van rá valami más ötlet ezt meg kéne nézni de egyenlőre "működik"
# a weightnek nem a sortolásnál kellene lennie, máshova kell kitalálni, meg lehet hogy egy forciklussal jobban járnék valamit ki kell találni

# Nekem most úgy van jelölve hogy rálép a nodera és akkor a nodeból a többi elemhez 6 súllyal tudok ellépni, nekem nem ez kéne szerintem hanem az hogy
# ha valaki el akar jönni ebbe a nodeba akkor 6 al jön el, nem pedig ugy hogy rálépett és utána modja hogy 6 al tudna továbbmenni

# erre majd valamit ki kell találni valamit nem teljesen jó így
class Dijkstra:
    def __init__(self, grid, start, end):
        self.start = start
        self.grid = grid
        self.end = end
        self.visited_nodes_in_order = []
        self.unvisited_nodes = []
        self.ptr = None  # ezt rakom majd rá

    def start_dijkstra(self):
        self.grid.set_node_distance(self.start.x, self.start.y, 0)
        self.unvisited_nodes = self.get_all_nodes()
        while len(self.unvisited_nodes):
            self.unvisited_nodes = self.sort_nodes_by_distance()
            closest_node = self.unvisited_nodes.pop(0)
            if closest_node.is_wall:
                continue
            if closest_node.distance == float('inf'):
                self.ptr = closest_node
                # print(self.ptr)
                return self.visited_nodes_in_order
            closest_node.is_visited = True
            closest_node.distance += closest_node.weight  # ez így megoldja de nem úgy ahogy akarom
            self.visited_nodes_in_order.append(closest_node)

            if (closest_node.x, closest_node.y) == (self.end.x, self.end.y):
                self.ptr = closest_node
                return self.visited_nodes_in_order
            self.update_unvisited_neighbors(closest_node)

    def get_all_nodes(self):
        return self.grid.get_all()

    def sort_nodes_by_distance(self):  # IDE VALAMI MÁST KÉNE KITALÁLNI
        a = sorted(self.unvisited_nodes,
                      key=lambda x: x.distance) # + x.weight
        # for i in a:
        #     print((i.x, i.y, i.distance, i.weight), end =" ")
        # print()
        return a
        # itt lesz a baj sztm, nem jo x,y al se  + x.weight
        # itt valami kell mert most ugy megy hogy belerakaja a 6 ot is a visited nodesba pedig nem szeretném
        # most hozzáírtam a x.value az is lehet baj +x.value hmmm
        # valahogy nem tudom számításaba venni a weightet
        # unvisited_nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)

    def update_unvisited_neighbors(self, node):
        # itt kéne valamit mókolni
        unvisited_neighbours = self.get_unvisited_neighbors(node)
        for neighbor in unvisited_neighbours:
            neighbor.distance = node.distance + 1  # + node.value # ez itt lehet baj valahogy, hozzá kell adni a 100 at az adott node költségének mert így minden nodehoz az után hozzáadja
            neighbor.previous_node = node  # vagyis megy és nem 1-2-3 hanem 1-2-103-104 és ez így nem jo

    def get_unvisited_neighbors(self, node):
        neighbors = []
        x, y = node.get_x(), node.get_y()
        if x > 0:
            neighbors.append(self.grid.get_node(x - 1, y))
        if x < self.grid.get_row_len():  # ez is csere
            neighbors.append(self.grid.get_node(x + 1, y))
        if y > 0:
            neighbors.append(self.grid.get_node(x, y - 1))
        if y < self.grid.get_col_len():  # ezzel
            neighbors.append(self.grid.get_node(x, y + 1))
        # neighbors_2 = filter(lambda neighbor: not neighbor.get_is_visited, neighbors)
        return list(filter(lambda node: not node.is_visited, neighbors))

    def get_nodes_in_shortest_path_order(self):
        nodes_in_shortest_path_order = []
        current_node = self.ptr  # ez a pointer nem ugyan az ami fentebb van beállítva
        while current_node is not None:
            nodes_in_shortest_path_order.insert(0, current_node)
            current_node = current_node.previous_node
        return nodes_in_shortest_path_order


s = (10, 15)
e = (10, 35)
start = Node(10,15 , Fields.START)
end = Node(10, 35, Fields.END)
table = Table(20, 50, start, end)

# table.change_node(0, 2, Fields.WALL) # what the xd

table.print_grid()
print("")
# table.print_grid_2()
# SZARUL ADOM ÁT A (2,6) MERT FORDÍTVA KÉNE PAPÍRON??, NODEOKAT KELL MÁTÓL ÁTADNI #TODO
dij = Dijkstra(table, start, end)
asd = dij.start_dijkstra()

for i in asd:
    print((i.x, i.y), end=", ")
print("\nhello")
path = dij.get_nodes_in_shortest_path_order()

print()
for i in path:
    print((i.x, i.y), end=" ")
print()
# nem veszi figyelembe a számításnál hogy 10 et ér a water


'''
from Structure.Persistance.Fields import Fields
from Structure.Persistance.Node import Node
from Structure.Persistance.Table import Table
#max graffa lakitás
# EZ SZARUL MŰKÖDIK, VALAMI FIXET KI KELL TALANI VAGY ÁTALAKÍTANI AZ EGÉSZET GRÁFFÁ?
#TODO ezt valahogy javitani kell mivel nemtudom hogy kéne a súlyozást megoldani, jelenleg distance+weight rendézésnél csinálom meg
# lehet van rá valami más ötlet ezt meg kéne nézni de egyenlőre "működik"
# a weightnek nem a sortolásnál kellene lennie, máshova kell kitalálni, meg lehet hogy egy forciklussal jobban járnék valamit ki kell találni

# Nekem most úgy van jelölve hogy rálép a nodera és akkor a nodeból a többi elemhez 6 súllyal tudok ellépni, nekem nem ez kéne szerintem hanem az hogy
# ha valaki el akar jönni ebbe a nodeba akkor 6 al jön el, nem pedig ugy hogy rálépett és utána modja hogy 6 al tudna továbbmenni
class Dijkstra:
    def __init__(self, grid, start, end):
        self.start = start
        self.grid = grid
        self.end = end
        self.visited_nodes_in_order = []
        self.unvisited_nodes = []
        self.ptr = None # ezt rakom majd rá

    def start_dijkstra(self):
        self.grid.set_node_distance(self.start.x, self.start.y, 0)
        self.unvisited_nodes = self.get_all_nodes()
        while len(self.unvisited_nodes):
            self.unvisited_nodes = self.sort_nodes_by_distance()

            closest_node = self.unvisited_nodes.pop(0)  # shift volt
            if closest_node.is_wall:
                continue
            if closest_node.distance == float('inf'):
                self.ptr = closest_node
                print(self.ptr)
                return self.visited_nodes_in_order
            closest_node.is_visited = True
            closest_node.distance += closest_node.weight # lehet ez a megoldás?
            self.visited_nodes_in_order.append(closest_node)

            if (closest_node.x, closest_node.y) == (self.end.x, self.end.y):
                self.ptr = closest_node
                return self.visited_nodes_in_order
            self.update_unvisited_neighbors(closest_node)


    def get_all_nodes(self):
        return self.grid.get_all()

    def sort_nodes_by_distance(self):                                              # IDE VALAMI MÁST KÉNE KITALÁLNI
        return sorted(self.unvisited_nodes, key=lambda x: x.distance)           #  itt lesz a baj sztm, nem jo x,y al se  + x.weight
                                                                               # most hozzáírtam a x.value az is lehet baj +x.value hmmm
                                                                        # valahogy nem tudom számításaba venni a weightet
        # unvisited_nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)

    def update_unvisited_neighbors(self, node):
        # itt kéne valamit mókolni
        unvisited_neighbours = self.get_unvisited_neighbors(node)
        for neighbor in unvisited_neighbours:
            neighbor.distance = node.distance + 1                 # + node.value # ez itt lehet baj valahogy, hozzá kell adni a 100 at az adott node költségének mert így minden nodehoz az után hozzáadja
            neighbor.previous_node = node                         # vagyis megy és nem 1-2-3 hanem 1-2-103-104 és ez így nem jo


    def get_unvisited_neighbors(self, node):
        neighbors = []
        x, y = node.get_x(), node.get_y()
        if x > 0:
            neighbors.append(self.grid.get_node(x - 1, y))
        if x < self.grid.get_row_len():  # ez is csere
            neighbors.append(self.grid.get_node(x + 1, y))
        if y > 0:
            neighbors.append(self.grid.get_node(x, y - 1))
        if y < self.grid.get_col_len():  # ezzel
            neighbors.append(self.grid.get_node(x, y + 1))
        # neighbors_2 = filter(lambda neighbor: not neighbor.get_is_visited, neighbors)
        return list(filter(lambda node: not node.is_visited, neighbors))

    def get_nodes_in_shortest_path_order(self):
        nodes_in_shortest_path_order = []
        current_node = self.ptr  # ez a pointer nem ugyan az ami fentebb van beállítva
        while current_node is not None:
            nodes_in_shortest_path_order.insert(0, current_node)
            current_node = current_node.previous_node
        return nodes_in_shortest_path_order


s = (1, 1)
e = (2, 6)
print('start: ', (1,1), ' end: ', (0,2))
end = Node(0, 2, Fields.START)
start = Node(1, 1, Fields.END)
table = Table(3, 8, start, end)
table.change_node(0, 1, Fields.WALL) #bugos???
table.change_node(1, 2, Fields.GRASS) # what the xd
table.change_node(1, 3, Fields.WATER)
#table.change_node(0, 2, Fields.WALL) # what the xd

table.print_grid()
print("")
# table.print_grid_2()
# SZARUL ADOM ÁT A (2,6) MERT FORDÍTVA KÉNE PAPÍRON??, NODEOKAT KELL MÁTÓL ÁTADNI #TODO
dij = Dijkstra(table, start, end)
asd = dij.start_dijkstra()

for i in asd:
    print((i.x, i.y), end=", ")
print("\nhello")
path = dij.get_nodes_in_shortest_path_order()
table.print_grid_2()

print()
for i in path:
    print((i.x, i.y), end=" ")
print()
table.print_path(path)
# nem veszi figyelembe a számításnál hogy 10 et ér a water
'''
