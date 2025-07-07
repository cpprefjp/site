# operator!=
* system_error[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator==により、以下の演算子が使用可能になる (C++20)
  bool operator!=(const error_code& lhs, const error_code& rhs) noexcept;           // (1) C++11
  bool operator!=(const error_code& lhs, const error_condition& rhs) noexcept;      // (2) C++11
  bool operator!=(const error_condition& lhs, const error_code& rhs) noexcept;      // (3) C++11
  bool operator!=(const error_condition& lhs, const error_condition& rhs) noexcept; // (4) C++11
}
```
* error_code[link error_code.md]
* error_condition[link error_condition.md]

## 概要
`error_code`, `error_condition`の非等値比較を行う


## 戻り値
`!(lhs` [`==`](op_equal.md) `rhs)`


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
  std::error_condition ed1 = std::make_error_condition(std::errc::invalid_argument);
  std::error_condition ed2 = std::make_error_condition(std::errc::permission_denied);

  std::cout << std::boolalpha;

  std::cout << "error_code != error_code : " << (ec1 != ec1) << std::endl;
  std::cout << "error_code != error_code : " << (ec1 != ec2) << std::endl;

  std::cout << "error_code != error_condition : " << (ec1 != ed1) << std::endl;
  std::cout << "error_code != error_condition : " << (ec1 != ed2) << std::endl;

  std::cout << "error_condition != error_condition : " << (ed1 != ed1) << std::endl;
  std::cout << "error_condition != error_condition : " << (ed1 != ed2) << std::endl;

}
```
* std::make_error_code[link make_error_code.md]
* std::errc::invalid_argument[link errc.md]
* std::errc::permission_denied[link errc.md]
* std::error_condition[link error_condition.md]
* std::make_error_condition[link make_error_condition.md]

### 出力
```
error_code != error_code : false
error_code != error_code : true
error_code != error_condition : false
error_code != error_condition : true
error_condition != error_condition : false
error_condition != error_condition : true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified]


## 関連項目
- [`operator==()`](op_equal.md)


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
