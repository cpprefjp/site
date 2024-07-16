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
部分式`E`の型を`T`、`E`の評価結果オブジェクトを示す左辺値を`t`とする。このとき、式`ranges::cbegin(E)`の効果は以下の式と等しい。

- C++20まで
    1. `E`がlvalueであれば、[`ranges::begin`](begin.md)`(static_cast<const T&>(E))`
    2. それ以外の場合、[`ranges::begin`](begin.md)`(static_cast<const T&&>(E))`
- C++23から
    1. `E`が右辺値であり、[`enable_borrowed_range`](./enable_borrowed_range.md)`<remove_cv_t<T>>`が`false`となる場合、`ranges::cbegin(E)`は不適格
    2. それ以外の場合、式`U`を[`ranges::begin`](begin.md)`(`[`possibly-const-range`](./possibly-const-range.md)`(t))`とすると、[`const_iterator`](/reference/iterator/const_iterator.md)`<decltype(U)>(U)`

## 戻り値
先頭要素への読み取り専用イテレータ。

## カスタマイゼーションポイント
Rangeが`const`な場合について[`ranges::begin`](begin.md)をカスタマイズすることで、`ranges::cbegin`をカスタマイズできる。

## 備考
`ranges::cbegin`の呼び出しが有効な式であるとき、その型は[`input_or_output_iterator`](/reference/iterator/input_or_output_iterator.md)のモデルであり、C++23以降はさらに[`constant-iterator`](/reference/iterator/constant-iterator.md)のモデルである。

C++20までは`range`型`R`の`begin()`の`const`オーバーロードを呼び出してていたため得られたイテレータは必ずしも定数イテレータではない場合があったが、C++23からはそこから定数イテレータが得られない場合に[`basic_const_iterator`](/reference/iterator/basic_const_iterator.md)を使用することで確実に定数イテレータを取得する。

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
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目
- [`std::cbegin`](/reference/iterator/cbegin.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
