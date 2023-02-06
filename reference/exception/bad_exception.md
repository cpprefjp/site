# bad_exception
* exception[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class bad_exception : public exception;
}
```
* exception[link /reference/exception/exception.md]

## 概要
`bad_exception`は、不正な例外操作が行われた際に発生する例外クラスである。

### 動的例外仕様に違反した例外送出に対する例外 (C++14まで)
動的例外仕様をもつ関数において、指定外の例外型を送出した際に、`bad_exception`例外が発生する。

この場合の`bad_exception`例外オブジェクトは自動で送出されるわけではなく、ユーザー自身が[`unexpected_handler`](/reference/exception/set_unexpected.md)を指定してその中で例外オブジェクトの再送出を行うことで、`bad_exception`例外が送出される。


### 例外オブジェクトをコピーする際に例外が送出されたことに対する例外 (C++11)
[`std::current_exception()`](current_exception.md)関数を呼び出した際、現在発生している例外オブジェクトのコピーに失敗した場合に、無限再帰を回避するために実装が`bad_exception`例外を送出する可能性がある。

#### 備考
- GCC 10およびClang 11の段階では、[`std::current_exception()`](current_exception.md)関数は例外オブジェクトをコピーしないため、`bad_exception`例外は発生しない
- Visual C++では例外オブジェクトのコピーが再帰的に例外を発生させてしまう場合に、`bad_exception`例外が発生する
    - 参照 : [STL/tests/std/tests/VSO_0104705_throwing_copy_in_current_exception/test.cpp](https://github.com/microsoft/STL/blob/12c684bba78f9b032050526abdebf14f58ca26a3/tests/std/tests/VSO_0104705_throwing_copy_in_current_exception/test.cpp)


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|-----------------------------------------------|-------|
| `bad_exception() noexcept;` `bad_exception(const bad_exception&) noexcept;` | コンストラクタ | |
| `virtual ~bad_exception() = default;` | デストラクタ | |
| `bad_exception& operator=(const bad_exception&) noexcept;` | 代入演算子 | |
| `virtual const char* what() const noexcept;` | 実装定義のエラー内容を取得する | |


## 例
### 動的例外仕様に違反した例外を送出する例 (C++14まで)
```cpp example
#include <exception>
#include <stdexcept>
#include <iostream>

void user_unexpected()
{
  throw;
}

void not_runtime_error_throw() throw(std::runtime_error, std::bad_exception)
{
  throw std::invalid_argument("throw invalid_argument.");
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
* std::bad_exception[color ff0000]
* std::runtime_error[link /reference/stdexcept.md]
* std::invalid_argument[link /reference/stdexcept.md]
* std::set_unexpected[link set_unexpected.md]


#### 出力
```
caught: bad_exception.
```

## 関連項目
- [C++17 非推奨だった古い例外仕様を削除](/lang/cpp17/remove_deprecated_exception_specifications.md)
