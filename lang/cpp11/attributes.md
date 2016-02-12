#属性構文
* cpp11[meta cpp]

##概要
属性(attributes)は、ソースコードに対して追加の情報をコンパイラに伝えるための構文である。

属性は`[[attr]]`のように、属性のリストを二重角カッコで囲んで指定する。C++11時点の標準では、以下の2つの属性を定義する：

1. `[[noreturn]]` : 関数が決して返らないことをコンパイラに伝える
2. `[[carries_dependency]]` : データの依存性を持たせる or 維持する


##仕様
- 属性はクラス、変数、関数、パラメータ、列挙型、型の別名などあらゆる場所に指定できるが、指定できる場所は属性ごとに異なる。ここでは属性構文をどこに適用できるかは列挙せず、各属性がどこに指定できるかを以下の節で示す。
- ユーザーは任意の属性を定義できない。属性の定義は、標準およびベンダーが行う。


###`[[noreturn]]`属性
`[[noreturn]]`は、関数が決して返らないことを示すための属性である。

この属性を指定することで、「関数が返らない」という情報を使用してコンパイラが任意の最適化を行える。また、返らない処理をラップした関数に`[[noreturn]]`属性を付けることで、「関数が返らないパスが存在する」というコンパイラからの警告を抑制するためにも使用できる：

```cpp
#include <stdexcept>

[[noreturn]] void report_error()
{
  throw std::runtime_error("error");
}

int f(int x)
{
  if (x > 0) {
    return x;
  }
  report_error();
}

int main()
{
  f(1);
}
```

このプログラムにおいて、関数`f()`は条件によってエラーを出力する。関数`f()`で直接例外を送出するような場合にはコンパイラは警告を出力しないが、例外送出をラップした`report_error()`のような関数を定義して呼び出す場合、コンパイラはその関数が返らないことを認識できない。そのため、`report_error()`の後ろに決して実行されることのない`return`文を書かない限り、コンパイラは「このパスに`return`文が書かれていない」という警告を出力する。

そのような状況で、例外送出や[`std::exit()`](/reference/cstdlib/exit.md)、[`std::abort()`](/reference/cstdlib/abort.md)の呼び出しをラップした関数に`[[noreturn]]`を付けることで、そのようなコンパイラの警告を抑制できる。

`[[noreturn]]`属性を付けて宣言した関数がほかの翻訳単位で`[[noreturn]]`属性を付けずに宣言された場合、プログラムは不適格となる。

`[[noreturn]]`属性を付けた関数が返った場合、その動作は未定義。


###`[[carries_dependency]]`属性
(執筆中)


##関連項目
- [C++14 `[[deprecated]]`属性](/lang/cpp14/deprecated_attr.md)


##参照
- [N2236 Towards support for attributes in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2236.pdf)
- [N2379 Towards support for attributes in C++ (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2379.pdf)
- [N2418 Towards support for attributes in C++ (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2418.pdf)
- [N2643 C++ Data-Dependency Ordering: Function Annotation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2643.html)
- [（抄訳）N4215 `memory_order_consume`の利用と実装に向けて［§5-6のみ］](http://d.hatena.ne.jp/yohhoy/20141115/p1)

