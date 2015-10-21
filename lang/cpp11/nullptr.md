#nullptr
* cpp11[meta cpp]

##概要
`nullptr`は、ヌルポインタ値を表すキーワードである。

```cpp
int* p = nullptr;
```

C++03まで、ヌルポインタを表すために`0`数値リテラルや[`NULL`](/reference/cstddef/null.md)マクロを使用していた。C++11からは、`nullptr`キーワードでヌルポインタ値を表すことを推奨する。

特定の型へのポインタではなく、`nullptr`のみを受け取りたい場合は、[`std::nullptr_t`][nullptr_t]型を使用する。

[nullptr_t]: /reference/cstddef/nullptr_t.md


##仕様
- `nullptr`キーワードは、[`nullptr_t`][nullptr_t]型の右辺値オブジェクトである。
- [`nullptr_t`][nullptr_t]型の値は、ヌルポインタを表す定数である。

###型の分類

- `nullptr`は[スカラ型](/reference/type_traits/is_scalar.md)である。

###型変換

- [`nullptr_t`][nullptr_t]型は、任意の型へのポインタ、任意のメンバ型へのポインタに変換できる。
- `sizeof(`[`nullptr_t`][nullptr_t]`)`の値は、`sizeof(void*)`と等値である。
- [`nullptr_t`][nullptr_t]型の右辺値は`bool`型の右辺値に変換でき、その結果値は`false`となる。
- [`nullptr_t`][nullptr_t]型の値は整数型に`reinterpret_cast`でキャストできる。その結果は、`(void*)0`を整数型に変換することと同じとなる。
- `reinterpret_cast`のキャスト先の型に[`nullptr_t`][nullptr_t]を指定することはできない。

###比較演算
[`nullptr_t`][nullptr_t]型は、以下の関係演算が可能である：

- `bool operator==(nullptr_t, nullptr_t);`
- `bool operator!=(nullptr_t, nullptr_t);`
- `bool operator<(nullptr_t, nullptr_t);`
- `bool operator<=(nullptr_t, nullptr_t);`
- `bool operator>(nullptr_t, nullptr_t);`
- `bool operator>=(nullptr_t, nullptr_t);`

2つの[`nullptr_t`][nullptr_t]型を比較した場合、`==`、`<=`、`>=`演算子の結果は`true`となり、それ以外の演算子は`false`となる。


##この機能が必要になった背景・経緯
以下のような関数テンプレートを考える：

```cpp
template <class T>
void f(T p);
```

この関数にヌルポインタ値を渡したい場合、`0`や`NULL`マクロを使用すると、テンプレートの型推論によって整数型と見なされてしまっていた。これによって、引数をほかの関数に転送するプログラムを書く際に型が合わない問題が発生した。

この問題を回避するために、以下のようなヌルポインタ値を取得する関数がユーザーによって書かれていた：

```cpp
template <class T>
T* nullptr_value()
{
  return 0;
}

int* p = nullptr_value<int>();
```

これはユーザーの工夫によって問題を解決しているが、このような状況をより簡単に解決し、C++を教え、学ぶのをより容易にするために、`nullptr`キーワードが導入された。


##検討されたほかの選択肢
`nullptr`はキーワードとして定義されることが決まる前に、いくつかの設計選択があった。

以下のような、任意のポインタ型に変換可能なクラスとして定義することが提案された：

```cpp
const
class {
public:
  // 任意のポインタ型への変換演算子
  template <class T>
  operator T*() const
  { return 0; }

  // 任意のメンバポインタ型への変換演算子
  template<class C, class T>
  operator T C::*() const
  { return 0; }

private:
 void operator&() const; // アドレスは取得できない
} nullptr = {};
```

これは言語機能ではなくライブラリで解決する案である。この案の問題としては、`nullptr`オブジェクトを使用する前に、ヘッダをインクルードしなければならない、というものがある。ヌルポインタ値は多くの一般的な状況で必要になるため、ヘッダをインクルードしない選択肢として、キーワードの`nullptr`が採用された。


##関連項目
- [`NULL`](/reference/cstddef/null.md)
- [`nullptr_t`](/reference/cstddef/nullptr_t.md)


##参照
- [N1488 A name for the null pointer: `nullptr`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1488.pdf)
- [N1601 A name for the null pointer: `nullptr` (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1601.pdf)
- [N2214 A name for the null pointer: `nullptr` (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2214.pdf)
- [N2431 A name for the null pointer: `nullptr` (revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2431.pdf)

