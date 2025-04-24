# 属性構文 [N2761]
* cpp11[meta cpp]

<!-- start lang caution -->

このページはC++11に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
属性(attributes)は、ソースコードに対して追加の情報をコンパイラに伝えるための構文である。

属性は`[[attr]]`のように、属性のリストを二重角カッコで囲んで指定する。C++11時点の標準では、以下の2つの属性を定義する：

1. `[[noreturn]]` : 関数が決して返らないことをコンパイラに伝える
2. `[[carries_dependency]]` : データの依存性を持たせる or 維持する (C++26で削除)


## 仕様
- 属性はクラス、変数、関数、パラメータ、列挙型、型の別名などあらゆる場所に指定できるが、指定できる場所は属性ごとに異なる。ここでは属性構文をどこに適用できるかは列挙せず、各属性がどこに指定できるかを以下の節で示す。
- ユーザーは任意の属性を定義できない。属性の定義は、標準およびベンダーが行う。


### <a id="noreturn" href="#noreturn">`[[noreturn]]`属性</a>
`[[noreturn]]`は、関数が決して返らないことを示すための属性である。

この属性を指定することで、「関数が返らない」という情報を使用してコンパイラが任意の最適化を行える。また、返らない処理をラップした関数に`[[noreturn]]`属性を付けることで、「関数が返らないパスが存在する」というコンパイラからの警告を抑制するためにも使用できる：

```cpp example
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


### <a id="carries_dependency" href="#carries_dependency">`[[carries_dependency]]`属性</a>
この属性はC++26で削除された。

[`memory_order_consume`](/reference/atomic/memory_order.md)順序付けを実装したC++処理系は存在せず、本属性の代替機能も提供されない。

`[[carries_dependency]]`は、並行プログラミングのアトミック操作において、値に依存した順序付け [`memory_order`](/reference/atomic/memory_order.md)を、関数をまたいで伝播することを明示するための属性である。

以下は、[`memory_order_consume`](/reference/atomic/memory_order.md)を使用した順序付けの例である：

```cpp
atomic<T*> x = …;
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

ここでは、`r1`に関連する操作が全て同一関数内で行われているが、一部の操作が別の関数になっていると、別の関数になった操作に値の依存があるかどうか・依存として扱ってよいのかどうかがコンパイラに判断できない可能性がある。そのような状況で、関数のパラメータおよび戻り値のそれぞれが値の依存性を伝播させることを明示するために`[[carries_dependency]]`属性を使用する。


#### 関数の戻り値で値の依存性を伝播させる
関数の戻り値に対して値の依存性を持たせる場合、関数に対して`[[carries_dependency]]`属性を付加する。

```cpp
atomic<T*> x = …;
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


#### 関数のパラメータで値の依存性を伝播させる
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

atomic<T*> x = …;
T* r1 = x.load(memory_order_consume);

// 関数f()と関数g()の呼び出し、およびその関数内の操作が、
// r1に依存した操作であるとして実行順序が保証される
if (r1)
  f(r1);
else
  g(r1);
```
* atomic[link /reference/atomic/atomic.md]
* x.load[link /reference/atomic/atomic/load.md]
* memory_order_consume[link /reference/atomic/memory_order.md]


`[[carries_dependency]]`属性を付けて宣言した関数がほかの翻訳単位で`[[carries_dependency]]`属性を付けずに宣言された場合、プログラムは不適格となる。

`[[carries_dependency]]`の反対に、値の依存性を断ち切る[`kill_dependency()`](/reference/atomic/kill_dependency.md)関数も定義されている。


## この機能が必要になった背景・経緯
属性構文はこれまで各ベンダーが独自の構文でサポートしていた。GNUでは`__attribute__(())`、Microsoftでは`__declspec()`という構文を使用していた。

コンパイラに対してヒントを与える属性構文の必要性が標準C++に認識されたために、統一的な構文を標準で定義することとなった。

C++11で採用されたもの以外で検討された以下の機能は、属性ではなく言語の構文としてサポートされた：

- アライメントを指定する`align`属性
    - アライメントを指定する[`alignas`](alignas.md)、アライメントを取得する[`alignof`](alignof.md)機能として導入された
- 変数にスレッドローカルストレージを使用することを指示する`thread_local`属性
    - 記憶指定子[`thread_local`](thread_local_storage.md)として導入された
- これ以上継承しない、これ以上オーバーライドしないことを明示する`final`属性
    - 文脈依存キーワード[`final`](override_final.md)として導入された

以下の属性は、C++11時点では採用されていない：

- 関数が同じ引数に対して同じ戻り値を返すことを明示する`pure`属性
- `if`文や`switch`文の`case`に指定する条件式のヒット率が高いことを指示する`probably`属性
- 関数が非推奨であることを指示する`deprecated`属性
- 基底クラスによって関数を隠蔽しないことを明示する`not_hiding`属性
- ポインタの所有者(解放する責任を持つユーザー)であることを明示する`owner`属性


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++14 `[[deprecated]]`属性](/lang/cpp14/deprecated_attr.md)
- [C++17 `[[maybe_unused]]`属性](/lang/cpp17/maybe_unused.md)
- [C++17 `[[nodiscard]]`属性](/lang/cpp17/nodiscard.md)
    - [C++20 `[[nodiscard]]`属性に理由となる文字列を付加できるようにする](/lang/cpp20/nodiscard_should_have_a_reason.md)
    - [C++20 `[[nodiscard]]`をコンストラクタのオーバーロードごとに付加できるようにする](/lang/cpp20/nodiscard_for_constructors.md)
- [C++17 `[[fallthrough]]`属性](/lang/cpp17/fallthrough.md)
- [C++20 `[[no_unique_address]]`属性](/lang/cpp20/language_support_for_empty_objects.md)
- [C++20 `[[likely]]`, `[[unlikely]]`属性](/lang/cpp20/likely_and_unlikely_attributes.md)
- [C++20 属性の名前空間を予約](/lang/cpp20/reserving_attribute_namespaces_for_future_use.md)
- [C++23 ラムダ式に対する属性](/lang/cpp23/attributes_on_lambda_expressions.md)
- [C++26 構造化束縛への属性を許可](/lang/cpp26/attributes_for_structured_bindings.md)
- [C++26 未初期化変数の読み取りをエラー性動作とする (`[[indeterminate]]`属性)](/lang/cpp26/erroneous_behavior_for_uninitialized_reads.md)


## 参照
- [N2236 Towards support for attributes in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2236.pdf)
- [N2379 Towards support for attributes in C++ (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2379.pdf)
- [N2418 Towards support for attributes in C++ (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2418.pdf)
- [N2643 C++ Data-Dependency Ordering: Function Annotation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2643.html)
- [N2761 Towards support for attributes in C++ (Revision 6) ](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2761.pdf)
- [P3475R2 Defang and deprecate memory_order::consume](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3475r2.pdf)
    - C++26で`memory_order::consume`非推奨化に伴い`carries_dependency`属性を削除。
- [（抄訳）N4215 `memory_order_consume`の利用と実装に向けて［§5-6のみ］](http://d.hatena.ne.jp/yohhoy/20141115/p1)
