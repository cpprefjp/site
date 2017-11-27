# bool_constant
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <bool B>
  using bool_constant = integral_constant<bool, B>;
}
```
* integral_constant[link integral_constant.md]

## 概要
`bool_constant` は、真理値型の定数を表す型である。

汎用的な整数型の定数を表す[`integral_constant`](integral_constant.md)の別名として定義される。


## 例
```cpp example
#include <iostream>
#include <type_traits>

// bool型の定数を受け取る
template <bool B>
void f(std::bool_constant<B>)
{
  constexpr bool b = B;
  std::cout << std::boolalpha << b << std::endl;
}

int main()
{
  // bool型定数を表すために、事前に用意された型
  f(std::true_type{});
  f(std::false_type{});

  // 直接bool_constantを使用する
  f(std::bool_constant<true>{});

  // bool_constantの元となっているintegral_constantを使用する
  f(std::integral_constant<bool, true>{});
}
```
* std::bool_constant[color ff0000]
* std::integral_constant[link integral_constant.md]

### 出力
```
true
false
true
true
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 3.7.1
- [GCC, C++17 mode](/implementation.md#gcc): 6.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`true_type`](true_type.md)
- [`false_type`](false_type.md)


## 参照
- [N4389 Wording for `bool_constant`, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4389.html)
