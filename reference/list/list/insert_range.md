# insert_range
* list[meta header]
* std[meta namespace]
* list[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<T> R>
iterator insert_range(const_iterator pos, R&& rg);           // (1) C++23
template <container-compatible-range<T> R>
constexpr iterator insert_range(const_iterator pos, R&& rg); // (1) C++26
```

## 概要
Rangeの各要素を任意の位置に挿入する。


## テンプレートパラメータ制約
型`T`が`*ranges::begin(rg)`から`list`コンテナへの`EmplaceConstructible`であること。


## 効果
Range`rg`の各要素を、`pos`の直前に挿入する。


## 戻り値
挿入されたRange`rg`の最初の要素を指すイテレータ。`rg`が空の場合は`pos`。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <list>

int main()
{
  std::list<int> lst = {1, 2, 3};
  const int a[3] = {4, 5, 6};

  // Rangeを１番目と２番目の要素の間に挿入
  lst.insert_range(std::next(lst.begin()), a);

  for (int i : lst) {
    std::cout << i << " ";
  }
  std::cout << std::endl;
}
```
* insert_range[color ff0000]

### 出力
```
1 4 5 6 2 3
```


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`insert`](insert.md)                     | 任意の位置に要素を挿入する         |
| [`emplace`](emplace.md)                   | 任意の位置に要素を直接構築で挿入する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
