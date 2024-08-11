# insert_range
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<T> R>
constexpr iterator insert_range(const_iterator pos, R&& rg); // C++23
```

## 概要
Rangeの各要素を任意の位置に挿入する。


## テンプレートパラメータ制約
型`T`が`*ranges::begin(rg)`から`vector`コンテナへの`EmplaceConstructible`であり、かつ型`T`が`MoveConstructible`・`MoveAssignable`・`Swappable`であること。


## 効果
Range`rg`の各要素を、`pos`の直前に挿入する。


## 戻り値
挿入されたRange`rg`の最初の要素を指すイテレータ。`rg`が空の場合は`pos`。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3};
  const int a[3] = {4, 5, 6};

  // Rangeを１番目と２番目の要素の間に挿入
  v.insert_range(std::next(v.begin()), a);

  for (int i : v) {
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
| [`insert`](insert.md)                     | 要素の挿入             |
| [`emplace`](emplace.md)                   | 要素の直接構築による挿入 |
