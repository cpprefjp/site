# コンストラクタ
* system_error[meta header]
* std[meta namespace]
* error_condition[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
error_condition() noexcept;                                   // (1)

error_condition(int val, const error_category& cat) noexcept; // (2)

template <class ErrorConditionEnum>
error_condition(ErrorConditionEnum e) noexcept;               // (3)
```
* error_category[link ../error_category.md]

## error_conditionオブジェクトの構築
- (1) : デフォルトコンストラクタ
- (2) : エラー値とエラーカテゴリを受け取って構築する。
- (3) : [`is_error_condition_enum`](../is_error_condition_enum.md)`<ErrorCodeEnum>::value == true`となる型のエラー値を受け取って構築する。


## 効果
- (1) : 値`0`(�常値)で構築する。エラーカテゴリは[`generic_category()`](../generic_category.md)と見なされる。
- (3) : `*this =` [`make_error_condition`](../make_error_condition.md)`(e);` となる。


## 例外
投げない


## 備考
- (3) : [`is_error_condition_enum`](../is_error_condition_enum.md)が`false`となる場合、この関数はオーバー�ード解決から除外される。


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  // デフォルトコンストラクタ
  std::cout << "default ctor" << std::endl;
  {
    std::error_condition ec;

    if (ec) {
      std::cout << "error" << std::endl;
    }
    else {
      std::cout << "success" << std::endl;
    }

    std::cout << ec.value() << std::endl;
    std::cout << ec.category().name() << std::endl;
  }

  // エラー値とエラーカテゴリを受け取って構築
  std::cout << std::endl << "value & category ctor" << std::endl;
  {
    std::error_condition ec(static_cast<int>(std::errc::invalid_argument),
                            std::generic_category());

    if (ec) {
      std::cout << "error" << std::endl;
    }
    else {
      std::cout << "success" << std::endl;
    }

    std::cout << ec.value() << std::endl;
    std::cout << ec.category().name() << std::endl;
  }

  // is_error_condition_enumが特殊化された型のエラー値を受け取って構築
  std::cout << std::endl << "ErrorConditionEnum ctor" << std::endl;
  {
    std::error_condition ec(std::errc::invalid_argument);

    if (ec) {
      std::cout << "error" << std::endl;
    }
    else {
      std::cout << "success" << std::endl;
    }

    std::cout << ec.value() << std::endl;
    std::cout << ec.category().name() << std::endl;
  }
}
```
* ec.value()[link value.md]
* ec.category()[link category.md]
* name()[link /reference/system_error/error_category/name.md]
* std::errc::invalid_argument[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]

### 出力
```
default ctor
success
0
generic

value & category ctor
error
22
generic

ErrorConditionEnum ctor
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


