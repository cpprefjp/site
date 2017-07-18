# 非推奨だった bool 型に対するインクリメント演算子を削除
* cpp17[meta cpp]

## 概要

C++17では`bool`型に対する前置および後置の`operator ++`を削除する。

`bool`型に対する前置および後置の`operator ++`とはC++98の時点で非推奨になっていた機能である。

具体的にどのような働きをするのかというと、以下のように値を`true`に書き換える機能をもつ。

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

これまで、`opeartor ++`の定義は、`bool`型のときは`true`に変更する、`opeartor --`の定義は`bool`型を除く、というように例外規定されていた(§ 8.2.6 expr.post.incr / § 8.3.2 expr.pre.incr)。  
C++17ではこれらが削除され、`opeartor ++`の定義(§ 8.2.6 expr.post.incr / § 8.3.2 expr.pre.incr)に、`bool`型を除く、という例外規定が追加された。

前置の`operator ++`と`operator +=`の呼び出し(例えば`++a`と`a+=1`)が等価にならない例に、`bool`型の場合、という文面があったが、C++17で削除された(§ 8 expr)。

また、組み込みのoperatorのリストの`operator ++`に関する文面に、`bool`型を除く、という例外規定が追加された(§ 16.6 over.built)。

## この機能を削除するに至った背景・経緯

この項は**十分な出典が存在せず推測でしかない**ことに注意して読み進めてほしい。

もともとC++の前身であるC言語(ANSI C89)には`bool`型は存在しなかった。そのために、真理値を`int`型で代用する例が見られた。

```c
int main(void)
{
  int flag = 0;
  /* do something */
  if(flag){
    /* do something when flag is true*/
  }
  return 0;
}
```

つまり、非0を`true`、0を`false`として扱う。ここで次のようなコードを見てみよう。

```cpp
#include <iostream>
#include <vector>
int main()
{
  std::vector<int> v{};
  //append elements to v
  int flag = 0;
  for(auto&& i : v){
    if(flag++) std::cout << ',';
    std::cout << i << std::endl;
  }
}
```

これは、最初の要素以外のときは`,`という文字を要素の出力の前に行うことを期待している。しかし期待通りには動かない。  
`flag`が`int`型の最大値になったときif文の条件評価が行われることを考えよう。`flag`のインクリメントはオーバーフローするので未定義動作になるが、殆どの環境で2の補数表現を使っているため、`int`型の最小値になる。すると、`flag`の値が再び0まで加算された際にカンマが出力されない。

これに起因するバグで少なくとも6つの過度の放射線被曝事故を引き起こし、3人が死亡した例がある。  
Therac-25はカナダ原子力公社(AECL)とフランスCGR-MeV社によって開発・製造された放射線療法機器である。  
この装置のソフトウェアのバグの一つに、条件変数を非0にする(=`true`にする)ために、インクリメントを使っていたというものがあった。  
条件変数はC++でいえば[`std::uint8_t`](/reference/cstdint/uint8_t.md)型で、つまり256回に1度オーバーフローを起こして値が0になるために、`false`として扱われた。  
この結果ほかの条件変数の状態によっては25MeVという通常の100倍のβ線が射出されることがあった。

こうした事故を防ぐためなのかは不明だが、C++の`bool`型はインクリメントした際、常に`true`になるように定められていた。  
しかし、そもそも上記のバグを防ぐには、インクリメントではなく単に固定値を代入するようにするべきであり、C++98の時点でdeprecatedになっていたと思われる。

C++14で`std::exchange()`が導入されたことにより、唯一使いみちのあった後置の`operator++`の必要性もなくなり、C++17で削除されたと推測される。


## 関連項目

- [`std::exchange()`](/reference/utility/exchange.md)


## 参照

- [P0002R1: Remove Deprecated operator++(bool)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0002r1.html)
- [P0002R0: Remove Deprecated operator++(bool)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0002r0.html)
- [Core issue 1653: Removing deprecated increment of bool](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4192.html#1653)
- [N3668: exchange() utility function, revision 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3668)
- [history - Why does the boolean type in C++ support ++ but not --? - Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/questions/230928/why-does-the-boolean-type-in-c-support-but-not)
- [An Investigation of Therac-25 Accidents - I](http://courses.cs.vt.edu/professionalism/Therac_25/Therac_1.html)
- [Therac-25 - III](http://courses.cs.vt.edu/professionalism/Therac_25/Therac_3.html)
- [Therac-25 - Wikipedia](https://en.wikipedia.org/wiki/Therac-25)
