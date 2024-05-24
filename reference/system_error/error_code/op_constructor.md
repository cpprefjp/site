# コンストラクタ
* system_error[meta header]
* std[meta namespace]
* error_code[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
error_code() noexcept;                                   // (1)

error_code(int val, const error_category& cat) noexcept; // (2)

template <class ErrorCodeEnum>
error_code(ErrorCodeEnum e) noexcept;                    // (3)
```
* error_category[link ../error_category.md]

## error_codeオブジェクトの構築
- (1) : デフォルトコンストラクタ。
- (2) : エラー値とエラーカテゴリを受け取って構築する。
- (3) : [`is_error_code_enum`](../is_error_code_enum.md)`<ErrorCodeEnum>::value == true`となる型のエラー値を受け取って構築する。


## 効果
- (1) : 値`0`(正常値)で構築する。エラーカテゴリは[`system_category()`](../system_category.md)と見なされる。
- (3) : `*this =` [`make_error_code`](../make_error_code.md)`(e);` となる。


## 例外
投げない


## 備考
- (3) : [`is_error_code_enum`](../is_error_code_enum.md)が`false`となる場合、この関数はオーバーロード解決から除外される
- (3) : [`make_error_code()`](../make_error_code.md)の呼び出しに`std::`名前空間がついていないことにより、指定された`ErrorCodeEnum`型が定義されている名前空間の`make_error_code()`関数がADLによって探索される


## 例
### 基本的な使い方
```cpp example
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
* is_error_code_enum[link /reference/system_error/is_error_code_enum.md]
* std::errc[link /reference/system_error/errc.md]
* ec.value()[link value.md]
* ec.category()[link category.md]
* name()[link /reference/system_error/error_category/name.md]
* std::errc::invalid_argument[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]

#### 出力
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

### 独自のエラーコードを定義する例
```cpp example
#include <iostream>
#include <system_error>
#include <type_traits>

namespace mylib {

enum class my_error {
  not_found,
};

class my_error_category : public std::error_category {
public:
  const char* name() const noexcept override
  {
    return "my_error_category";
  }

  std::string message(int value) const override
  {
    if (value == static_cast<int>(my_error::not_found))
      return "not found";
    return "unknown";
  }
};

const my_error_category& get_my_error_category() {
  static my_error_category cat;
  return cat;
}

std::error_code make_error_code(my_error err)
{
  return std::error_code(static_cast<int>(err), get_my_error_category());
}
}

namespace std {
  template <>
  struct is_error_code_enum<mylib::my_error> : public std::true_type {};
}

int main() {
  // ecにはmy_error_categoryが設定される
  std::error_code ec = mylib::my_error::not_found;
  std::cout << ec.message() << std::endl;
}
```
* ec.message()[link message.md]
* std::error_category[link /reference/system_error/error_category.md]

#### 出力
```
not found
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 (enum class未対応のため、ErrorCodeEnumのコンストラクタは動作しない)


