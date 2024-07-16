# operator<
* system_error[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  bool
    operator<(const error_condition& lhs,
              const error_condition& rhs) noexcept; // (1) C++11
}
```

## 概要
`error_condition`において、左辺が右辺より小さいかの比較を行う。


## 戻り値
```cpp
return lhs.category() < rhs.category() || lhs.category() == rhs.category() && lhs.value() < rhs.value();
```
* category()[link category.md]
* value()[link value.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  std::error_condition ed1 = std::make_error_condition(std::errc::invalid_argument);
  std::error_condition ed2 = std::make_error_condition(std::errc::permission_denied);

  std::cout << std::boolalpha;
  std::cout << (ed1 < ed2) << std::endl;
}
```
* std::make_error_condition[link /reference/system_error/make_error_condition.md]
* std::errc::invalid_argument[link /reference/system_error/errc.md]
* std::errc::permission_denied[link /reference/system_error/errc.md]

### 出力
```
false
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified]

## 参照
