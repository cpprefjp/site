# 推論補助
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator,
            class Allocator = allocator<typename iterator_traits<InputIterator>::value_type>>
  basic_string(InputIterator, InputIterator, Allocator = Allocator())
    -> basic_string<typename iterator_traits<InputIterator>::value_type,
         char_traits<typename iterator_traits<InputIterator>::value_type>,
         Allocator>;
}
```
* allocator[link /reference/memory/allocator.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* char_traits[link /reference/string/char_traits.md]

## 概要
`std::basic_string`クラステンプレートの型推論補助。イテレータ範囲から推論する。


## 例
```cpp
#include <string>
#include <type_traits>

int main()
{
  // 文字列リテラルからの推論
  std::basic_string s1 = "Hello";
  static_assert(std::is_same_v<decltype(s1), std::basic_string<char>>);

  // パラメータ設定済みbasic_stringからの推論
  std::string s2_org = "Hello";
  std::basic_string s2 = s2_org;
  static_assert(std::is_same_v<decltype(s2), std::basic_string<char>>);

  // 文字をN回繰り返すコンストラクタからの推論
  std::basic_string s3 {3, 'a'};
  static_assert(std::is_same_v<decltype(s3), std::basic_string<char>>);

  // 初期化子リストからの推論
  std::basic_string s4 = {'H', 'e', 'l', 'l', 'o'};
  static_assert(std::is_same_v<decltype(s4), std::basic_string<char>>);

  // イテレータ範囲からの推論。
  // {s1.begin(), s1.end()} とすると、イテレータの初期化子リストと見なされてしまい、
  // basic_string<decltype(s1)::iterator>型に推論されてしまうので注意
  std::basic_string s5(s1.begin(), s1.end());
  static_assert(std::is_same_v<decltype(s5), std::basic_string<char>>);
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

