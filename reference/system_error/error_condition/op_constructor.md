#コンストラクタ (C++11)
* system_error[meta header]

```cpp
error_condition() noexcept;

error_condition(int val, const error_category& cat) noexcept;

template <class ErrorConditionEnum>
error_condition(ErrorConditionEnum e) noexcept;
```
* error_category[link ../error_category.md]

##error_conditionオブジェクトの構築
- `error_condition() noexcept`

デフォルト構築する。エラー値は`0`、エラーカテゴリは[`generic_category()`](../generic_category.md)と見なされる。

- `error_condition(int val, const `[`error_category`](../error_category.md)`& cat) noexcept`

エラー値とエラーカテゴリを受け取って構築する。

- `template <class ErrorConditionEnum>`<br/>`error_condition(ErrorConditionEnum e) noexcept`

[`is_error_condition_enum`](../is_error_condition_enum.md)`<ErrorCodeEnum>::value == true`となる型のエラー値を受け取って構築する。[`is_error_condition_enum`](../is_error_condition_enum.md)が`false`となる場合、この関数はオーバーロード解決から除外される。`*this = `[`make_error_condition`](../make_error_condition.md)`(e);` となる。


##例外
投げない


##例
```cpp
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

###出力
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

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照


