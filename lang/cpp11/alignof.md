#alignof
* cpp11[meta cpp]

##概要
`alignof()`は、指定した型がメモリ上のどの位置に配置されるか（アライメント）取得する演算子である。

`sizeof()`と異なり`alignof()` は変数には使用できない。

例えば型intが4バイト境界の位置にアライメントされるシステムであれば、`alignof(int)`は4を返す。


##仕様
- `alignof(型)`は、指定した型のアライメントのサイズを返す。戻り値の型は`std::size_t`である。

もっとも制約の弱い、すなわちアラインメントのサイズが最小となる型は`char`, `signed char`, `unsigned char`であり、
もっとも制約の強い、すなわちアラインメントのサイズが最大となる型は[`std::max_align_t`][max_align_t]である。

[max_align_t]: /reference/cstddef/max_align_t.md


##例
```cpp
#include <cstddef>
#include <iostream>

struct hoge {
  char c[63];
  short s;
  double i;
};

struct empty {
  char c[63];
  short s;
  double i;
};

int main()
{
  std::cout <<
    "std::max_align_t:  " << alignof(std::max_align_t) << std::endl <<
    "char:              " << alignof(char) << std::endl <<
    "int:               " << alignof(int) << std::endl <<
    "double:            " << alignof(double) << std::endl <<
    "struct hoge:       " << alignof(hoge) << std::endl <<
    "struct empty:      " << alignof(empty) << std::endl <<
    "char *:            " << alignof(char *) << std::endl;

  return 0;
}
```
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]
* std::max_align_t[link /reference/cstddef/max_align_t.md]

###出力
x86向けLinux上で実行した場合。

```
std::max_align_t:  8
char:              1
int:               4
double:            8
struct hoge:       4
struct empty:      4
char *:            4
```


##この機能が必要になった背景・経緯
C++03で型のアライメントサイズを得るにはコンパイラの拡張機能を利用するしかなく、コンパイラごとに異なる記述を行う必要があったが、C++11ではどのコンパイラでも同じ記述でアライメントサイズが取得できる。


##検討されたほかの選択肢
N2341 からはわからない、恐らくないと思われる。


##関連項目
- [`alignas`](/lang/cpp11/alignas.md)
- [`std::max_align_t`](/reference/cstddef/max_align_t.md)


##参照
- [N2341 Adding Alignment Support to the C++ Programming Language / Wording](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2341.pdf)

