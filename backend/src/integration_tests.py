import unittest


from persistance.Table import Table
from algorithms.bfs import BFS
from algorithms.dfs import DFS
from algorithms.astar import Astar
from algorithms.dijkstra import Dijkstra
from algorithms.recursive_division import RecursiveDivison
from algorithms.random_maze import RandomMaze
from algorithms.distances import Distance
from persistance.Node import Node
from persistance.Fields import Fields


class TestIntegration(unittest.TestCase):
    def setUp(self):
        self.start = Node(10, 30, Fields.START)
        self.end = Node(10, 35, Fields.END)
        self.table = Table(20, 50, self.start, self.end)
        self.distance = Distance()
        self.distance_formula = "Euclidean"

    def test_table_multiple_operation(self):
        self.table.change_start(11, 30)
        self.table.change_end(11, 35)
        self.assertEqual(self.table.start.x, 11)
        self.assertEqual(self.table.start.y, 30)
        self.assertEqual(self.table.end.x, 11)
        self.assertEqual(self.table.end.y, 35)

        prev_weight_start = self.table.get_node_weight(11, 30)
        prev_weight_end = self.table.get_node_weight(11, 35)
        self.table.change_start(10, 15)
        self.table.change_end(10, 35)
        self.assertEqual(prev_weight_start, self.table.get_node_weight(10, 15))
        self.assertEqual(prev_weight_end, self.table.get_node_weight(10, 35))
        self.assertEqual(self.table.get_node_weight(11, 30), 0)
        self.assertEqual(self.table.get_node_weight(11, 35), 0)

        self.assertEqual(self.table.get_start().get_x(), 10)
        self.assertEqual(self.table.get_start().get_y(), 15)
        self.assertEqual(self.table.get_end().get_x(), 10)
        self.assertEqual(self.table.get_end().get_y(), 35)

        self.assertEqual(Fields.START, self.table.get_node_field(10, 15))
        self.assertEqual(Fields.END, self.table.get_node_field(10, 35))

        self.table.refresh_board(0, 0, 10, 10)
        self.assertEqual(self.table.get_node_field(10, 15), Fields.EMPTY)
        self.assertEqual(self.table.get_node_field(10, 35), Fields.EMPTY)
        self.assertEqual(self.table.get_node_field(0, 0), Fields.START)
        self.assertEqual(self.table.get_node_field(10, 10), Fields.END)

        self.table.set_node_field(10, 10, Fields.GRASS)
        self.assertEqual(self.table.get_node_field(10, 10), Fields.GRASS)
        self.assertEqual(self.table.get_node_weight(10, 10), 10)

        self.table.set_node_field(10, 10, Fields.STONE)
        self.assertEqual(self.table.get_node_field(10, 10), Fields.STONE)
        self.assertEqual(self.table.get_node_weight(10, 10), 30)

    def test_node_multiple_operation(self):
        node_start = Node(10, 30, Fields.START)
        node_end = Node(10, 35, Fields.END)
        node_wall = Node(10,34, Fields.WALL)
        node_wall_2 = Node(10,36, Fields.WALL)
        node_grass = Node(10,33, Fields.GRASS)
        node_water = Node(10,32, Fields.WATER)
        node_stone = Node(10,31, Fields.STONE)
        node_empty = Node(10,29, Fields.EMPTY)

        self.assertTrue(node_wall == node_wall_2)
        self.assertFalse(node_grass == node_water)
        self.assertFalse(node_grass == node_stone)
        self.assertFalse(node_stone == node_water)
        self.assertFalse(node_end == node_start)
        self.assertFalse(node_end == node_empty)

        self.assertTrue(node_wall.get_is_wall())
        self.assertTrue(node_wall_2.get_is_wall())
        self.assertFalse(node_empty.get_is_wall())
        self.assertFalse(node_stone.get_is_wall())
        self.assertFalse(node_grass.get_is_wall())
        self.assertFalse(node_water.get_is_wall())

        self.assertEqual(node_start.get_weight(), Fields.START.value)
        self.assertEqual(node_end.get_weight(), Fields.END.value)
        self.assertEqual(node_wall.get_weight(), Fields.WALL.value)
        self.assertEqual(node_wall_2.get_weight(), Fields.WALL.value)
        self.assertEqual(node_grass.get_weight(), Fields.GRASS.value)
        self.assertEqual(node_water.get_weight(), Fields.WATER.value)
        self.assertEqual(node_stone.get_weight(), Fields.STONE.value)
        self.assertEqual(node_empty.get_weight(), Fields.EMPTY.value)

        self.assertEqual(node_start.get_previous_node(), None)
        self.assertEqual(node_end.get_previous_node(), None)
        self.assertEqual(node_wall.get_previous_node(), None)
        self.assertEqual(node_wall_2.get_previous_node(), None)
        self.assertEqual(node_grass.get_previous_node(), None)
        self.assertEqual(node_water.get_previous_node(), None)
        self.assertEqual(node_stone.get_previous_node(), None)
        self.assertEqual(node_empty.get_previous_node(), None)

        node_wall_2.set_previous_node(node_end)
        node_end.set_previous_node(node_wall)
        node_wall.set_previous_node(node_grass)
        node_grass.set_previous_node(node_water)
        node_water.set_previous_node(node_stone)
        node_start.set_previous_node(node_empty)

        self.assertEqual(node_start.get_previous_node(), node_empty)
        self.assertEqual(node_end.get_previous_node(), node_wall)
        self.assertEqual(node_wall.get_previous_node(), node_grass)
        self.assertEqual(node_wall_2.get_previous_node(), node_end)
        self.assertEqual(node_grass.get_previous_node(), node_water)
        self.assertEqual(node_water.get_previous_node(), node_stone)
        self.assertEqual(node_stone.get_previous_node(), None)

    def test_table_errors(self):
        with self.assertRaises(Exception):
            self.table.set_node_field(0, 100, Fields.START)
            self.table.set_node_field(100, 0, Fields.START)
            self.table.set_node_field(100, 100, Fields.START)
            
            self.table.change_start(0, 100)
            self.table.change_start(100, 0)
            self.table.change_start(1000, 100)
            
            self.table.change_end(0, 100)
            self.table.change_end(100, 0)
            self.table.change_end(1000, 100)

            self.table.get_node_weight(0, 100)
            self.table.get_node_weight(100, 0)
            self.table.get_node_weight(1000, 100)

            self.table.get_node(0, 100)
            self.table.get_node(100, 0)
            self.table.get_node(1000, 100)
            
            self.table.get_node_field(0, 100)
            self.table.get_node_field(100, 0)
            self.table.get_node_field(1000, 100)

            self.table.refresh_board(100, 12,1,1)
            self.table.refresh_board(0, 100,1,1)
            self.table.refresh_board(0, 10,100,1)
            self.table.refresh_board(0, 12,1,100)

            self.table.refresh_board(1, 1,1,1)
            self.table.refresh_board(1, 1,1,0)
            self.table.refresh_board(1, 1,0,1)
            self.table.refresh_board(1, 0,0,1)
            self.table.refresh_board(0, 1,0,1)
            self.table.refresh_board(0, 1,1,0)

    def test_algorithms_with_walls(self):
        astar = Astar(
            self.table,
            self.start,
            self.end,
            self.distance.get_distance(self.distance_formula),
        )
        bfs = BFS(self.table, self.start)
        dijkstra = Dijkstra(self.table, self.start, self.end)
        dfs = DFS(self.table, self.start)

        assert dfs is not None
        assert dijkstra is not None
        assert bfs is not None
        assert astar is not None

        for i in range(4):
            self.table.set_node_field(8 + i, 33, Fields.WALL)

        order, shorthest_path = astar.start_astar()
        assert order is not None
        assert shorthest_path is not None
        self.assertEqual(
            order,
            [
                (10, 30),
                (10, 31),
                (10, 32),
                (9, 30),
                (11, 30),
                (9, 31),
                (11, 31),
                (9, 32),
                (11, 32),
                (10, 29),
                (8, 30),
                (12, 30),
                (8, 31),
                (12, 31),
                (8, 32),
                (12, 32),
                (12, 33),
                (9, 29),
                (11, 29),
                (12, 34),
                (11, 34),
                (7, 30),
                (13, 30),
                (10, 28),
                (7, 31),
                (13, 31),
                (12, 35),
                (11, 35),
                (10, 35),
            ],
        )
        self.assertEqual(
            shorthest_path,
            [
                (10, 30),
                (11, 30),
                (12, 30),
                (12, 31),
                (12, 32),
                (12, 33),
                (12, 34),
                (12, 35),
                (11, 35),
                (10, 35),
            ],
        )

        order, shorthest_path = bfs.start_bfs()
        assert order is not None
        assert shorthest_path is not None
        self.assertEqual(
            order,
            [
                (10, 30),
                (10, 29),
                (10, 31),
                (9, 30),
                (11, 30),
                (10, 28),
                (9, 29),
                (11, 29),
                (10, 32),
                (9, 31),
                (11, 31),
                (8, 30),
                (12, 30),
                (10, 27),
                (9, 28),
                (11, 28),
                (8, 29),
                (12, 29),
                (9, 32),
                (11, 32),
                (8, 31),
                (12, 31),
                (7, 30),
                (13, 30),
                (10, 26),
                (9, 27),
                (11, 27),
                (8, 28),
                (12, 28),
                (7, 29),
                (13, 29),
                (8, 32),
                (12, 32),
                (7, 31),
                (13, 31),
                (6, 30),
                (14, 30),
                (10, 25),
                (9, 26),
                (11, 26),
                (8, 27),
                (12, 27),
                (7, 28),
                (13, 28),
                (6, 29),
                (14, 29),
                (7, 32),
                (12, 33),
                (13, 32),
                (6, 31),
                (14, 31),
                (5, 30),
                (15, 30),
                (10, 24),
                (9, 25),
                (11, 25),
                (8, 26),
                (12, 26),
                (7, 27),
                (13, 27),
                (6, 28),
                (14, 28),
                (5, 29),
                (15, 29),
                (7, 33),
                (6, 32),
                (12, 34),
                (13, 33),
                (14, 32),
                (5, 31),
                (15, 31),
                (4, 30),
                (16, 30),
                (10, 23),
                (9, 24),
                (11, 24),
                (8, 25),
                (12, 25),
                (7, 26),
                (13, 26),
                (6, 27),
                (14, 27),
                (5, 28),
                (15, 28),
                (4, 29),
                (16, 29),
                (7, 34),
                (6, 33),
                (5, 32),
                (12, 35),
                (11, 34),
                (13, 34),
                (14, 33),
                (15, 32),
                (4, 31),
                (16, 31),
                (3, 30),
                (17, 30),
                (10, 22),
                (9, 23),
                (11, 23),
                (8, 24),
                (12, 24),
                (7, 25),
                (13, 25),
                (6, 26),
                (14, 26),
                (5, 27),
                (15, 27),
                (4, 28),
                (16, 28),
                (3, 29),
                (17, 29),
                (7, 35),
                (6, 34),
                (8, 34),
                (5, 33),
                (4, 32),
                (12, 36),
                (11, 35),
                (13, 35),
                (10, 34),
                (14, 34),
                (15, 33),
                (16, 32),
                (3, 31),
                (17, 31),
                (2, 30),
                (18, 30),
                (10, 21),
                (9, 22),
                (11, 22),
                (8, 23),
                (12, 23),
                (7, 24),
                (13, 24),
                (6, 25),
                (14, 25),
                (5, 26),
                (15, 26),
                (4, 27),
                (16, 27),
                (3, 28),
                (17, 28),
                (2, 29),
                (18, 29),
                (7, 36),
                (6, 35),
                (8, 35),
                (5, 34),
                (9, 34),
                (4, 33),
                (3, 32),
                (12, 37),
                (11, 36),
                (13, 36),
                (10, 35),
            ],
        )
        self.assertEqual(
            shorthest_path,
            [
                (10, 30),
                (10, 31),
                (10, 32),
                (11, 32),
                (12, 32),
                (12, 33),
                (12, 34),
                (12, 35),
                (11, 35),
                (10, 35),
            ],
        )

        order, shorthest_path = dijkstra.start_dijsktra()
        assert order is not None
        self.assertEqual(
            order,
            [
                (10, 30),
                (10, 29),
                (10, 31),
                (9, 30),
                (11, 30),
                (10, 28),
                (9, 29),
                (11, 29),
                (10, 32),
                (9, 31),
                (11, 31),
                (8, 30),
                (12, 30),
                (10, 27),
                (9, 28),
                (11, 28),
                (8, 29),
                (12, 29),
                (9, 32),
                (11, 32),
                (8, 31),
                (12, 31),
                (7, 30),
                (13, 30),
                (10, 26),
                (9, 27),
                (11, 27),
                (8, 28),
                (12, 28),
                (7, 29),
                (13, 29),
                (8, 32),
                (12, 32),
                (7, 31),
                (13, 31),
                (6, 30),
                (14, 30),
                (10, 25),
                (9, 26),
                (11, 26),
                (8, 27),
                (12, 27),
                (7, 28),
                (13, 28),
                (6, 29),
                (14, 29),
                (7, 32),
                (12, 33),
                (13, 32),
                (6, 31),
                (14, 31),
                (5, 30),
                (15, 30),
                (10, 24),
                (9, 25),
                (11, 25),
                (8, 26),
                (12, 26),
                (7, 27),
                (13, 27),
                (6, 28),
                (14, 28),
                (5, 29),
                (15, 29),
                (7, 33),
                (6, 32),
                (12, 34),
                (13, 33),
                (14, 32),
                (5, 31),
                (15, 31),
                (4, 30),
                (16, 30),
                (10, 23),
                (9, 24),
                (11, 24),
                (8, 25),
                (12, 25),
                (7, 26),
                (13, 26),
                (6, 27),
                (14, 27),
                (5, 28),
                (15, 28),
                (4, 29),
                (16, 29),
                (7, 34),
                (6, 33),
                (5, 32),
                (12, 35),
                (11, 34),
                (13, 34),
                (14, 33),
                (15, 32),
                (4, 31),
                (16, 31),
                (3, 30),
                (17, 30),
                (10, 22),
                (9, 23),
                (11, 23),
                (8, 24),
                (12, 24),
                (7, 25),
                (13, 25),
                (6, 26),
                (14, 26),
                (5, 27),
                (15, 27),
                (4, 28),
                (16, 28),
                (3, 29),
                (17, 29),
                (7, 35),
                (6, 34),
                (8, 34),
                (5, 33),
                (4, 32),
                (12, 36),
                (11, 35),
                (10, 35),
            ],
        )
        self.assertEqual(
            shorthest_path,
            [
                (10, 30),
                (11, 30),
                (12, 30),
                (12, 31),
                (12, 32),
                (12, 33),
                (12, 34),
                (11, 34),
                (11, 35),
                (10, 35),
            ],
        )

        order, shorthest_path = dfs.start_dfs()
        assert order is not None
        assert shorthest_path is not None
        self.assertEqual(
            order,
            [
                (10, 30),
                (11, 30),
                (12, 30),
                (13, 30),
                (14, 30),
                (15, 30),
                (16, 30),
                (17, 30),
                (18, 30),
                (19, 30),
                (19, 31),
                (18, 31),
                (17, 31),
                (16, 31),
                (15, 31),
                (14, 31),
                (13, 31),
                (12, 31),
                (11, 31),
                (10, 31),
                (9, 31),
                (8, 31),
                (7, 31),
                (6, 31),
                (5, 31),
                (4, 31),
                (3, 31),
                (2, 31),
                (1, 31),
                (0, 31),
                (0, 32),
                (1, 32),
                (2, 32),
                (3, 32),
                (4, 32),
                (5, 32),
                (6, 32),
                (7, 32),
                (8, 32),
                (9, 32),
                (10, 32),
                (11, 32),
                (12, 32),
                (13, 32),
                (14, 32),
                (15, 32),
                (16, 32),
                (17, 32),
                (18, 32),
                (19, 32),
                (19, 33),
                (18, 33),
                (17, 33),
                (16, 33),
                (15, 33),
                (14, 33),
                (13, 33),
                (12, 33),
                (12, 34),
                (13, 34),
                (14, 34),
                (15, 34),
                (16, 34),
                (17, 34),
                (18, 34),
                (19, 34),
                (19, 35),
                (18, 35),
                (17, 35),
                (16, 35),
                (15, 35),
                (14, 35),
                (13, 35),
                (12, 35),
                (11, 35),
                (10, 35),
            ],
        )
        self.assertEqual(
            shorthest_path,
            [
                (10, 30),
                (11, 30),
                (12, 30),
                (13, 30),
                (14, 30),
                (15, 30),
                (16, 30),
                (17, 30),
                (18, 30),
                (19, 30),
                (19, 31),
                (18, 31),
                (17, 31),
                (16, 31),
                (15, 31),
                (14, 31),
                (13, 31),
                (12, 31),
                (11, 31),
                (10, 31),
                (9, 31),
                (8, 31),
                (7, 31),
                (6, 31),
                (5, 31),
                (4, 31),
                (3, 31),
                (2, 31),
                (1, 31),
                (0, 31),
                (0, 32),
                (1, 32),
                (2, 32),
                (3, 32),
                (4, 32),
                (5, 32),
                (6, 32),
                (7, 32),
                (8, 32),
                (9, 32),
                (10, 32),
                (11, 32),
                (12, 32),
                (13, 32),
                (14, 32),
                (15, 32),
                (16, 32),
                (17, 32),
                (18, 32),
                (19, 32),
                (19, 33),
                (18, 33),
                (17, 33),
                (16, 33),
                (15, 33),
                (14, 33),
                (13, 33),
                (12, 33),
                (12, 34),
                (13, 34),
                (14, 34),
                (15, 34),
                (16, 34),
                (17, 34),
                (18, 34),
                (19, 34),
                (19, 35),
                (18, 35),
                (17, 35),
                (16, 35),
                (15, 35),
                (14, 35),
                (13, 35),
                (12, 35),
                (11, 35),
                (10, 35),
            ],
        )


if __name__ == "__main__":
    unittest.main()
