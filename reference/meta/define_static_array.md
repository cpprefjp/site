# define_static_array
* meta[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <ranges::input_range R>
  consteval std::span<const ranges::range_value_t<R>> define_static_array(R&& r);
}
```

## 概要
コンパイル時に計算した配列を静的ストレージに配置し、その範囲を参照する[`span`](/reference/span/span.md)を返す。


## 戻り値
`r`の要素をコピーした静的ストレージ上の配列を参照する`std::span<const T>`を返す。


## 例
```cpp example
#include <meta>
#include <print>
#include <array>

int main() {
  constexpr auto arr = std::define_static_array(std::array{1, 2, 3, 4, 5});
  for (auto v : arr) {
    std::println("{}", v);
  }
}
```

### 出力
```
1
2
3
4
5
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`define_static_string`](define_static_string.md)
- [`define_static_object`](define_static_object.md)


## 参照
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
