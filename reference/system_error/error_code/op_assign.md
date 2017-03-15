# operator=
* system_error[meta header]
* std[meta namespace]
* error_code[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class ErrorCodeEnum>
error_code& operator=(ErrorCodeEnum e) noexcept;
```

## 概要
エラー値を代入する。


## 要件
[`is_error_code_enum`](../is_error_code_enum.md)`<ErrorCodeEnum>::value == true`であること。

`false`だった場合、この関数はオーバーロード解決から除外される。


## 効果
```cpp
*this = make_error_code(e);
```
* make_error_code[link ../make_error_code.md]


## 戻り値
`*this`


## 例外
投げない


## 例
```cpp
#include <iostream>
#include <system_error>

namespace std {
  template <>
  struct is_error_code_enum<std::errc> : std::true_type {};
}

int main()
{
  std::error_code ec;

  ec = std::errc::invalid_argument;

  if (ec) {
    std::cout << "error" << std::endl;
  }
  else {
    std::cout << "success" << std::endl;
  }

  std::cout << ec.value() << std::endl;
  std::cout << ec.category().name() << std::endl;
}
```
* is_error_code_enum[link /reference/system_error/is_error_code_enum.md]
* std::errc[link /reference/system_error/errc.md]
* std::true_type[link /reference/type_traits/true_type.md]
* std::errc::invalid_argument[link /reference/system_error/errc.md]
* ec.value()[link value.md]
* ec.category()[link category.md]
* name()[link /reference/system_error/error_category/name.md]

### 出力
```
error
22
generic
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 


## 参照


