# uncaught_exception
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
namespace std {
  bool uncaught_exception() throw();  // C++03
  bool uncaught_exception() noexcept; // C++11
}
```

この機能はC++17から非推奨となり、C++20で削除された。代わりに[`std::uncaught_exceptions()`](/reference/exception/uncaught_exceptions.md)を使用すること。

## 概要
キャッチされていない例外があるかどうかを判定する。


## 戻り値
例外オブジェクトが生成され、送出されてからキャッチするまでの間に`true`を返す。

また、明示的に[`terminate()`](/reference/exception/terminate.md)を呼び出し、実際に呼び出されるまでの間に`true`を返す。

具体的には、`try`ブロック中で作られたオブジェクトのデストラクタや、スタック巻き戻し(unwind)中のデストラクタ、[`terminate()`](/reference/exception/terminate.md)の場合は生存している全てのオブジェクトのデストラクタで`true`になる。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <exception>

struct X {
  ~X()
  {
    bool has_uncaught = std::uncaught_exception();
    std::cout << std::boolalpha << has_uncaught << std::endl;
  }
};

int main()
{
  try {
    X x;
    throw std::exception();
  }
  catch (std::exception& e) {
    std::cout << "catch" << std::endl;
  }
}
```
* std::uncaught_exception[color ff0000]
* std::exception[link exception.md]

### 出力
```
true
catch
```

## 参照
- [GotW #47 Uncaught Exceptions](http://www.gotw.ca/gotw/047.htm)
- [CWG Issue 475. When is `std::uncaught_exception()` true? (take 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#475)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
