from collections import deque as queue
import sys
sys.path.append("..")

from persistance.Fields import Fields
from persistance.Node import Node
from persistance.Table import Table

def astar(maze, start, end):
    """Returns a list of tuples as a path from the given start to the given end in the given maze"""


    # Initialize both open and closed list
    open_list = []
    closed_list = []

    # Add the start node
    open_list.append(start)

    # Loop until you find the end
    while len(open_list) > 0:

        # Get the current node
        current_node = open_list[0]
        current_index = 0
        for index, item in enumerate(open_list):
            if item.f < current_node.f:
                current_node = item
                current_index = index

        # Pop current off open list, add to closed list
        open_list.pop(current_index)
        closed_list.append(current_node)

        # Found the goal
        if current_node == end:
            path = []
            current = current_node
            while current is not None:
                path.append((current.get_x(), current.get_y()))
                current = current.parent
            return path[::-1] # Return reversed path

        # Generate children
        children = []
        for new_position in [(0, -1), (0, 1), (-1, 0), (1, 0)]: # Adjacent squares

            # Get node position
            node_position = (current_node.get_x() + new_position[0], current_node.get_y() + new_position[1])

            # Make sure within range, itt a len nem lesz jó sztm
            if node_position.current_node.get_x() > (len(maze) - 1) or current_node.get_x() < 0 or current_node.get_y() > (len(maze[len(maze)-1]) -1) or current_node.get_y() < 0:
                continue

            # Make sure walkable terrain
            # if maze[node_position.get_x()][node_position.get_y()] != 0:  # ez is szar
            #     continue

            # Create new node
            new_node = Node(parent=current_node, x=node_position.get_x(), y=node_position.get_y())

            # Append
            children.append(new_node)

        # Loop through children
        for child in children:

            # Child is on the closed list
            for closed_child in closed_list:
                if child == closed_child:
                    continue

            # Create the f, g, and h values
            child.g = current_node.g + 1
            child.h = ((child.position[0] - end_node.position[0]) ** 2) + ((child.position[1] - end_node.position[1]) ** 2)
            child.f = child.g + child.h

            # Child is already in the open list
            for open_node in open_list:
                if child == open_node and child.g > open_node.g:
                    continue

            # Add the child to the open list
            open_list.append(child)



start = Node(1,0 , Fields.START)
end = Node(9, 13, Fields.END)
table = Table(10, 15, start, end)
table.print_grid()


path = astar(table, start, end)
print(path)
