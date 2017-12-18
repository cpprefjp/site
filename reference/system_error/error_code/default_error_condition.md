# default_error_condition
* system_error[meta header]
* std[meta namespace]
* error_code[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
error_condition default_error_condition() const noexcept;
```
* error_condition[link ../error_condition.md]

## 概要
包含しているエラー値とエラーカテゴリに対応する`error_condition`を構築


## 戻り値
```cpp
category().default_error_condition(value())
```
* category()[link category.md]
* default_error_condition[link ../error_category/default_error_condition.md]
* value()[link value.md]


## 例外
投げない


## 備考
構築される[`error_condition`](../error_condition.md)オブジェクトの[`value()`](../error_condition/value.md)および[`category()`](../error_condition/category.md)は、`default_error_condition()`関数内において対応するエラー値、カテゴリに変換される可能性がある(VC10, GCC 4.6.1では同じエラー値、同じカテゴリとなる)。


## 例
```cpp example
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  std::error_code ec(static_cast<int>(std::errc::invalid_argument),
                     std::generic_category());

  std::error_condition ed = ec.default_error_condition();

  std::cout << ec.value() << std::endl;
  std::cout << ec.category().name() << std::endl;
  std::cout << ec.message() << std::endl;

  std::cout << std::endl;

  std::cout << ed.value() << std::endl;
  std::cout << ed.category().name() << std::endl;
  std::cout << ed.message() << std::endl;
}
```
* default_error_condition()[color ff0000]
* std::errc::invalid_argument[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::error_condition[link /reference/system_error/error_condition.md]
* ec.value()[link value.md]
* ec.category()[link category.md]
* ec.message()[link category.md]
* name()[link /reference/system_error/error_category/name.md]
* ed.value()[link /reference/system_error/error_condition/value.md]
* ed.category()[link /reference/system_error/error_condition/category.md]
* ed.message()[link /reference/system_error/error_condition/message.md]

### 出力例
```
22
generic
Invalid argument

22
generic
Invalid argument
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照
