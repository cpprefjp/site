# formattable
* format[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class charT>
  concept fmt-iter-for = output_iterator<const charT&>;

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
* formatter[link formatter.md]
* semiregular[link /reference/concepts/semiregular.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]
* basic_format_context[link basic_format_context.md]
* basic_format_parse_context[link basic_format_parse_context.md]
* same_as[link /reference/concepts/same_as.md]

## 概要
`formattable`は、文字列フォーマット可能であることを表すコンセプトである。

このコンセプトを使用することで、[`formatter`](formatter.md)クラステンプレートが使用したい型で特殊化されているかをチェックできる。


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
* 

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
- [GCC](/implementation.md#gcc): 13
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [`is_copy_constructible`](/reference/type_traits/is_copy_constructible.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [LWG Issue 3141. `CopyConstructible` doesn't preserve source values](https://wg21.cmeerw.net/lwg/issue3141)
