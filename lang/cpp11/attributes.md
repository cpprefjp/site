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


### <a name="noreturn" href="#noreturn">`[[noreturn]]`属性</a>
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


### <a name="carries_dependency" href="#carries_dependency">`[[carries_dependency]]`属性</a>
`[[carries_dependency]]`は、並行プログラミングのアトミック操作において、値に依存した順序付け [`memory_order_consume`](/reference/atomic/memory_order.md)を、関数をまたいで伝搬することを明示するための属性である。

以下は、[`memory_order_consume`](/reference/atomic/memory_order.md)を使用した順序付けの例である：

```cpp
atomic<T> x = …;
T* r1 = x.load(memory_order_consume);

// 以下のコードはr1の値に依存しているため、実行順序が保証される
if (r1) {
  T r2 = *r1 + 1;
  T r3 = r2 + 1;
}
```
* atomic[link /reference/atomic/atomic.md]
* x.load[link /reference/atomic/atomic/load.md]
* memory_order_consume[link /reference/atomic/memory_order.md]

ここでは、`r1`に関連する操作が全て同一関数内で行われているが、一部の操作が別の関数になっていると、別の関数になった操作に値の依存があるかどうか・依存として扱ってよいのかどうかがコンパイラに判断できない可能性がある。そのような状況で、関数のパラメータおよび戻り値のそれぞれが値の依存性を伝搬させることを明示するために`[[carries_dependency]]`属性を使用する。


####関数の戻り値で値の依存性を伝搬させる
関数の戻り値に対して値の依存性を持たせる場合、関数に対して`[[carries_dependency]]`属性を付加する。

```cpp
atomic<T> x = …;
[[carries_dependency]] T* f()
{
  return x.load(memory_order_consume);
}

T* r1 = f();
if (r1) {
  T r2 = *r1 + 1;
  T r3 = r2 + 1;
}
```
* atomic[link /reference/atomic/atomic.md]
* x.load[link /reference/atomic/atomic/load.md]
* memory_order_consume[link /reference/atomic/memory_order.md]


####関数のパラメータで値の依存性を伝搬させる
関数のパラメータに対して値の依存性を持たせる場合、各パラメータ名のうしろに`[[carries_dependency]]`属性を付加する。

```cpp
void f(T* r1 [[carries_dependency]])
{
  T r2 = *r1 + 1;
  T r3 = r2 + 1;
}

void g(T* r1 [[carries_dependency]])
{
  // …
}

atomic<T> x = …;
T* r1 = x.load(memory_order_consume);

// 関数f()と関数g()の呼び出し、およびその関数内の操作が、
// r1に依存した操作であるとして実行順序が保証される
if (r1)
  f(r1);
else
  g(r2);
```
* atomic[link /reference/atomic/atomic.md]
* x.load[link /reference/atomic/atomic/load.md]
* memory_order_consume[link /reference/atomic/memory_order.md]


`[[carries_dependency]]`属性を付けて宣言した関数がほかの翻訳単位で`[[carries_dependency]]`属性を付けずに宣言された場合、プログラムは不適格となる。

`[[carries_dependency]]`の反対に、値の依存性を断ち切る[`kill_dependency()`](/reference/atomic/kill_dependency.md)関数も定義されている。


##関連項目
- [C++14 `[[deprecated]]`属性](/lang/cpp14/deprecated_attr.md)


##参照
- [N2236 Towards support for attributes in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2236.pdf)
- [N2379 Towards support for attributes in C++ (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2379.pdf)
- [N2418 Towards support for attributes in C++ (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2418.pdf)
- [N2643 C++ Data-Dependency Ordering: Function Annotation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2643.html)
- [（抄訳）N4215 `memory_order_consume`の利用と実装に向けて［§5-6のみ］](http://d.hatena.ne.jp/yohhoy/20141115/p1)

