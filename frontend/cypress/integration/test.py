# implement function to calculate factorial of number

# 0 -> 1

'''

'''

def fact(number : int) -> int: # 5! -> 25
    if number < 0:
        raise Exception("Only just positive numbers")
    result = 1

    for i in range(2, number + 1):
        result *= i
    return result


