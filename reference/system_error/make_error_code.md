# make_error_code
* system_error[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  error_code make_error_code(errc e) noexcept;
}
```
* error_code[link error_code.md]
* errc[link errc.md]

## 概要
[`errc`](errc.md)型の列挙値から[`error_code`](error_code.md)オブジェクトを生成する


## 戻り値
[`error_code`](error_code.md)`(static_cast<int>(e),` [`generic_category()`](generic_category.md)`)`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  std::error_code ec = std::make_error_code(std::errc::invalid_argument);

  std::cout << "category : " << ec.category().name() << std::endl;
  std::cout << "value : " << ec.value() << std::endl;
  std::cout << "message : " << ec.message() << std::endl;
}
```
* std::make_error_code[color ff0000]
* std::errc::invalid_argument[link errc.md]
* ec.category()[link error_code/category.md]
* name()[link error_category/name.md]
* ec.value()[link error_code/value.md]

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


