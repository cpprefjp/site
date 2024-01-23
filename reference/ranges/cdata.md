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
部分式`E`の型を`T`、`E`の評価結果オブジェクトを示す左辺値を`t`とする。このとき、式`ranges::cdata(E)`の効果は以下の式と等しい。

- C++20まで
    1. `E`がlvalueであれば、[`ranges::data`](data.md)`(static_cast<const T&>(E))`
    2. それ以外の場合、[`ranges::data`](data.md)`(static_cast<const T&&>(E))`
- C++23から
    1. `E`が右辺値であり、[`enable_borrowed_range`](./enable_borrowed_range.md)`<remove_cv_t<T>>`が`false`となる場合、`ranges::cdata(E)`は不適格
    2. それ以外の場合、`as-const-pointer(`[`ranges::data`](data.md)`(`[`possibly-const-range`](./possibly-const-range.md)`(t)))`
        - `as-const-pointer`は次のような説明専用関数テンプレートである
          ```cpp
          template<class T>
          constexpr auto as-const-pointer(const T* p) noexcept { return p; }
          ```

## 戻り値
Rangeの要素が格納されたメモリ領域へのポインタ。

## カスタマイゼーションポイント
Rangeが`const`な場合について[`ranges::data`](data.md)をカスタマイズすることで、`ranges::cdata`をカスタマイズできる。

## 備考
`ranges::cdata(E)`が有効な式であるとき、その型はオブジェクトへのポインタである（C++23以降、このポインタは定数ポインタである）。

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

### 出力例
```
array size:4 at 0x7fffb1ad5d70
array size:1 at 0x556ec23ba2b0
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
- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
- [LWG Issue 3948. `possibly-const-range` and `as-const-pointer` should be `noexcept`](https://cplusplus.github.io/LWG/issue3948)
