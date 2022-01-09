from collections import deque as queue
import sys
sys.path.append("..")

from persistance.Fields import Fields
from persistance.Node import Node
from persistance.Table import Table

def dijkstra(grid, start, end): # distance is the new weight
    visitedNodesInOrder = []
    unvisitedNodes = get_all_nodes(grid)
    while len(unvisitedNodes):
        short_nodes_by_weight(unvisitedNodes)
        closest_node = unvisitedNodes.pop(0)
        closest_node.set_visited()
        visitedNodesInOrder.append((closest_node.get_x(), closest_node.get_y()))
        if(closest_node.get_x() == end.get_x() and closest_node.get_y() == end.get_y() ):
            return visitedNodesInOrder
        update_unvisited_neighbors(closest_node, grid)   

def short_nodes_by_weight(unvisitedNodes):
    unvisitedNodes.sort(key=lambda x: x.get_weight())

def get_all_nodes(grid):
    nodes = []
    for i in range(grid.get_row_len() + 1):
        for j in range(grid.get_col_len() + 1):
            nodes.append(grid.get_node(i,j))
    return nodes

def update_unvisited_neighbors(node, grid):
    unvisited_neighbors = get_unvisited_neighbors(node,grid)
    for neighbor in unvisited_neighbors:
        neighbor.set_weight(node.get_weight() + 1)
        neighbor.set_previous_node(node)

def get_unvisited_neighbors(node, grid):
    neighbors = []
    row, col = node.get_x(), node.get_y()
    if (row > 0 and not grid.get_node(row - 1, col).get_visited()): neighbors.append(grid.get_node(row - 1,col))
    if (row < grid.get_row_size() - 1 and not grid.get_node(row + 1, col).get_visited()): neighbors.append(grid.get_node(row + 1,col))
    if (col > 0 and not grid.get_node(row, col - 1).get_visited()): neighbors.append(grid.get_node(row,col - 1))
    if (col < grid.get_column_size() - 1 and not grid.get_node(row, col + 1).get_visited()): neighbors.append(grid.get_node(row,col + 1))
    return neighbors

start = Node(1,0 , Fields.START)
end = Node(9, 13, Fields.END)
table = Table(10, 15, start, end)

print(dijkstra(table,start,end))

def getNodesInShortestPathOrder(finishNode):
    nodesInShortestPathOrder = []
    currentNode = finishNode;
    while currentNode:
        nodesInShortestPathOrder.pop(currentNode)
        currentNode = currentNode.get_previous_node()
    return nodesInShortestPathOrder