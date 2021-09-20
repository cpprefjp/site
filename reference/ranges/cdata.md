# cdata
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ cdata = /*unspecified*/;
  }
}
```

## 概要
Rangeの要素が格納されたメモリ領域へのポインタを取得する関数オブジェクト。

## 効果
部分式`E`の型を`T`とする。このとき、式`ranges::cdata(E)`の効果は以下の式と等しい。

1. `E`がlvalueであれば、[`ranges::data`](data.md)`(static_cast<const T&>(E))`
2. それ以外の場合、[`ranges::data`](data.md)`(static_cast<const T&&>(E))`

## 戻り値
Rangeの要素が格納されたメモリ領域へのポインタ。

## カスタマイゼーションポイント
Rangeが`const`な場合について[`ranges::data`](data.md)をカスタマイズすることで、`ranges::cdata`をカスタマイズできる。

## 備考
`ranges::cdata(E)`が有効な式であるとき、その型はオブジェクトへのポインタである。

## 例
```cpp example
#include <vector>
#include <iostream>
#include <ranges>

void some_c_like_api_function(const int* arr, std::size_t arr_size)
{
  std::cout << "array size:" << arr_size << " at " << static_cast<const void*>(arr) << std::endl;
}

int main()
{
  int arr[4] = {};
  some_c_like_api_function(std::ranges::cdata(arr), std::ranges::size(arr));
  std::vector<int> v { 12 };
  some_c_like_api_function(std::ranges::cdata(v), std::ranges::size(v));
}
```
* std::ranges::cdata[color ff0000]
* std::ranges::size[link size.md]

### 出力
```
false
false
true
false
false
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
