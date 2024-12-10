# formattable
* format[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class charT>
  using fmt-iter-for = /* unspecified */;

  template <class T, class charT>
  concept formattable =
    semiregular<formatter<remove_cvref_t<T>, charT>> &&
    requires(formatter<remove_cvref_t<T>, charT> f,
             const formatter<remove_cvref_t<T>, charT> cf,
             T t,
             basic_format_context<fmt-iter-for<charT>, charT> fc,
             basic_format_parse_context<charT> pc) {
      { f.parse(pc) } -> same_as<basic_format_parse_context<charT>::iterator>;
      { cf.format(t, fc) } -> same_as<fmt-iter-for<charT>>;
    }
  };
}
```
* fmt-iter-for[italic]
* unspecified[italic]
* formatter[link formatter.md]
* semiregular[link /reference/concepts/semiregular.md]
* basic_format_context[link basic_format_context.md]
* basic_format_parse_context[link basic_format_parse_context.md]

## 概要
`formattable`は、文字列フォーマット可能であることを表すコンセプトである。

このコンセプトを使用することで、[`formatter`](formatter.md)クラステンプレートが使用したい型で特殊化されているかをチェックできる。

`formattable`コンセプトの定義において使用されている`fmt-iter-for<charT>`は、[`output_iterator<const charT&>`](/reference/iterator/output_iterator.md)コンセプトのモデルとなる未規定の型である。

## 例
```cpp example
#include <iostream>
#include <format>
#include <any>

template <std::formattable<char> T>
void f(T x) {
  std::cout << std::format("{}", x) << std::endl;
}

int main() {
  f(3);       // OK
  f("hello"); // OK
//f(std::any{3}); // NG : std::anyはstd::formatterを特殊化していない
}
```
* std::format[link format.md]

### 出力
```
3
hello
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
