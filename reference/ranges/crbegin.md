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
部分式`E`の型を`T`とする。このとき、式`ranges::crbegin(E)`の効果は以下の式と等しい。

1. `E`がlvalueであれば、[`ranges::rbegin`](rbegin.md)`(static_cast<const T&>(E))`
2. それ以外の場合、[`ranges::rbegin`](rbegin.md)`(static_cast<const T&&>(E))`

## 戻り値
Rangeの末尾を指す読み取り専用逆イテレータ。

## カスタマイゼーションポイント
Rangeが`const`な場合について[`ranges::rbegin`](rbegin.md)をカスタマイズすることで、`ranges::crbegin`をカスタマイズできる。

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
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 関連項目
- [`std::crbegin`](/reference/iterator/crbegin.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
