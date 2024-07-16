# assign
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
template <class InputIterator>
void assign(InputIterator first, InputIterator last);           // (1) C++03
template <class InputIterator>
constexpr void assign(InputIterator first, InputIterator last); // (1) C++20

void assign(size_type n, const T& t);           // (2) C++03
constexpr void assign(size_type n, const T& t); // (2) C++20

void assign(initializer_list<T> il);           // (3) C++11
constexpr void assign(initializer_list<T> il); // (3) C++20
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
コンテナの再代入。

- (1) : 範囲を代入。
- (2) : `n`個の値`t`を代入。
- (3) : 初期化子リストを代入。


## 要件
- (1) : 型`T`は`*first`から`X`に対してEmplaceConstructibleでなければならない。イテレータがForward iterators の要件を満たさない場合、型`T`は`X`に対してMoveInsertableでなければならない。`[first, last)`の範囲のそれぞれのイテレータは１回だけ間接参照される。`first`, `last`は自身のイテレータであってはならない。
- (2) : `t`は`*this`の要素への参照であってはならない。


## 効果
- (1) : イテレータ範囲`[first, last)`の要素のコピーで`*this`の要素を置き換える。
- (2) : `*this`の要素をすべて`n`個の`t`のコピーに置き換える。
- (3) : `assign(il.begin(), il.end())`と等価。


## 戻り値
なし


## 例
```cpp example
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
* data.begin()[link /reference/array/array/begin.md]
* data.end()[link /reference/array/array/end.md]

### 出力
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


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
