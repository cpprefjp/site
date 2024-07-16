# get
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_string[meta class]
* cpp23[meta cpp]

```cpp
constexpr basic_string_view<charT> get() const noexcept; // (1)
```

## 概要
書式文字列を取得する。


## 戻り値
メンバ変数として`basic_string_view<charT> str;`が定義されるとして、

```cpp
return str;
```


## 例
```cpp example
#include <cassert>
#include <format>

template <class... Args>
void f(std::format_string<Args...> fmt, Args&&...) {
  assert(fmt.get() == "Hello {} World");
}

int main() {
  f("Hello {} World", 42);
}
```
* fmt.get()[color ff0000]


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2508R1 Expose `std::basic-format-string<charT, Args...>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2508r1.html)
