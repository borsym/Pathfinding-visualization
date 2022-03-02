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
class TestStringMethods(unittest.TestCase):
    def setUp(self):
         
    def test_aster(self):
        pass
    def test_bfs(self):
        pass
    def test_dfs(self):
        pass
    def test_dijkstra(self):
        pass
    def test_recursive_division(self):
        pass
    def test_random_maze(self):
        pass
    def test_walls(self):
        pass
    def test_types(self):
        pass
    def test_barricaded_maze(self):
        pass
    def test_table_functions(self):
        pass
    def test_database(self): # hmm
        pass
    def test_node(self):
        pass

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)

# self.start = Node(10,15 , Fields.self.START)
# end = Node(10, 35, Fields.END)
# table = Table(20, 50, self.start, end)
# table.print_grid()


# visited, path = astar(table, self.start, end)
# print(visited)
# print(path)

if __name__ == '__main__':
    unittest.main()