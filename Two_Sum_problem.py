lst1 = [2, 7, 11, 15]

for i in lst1:
    for j in range(1, i + 1):
        if i + j == 9:
            print({i, j})