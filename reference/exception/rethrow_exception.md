# rethrow_exception
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
[[noreturn]] void rethrow_exception(exception_ptr p);
```

## 概要
`exception_ptr`が指す例外オブジェクトを再ス�ーする。


## 要件
`p`がヌルを指す`exception_ptr`ではないこと。


## 戻り値
この関数は決して返らない。


## 例
```cpp example
#include <iostream>
#include <exception>
#include <stdexcept>

int main()
{
  std::exception_ptr ep;

  try {
    throw std::runtime_error("error!");
  }
  catch (...) {
    std::cout << "catch" << std::endl;
    ep = std::current_exception(); // 処理�の例外ポインタを取得
  }

  if (ep) {
    std::cout << "rethrow" << std::endl;
    std::rethrow_exception(ep); // 再ス�ー
  }
}
```
* std::rethrow_exception[color ff0000]
* std::exception_ptr[link exception_ptr.md]
* std::runtime_error[link /reference/stdexcept.md]
* std::current_exception()[link current_exception.md]

### 出力例
```
catch
rethrow

This application has requested the Runtime to terminate it in an unusual way.
Please contact the application's support team for more information.
terminate called after throwing an instance of 'std::runtime_error'
  what():  error!
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015


## 参照
- [N2179 Language Support for Transporting Exceptions between Threads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2179.html)


