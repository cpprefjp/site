# rethrow_exception
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
[[noreturn]] void rethrow_exception(exception_ptr p);
```
* exception_ptr[link exception_ptr.md]

## 概要
`exception_ptr`が指す例外オブジェクトを再スローする。


## 事前条件
`p`がヌルを指す`exception_ptr`ではないこと。


## 効果
説明用の変数`u`を、`p`が指す例外オブジェクトもしくはそのコピーとする。
コピーが行われるか否か、コピー時にメモリ確保が行われるか否かは未規定とされる。

- `u`用のメモリ確保に失敗した場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外がスローされる。
- そうでなければ、`p`が指す例外オブジェクトから`u`へのコピー時に例外スローされた場合、その例外がスローされる。
- そうでなければ、`throw u;`


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
    ep = std::current_exception(); // 処理中の例外ポインタを取得
  }

  if (ep) {
    std::cout << "rethrow" << std::endl;
    std::rethrow_exception(ep); // 再スロー
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
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [N2179 Language Support for Transporting Exceptions between Threads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2179.html)
- [P1675R2 `rethrow_exception` must be allowed to copy](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1675r2.pdf)
    - 既存C++コンパイラの挙動にあわせて効果(Effects)文面を修正。
