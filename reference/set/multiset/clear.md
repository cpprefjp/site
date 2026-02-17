# clear
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
void clear();                    // (1) C++03
void clear() noexcept;           // (1) C++11
constexpr void clear() noexcept; // (1) C++26
```

## 概要
`multiset` コンテナ内の全ての要素を削除する。それぞれのデストラクタが呼ばれ、コンテナから削除される。[`size()`](size.md) は 0 になる。


## 計算量
線形時間

## 例外

投げない

## 例
```cpp example
#include <iostream>
#include <set>

int main ()
{
  std::multiset<int> c;

  c.insert(10);
  c.insert(20);
  c.insert(10);

  std::cout << c.size() << std::endl;

  c.clear();

  std::cout << c.size() << std::endl;
}
```
* clear()[color ff0000]
* c.insert[link insert.md]
* c.size()[link size.md]

### 出力
```
3
0
```

## 関連項目

| 名前                  | 説明                               |
|-----------------------|------------------------------------|
| [`erase`](erase.md) | 要素を削除する                     |
| [`size`](size.md)   | 要素数を取得する                   |
| [`empty`](empty.md) | コンテナが空であるかどうかを調べる |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
