# cbegin
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ cbegin = /*unspecified*/;
  }
}
```

## 概要
Rangeから先頭要素への読み取り専用イテレータを取得する関数オブジェクト。

## 効果
部分式`E`の型を`T`とする。このとき、式`ranges::cbegin(E)`の効果は以下の式と等しい。

1. `E`がlvalueであれば、[`ranges::begin`](begin.md)`(static_cast<const T&>(E))`
2. それ以外の場合、[`ranges::begin`](begin.md)`(static_cast<const T&&>(E))`

## 戻り値
先頭要素への読み取り専用イテレータ。

## カスタマイゼーションポイント
Rangeが`const`な場合について[`ranges::begin`](begin.md)をカスタマイズすることで、`ranges::cbegin`をカスタマイズできる。

## 備考
`ranges::cbegin`の呼び出しが有効な式であるとき、その型は[`input_or_output_iterator`](/reference/iterator/input_or_output_iterator.md)のモデルである。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3};

  decltype(v)::const_iterator first = std::ranges::cbegin(v);
  decltype(v)::const_iterator last = std::ranges::cend(v);

  std::for_each(first, last, [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* std::ranges::cbegin[color ff0000]
* std::ranges::cend[link cend.md]

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 関連項目
- [`std::cbegin`](/reference/iterator/cbegin.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
