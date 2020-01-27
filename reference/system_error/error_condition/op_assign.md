# operator=
* system_error[meta header]
* std[meta namespace]
* error_condition[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template<class ErrorConditionEnum>
error_condition& operator=(ErrorConditionEnum e) noexcept;
```

## 概要
エラー値を代入する


## 要件
[`is_error_condition_enum`](../is_error_condition_enum.md)`<ErrorConditionEnum>::value == true`であること。

`false`だった場合、この関数はオーバー�ード解決から除外される。


## 効果
```cpp
*this = make_error_condition(e);
```
* make_error_condition[link ../make_error_condition.md]


## 戻り値
`*this`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  std::error_condition ec;

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
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照
