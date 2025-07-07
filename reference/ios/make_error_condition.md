# make_error_condition
* ios[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  error_condition make_error_condition(io_errc e);          // C++11
  error_condition make_error_condition(io_errc e) noexcept; // C++14
}
```
* error_condition[link /reference/system_error/error_condition.md]
* io_errc[link io_errc.md]

## 概要
`io_errc`から`error_condition`を生成する


## 戻り値
[`error_condition`](/reference/system_error/error_condition.md)`(static_cast<int>(e),` [`iostream_category`](iostream_category.md)`())`


## 例外
投げない


## 例
```cpp example
#include <iostream>

int main()
{
  std::error_condition ec = std::make_error_condition(std::io_errc::stream);

  std::cout << "category : " << ec.category().name() << std::endl;
  std::cout << "value : " << ec.value() << std::endl;
  std::cout << "message : " << ec.message() << std::endl;
}
```
* std::make_error_condition[color ff0000]
* std::io_errc::stream[link io_errc.md]
* std::error_condition[link /reference/system_error/error_condition.md]
* ec.category()[link /reference/system_error/error_code/category.md]
* name()[link /reference/system_error/error_category/name.md]
* ec.value()[link /reference/system_error/error_condition/value.md]

### 出力例
```
category : iostream
value : 1
message : iostream stream error
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified]


## 参照
- [LWG Issue 2087. iostream_category() and noexcept](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2087)

