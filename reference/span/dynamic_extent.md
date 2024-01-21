# dynamic_extent
* span[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  inline constexpr size_t dynamic_extent = numeric_limits<size_t>::max();
}
```
* size_t[link /reference/cstddef/size_t.md]
* numeric_limits[link /reference/limits/numeric_limits.md]
* max()[link /reference/limits/numeric_limits/max.md]

## 概要
`dynamic_extent`は、動的な要素数をもつことを[`std::span`](span.md)や[`std::mdspan`](../mdspan/mdspan.md)に指示するための定数である。

### std::span
以下のような状況で、[`span`](span.md)クラスは動的な要素数をもつようになる：

- デフォルトテンプレート引数を使用 (デフォルトで`dynamic_extent`が使用される)
- 動的な長さをもつ範囲を参照する ([`vector`](/reference/vector/vector.md)や、ポインタと要素数の組など)
- 参照範囲の変更を、動的な値で指定する (`s.`[`first`](span/first.md)`<N>()`は静的な要素数、`s.`[`first`](span/first.md)`(n)`は動的な要素数をもつ`span`オブジェクトを作成する)


## 例
```cpp example
#include <span>
#include <cassert>
#include <vector>

int main()
{
  {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::span<int> s{v};

    static_assert(decltype(s)::extent == std::dynamic_extent);
    assert(s.size() == v.size());
  }
  {
    int ar[] = {1, 2, 3, 4, 5};
    std::span s{ar};

    static_assert(decltype(s)::extent == 5);

    // 先頭3要素を参照する。
    // 1. 動的な要素数を指定する
    std::span r1 = s.first(3);
    static_assert(decltype(r1)::extent == std::dynamic_extent);
    assert(r1.size() == 3);

    // 2. 静的な要素数を指定する
    std::span r2 = s.first<3>();
    static_assert(decltype(r2)::extent == 3);
    assert(r2.size() == 3);
  }
}
```
* std::dynamic_extent[color ff0000]
* s.size()[link span/size.md]
* r1.size()[link span/size.md]
* r2.size()[link span/size.md]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- C++20 [`span`](span.md)
- C++23 [`mdspan`](../mdspan/mdspan.md)
