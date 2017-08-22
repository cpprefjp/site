# 推論補助
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator>
  basic_regex(ForwardIterator, ForwardIterator,
    regex_constants::syntax_option_type = regex_constants::ECMAScript)
    -> basic_regex<typename iterator_traits<ForwardIterator>::value_type>;
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]
* regex_constants[link /reference/regex/regex_constants.md]
* syntax_option_type[link /reference/regex/regex_constants/syntax_option_type.md]
* ECMAScript[link /reference/regex/regex_constants/syntax_option_type.md]

## 概要
`std::basic_regex`クラステンプレートの型推論補助。イテレータ範囲から文字型を推論する。


## 例
```cpp
#include <regex>
#include <type_traits>

int main()
{
  std::string re_str = R"(^\d+$)";

  // 文字列から推論
  std::basic_regex re1(re_str);
  static_assert(std::is_same_v<decltype(re1), std::regex>);

  std::basic_regex re2(re_str, std::regex_constants::ECMAScript);
  static_assert(std::is_same_v<decltype(re2), std::regex>);

  // イテレータ範囲から推論
  std::basic_regex re3(re_str.begin(), re_str.end());
  static_assert(std::is_same_v<decltype(re3), std::regex>);
}
```

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

