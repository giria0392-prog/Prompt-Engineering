lst1 = [7, 1, 5, 3, 6, 4]

min_price = lst1[0]
max_profit = 0

for price in lst1:
    if price < min_price:
        min_price = price

    profit = price - min_price

    if profit > max_profit:
        max_profit = profit

print(max_profit)

