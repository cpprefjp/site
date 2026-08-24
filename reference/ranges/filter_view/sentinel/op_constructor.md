# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::sentinel[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
public:
  sentinel() = default;                             // (1)

private:
  constexpr explicit sentinel(filter_view& parent); // (2) 説明専用
```

## 概要

[`filter_view::sentinel`](../sentinel.md)オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : `private`な説明専用コンストラクタ。[`filter_view`](../../filter_view.md)の[`end()`](../end.md)から呼び出される


## 効果

- (1) : `end_`をデフォルト構築する
- (2) : `end_`を[`std::ranges::end`](../../end.md)`(parent.base_)`で初期化する

## 例
```cpp example
#include <ranges>
#include <iostream>
#include <concepts>

int main()
{
  // take_while_viewは非common_rangeなので、filter_viewのend()は番兵を返す
  auto base = std::views::iota(1)
            | std::views::take_while([](int i) { return i <= 10; });
  auto fv = base | std::views::filter([](int i) { return i % 2 == 0; });

  // (2) filter_viewのend()から番兵が構築される
  auto se = fv.end();

  // (1) デフォルト構築が可能
  static_assert(std::default_initializable<decltype(se)>);

  for (auto it = fv.begin(); it != se; ++it) {
    std::cout << *it;
  }
  std::cout << std::endl;
}
```
* std::views::take_while[link /reference/ranges/take_while_view.md]
* std::views::filter[link /reference/ranges/filter_view.md]
* std::views::iota[link /reference/ranges/iota_view.md]

### 出力
```
246810
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
- [P3059R2 Making user-defined constructors of view iterators/sentinels private](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3059r2.html)
    - C++26で、(2)のユーザー定義コンストラクタを`public`から`private`に移動
