# ssize
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ ssize = /*unspecified*/;
  }
}
```

## 概要
Rangeの要素数を符号付き整数型で取得する関数オブジェクト。

## 効果
部分式`E`の型を`T`とする。このとき、式`ranges::ssize(E)`の効果は以下の式と等しい。

1. [`range_difference_t`](range_difference_t.md)`<T>`が[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)より狭ければ、`static_cast<`[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)`>(`[`ranges::size`](size.md)`(E))`。
2. それ以外のとき、`static_cast<`[`range_difference_t`](range_difference_t.md)`<T>>(`[`ranges::size`](size.md)`(E))`。

## 戻り値
Rangeの要素数。

## カスタマイゼーションポイント
[`ranges::size`](size.md)をカスタマイズすることで、`ranges::ssize`をカスタマイズできる。

## 例
```cpp example
#include <cassert>
#include <vector>
#include <ranges>

int main()
{
  std::vector<int> v = {1, 2, 3};
  int ar[] = {1, 2, 3};

  // コンテナの要素数を取得。
  std::ptrdiff_t n1 = std::ranges::ssize(v);
  assert(n1 == 3);

  // 生配列の要素数を取得
  std::ptrdiff_t n2 = std::ranges::ssize(ar);
  assert(n2 == 3);
}
```
* std::ranges::ssize[color ff0000]
* std::ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目
- [`std::ssize`](/reference/iterator/ssize.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
