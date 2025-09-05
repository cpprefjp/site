# make_error_condition
* system_error[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  error_condition make_error_condition(errc e) noexcept;
}
```
* error_condition[link error_condition.md]
* errc[link errc.md]

## 概要
[`errc`](errc.md)型の列挙値から[`error_condition`](error_condition.md)オブジェクトを生成する


## 戻り値
[`error_condition`](error_condition.md)`(static_cast<int>(e),` [`generic_category()`](generic_category.md)`)`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  std::error_condition econd = std::make_error_condition(std::errc::invalid_argument);

  std::cout << "category : " << econd.category().name() << std::endl;
  std::cout << "value : " << econd.value() << std::endl;
  std::cout << "message : " << econd.message() << std::endl;
}
```
* std::make_error_condition[color ff0000]
* std::error_condition[link error_condition.md]
* std::errc::invalid_argument[link errc.md]
* econd.category()[link error_condition/category.md]
* name()[link error_category/name.md]
* econd.value()[link error_condition/value.md]
* econd.message()[link error_condition/message.md]

### 出力
```
category : generic
value : 22
message : Invalid argument
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
