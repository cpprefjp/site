# 非推奨だった`bool`型に対するインクリメント演算子を削除
* cpp17[meta cpp]

## 概要

C++17ではbool型に対する前置および後置の`operator ++`を削除する。

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

ここで、前置の`operator ++`は、以下のように置き換えられる：

```cpp
int main()
{
  bool b = false;
  b = true; // => true
  b = true; // => true
}
```

一方後置の`operator ++`を使う次のようなコードは、以下のようにC++14で標準ライブラリに導入された[`std::exchange()`](/reference/utility/exchange.md)を利用して書き換えることができる。

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
* std::exchange[link /reference/utility/exchange.md]


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
