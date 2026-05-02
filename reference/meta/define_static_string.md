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
#include <format>

// コンパイル時に構築した文字列を実行時に使用する
consteval const char* make_greeting(const char* name) {
  std::string s = std::format("Hello, {}!", name);
  return std::define_static_string(s);
}

int main() {
  constexpr const char* greeting = make_greeting("world");
  std::println("{}", greeting);
}
```
* std::define_static_string[color ff0000]

### 出力
```
banana
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`define_static_array`](define_static_array.md)
- [`define_static_object`](define_static_object.md)


## 参照
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
