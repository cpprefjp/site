#bad_exception
```cpp
namespace std {
  class bad_exception : public exception;
}
```
* exception[link /reference/exception/exception.md]

##概要

`bad_exception`クラスは、関数に対して例外の型を制限し、指定外の型を送出した場合に発生する例外である。このクラスの例外オブジェクトは自動で送出されるわけではなく、ユーザー自身が[`unexpected_handler`](/reference/exception/set_unexpected.md)を指定してその中で例外オブジェクトの再送出を行うことで、`bad_exception`例外が送出される。

###メンバ関数

| | |
|----------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `bad_exception() noexcept;` `bad_exception(const bad_exception&) noexcept;` | コンストラクタ |
| `virtual ~bad_exception() = default;` | デストラクタ |
| `bad_exception& operator=(const bad_exception&) noexcept;` | 代入演算子 |
| `virtual const char* what() const noexcept;` | 実装定義のエラー内容を取得する |

###例
```cpp
#include <exception>
#include <stdexcept>
#include <iostream>

void user_unexpected()
{
  throw;
}

void not_runtime_error_throw() throw(std::runtime_error, std::bad_exception)
{
  throw std::invalid_argument( "throw invalid_argument." );
}

int main()
{
  std::set_unexpected(user_unexpected);

  // std::runtime_error以外を送出
  try {
    not_runtime_error_throw();
  }
  catch (std::runtime_error& ex) {
    std::cout << "caught: " << ex.what() << std::endl;
  }
  catch (std::bad_exception& ex) {
    std::cout << "caught: bad_exception." << std::endl;
  }
}
```
* bad_exception[color ff0000]


###出力
```
caught: bad_exception.
```

##参照

