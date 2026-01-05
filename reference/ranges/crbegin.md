# crbegin
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ crbegin = /*unspecified*/;
  }
}
```

## 概要
Rangeの末尾を指す読み取り専用逆イテレータを取得する関数オブジェクト。

## 効果
部分式`E`の型を`T`、`E`の評価結果オブジェクトを示す左辺値を`t`とする。このとき、式`ranges::crbegin(E)`の効果は以下の式と等しい。

- C++20まで
    1. `E`がlvalueであれば、[`ranges::rbegin`](rbegin.md)`(static_cast<const T&>(E))`
    2. それ以外の場合、[`ranges::rbegin`](rbegin.md)`(static_cast<const T&&>(E))`
- C++23から
    1. `E`が右辺値であり、[`enable_borrowed_range`](enable_borrowed_range.md)`<remove_cv_t<T>>`が`false`となる場合、`ranges::crbegin(E)`は不適格
    2. それ以外の場合、式`U`を[`ranges::rbegin`](rbegin.md)`(`[`possibly-const-range`](possibly-const-range.md)`(t))`とすると、[`const_iterator`](/reference/iterator/const_iterator.md)`<decltype(U)>(U)`

## 戻り値
Rangeの末尾を指す読み取り専用逆イテレータ。

## カスタマイゼーションポイント
Rangeが`const`な場合について[`ranges::rbegin`](rbegin.md)をカスタマイズすることで、`ranges::crbegin`をカスタマイズできる。

## 備考
`ranges::crbegin`の呼び出しが有効な式であるとき、その型は[`input_or_output_iterator`](/reference/iterator/input_or_output_iterator.md)のモデルであり、C++23以降はさらに[`constant-iterator`](/reference/iterator/constant-iterator.md)のモデルである。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

void print(int x)
{
  std::cout << x << " ";
}

int main()
{
  // コンテナ
  {
    std::vector<int> v = {1, 2, 3};

    decltype(v)::const_reverse_iterator first = std::ranges::crbegin(v);
    decltype(v)::const_reverse_iterator last = std::ranges::crend(v);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 組み込み配列
  {
    int ar[] = {4, 5, 6};

    std::reverse_iterator<const int*> first = std::ranges::crbegin(ar);
    std::reverse_iterator<const int*> last = std::ranges::crend(ar);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 初期化子リスト
  {
    std::initializer_list<int> init = {7, 8, 9};

    std::reverse_iterator<const int*> first = std::ranges::crbegin(init);
    std::reverse_iterator<const int*> last = std::ranges::crend(init);

    std::for_each(first, last, print);
  }
}
```
* std::ranges::crbegin[color ff0000]
* std::ranges::crend[link crend.md]
* std::reverse_iterator[link /reference/iterator/reverse_iterator.md]

### 出力
```
3 2 1 
6 5 4 
9 8 7 
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
- [`std::crbegin`](/reference/iterator/crbegin.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
