#tie
* tuple[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class... Types>
  tuple<Types&...> tie(Types&...) noexcept;           // C++11

  template <class... Types>
  constexpr tuple<Types&...> tie(Types&...) noexcept; // C++14
}
```
* tuple[link /reference/tuple/tuple.md]

##概要
パラメータの参照からなる[`tuple`](../tuple.md)を生成する。 

本関数は、[`tuple`](../tuple.md)のオブジェクトから要素をまとめて取り出すために使用することができる。

その際、引数として[`ignore`](./ignore.md)を使用することで、一部の要素を取り出さず、無視することができる。


##戻り値
パラメータの参照からなる`tuple`オブジェクト。


##例外
投げない


##例
```cpp
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  // 変数への参照を持つtupleを作る
  {
    int a = 1;
    char b = 'a';
    std::string c = "Hello";

    std::tuple<int&, char&, std::string&> t = std::tie(a, b, c);
  }

  // タプルから要素をまとめて取り出す
  {
    std::tuple<int, char, std::string> t(1, 'a', "Hello");

    int a = 0;
    char b = 0;
    std::string c;
    std::tie(a, b, c) = t;

    std::cout << a << std::endl;
    std::cout << b << std::endl;
    std::cout << c << std::endl;
  }
  std::cout << std::endl;
  // タプルから要素をまとめて取り出し、一部要素を無視する
  {
    std::tuple<int, char, std::string> t(1, 'a', "Hello");

    int a = 0;
    std::string c;
    std::tie(a, std::ignore, c) = t; // 'a'は無視して1と"Hello"だけ取り出す

    std::cout << a << std::endl;
    std::cout << c << std::endl;
  }
}
```
* tie[color ff0000]

###出力
```
1
a
Hello

1
Hello
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 9.0, 10.0


##関連項目
- [`std::ignore`](./ignore.md)


##参照
- [LWG2301 Why is std::tie not constexpr?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-active.html#2301)

