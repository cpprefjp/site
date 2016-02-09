#テンプレートの右山カッコ
* cpp11[meta cpp]

##概要
C++03では、2つ以上連続する右山カッコが出現する場合には、間にスペースを入力する必要があった：

```cpp
vector<basic_string<char> >; // OK
vector<basic_string<char>>;  // コンパイルエラー : >>は右シフト演算子と見なされる
```
* vector[link /reference/vector.md]
* basic_string[link /reference/string/basic_string.md]

C++11からは、`vector<basic_string<char>>`のように、2つ以上連続する右山カッコの間に、スペースを入力する必要がなくなった。


##仕様
左山カッコがアクティブな場合(対応する右山カッコがまだ現れていない場合)、丸カッコ内を除いて、`>>`は右シフト演算子ではなく2つの連続する右山カッコとして扱われる。

```cpp
A<(X>Y)> a; // 最初の>トークンは丸カッコ内に現れるので、
            // 右山カッコとしては扱われない。
            // 左の山カッコがアクティブで、非丸カッコ内に
            // 最も近しい右山カッコがないため、
            // 2つ目の>トークンは右山カッコと見なされる。

A<X>Y> b;   // コンパイルエラー
            // 1つ目の>トークンが右山カッコとして見なされ、
            // 2つ目の>トークンがoperator>()と見なされる。
```

ただしこの仕様により、C++03までの以下のようなプログラムの動作が変更となる：

```cpp
#include <iostream>

template<int I> struct X {
  static int const c = 2;
};
template<> struct X<0> {
  typedef int c;
};
template<typename T> struct Y {
  static int const c = 3;
};
static int const c = 4;
int main() {
  std::cout << (Y<X<1> >::c >::c>::c) << '\n';
  std::cout << (Y<X< 1>>::c >::c>::c) << '\n';
}
```
* std::cout[link /reference/iostream/cout.md]

C++03での出力：

```
0
3
```

C++11での出力：

```
0
0
```


##例
```cpp
#include <vector>
#include <string>

int main()
{
  using StringVector = std::vector<std::basic_string<char>>; // OK

  std::basic_string<char> str = "hello";
  static_cast<const std::basic_string<char>>(str); // OK
}
```
* std::vector[link /reference/vector.md]
* std::basic_string[link /reference/string/basic_string.md]


##この機能が必要になった背景・経緯
C++03までは構文解析の都合で、テンプレートの右山カッコが不等号やシフト記号と曖昧になっていた。そのためにテンプレートの右山カッコを明示する際には、2つの連続する右山カッコの間にスペースを必要とした。

これは小さな問題ではあるが、永続的で迷惑な問題であったために、この問題を除去する価値があると判断され、GNUやEDGといったコンパイラベンダーによるいくつかの実験を経て、標準C++に、連続する右山カッコに関するルールが追加されることとなった。


##検討されたほかの選択肢
C++11で採択された方式は、テンプレートの型パラメータと非型パラメータどちらにも対応するものだったが、それ以外の方式も提案された。

ひとつは、テンプレートの型パラメータのみを構文解析で特別扱いし、非型テンプレートパラメータをそのままとするもの。これによって、`A<B<int>>`は合法だが、`C<D<12>>`は不適格となる。

もうひとつは、2つの連続した`>`トークンの問題を完全に除去するために、シフト演算子の構文もまた`> >`のように間にスペースを入れるよう許可すること。`int i = 10000 > > x;`。このアプローチは新たな曖昧さは導入しないが、プリプロセッサの`##`(トークン連結)において後方互換性の問題を発生させる。

こういった、現在の方式と合わせて3つが検討された。現在の方式によって意味が変わるプログラムは使われている可能性が低かったこともあり、現在の方式が採用された。


##参照
- [N1649 Right Angle Brackets](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1649.html)
- [N1699 Right Angle Brackets (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1699.html)
- [N1757 Right Angle Brackets (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1757.html)

