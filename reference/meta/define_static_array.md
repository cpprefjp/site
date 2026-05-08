# define_static_array
* meta[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <ranges::input_range R>
  consteval std::span<const ranges::range_value_t<R>, see below> define_static_array(R&& r);
}
```

## 概要
コンパイル時に計算した配列を静的ストレージに配置し、その範囲を参照する[`span`](/reference/span/span.md)を返す。


## 戻り値
`r`の要素をコピーした静的ストレージ上の配列を参照する`std::span<const T, Extent>`を返す。

戻り値の[`std::span`](/reference/span/span.md)の第2テンプレート引数`Extent`は以下のように決まる：

- `ranges::size(r)`が定数式であれば、`static_cast<std::size_t>(ranges::size(r))`（静的長）
- そうでなければ、[`std::dynamic_extent`](/reference/span/dynamic_extent.md)（動的長）


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
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`define_static_string`](define_static_string.md)
- [`define_static_object`](define_static_object.md)


## 参照
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
- [LWG Issue 4537. Improve `define_static_array`](https://cplusplus.github.io/LWG/issue4537)
