# reflection_range
* meta[meta header]
* std::meta[meta namespace]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <class R>
  concept reflection_range = ranges::input_range<R> &&
    same_as<ranges::range_value_t<R>, info>;
}
```
* info[link info.md]

## 概要
`reflection_range`は、要素型が[`std::meta::info`](info.md)であるRangeを表すコンセプトである。

[`substitute()`](substitute.md)、[`define_aggregate()`](define_aggregate.md)、[`common_type()`](common_type.md)など、複数のリフレクションをまとめて受け取るメタ関数のテンプレートパラメータ制約として使用される。デフォルトのテンプレート引数は[`std::initializer_list`](/reference/initializer_list/initializer_list.md)`<info>`であり、ブレース初期化子リスト`{^^int, ^^double}`のような形式でリフレクションを渡すことができる。


## 例
```cpp example
#include <meta>
#include <vector>

int main() {
  // initializer_listで渡す（デフォルト）
  constexpr auto r1 = std::meta::substitute(^^std::vector, {^^int});

  // vectorで渡す
  constexpr std::vector<std::meta::info> args = {^^int};
  constexpr auto r2 = std::meta::substitute(^^std::vector, args);

  static_assert(r1 == r2);
}
```
* std::meta::substitute[link substitute.md]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`info`](info.md)
- [`substitute`](substitute.md)
- [`define_aggregate`](define_aggregate.md)
- [`can_substitute`](can_substitute.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
