#tie
```cpp
namespace std {
  template<class... Types>
  tuple<Types&...> tie(Types&...) noexcept;
}
```
* tuple[link /reference/tuple/tuple.md]

##概要

<b>パラメータの参照からなる[tuple](/reference/tuple/tuple.md)を生成する。</b>
<b></b>
<b>本関数は、[tuple](/reference/tuple/tuple.md)のオブジェクトから要素をまとめて取り出すために使用することができる。</b>
<b>その際、引数として[ignore](/reference/tuple/tuple/ignore.md)を使用することで、一部の要素を取り出さず、無視することができる。</b>


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
* tie(a, b, c);[color ff0000]
* tie[color ff0000]
* tie[color ff0000]

###出力

```cpp
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

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 9.0, 10.0



##参照

[std::ignore](/reference/tuple/tuple/ignore.md)


