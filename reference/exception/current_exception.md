# current_exception
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  exception_ptr current_exception() noexcept;
}
```
* exception_ptr[link exception_ptr.md]

## 概要
現在処理中の例外オブジェクトを指す[`exception_ptr`](exception_ptr.md)を取得する。


## 戻り値
- 現在処理中の例外オブジェクトを指す[`exception_ptr`](exception_ptr.md)を返す
- 処理中の例外オブジェクトがない場合は、ヌルを指す[`exception_ptr`](exception_ptr.md)を返す
- この関数がメモリ確保する必要があり、それに失敗した場合、[`bad_alloc`](/reference/new/bad_alloc.md)オブジェクトを指す[`exception_ptr`](exception_ptr.md)を返す
- この関数を2回以上呼び出した場合に、同じオブジェクトを指す[`exception_ptr`](exception_ptr.md)が返るとは限らない。(呼び出しのたびに例外オブジェクトを作る可能性がある)
- 例外オブジェクトをコピーする際に例外が送出された場合、送出された例外オブジェクトを指す[`exception_ptr`](exception_ptr.md)を返す
    - ただし、無限再帰を回避するために、[`bad_exception`](bad_exception.md)オブジェクトを指す[`exception_ptr`](exception_ptr.md)を返すことが実装に許可される


## 例外
投げない


## 備考
この関数は、`catch`節で使用すれば、処理中の例外オブジェクトへの例外ポインタを取得できる。

ただし、例外送出によるスタック巻き戻し中は、取得できないので注意。(スタック巻き戻し中とは、`try`ブロック中で定義されたオブジェクトのデストラクタのこと)


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
    ep = std::current_exception(); // 処理中の例外ポインタを取得
  }

  if (ep) {
    std::cout << "rethrow" << std::endl;
    std::rethrow_exception(ep); // 再スロー
  }
}
```
* std::current_exception[color ff0000]
* std::exception_ptr[link exception_ptr.md]
* std::runtime_error[link /reference/stdexcept.md]
* std::rethrow_exception[link rethrow_exception.md]

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
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015


## 参照
- [N2179 Language Support for Transporting Exceptions between Threads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2179.html)
- [Can I use `std::current_exception` during stack unwinding? - StackOverflow](http://stackoverflow.com/questions/28267484/can-i-use-stdcurrent-exception-during-stack-unwinding)

