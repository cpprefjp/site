# 推論補助
* span[meta header]
* std[meta namespace]
* span[meta class]
* cpp20[meta cpp]

```cpp
namespace std {

  template<class It, class End>
  span(It, End) -> span<remove_reference_t<iter_reference_t<It>>>;     // (1)

  template <class T, size_t N>
  span(T (&)[N]) -> span<T, N>;                                        // (2)

  template <class T, size_t N>
  span(array<T, N>&) -> span<T, N>;                                    // (3)

  template <class T, size_t N>
  span(const array<T, N>&) -> span<const T, N>;                        // (4)

  template<class R>
  span(R&&) -> span<remove_reference_t<ranges::range_reference_t<R>>>; // (5)

}
```
* array[link /reference/array/array.md]
* size_t[link /reference/cstddef/size_t.md]

## 概要
`std::span`クラステンプレートの型推論補助。

- (1) : メモリ連続性をもつイテレータから、要素型を推論する。要素数はデフォルトの[`std::dynamic_extent`](/reference/span/dynamic_extent.md)を使用する
- (2) : 組み込み配列への参照から、要素型と静的な要素数を推論する
- (3) : `std::array`型オブジェクトから、要素型と静的な要素数を推論する
- (4) : `const`の`std::array`型オブジェクトから、要素型と静的な要素数を推論する
- (5) : メモリ連続性をもつイテレータを持つ型のオブジェクトから、要素型を推論する。要素数はデフォルトの[`std::dynamic_extent`](/reference/span/dynamic_extent.md)を使用する

なお、ポインタと要素数の組、およびポインタ範囲を指定するコンストラクタからは推論できない。

## テンプレートパラメーター制約
- (1) : 型`It`はコンセプト`std::contiguous_iterator`を満たすこと
- (5) : 型`R`はコンセプト`std::ranges::contiguous_range`を満たすこと

## 例
```cpp example
#include <type_traits>
#include <span>
#include <vector>
#include <array>

int main()
{
  // (1)
  {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::span s{v.begin(), v.end()}; // std::span<int, std::dynamic_extent>

    static_assert(std::is_same_v<
      decltype(s)::element_type,
      int
    >);

    static_assert(decltype(s)::extent == std::dynamic_extent);
  }

  // (2)
  {
    std::array ar = {1, 2, 3, 4, 5};
    std::span s{ar}; // std::span<int, 5>

    static_assert(std::is_same_v<
      decltype(s)::element_type,
      int
    >);

    static_assert(decltype(s)::extent == 5);
  }

  // (3)
  {
    const std::array ar = {1, 2, 3, 4, 5};
    std::span s{ar}; // std::span<const int, 5>

    static_assert(std::is_same_v<
      decltype(s)::element_type,
      const int
    >);

    static_assert(decltype(s)::extent == 5);
  }

  // (4)
  {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::span s{v}; // std::span<int, std::dynamic_extent>

    static_assert(std::is_same_v<
      decltype(s)::element_type,
      int
    >);

    static_assert(decltype(s)::extent == std::dynamic_extent);
  }

  // (5)
  {
    const std::vector<int> v = {1, 2, 3, 4, 5};
    std::span s{v}; // std::span<const int, std::dynamic_extent>

    static_assert(std::is_same_v<
      decltype(s)::element_type,
      const int
    >);

    static_assert(decltype(s)::extent == std::dynamic_extent);
  }
}
```

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
