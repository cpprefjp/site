# append_range
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<T> R>
constexpr void append_range(R&& rg); // C++23
```

## 概要
Rangeの要素を末尾へ追加する。


## テンプレートパラメータ制約
型`T`が`*ranges::begin(rg)`から`vector`コンテナへの`EmplaceConstructible`かつ`MoveInsertable`であること。


## 効果
Range`rg`の各要素を、末尾に追加する。


## 戻り値
なし


## 計算量
要素を追加した後の[`size()`](size.md)が要素を追加する前の[`capacity()`](capacity.md)よりも大きい場合は領域の再確保が生じ、要素を追加した後の[`size()`](size.md)に比例する。領域の再確保が発生しない場合は、[`ranges::distance`](../../iterator/ranges_distance.md)`(rg)`に比例する。

C++26 : `R`が[`ranges::approximately_sized_range`](../../ranges/approximately_sized_range.md)であり、`ranges::distance(rg) <= ranges::reserve_hint(rg)`が`true`の場合、再確保は高々1回しか行われない。`R`が[`ranges::forward_range`](../../ranges/forward_range.md)で、かつ[`ranges::approximately_sized_range`](../../ranges/approximately_sized_range.md)ではない場合も同様である。


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3};
  const int a[3] = {4, 5, 6};

  // Rangeを末尾に追加
  v.append_range(a);

  for (int i : v) {
    std::cout << i << " ";
  }
  std::cout << std::endl;
}
```
* append_range[color ff0000]

### 出力
```
1 2 3 4 5 6 
```


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`push_back`](push_back.md)               | 末尾へ要素追加         |
| [`emplace_back`](emplace_back.md)         | 末尾へ直接構築         |


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
    - C++26で、[`ranges::approximately_sized_range`](../../ranges/approximately_sized_range.md)の要素数近似値を利用して再確保が高々1回に抑えられるよう計算量保証を追加
