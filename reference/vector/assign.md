#assign
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
template <class InputIterator>
void assign(InputIterator first, InputIterator last);

void assign(size_type n, const T& u);

void assign(initializer_list<T>);
```

##要件
`a.assign(first, last)`形式の場合、型`T`は`*first`から`X`に対してEmplaceConstructibleでなければならない。イテレーターがForward iterators の要件を満たさない場合、型`T`は`X`に対してMoveInsertableでなければならない。`[first, last)`の範囲のそれぞれのイテレーターは１回だけ間接参照される。`first`, `last`は自身のイテレーターであってはならない。


`a.assign(n, u)` 形式の場合、`u`は`a`の要素への参照であってはならない。


##効果
`a.assign(first, last)`形式の場合、`[first, last)`の範囲の要素のコピーでaの要素を置き換える。


`a.assign(n, u)` 形式の場合、`a`の要素をすべて`n`個の`u`のコピーに置き換える。


`a.assign(il)` 形式の場合の効果は、`a.assign(il.begin(), il.end())`と同じである。


##戻り値
なし


##例
```cpp
#include <array>
#include <vector>
#include <iostream>

int main()
{
  std::cout << "Constructor with initializer-list example:" << std::endl;
  std::vector<int> a = {1, 2, 3, 4};
  for (int i : a)
    std::cout << i << std::endl;
  std::cout << std::endl;

  std::cout << "a.assign(first, last) example:" << std::endl;
  const std::array<int, 4> data = {4, 3, 2, 1};
  a.assign(data.begin(), data.end());
  for (int i : a)
    std::cout << i << std::endl;
  std::cout << std::endl;

  std::cout << "a.assign(il) example:" << std::endl;
  a.assign({2,4,6,8});
  for (int i : a)
    std::cout << i << std::endl;
  std::cout << std::endl;

  return 0;
}
```
* assign[color ff0000]


###出力
```
Constructor with initializer-list example:
1
2
3
4

a.assign(first, last) example:
4
3
2
1

a.assign(il) example:
2
4
6
8
```

