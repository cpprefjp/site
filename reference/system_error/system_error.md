#system_error
* system_error[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class system_error : public runtime_error;
}
```
* runtime_error[link /reference/stdexcept.md]

##概要
`system_error`クラスは、OSのエラーを表現する`error_code`クラスのオブジェクトを包含した例外クラスである。


##メンバ関数

| | |
|--------------------------------------------|-------------------------------------------------------------------|
|`system_error(`[`error_code`](./error_code.md)` ec, const string& what_arg);`<br/>`system_error(`[`error_code`](./error_code.md)` ec, const char* what_arg);`<br/>`system_error(`[`error_code`](./error_code.md)` ec);`<br/>`system_error(int ev, const `[`error_category`](./error_category.md)`& cat,`<br/>`             const string& what_arg);`<br/>`system_error(int ev, const `[`error_category`](./error_category.md)`& cat,`<br/>`             const char* what_arg);`<br/>`system_error(int ev, const `[`error_category`](./error_category.md)`& cat);` | `error_code`オブジェクト or エラー値 + エラーカテゴリとエラー理由の文字列から`system_error`オブジェクトを生成する |
|`const `[`error_code`](./error_code.md)`& code() const noexcept;` | 包含している`error_code`オブジェクトへの参照を取得する |
|`virtual const char* what() const noexcept;` | メッセージを取得する メッセージ内容は実装依存だが、「`what_arg + ": " + code().message()`」という形式になると予想できる。 |


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
* std::system_error[color ff0000]

###出力例
```
22
system error!: Invalid argument
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


