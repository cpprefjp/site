#コンストラクタ(C++11)
```cpp
error_code() noexcept;

error_code(int val, const error_category& cat) noexcept;

template <class ErrorCodeEnum>
error_code(ErrorCodeEnum e) noexcept;
```
* error_category[link ../error_category.md]

##error_codeオブジェクトの構築
- `error_code() noexcept`

デフォルト構築する。エラー値は`0`、エラーカテゴリは[`system_category()`](../system_category.md)と見なされる。

- `error_code(int val, const `[`error_category`](../error_category.md)`& cat) noexcept`

エラー値とエラーカテゴリを受け取って構築する。

- `template <class ErrorCodeEnum>`<br/>`error_code(ErrorCodeEnum e) noexcept`

[`is_error_code_enum`](../is_error_code_enum.md)`<ErrorCodeEnum>::value == true`となる型のエラー値を受け取って構築する。[`is_error_code_enum`](../is_error_code_enum.md)が`false`となる場合、この関数はオーバーロード解決から除外される。`*this = `[`make_error_code`](../make_error_code.md)`(e);` となる。


##例外
投げない


##例
```cpp
#include <iostream>
#include <system_error>

namespace std {
  // template <class ErrorCodeEnum>
  // error_code(ErrorCodeEnum e) noexcept
  // にerrcを渡せるようにするための特殊化
  template <>
  struct is_error_code_enum<std::errc> : std::true_type {};
}

int main()
{
  // デフォルトコンストラクタ
  std::cout << "default ctor" << std::endl;
  {
    std::error_code ec;

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
    std::error_code ec(static_cast<int>(std::errc::invalid_argument),
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

  // is_error_code_enumが特殊化された型のエラー値を受け取って構築
  std::cout << std::endl << "ErrorCodeEnum ctor" << std::endl;
  {
    std::error_code ec(std::errc::invalid_argument);

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
system

value & category ctor
error
22
generic

ErrorCodeEnum ctor
error
22
generic
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0(enum class未対応のため、ErrorCodeEnumのコンストラクタは動作しない)


##参照
