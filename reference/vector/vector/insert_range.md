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


## 計算量
再確保が発生する場合は要素を挿入した後のvectorの要素数に比例し、それ以外の場合は挿入された要素数 + `pos`からvector末尾までの距離に比例する。

C++26 : `R`が[`ranges::approximately_sized_range`](../../ranges/approximately_sized_range.md)であり、`ranges::distance(rg) <= ranges::reserve_hint(rg)`が`true`の場合、再確保は高々1回しか行われない。`R`が[`ranges::forward_range`](../../ranges/forward_range.md)で、かつ[`ranges::approximately_sized_range`](../../ranges/approximately_sized_range.md)ではない場合も同様である。


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


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
    - C++26で、[`ranges::approximately_sized_range`](../../ranges/approximately_sized_range.md)の要素数近似値を利用して再確保が高々1回に抑えられるよう計算量保証を追加
