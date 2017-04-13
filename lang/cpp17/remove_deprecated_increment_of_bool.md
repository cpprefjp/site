# 非推奨だったoperator++(bool)の除去

* cpp17removed[meta cpp]

<!-- markdownlint-disable MD004 MD009 MD031 MD032 MD040 -->

## 概要

C++17ではbool型に対する前置および後置の`operator ++`を除去する。

bool型に対する前置および後置の`operator ++`とはC++98の時点で非推奨になっていた機能である。

具体的にどのような働きをするのかというと、以下のように値をtrueに書き換える機能をもつ。

```cpp

int main()
{
    bool b = false;
    ++b; // => true
    ++b; // => true
}
```

ここで、前置の`operator ++`は

```cpp

int main()
{
    bool b = false;
    b = true; // => true
    b = true; // => true
}
```

のように書き換えられる。

一方後置の`operator ++`を使う次のようなコードは

```cpp
#include <iostream>
void f(bool b)
{
    std::cout << ((b) ? "true" : "false") << std::endl;
}
int main()
{
    bool b = false;
    // 関数fには変数bの現在の値であるfalseの値が渡される
    f(b++); // => false
    std::cout << ((b) ? "true" : "false") << std::endl; // => true
}
```

```cpp
#include <iostream>
#include <utility>
void f(bool b)
{
    std::cout << ((b) ? "true" : "false") << std::endl;
}
int main()
{
    bool b = false;
    f(std::exchange(b, true)); // => false
    std::cout << ((b) ? "true" : "false") << std::endl; // => true
}
```

のようにC++14で標準ライブラリに導入された[`std::exchange()`](/reference/utility/exchange.md)を利用して書き換えることができる。

## 仕様

これまで、`opeartor ++`の定義は、bool型のときはtrueに変更する、`opeartor --`の定義はbool型を除く、というように例外規定されていた(§ 5.2.6 / § 5.3.2)。  
C++17ではこれらが削除され、`opeartor ++`の定義(§ 5.2.6 / § 5.3.2)に、bool型を除く、という例外規定が追加された。

前置の`operator ++`と`operator +=`の呼び出し(例えば`++a`と`a+=1`)が等価にならない例に、bool型の場合、という文面があったが、C++17で削除された(§ 5)。

また、組み込みのoperatorのリストの`operator ++`に関する文面に、bool型を除く、という例外規定が追加された(§ 13.6)。

## 関連項目

- [`std::exchange()`](/reference/utility/exchange.md)

## 参照

- [P0002R1: Remove Deprecated operator++(bool)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0002r1.html)
- [P0002R0: Remove Deprecated operator++(bool)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0002r0.html)
- [Core issue 1653: Removing deprecated increment of bool](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4192.html#1653)
- [N3668: exchange() utility function, revision 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3668)
