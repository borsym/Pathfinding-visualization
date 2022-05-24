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


# # unit_tests.py -v
class TestAlgorithms(unittest.TestCase):
    def setUp(self):
        self.start = Node(10, 15, Fields.START)
        self.end = Node(10, 35, Fields.END)
        self.table = Table(20, 50, self.start, self.end)
        self.distance = Distance()
        self.distance_formula = "Euclidean"

    def test_astar(self):
        astar = Astar(
            self.table,
            self.table.get_start(),
            self.table.get_end(),
            self.distance.get_distance(self.distance_formula),
        )
        assert astar is not None

        order, shorthest_path = astar.start_astar()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertGreaterEqual(len(order), len(shorthest_path))

        self.assertEqual(
            order,
            [
                (10, 15),
                (10, 16),
                (10, 17),
                (10, 18),
                (10, 19),
                (10, 20),
                (10, 21),
                (10, 22),
                (10, 23),
                (10, 24),
                (10, 25),
                (10, 26),
                (10, 27),
                (10, 28),
                (10, 29),
                (10, 30),
                (10, 31),
                (10, 32),
                (10, 33),
                (10, 34),
                (10, 35),
            ],
        )
        self.assertEqual(
            shorthest_path,
            [
                (10, 15),
                (10, 16),
                (10, 17),
                (10, 18),
                (10, 19),
                (10, 20),
                (10, 21),
                (10, 22),
                (10, 23),
                (10, 24),
                (10, 25),
                (10, 26),
                (10, 27),
                (10, 28),
                (10, 29),
                (10, 30),
                (10, 31),
                (10, 32),
                (10, 33),
                (10, 34),
                (10, 35),
            ],
        )

        astar = Astar(
            self.table,
            self.table.get_start(),
            self.table.get_end(),
            self.distance.get_distance("Manhattan"),
        )
        order, shorthest_path = astar.start_astar()

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertGreaterEqual(len(order), len(shorthest_path))

        self.assertEqual(
            order,
            [
                (10, 15),
                (10, 16),
                (10, 17),
                (10, 18),
                (10, 19),
                (10, 20),
                (10, 21),
                (10, 22),
                (10, 23),
                (10, 24),
                (10, 25),
                (10, 26),
                (10, 27),
                (10, 28),
                (10, 29),
                (10, 30),
                (10, 31),
                (10, 32),
                (10, 33),
                (10, 34),
                (10, 35),
            ],
        )
        self.assertEqual(
            shorthest_path,
            [
                (10, 15),
                (10, 16),
                (10, 17),
                (10, 18),
                (10, 19),
                (10, 20),
                (10, 21),
                (10, 22),
                (10, 23),
                (10, 24),
                (10, 25),
                (10, 26),
                (10, 27),
                (10, 28),
                (10, 29),
                (10, 30),
                (10, 31),
                (10, 32),
                (10, 33),
                (10, 34),
                (10, 35),
            ],
        )

        self.assertNotEqual(
            order,
            [
                (-10, 15),
                (10, 16),
                (10, 17),
                (10, 18),
                (10, 19),
                (10, 20),
                (10, 21),
                (10, 22),
                (10, 23),
                (10, 24),
                (10, 25),
                (10, 26),
                (10, 27),
                (10, 28),
                (10, 29),
                (10, 30),
                (10, 31),
                (10, 32),
                (10, 33),
                (10, 34),
                (10, 35),
            ],
        )
        self.assertNotEqual(
            shorthest_path,
            [
                (-10, 15),
                (10, 16),
                (10, 17),
                (10, 18),
                (10, 19),
                (10, 20),
                (10, 21),
                (10, 22),
                (10, 23),
                (10, 24),
                (10, 25),
                (10, 26),
                (10, 27),
                (10, 28),
                (10, 29),
                (10, 30),
                (10, 31),
                (10, 32),
                (10, 33),
                (10, 34),
                (10, 35),
            ],
        )

    def test_bfs(self):
        self.table.start = Node(10, 30, Fields.START)
        bfs = BFS(self.table, self.table.get_start())
        assert bfs is not None

        order, shorthest_path = bfs.start_bfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        self.assertGreaterEqual(len(order), len(shorthest_path))
        self.assertEqual(
            order,
            [
                (10, 30),
                (10, 29),
                (10, 31),
                (9, 30),
                (11, 30),
                (10, 29),
                (10, 28),
                (9, 29),
                (11, 29),
                (10, 31),
                (10, 32),
                (9, 31),
                (11, 31),
                (9, 30),
                (8, 30),
                (11, 30),
                (12, 30),
                (10, 28),
                (10, 27),
                (9, 28),
                (11, 28),
                (9, 29),
                (8, 29),
                (11, 29),
                (12, 29),
                (10, 32),
                (10, 33),
                (9, 32),
                (11, 32),
                (9, 31),
                (8, 31),
                (11, 31),
                (12, 31),
                (8, 30),
                (7, 30),
                (12, 30),
                (13, 30),
                (10, 27),
                (10, 26),
                (9, 27),
                (11, 27),
                (9, 28),
                (8, 28),
                (11, 28),
                (12, 28),
                (8, 29),
                (7, 29),
                (12, 29),
                (13, 29),
                (10, 33),
                (10, 34),
                (9, 33),
                (11, 33),
                (9, 32),
                (8, 32),
                (11, 32),
                (12, 32),
                (8, 31),
                (7, 31),
                (12, 31),
                (13, 31),
                (7, 30),
                (6, 30),
                (13, 30),
                (14, 30),
                (10, 26),
                (10, 25),
                (9, 26),
                (11, 26),
                (9, 27),
                (8, 27),
                (11, 27),
                (12, 27),
                (8, 28),
                (7, 28),
                (12, 28),
                (13, 28),
                (7, 29),
                (6, 29),
                (13, 29),
                (14, 29),
                (10, 34),
                (10, 35),
            ],
        )
        self.assertEqual(
            shorthest_path, [(10, 30), (10, 31), (10, 32), (10, 33), (10, 34), (10, 35)]
        )

        self.assertNotEqual(
            order,
            [
                (10, 30),
                (9, 30),
                (10, 31),
                (11, 30),
                (10, 29),
                (8, 30),
                (9, 31),
                (9, 29),
                (10, 32),
                (11, 31),
                (-12, 30),
                (11, 29),
                (10, 28),
                (7, 30),
                (8, 31),
                (8, 29),
                (9, 32),
                (9, 28),
                (10, 33),
                (11, 32),
                (12, 31),
                (13, 30),
                (12, 29),
                (11, 28),
                (10, 27),
                (6, 30),
                (7, 31),
                (7, 29),
                (8, 32),
                (8, 28),
                (9, 33),
                (9, 27),
                (10, 34),
                (11, 33),
                (12, 32),
                (13, 31),
                (14, 30),
                (13, 29),
                (12, 28),
                (11, 27),
                (10, 26),
                (5, 30),
                (6, 31),
                (6, 29),
                (7, 32),
                (7, 28),
                (8, 33),
                (8, 27),
                (9, 34),
                (9, 26),
                (10, 35),
            ],
        )
        self.assertNotEqual(
            shorthest_path,
            [(10, 30), (-10, 31), (10, 32), (10, 33), (10, 34), (10, 35)],
        )

    def test_dfs(self):
        dfs = DFS(self.table, Node(12, 35, Fields.START))
        assert dfs is not None

        order, shorthest_path = dfs.start_dfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertGreaterEqual(len(order), len(shorthest_path))
        self.assertEqual(
            order,
            [
                (12, 35),
                (12, 35),
                (13, 35),
                (14, 35),
                (15, 35),
                (16, 35),
                (17, 35),
                (18, 35),
                (19, 35),
                (19, 36),
                (18, 36),
                (17, 36),
                (16, 36),
                (15, 36),
                (14, 36),
                (13, 36),
                (12, 36),
                (11, 36),
                (10, 36),
                (9, 36),
                (8, 36),
                (7, 36),
                (6, 36),
                (5, 36),
                (4, 36),
                (3, 36),
                (2, 36),
                (1, 36),
                (0, 36),
                (0, 37),
                (1, 37),
                (2, 37),
                (3, 37),
                (4, 37),
                (5, 37),
                (6, 37),
                (7, 37),
                (8, 37),
                (9, 37),
                (10, 37),
                (11, 37),
                (12, 37),
                (13, 37),
                (14, 37),
                (15, 37),
                (16, 37),
                (17, 37),
                (18, 37),
                (19, 37),
                (19, 38),
                (18, 38),
                (17, 38),
                (16, 38),
                (15, 38),
                (14, 38),
                (13, 38),
                (12, 38),
                (11, 38),
                (10, 38),
                (9, 38),
                (8, 38),
                (7, 38),
                (6, 38),
                (5, 38),
                (4, 38),
                (3, 38),
                (2, 38),
                (1, 38),
                (0, 38),
                (0, 39),
                (1, 39),
                (2, 39),
                (3, 39),
                (4, 39),
                (5, 39),
                (6, 39),
                (7, 39),
                (8, 39),
                (9, 39),
                (10, 39),
                (11, 39),
                (12, 39),
                (13, 39),
                (14, 39),
                (15, 39),
                (16, 39),
                (17, 39),
                (18, 39),
                (19, 39),
                (19, 40),
                (18, 40),
                (17, 40),
                (16, 40),
                (15, 40),
                (14, 40),
                (13, 40),
                (12, 40),
                (11, 40),
                (10, 40),
                (9, 40),
                (8, 40),
                (7, 40),
                (6, 40),
                (5, 40),
                (4, 40),
                (3, 40),
                (2, 40),
                (1, 40),
                (0, 40),
                (0, 41),
                (1, 41),
                (2, 41),
                (3, 41),
                (4, 41),
                (5, 41),
                (6, 41),
                (7, 41),
                (8, 41),
                (9, 41),
                (10, 41),
                (11, 41),
                (12, 41),
                (13, 41),
                (14, 41),
                (15, 41),
                (16, 41),
                (17, 41),
                (18, 41),
                (19, 41),
                (19, 42),
                (18, 42),
                (17, 42),
                (16, 42),
                (15, 42),
                (14, 42),
                (13, 42),
                (12, 42),
                (11, 42),
                (10, 42),
                (9, 42),
                (8, 42),
                (7, 42),
                (6, 42),
                (5, 42),
                (4, 42),
                (3, 42),
                (2, 42),
                (1, 42),
                (0, 42),
                (0, 43),
                (1, 43),
                (2, 43),
                (3, 43),
                (4, 43),
                (5, 43),
                (6, 43),
                (7, 43),
                (8, 43),
                (9, 43),
                (10, 43),
                (11, 43),
                (12, 43),
                (13, 43),
                (14, 43),
                (15, 43),
                (16, 43),
                (17, 43),
                (18, 43),
                (19, 43),
                (19, 44),
                (18, 44),
                (17, 44),
                (16, 44),
                (15, 44),
                (14, 44),
                (13, 44),
                (12, 44),
                (11, 44),
                (10, 44),
                (9, 44),
                (8, 44),
                (7, 44),
                (6, 44),
                (5, 44),
                (4, 44),
                (3, 44),
                (2, 44),
                (1, 44),
                (0, 44),
                (0, 45),
                (1, 45),
                (2, 45),
                (3, 45),
                (4, 45),
                (5, 45),
                (6, 45),
                (7, 45),
                (8, 45),
                (9, 45),
                (10, 45),
                (11, 45),
                (12, 45),
                (13, 45),
                (14, 45),
                (15, 45),
                (16, 45),
                (17, 45),
                (18, 45),
                (19, 45),
                (19, 46),
                (18, 46),
                (17, 46),
                (16, 46),
                (15, 46),
                (14, 46),
                (13, 46),
                (12, 46),
                (11, 46),
                (10, 46),
                (9, 46),
                (8, 46),
                (7, 46),
                (6, 46),
                (5, 46),
                (4, 46),
                (3, 46),
                (2, 46),
                (1, 46),
                (0, 46),
                (0, 47),
                (1, 47),
                (2, 47),
                (3, 47),
                (4, 47),
                (5, 47),
                (6, 47),
                (7, 47),
                (8, 47),
                (9, 47),
                (10, 47),
                (11, 47),
                (12, 47),
                (13, 47),
                (14, 47),
                (15, 47),
                (16, 47),
                (17, 47),
                (18, 47),
                (19, 47),
                (19, 48),
                (18, 48),
                (17, 48),
                (16, 48),
                (15, 48),
                (14, 48),
                (13, 48),
                (12, 48),
                (11, 48),
                (10, 48),
                (9, 48),
                (8, 48),
                (7, 48),
                (6, 48),
                (5, 48),
                (4, 48),
                (3, 48),
                (2, 48),
                (1, 48),
                (0, 48),
                (0, 49),
                (1, 49),
                (2, 49),
                (3, 49),
                (4, 49),
                (5, 49),
                (6, 49),
                (7, 49),
                (8, 49),
                (9, 49),
                (10, 49),
                (11, 49),
                (12, 49),
                (13, 49),
                (14, 49),
                (15, 49),
                (16, 49),
                (17, 49),
                (18, 49),
                (19, 49),
                (0, 35),
                (1, 35),
                (2, 35),
                (3, 35),
                (4, 35),
                (5, 35),
                (6, 35),
                (7, 35),
                (8, 35),
                (9, 35),
                (10, 35),
            ],
        )

        self.assertEqual(
            shorthest_path,
            [
                (12, 35),
                (13, 35),
                (14, 35),
                (15, 35),
                (16, 35),
                (17, 35),
                (18, 35),
                (19, 35),
                (19, 36),
                (18, 36),
                (17, 36),
                (16, 36),
                (15, 36),
                (14, 36),
                (13, 36),
                (12, 36),
                (11, 36),
                (10, 36),
                (9, 36),
                (8, 36),
                (7, 36),
                (6, 36),
                (5, 36),
                (4, 36),
                (3, 36),
                (2, 36),
                (1, 36),
                (0, 36),
                (0, 37),
                (1, 37),
                (2, 37),
                (3, 37),
                (4, 37),
                (5, 37),
                (6, 37),
                (7, 37),
                (8, 37),
                (9, 37),
                (10, 37),
                (11, 37),
                (12, 37),
                (13, 37),
                (14, 37),
                (15, 37),
                (16, 37),
                (17, 37),
                (18, 37),
                (19, 37),
                (19, 38),
                (18, 38),
                (17, 38),
                (16, 38),
                (15, 38),
                (14, 38),
                (13, 38),
                (12, 38),
                (11, 38),
                (10, 38),
                (9, 38),
                (8, 38),
                (7, 38),
                (6, 38),
                (5, 38),
                (4, 38),
                (3, 38),
                (2, 38),
                (1, 38),
                (0, 38),
                (0, 39),
                (1, 39),
                (2, 39),
                (3, 39),
                (4, 39),
                (5, 39),
                (6, 39),
                (7, 39),
                (8, 39),
                (9, 39),
                (10, 39),
                (11, 39),
                (12, 39),
                (13, 39),
                (14, 39),
                (15, 39),
                (16, 39),
                (17, 39),
                (18, 39),
                (19, 39),
                (19, 40),
                (18, 40),
                (17, 40),
                (16, 40),
                (15, 40),
                (14, 40),
                (13, 40),
                (12, 40),
                (11, 40),
                (10, 40),
                (9, 40),
                (8, 40),
                (7, 40),
                (6, 40),
                (5, 40),
                (4, 40),
                (3, 40),
                (2, 40),
                (1, 40),
                (0, 40),
                (0, 41),
                (1, 41),
                (2, 41),
                (3, 41),
                (4, 41),
                (5, 41),
                (6, 41),
                (7, 41),
                (8, 41),
                (9, 41),
                (10, 41),
                (11, 41),
                (12, 41),
                (13, 41),
                (14, 41),
                (15, 41),
                (16, 41),
                (17, 41),
                (18, 41),
                (19, 41),
                (19, 42),
                (18, 42),
                (17, 42),
                (16, 42),
                (15, 42),
                (14, 42),
                (13, 42),
                (12, 42),
                (11, 42),
                (10, 42),
                (9, 42),
                (8, 42),
                (7, 42),
                (6, 42),
                (5, 42),
                (4, 42),
                (3, 42),
                (2, 42),
                (1, 42),
                (0, 42),
                (0, 43),
                (1, 43),
                (2, 43),
                (3, 43),
                (4, 43),
                (5, 43),
                (6, 43),
                (7, 43),
                (8, 43),
                (9, 43),
                (10, 43),
                (11, 43),
                (12, 43),
                (13, 43),
                (14, 43),
                (15, 43),
                (16, 43),
                (17, 43),
                (18, 43),
                (19, 43),
                (19, 44),
                (18, 44),
                (17, 44),
                (16, 44),
                (15, 44),
                (14, 44),
                (13, 44),
                (12, 44),
                (11, 44),
                (10, 44),
                (9, 44),
                (8, 44),
                (7, 44),
                (6, 44),
                (5, 44),
                (4, 44),
                (3, 44),
                (2, 44),
                (1, 44),
                (0, 44),
                (0, 45),
                (1, 45),
                (2, 45),
                (3, 45),
                (4, 45),
                (5, 45),
                (6, 45),
                (7, 45),
                (8, 45),
                (9, 45),
                (10, 45),
                (11, 45),
                (12, 45),
                (13, 45),
                (14, 45),
                (15, 45),
                (16, 45),
                (17, 45),
                (18, 45),
                (19, 45),
                (19, 46),
                (18, 46),
                (17, 46),
                (16, 46),
                (15, 46),
                (14, 46),
                (13, 46),
                (12, 46),
                (11, 46),
                (10, 46),
                (9, 46),
                (8, 46),
                (7, 46),
                (6, 46),
                (5, 46),
                (4, 46),
                (3, 46),
                (2, 46),
                (1, 46),
                (0, 46),
                (0, 47),
                (1, 47),
                (2, 47),
                (3, 47),
                (4, 47),
                (5, 47),
                (6, 47),
                (7, 47),
                (8, 47),
                (9, 47),
                (10, 47),
                (11, 47),
                (12, 47),
                (13, 47),
                (14, 47),
                (15, 47),
                (16, 47),
                (17, 47),
                (18, 47),
                (19, 47),
                (19, 48),
                (18, 48),
                (17, 48),
                (16, 48),
                (15, 48),
                (14, 48),
                (13, 48),
                (12, 48),
                (11, 48),
                (10, 48),
                (9, 48),
                (8, 48),
                (7, 48),
                (6, 48),
                (5, 48),
                (4, 48),
                (3, 48),
                (2, 48),
                (1, 48),
                (0, 48),
                (0, 49),
                (1, 49),
                (2, 49),
                (3, 49),
                (4, 49),
                (5, 49),
                (6, 49),
                (7, 49),
                (8, 49),
                (9, 49),
                (10, 49),
                (11, 49),
                (12, 49),
                (13, 49),
                (14, 49),
                (15, 49),
                (16, 49),
                (17, 49),
                (18, 49),
                (19, 49),
                (0, 35),
                (1, 35),
                (2, 35),
                (3, 35),
                (4, 35),
                (5, 35),
                (6, 35),
                (7, 35),
                (8, 35),
                (9, 35),
                (10, 35),
            ],
        )

        self.assertNotEqual(order, [(12, 35), (11, -35), (10, 35)])
        self.assertNotEqual(shorthest_path, [(-12, 35), (11, 35), (10, 35)])

    def test_dijkstra(self):
        dijkstra = Dijkstra(
            self.table, Node(12, 35, Fields.START), self.table.get_end()
        )
        assert dijkstra is not None

        order, shorthest_path = dijkstra.start_dijsktra()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertEqual(order, [(12, 35), (12, 34), (12, 36), (11, 35), (10, 35)])
        self.assertEqual(shorthest_path, [(12, 35), (11, 35), (10, 35)])

        self.assertNotEqual(order, [(12, 35), (12, 34), (12, 36), (12, 35), (10, 35)])
        self.assertNotEqual(shorthest_path, [(12, 35), (11, 35), (-10, 35)])

    def test_recursive_division(self):
        recdiv = RecursiveDivison(
            self.table,
            0,
            0,
            self.table.get_column_size(),
            self.table.get_row_size(),
            self.table.get_start(),
            self.table.get_end(),
        )
        assert recdiv is not None

        order = recdiv.start_divide()
        assert order is not None

        self.assertFalse(order == [])

        count = 0
        for node in self.table.get_all_nodes():
            count += 1 if node.get_field().value == Fields.WALL.value else 0

        self.assertEqual(count, len(order))
        self.assertGreaterEqual(len(order), 350)

    def test_random_maze(self):
        random_maze = RandomMaze(
            self.table,
            0,
            0,
            self.table.get_column_size(),
            self.table.get_row_size(),
            self.table.get_start(),
            self.table.get_end(),
        )
        assert random_maze is not None

        order = random_maze.generate()

        assert order is not None
        self.assertFalse(order == [])

        count = 0
        for node in self.table.get_all_nodes():
            count += 1 if node.get_field().value == Fields.WALL.value else 0

        self.assertEqual(count, len(order))
        self.assertGreaterEqual(len(order), 180)


class TestTable(unittest.TestCase):
    def setUp(self):
        self.start = Node(10, 15, Fields.START)
        self.end = Node(10, 35, Fields.END)
        self.table = Table(20, 50, self.start, self.end)

    def test_walls(self):
        for i in range(5):
            for j in range(5):
                self.table.set_node_field(i, j, Fields.WALL)
                self.assertEqual(self.table.get_node_field(i, j), Fields.WALL)
                self.assertNotEqual(self.table.get_node_field(i, j), Fields.GRASS)

    def test_types_grass(self):
        for i in range(5):
            for j in range(5):
                self.table.set_node_field(i, j, Fields.GRASS)
                self.assertEqual(self.table.get_node_field(i, j), Fields.GRASS)
                self.assertNotEqual(self.table.get_node_field(i, j), Fields.WALL)

    def test_types_water(self):
        for i in range(5):
            for j in range(5):
                self.table.set_node_field(i, j, Fields.WATER)
                self.assertEqual(self.table.get_node_field(i, j), Fields.WATER)
                self.assertNotEqual(self.table.get_node_field(i, j), Fields.WALL)

    def test_types_stone(self):
        for i in range(5):
            for j in range(5):
                self.table.set_node_field(i, j, Fields.STONE)
                self.assertEqual(self.table.get_node_field(i, j), Fields.STONE)
                self.assertNotEqual(self.table.get_node_field(i, j), Fields.WALL)

    def test_refresh_table(self):
        self.assertEqual(self.table.get_node_field(10, 15), Fields.START)
        self.assertEqual(self.table.get_node_field(10, 35), Fields.END)

        self.table.refresh_board(10, 10, 11, 11)

        self.assertEqual(self.table.get_node_field(10, 10), Fields.START)
        self.assertEqual(self.table.get_node_field(11, 11), Fields.END)


class TestBarricade(unittest.TestCase):
    def setUp(self):
        self.start = Node(10, 15, Fields.START)
        self.end = Node(10, 35, Fields.END)
        self.table = Table(20, 50, self.start, self.end)
        self.distance = Distance()
        self.distance_formula = "Euclidean"
        self.table.set_node_field(9, 15, Fields.WALL)
        self.table.set_node_field(11, 15, Fields.WALL)
        self.table.set_node_field(10, 14, Fields.WALL)
        self.table.set_node_field(10, 16, Fields.WALL)

    def test_barricaded_astar(self):
        astar = Astar(
            self.table,
            self.table.get_start(),
            self.table.get_end(),
            self.distance.get_distance(self.distance_formula),
        )

        assert astar is not None

        order, shorthest_path = astar.start_astar()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(len(order) == 0)

        self.assertEqual(order, [(10, 15)])
        self.assertEqual(shorthest_path, [])

        astar = Astar(
            self.table,
            Node(10, 18, Fields.START),
            self.table.get_end(),
            self.distance.get_distance(self.distance_formula),
        )
        order, shorthest_path = astar.start_astar()

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        self.assertGreaterEqual(len(order), len(shorthest_path))

    def test_barricaded_bfs(self):
        bfs = BFS(self.table, Node(10, 15, Fields.START))
        assert bfs is not None

        order, shorthest_path = bfs.start_bfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertTrue(shorthest_path == [])

        self.assertEqual(order, [(10, 15)])
        self.assertEqual(shorthest_path, [])

        bfs = BFS(self.table, Node(10, 18, Fields.START))
        order, shorthest_path = bfs.start_bfs()

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        self.assertGreaterEqual(len(order), len(shorthest_path))

    def test_barricaded_dfs(self):
        dfs = DFS(self.table, Node(10, 15, Fields.START))
        assert dfs is not None

        order, shorthest_path = dfs.start_dfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertTrue(shorthest_path == [])

        self.assertEqual(order, [(10, 15), (10, 15)])
        self.assertEqual(shorthest_path, [])

        dfs = DFS(self.table, Node(10, 18, Fields.START))
        order, shorthest_path = dfs.start_dfs()

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        self.assertGreaterEqual(len(order), len(shorthest_path))

    def test_barricaded_dijkstra(self):
        dijkstra = Dijkstra(
            self.table, Node(10, 15, Fields.START), self.table.get_end()
        )
        assert dijkstra is not None

        order, shorthest_path = dijkstra.start_dijsktra()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertTrue(shorthest_path == [])

        self.assertEqual(order, [(10, 15)])
        self.assertEqual(shorthest_path, [])

        dijkstra = Dijkstra(
            self.table, Node(10, 18, Fields.START), self.table.get_end()
        )
        order, shorthest_path = dijkstra.start_dijsktra()

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        self.assertGreaterEqual(len(order), len(shorthest_path))


class TestTypes(unittest.TestCase):
    def setUp(self):
        self.start = Node(10, 15, Fields.START)
        self.end = Node(10, 35, Fields.END)
        self.table = Table(20, 50, self.start, self.end)
        self.distance = Distance()
        self.distance_formula = "Euclidean"
        self.table.set_node_field(10, 16, Fields.GRASS)

    def test_astar_type(self):
        astar = Astar(
            self.table,
            self.table.get_start(),
            self.table.get_end(),
            self.distance.get_distance(self.distance_formula),
        )
        assert astar is not None

        order, shorthest_path = astar.start_astar()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertIn((10, 15), order)
        self.assertIn((9, 15), order)
        self.assertIn((11, 15), order)
        self.assertEqual(
            shorthest_path,
            [
                (10, 15),
                (9, 15),
                (9, 16),
                (9, 17),
                (9, 18),
                (9, 19),
                (9, 20),
                (9, 21),
                (9, 22),
                (9, 23),
                (9, 24),
                (9, 25),
                (9, 26),
                (9, 27),
                (9, 28),
                (9, 29),
                (9, 30),
                (9, 31),
                (9, 32),
                (9, 33),
                (9, 34),
                (9, 35),
                (10, 35),
            ],
        )

        for i in range(20):
            if i != 10:
                self.table.set_node_field(i, 16, Fields.WALL)

        astar = Astar(
            self.table,
            self.table.get_start(),
            self.table.get_end(),
            self.distance.get_distance(self.distance_formula),
        )
        order2, shorthest_path2 = astar.start_astar()
        # must go through the grass
        self.assertEqual(
            shorthest_path2,
            [
                (10, 15),
                (10, 16),
                (10, 17),
                (10, 18),
                (10, 19),
                (10, 20),
                (10, 21),
                (10, 22),
                (10, 23),
                (10, 24),
                (10, 25),
                (10, 26),
                (10, 27),
                (10, 28),
                (10, 29),
                (10, 30),
                (10, 31),
                (10, 32),
                (10, 33),
                (10, 34),
                (10, 35),
            ],
        )
        self.assertLess(len(shorthest_path2), len(shorthest_path))
        self.assertLess(len(order2), len(order))

    def test_dijkstra_type(self):
        dijkstra = Dijkstra(
            self.table, Node(10, 15, Fields.START), self.table.get_end()
        )
        assert dijkstra is not None

        order, shorthest_path = dijkstra.start_dijsktra()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertIn((10, 15), order)
        self.assertIn((9, 15), order)
        self.assertIn((11, 15), order)
        self.assertEqual(
            shorthest_path,
            [
                (10, 15),
                (9, 15),
                (9, 16),
                (9, 17),
                (9, 18),
                (9, 19),
                (9, 20),
                (9, 21),
                (9, 22),
                (9, 23),
                (9, 24),
                (9, 25),
                (9, 26),
                (9, 27),
                (9, 28),
                (9, 29),
                (9, 30),
                (9, 31),
                (9, 32),
                (9, 33),
                (9, 34),
                (9, 35),
                (10, 35),
            ],
        )

        for i in range(20):
            if i != 10:
                self.table.set_node_field(i, 16, Fields.WALL)

        dijkstra = Dijkstra(
            self.table, Node(10, 15, Fields.START), self.table.get_end()
        )
        order2, shorthest_path2 = dijkstra.start_dijsktra()

        self.assertEqual(
            shorthest_path2,
            [
                (10, 15),
                (10, 16),
                (10, 17),
                (10, 18),
                (10, 19),
                (10, 20),
                (10, 21),
                (10, 22),
                (10, 23),
                (10, 24),
                (10, 25),
                (10, 26),
                (10, 27),
                (10, 28),
                (10, 29),
                (10, 30),
                (10, 31),
                (10, 32),
                (10, 33),
                (10, 34),
                (10, 35),
            ],
        )
        self.assertLess(len(shorthest_path2), len(shorthest_path))
        self.assertLess(len(order2), len(order))

    def test_dfs_type(self):
        dfs = DFS(self.table, Node(10, 15, Fields.START))
        assert dfs is not None

        order, shorthest_path = dfs.start_dfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertIn((10, 15), order)
        self.assertNotIn((9, 15), order)
        self.assertIn(
            (10, 16), shorthest_path
        )  # dfs is not weighted the grass doesn't affect to the path

        for i in range(20):
            if i != 10:
                self.table.set_node_field(i, 16, Fields.WALL)

        dfs = DFS(self.table, Node(10, 15, Fields.START))
        order2, shorthest_path2 = dfs.start_dfs()

        self.assertLess(len(shorthest_path), len(shorthest_path2))
        self.assertLess(len(order), len(order2))

    def test_bfs_type(self):
        bfs = BFS(self.table, Node(10, 15, Fields.START))
        assert bfs is not None

        order, shorthest_path = bfs.start_bfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertIn((10, 15), order)
        self.assertIn((9, 15), order)
        self.assertIn(
            (10, 16), shorthest_path
        )  # bfs is not weighted the grass doesn't affect to the path

        for i in range(20):
            if i != 10:
                self.table.set_node_field(i, 16, Fields.WALL)

        dfs = DFS(self.table, Node(10, 15, Fields.START))
        order2, shorthest_path2 = dfs.start_dfs()

        self.assertLess(len(shorthest_path), len(shorthest_path2))
        self.assertLess(len(order2), len(order))


if __name__ == "__main__":
    unittest.main()
