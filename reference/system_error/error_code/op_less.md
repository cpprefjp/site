# operator<
* system_error[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  bool
    operator<(const error_code& lhs,
              const error_code& rhs) noexcept; // (1) C++11
}
```

## 概要
`error_code`において、左辺が右辺より小さいかの比較を行う。


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
  std::error_code ec1 = std::make_error_code(std::errc::invalid_argument);
  std::error_code ec2 = std::make_error_code(std::errc::permission_denied);

  std::cout << std::boolalpha;
  std::cout << (ec1 < ec2) << std::endl;
}
```
* std::make_error_code[link /reference/system_error/make_error_code.md]
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
