# define_static_string
* meta[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <ranges::input_range R>
  consteval const ranges::range_value_t<R>* define_static_string(R&& r);
}
```

## 概要
コンパイル時に計算した文字列を静的ストレージに配置し、ヌル終端された文字列へのポインタを返す。


## 戻り値
`r`の要素をコピーした静的ストレージ上のヌル終端文字列へのポインタを返す。


## 例
```cpp example
#include <meta>
#include <print>
#include <string_view>

template <typename E>
  requires std::is_enum_v<E>
constexpr std::string_view to_string(E value) {
  template for (constexpr auto e : std::meta::enumerators_of(^^E)) {
    if (value == [:e:]) {
      return std::define_static_string(std::meta::identifier_of(e));
    }
  }
  return "<unknown>";
}

enum class Fruit { apple, banana, cherry };

int main() {
  std::println("{}", to_string(Fruit::banana));
}
```
* std::is_enum_v[link /reference/type_traits/is_enum.md]
* std::meta::enumerators_of[link enumerators_of.md]
* std::meta::identifier_of[link identifier_of.md]

### 出力
```
banana
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`define_static_array`](define_static_array.md)
- [`define_static_object`](define_static_object.md)


## 参照
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
