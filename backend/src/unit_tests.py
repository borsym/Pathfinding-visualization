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
#unit_tests.py -v
class TestAlgorithms(unittest.TestCase):
    def setUp(self):
        self.start = Node(10,15 , Fields.START)
        self.end = Node(10, 35, Fields.END)
        self.table = Table(20, 50, self.start, self.end)
        self.distance = Distance()
        self.distance_formula = "Euclidean"

    def test_aster(self):
        astar = Astar(self.table, self.table.get_start(), self.table.get_end(), self.distance.get_distance(self.distance_formula))
        assert astar is not None
        
        order, shorthest_path = astar.start_astar()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        
        self.assertGreaterEqual(len(order), len(shorthest_path))

        self.assertEqual(order, [(10, 15),(10, 16),(10, 17),(10, 18),(10, 19),(10, 20),(10, 21),(10, 22),(10, 23),(10, 24),(10, 25),(10, 26),(10, 27),(10, 28),(10, 29),(10, 30),(10, 31),(10, 32),(10, 33),(10, 34),(10, 35)])
        self.assertEqual(shorthest_path, [(10, 15),(10, 16),(10, 17),(10, 18),(10, 19),(10, 20),(10, 21),(10, 22),(10, 23),(10, 24),(10, 25),(10, 26),(10, 27),(10, 28),(10, 29),(10, 30),(10, 31),(10, 32),(10, 33),(10, 34),(10, 35)])

        astar = Astar(self.table, self.table.get_start(), self.table.get_end(), self.distance.get_distance("Manhattan"))
        order, shorthest_path = astar.start_astar()
        
        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        
        self.assertGreaterEqual(len(order), len(shorthest_path))

        self.assertEqual(order, [(10, 15),(10, 16),(10, 17),(10, 18),(10, 19),(10, 20),(10, 21),(10, 22),(10, 23),(10, 24),(10, 25),(10, 26),(10, 27),(10, 28),(10, 29),(10, 30),(10, 31),(10, 32),(10, 33),(10, 34),(10, 35)])
        self.assertEqual(shorthest_path, [(10, 15),(10, 16),(10, 17),(10, 18),(10, 19),(10, 20),(10, 21),(10, 22),(10, 23),(10, 24),(10, 25),(10, 26),(10, 27),(10, 28),(10, 29),(10, 30),(10, 31),(10, 32),(10, 33),(10, 34),(10, 35)])

        self.assertNotEqual(order, [(-10, 15),(10, 16),(10, 17),(10, 18),(10, 19),(10, 20),(10, 21),(10, 22),(10, 23),(10, 24),(10, 25),(10, 26),(10, 27),(10, 28),(10, 29),(10, 30),(10, 31),(10, 32),(10, 33),(10, 34),(10, 35)])
        self.assertNotEqual(shorthest_path, [(-10, 15),(10, 16),(10, 17),(10, 18),(10, 19),(10, 20),(10, 21),(10, 22),(10, 23),(10, 24),(10, 25),(10, 26),(10, 27),(10, 28),(10, 29),(10, 30),(10, 31),(10, 32),(10, 33),(10, 34),(10, 35)])

    def test_bfs(self):
        bfs = BFS(self.table, (10,30))
        assert bfs is not None

        order, shorthest_path = bfs.start_bfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        
        self.assertGreaterEqual(len(order), len(shorthest_path))

        self.assertEqual(order, [(10, 30), (9, 30), (10, 31), (11, 30), (10, 29), (8, 30), (9, 31), (9, 29), (10, 32), 
(11, 31), (12, 30), (11, 29), (10, 28), (7, 30), (8, 31), (8, 29), (9, 32), (9, 28), (10, 33), (11, 32), (12, 31), (13, 30), (12, 29), (11, 28), (10, 27), (6, 30), (7, 31), (7, 29), (8, 32), (8, 28), (9, 33), (9, 27), (10, 34), (11, 33), (12, 32), (13, 31), (14, 30), (13, 29), (12, 28), (11, 27), (10, 26), (5, 30), (6, 31), (6, 29), (7, 32), (7, 28), (8, 33), (8, 27), (9, 34), (9, 26), (10, 35)])
        self.assertEqual(shorthest_path, [(10, 30), (10, 31), (10, 32), (10, 33), (10, 34), (10, 35)])

        self.assertNotEqual(order, [(10, 30), (9, 30), (10, 31), (11, 30), (10, 29), (8, 30), (9, 31), (9, 29), (10, 32), 
(11, 31), (-12, 30), (11, 29), (10, 28), (7, 30), (8, 31), (8, 29), (9, 32), (9, 28), (10, 33), (11, 32), (12, 31), (13, 30), (12, 29), (11, 28), (10, 27), (6, 30), (7, 31), (7, 29), (8, 32), (8, 28), (9, 33), (9, 27), (10, 34), (11, 33), (12, 32), (13, 31), (14, 30), (13, 29), (12, 28), (11, 27), (10, 26), (5, 30), (6, 31), (6, 29), (7, 32), (7, 28), (8, 33), (8, 27), (9, 34), (9, 26), (10, 35)])
        self.assertNotEqual(shorthest_path, [(10, 30), (-10, 31), (10, 32), (10, 33), (10, 34), (10, 35)])
        
    def test_dfs(self):
        dfs = DFS(self.table, Node(12,35, Fields.START))
        assert dfs is not None

        order,shorthest_path = dfs.start_dfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertGreaterEqual(len(order), len(shorthest_path))
        
        self.assertEqual(order,[(12, 35), (11, 35), (10, 35)])
        self.assertEqual(shorthest_path,[(12, 35), (11, 35), (10, 35)])

        self.assertNotEqual(order,[(12, 35), (11, -35), (10, 35)])
        self.assertNotEqual(shorthest_path,[(-12, 35), (11, 35), (10, 35)])
    
    def test_dijkstra(self):
        dijkstra = Dijkstra(self.table,Node(12,35, Fields.START), self.table.get_end())
        assert dijkstra is not None
        
        order,shorthest_path = dijkstra.start_dijsktra()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertEqual(order,[(12, 35), (12, 34), (12, 36), (11, 35), (10, 35)])
        self.assertEqual(shorthest_path,[(12, 35), (11, 35), (10, 35)])

        self.assertNotEqual(order,[(12, 35), (12, 34), (12, 36), (12, 35), (10, 35)])
        self.assertNotEqual(shorthest_path,[(12, 35), (11, 35), (-10, 35)])

    def test_recursive_division(self):
        recdiv = RecursiveDivison(self.table,0,0,self.table.get_column_size(), self.table.get_row_size(), self.table.get_start(), self.table.get_end())
        assert recdiv is not None
        
        order = recdiv.start_divide()
        assert order is not None
        
        self.assertFalse(order == [])

        count = 0
        for node in self.table.get_all_nodes():
            count += 1 if node.get_is_wall() else 0
        
        self.assertEqual(count, len(order))
        self.assertGreaterEqual(len(order), 350)

    def test_random_maze(self):
        random_maze = RandomMaze(self.table,0,0,self.table.get_column_size(), self.table.get_row_size() ,self.table.get_start(), self.table.get_end())
        assert random_maze is not None

        order = random_maze.generate()
        assert order is not None
        
        self.assertFalse(order == [])

        count = 0
        for node in self.table.get_all_nodes():
            count += 1 if node.get_is_wall() else 0
        
        self.assertEqual(count, len(order))
        self.assertGreaterEqual(len(order), 180)
    
class TestTable(unittest.TestCase):
    def setUp(self):
        self.start = Node(10,15 , Fields.START)
        self.end = Node(10, 35, Fields.END)
        self.table = Table(20, 50, self.start, self.end)
    
    def test_walls(self):
        for i in range (5):
            for j in range(5):
                self.table.set_node_field(i, j, Fields.WALL)
                self.assertEqual(self.table.get_node_field(i, j), Fields.WALL)
                self.assertNotEqual(self.table.get_node_field(i, j), Fields.GRASS)
    
    def test_types_grass(self):
        for i in range (5):
            for j in range(5):
                self.table.set_node_field(i, j, Fields.GRASS)
                self.assertEqual(self.table.get_node_field(i, j), Fields.GRASS)
                self.assertNotEqual(self.table.get_node_field(i, j), Fields.WALL)

    
    def test_types_water(self):
        for i in range (5):
            for j in range(5):
                self.table.set_node_field(i, j, Fields.WATER)
                self.assertEqual(self.table.get_node_field(i, j), Fields.WATER)
                self.assertNotEqual(self.table.get_node_field(i, j), Fields.WALL)

    def test_types_stone(self):
        for i in range (5):
            for j in range(5):
                self.table.set_node_field(i, j, Fields.STONE)
                self.assertEqual(self.table.get_node_field(i, j), Fields.STONE)
                self.assertNotEqual(self.table.get_node_field(i, j), Fields.WALL)
    
    def test_refresh_table(self):
        self.assertEqual(self.table.get_node_field(10,15), Fields.START)
        self.assertEqual(self.table.get_node_field(10,35), Fields.END)

        self.table.refresh_board(10, 10, 10, 11)
        
        self.assertEqual(self.table.get_node_field(10,10), Fields.START)
        self.assertEqual(self.table.get_node_field(10,11), Fields.END)


class TestBarricade(unittest.TestCase):
    def setUp(self):
        self.start = Node(10,15 , Fields.START)
        self.end = Node(10, 35, Fields.END)
        self.table = Table(20, 50, self.start, self.end)
        self.distance = Distance()
        self.distance_formula = "Euclidean"
        self.table.set_node_field(9,15,Fields.WALL)
        self.table.set_node_field(11,15,Fields.WALL)
        self.table.set_node_field(10,14,Fields.WALL)
        self.table.set_node_field(10,16,Fields.WALL)

    def test_barricaded_astar(self):
        astar = Astar(self.table, self.table.get_start(), self.table.get_end(), self.distance.get_distance(self.distance_formula))
        assert astar is not None
        
        order, shorthest_path = astar.start_astar()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(len(order) == 0)

        self.assertEqual(order,[(10,15)])
        self.assertEqual(shorthest_path,[])

        astar = Astar(self.table, Node(10,18,Fields.START), self.table.get_end(), self.distance.get_distance(self.distance_formula))
        order, shorthest_path = astar.start_astar()
        
        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        self.assertGreaterEqual(len(order), len(shorthest_path))

    def test_barricaded_bfs(self):
        bfs = BFS(self.table, (10,15))
        assert bfs is not None

        order, shorthest_path = bfs.start_bfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertTrue(shorthest_path == [])

        self.assertEqual(order,[(10,15)])
        self.assertEqual(shorthest_path,[])

        bfs = BFS(self.table, (10,18))
        order, shorthest_path = bfs.start_bfs()

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        self.assertGreaterEqual(len(order), len(shorthest_path))
       
    def test_barricaded_dfs(self):
        dfs = DFS(self.table, Node(10,15, Fields.START))
        assert dfs is not None

        order,shorthest_path = dfs.start_dfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertTrue(shorthest_path == [])

        self.assertEqual(order,[(10,15)])
        self.assertEqual(shorthest_path,[])

        dfs = DFS(self.table, Node(10,18, Fields.START))
        order,shorthest_path = dfs.start_dfs()
        
        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        self.assertGreaterEqual(len(order), len(shorthest_path))

    def test_barricaded_dijkstra(self):
        dijkstra = Dijkstra(self.table,Node(10,15, Fields.START), self.table.get_end())
        assert dijkstra is not None
        
        order,shorthest_path = dijkstra.start_dijsktra()
        assert order is not None
        assert shorthest_path is not None

        
        self.assertFalse(order == [])
        self.assertTrue(shorthest_path == [])

        self.assertEqual(order,[(10,15)])
        self.assertEqual(shorthest_path,[])

        dijkstra = Dijkstra(self.table,Node(10,18, Fields.START), self.table.get_end())
        order,shorthest_path = dijkstra.start_dijsktra()
        
        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])
        self.assertGreaterEqual(len(order), len(shorthest_path))

class TestTypes(unittest.TestCase):
    def setUp(self):
        self.start = Node(10,15 , Fields.START)
        self.end = Node(10, 35, Fields.END)
        self.table = Table(20, 50, self.start, self.end)
        self.distance = Distance()
        self.distance_formula = "Euclidean"
        self.table.set_node_field(10,16,Fields.GRASS)
    
    def test_astar_type(self):
        astar = Astar(self.table, self.table.get_start(), self.table.get_end(), self.distance.get_distance(self.distance_formula))
        assert astar is not None
        
        order, shorthest_path = astar.start_astar()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertIn((10,15),order)
        self.assertIn((9,15),order)
        self.assertIn((11,15),order)
        self.assertEqual(shorthest_path,[(10, 15), (9, 15), (9, 16), (9, 17), (9, 18), (9, 19), (9, 20), (9, 21), (9, 22), (9, 23), (9, 24), (9, 25), (9, 26), (9, 27), (9, 28), (9, 29), (9, 30), (9, 31), (9, 32), (9, 33), (9, 34), (9, 35), (10, 35)])
        
        for i in range(20):
            if i != 10:
                self.table.set_node_field(i,16,Fields.WALL)
            

        astar = Astar(self.table, self.table.get_start(), self.table.get_end(), self.distance.get_distance(self.distance_formula))
        order2, shorthest_path2 = astar.start_astar()
        # must go through the grass
        self.assertEqual(shorthest_path2,[(10, 15), (10, 16), (10, 17), (10, 18), (10, 19), (10, 20), (10, 21), (10, 22), (10, 23), (10, 24), (10, 25), (10, 26), (10, 27), (10, 28), (10, 29), (10, 30), (10, 31), (10, 32), (10, 33), (10, 34), (10, 35)])
        self.assertLess(len(shorthest_path2), len(shorthest_path))
        self.assertLess(len(order), len(order2))

    def test_dijkstra_type(self):
        dijkstra = Dijkstra(self.table,Node(10,15, Fields.START), self.table.get_end())
        assert dijkstra is not None
        
        order,shorthest_path = dijkstra.start_dijsktra()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertIn((10,15),order)
        self.assertIn((9,15),order)
        self.assertIn((11,15),order)
        self.assertEqual(shorthest_path,[(10, 15), (9, 15), (9, 16), (9, 17), (9, 18), (9, 19), (9, 20), (9, 21), (9, 22), (9, 23), (9, 24), (9, 25), (9, 26), (9, 27), (9, 28), (9, 29), (9, 30), (9, 31), (9, 32), (9, 33), (9, 34), (9, 35), (10, 35)])

        for i in range(20):
            if i != 10:
                self.table.set_node_field(i,16,Fields.WALL)
        
        dijkstra = Dijkstra(self.table,Node(10,15, Fields.START), self.table.get_end())
        order2,shorthest_path2 = dijkstra.start_dijsktra()

        self.assertEqual(shorthest_path2,[(10, 15), (10, 16), (10, 17), (10, 18), (10, 19), (10, 20), (10, 21), (10, 22), (10, 23), (10, 24), (10, 25), (10, 26), (10, 27), (10, 28), (10, 29), (10, 30), (10, 31), (10, 32), (10, 33), (10, 34), (10, 35)])
        self.assertLess(len(shorthest_path2), len(shorthest_path))
        self.assertLess(len(order2), len(order))

    def test_dfs_type(self):
        dfs = DFS(self.table, Node(10,15, Fields.START))
        assert dfs is not None

        order,shorthest_path = dfs.start_dfs()
        assert order is not None
        assert shorthest_path is not None

        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertIn((10,15),order)
        self.assertIn((9,15),order)
        self.assertIn((10,16),shorthest_path)  # dfs is not weighted the grass doesn't affect to the path

        for i in range(20):
            if i != 10:
                self.table.set_node_field(i,16,Fields.WALL)
        
        dfs = DFS(self.table, Node(10,15, Fields.START))
        order2,shorthest_path2 = dfs.start_dfs()

        self.assertLess(len(shorthest_path), len(shorthest_path2))
        self.assertLess(len(order), len(order2))
    
    def test_bfs_type(self):
        bfs = BFS(self.table, (10,15))
        assert bfs is not None

        order, shorthest_path = bfs.start_bfs()
        assert order is not None
        assert shorthest_path is not None
        
        self.assertFalse(order == [])
        self.assertFalse(shorthest_path == [])

        self.assertIn((10,15),order)
        self.assertIn((9,15),order)
        self.assertIn((10,16),shorthest_path)  # bfs is not weighted the grass doesn't affect to the path

        for i in range(20):
            if i != 10:
                self.table.set_node_field(i,16,Fields.WALL)
        
        dfs = DFS(self.table, Node(10,15, Fields.START))
        order2,shorthest_path2 = dfs.start_dfs()

        self.assertLess(len(shorthest_path), len(shorthest_path2))
        self.assertLess(len(order), len(order2))

class TestDB(unittest.TestCase):
    pass

if __name__ == '__main__':
    unittest.main()