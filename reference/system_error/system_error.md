#system_error
```cpp
namespace std {
  class system_error : public runtime_error;
}
```
* runtime_error[link /reference/stdexcept.md]

`system_error`クラスは、OSのエラーを表現する`error_code`クラスのオブジェクトを包含した例外クラスである。


##メンバ関数

| | |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`system_error([error_code](/reference/system_error/error_code.md) ec, const string& what_arg);``system_error([error_code](/reference/system_error/error_code.md) ec, const char* what_arg);``system_error([error_code](/reference/system_error/error_code.md) ec);``system_error(int ev, const [error_category](/reference/system_error/error_category.md)& cat,``             const string& what_arg);``system_error(int ev, const [error_category](/reference/system_error/error_category.md)& cat,``             const char* what_arg);``system_error(int ev, const [error_category](/reference/system_error/error_category.md)& cat);`<br/><br/> | `error_code`オブジェクト or エラー値 + エラーカテゴリとエラー理由の文字列から`system_error`オブジェクトを生成する |
|`const [error_code](/reference/system_error/error_code.md)& code() const noexcept;` | 包含しているerror_codeオブジェクトへの参照を取得する |
|`virtual const char* what() const noexcept;` | メッセージを取得する メッセージ内容は実装依存だが、「what_arg + ": " + code().message()」という形式になると予想できる。 |


##例

```cpp
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  try {
    std::error_code ec(static_cast<int>(std::errc::invalid_argument),
                       std::generic_category());

    throw std::system_error(ec, "system error!");
  }
  catch (std::system_error& e) {
    const std::error_code& ec = e.code();

    std::cout << ec.value() << std::endl;
    std::cout << e.what() << std::endl;
  }
}
```
* std::system_error(ec, "system error!")[color ff0000]

###出力例
```cpp
22
system error!: Invalid argument
```

##バージョン

###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0


