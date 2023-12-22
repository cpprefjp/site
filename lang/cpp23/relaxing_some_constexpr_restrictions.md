# constexpr関数のすべての引数が定数実行できない場合でも適格とする
* cpp23[meta cpp]

## 概要

いかなる呼び出しにおいても定数式実行できない`constexpr`関数が存在しても、プログラムが不適格にならないようにする。

ただし、このような関数の存在までは許容するというだけで、定数式実行できない`constexpr`関数を定数式文脈で呼び出すと従来通りエラーとなる。

## この機能が必要になった背景・経緯

これまでは、いかなる引数での呼び出しでも定数式実行できない`constexpr`関数が存在するだけでプログラムは不適格になっていた。

例えば以下のような場合である。

```cpp
int f(int x) { return x + 1; }

constexpr int g(int x) { return f(x); } // error! fはいかなるxについても定数式実行不能
```

`g`は`constexpr`でない関数`f`を呼び出すため、プログラムの中で実際に`g`が定数式実行されない場合であっても、このコードは不適格である。
これによって、定数式実行できない言語機能を使用している関数や、`constexpr`でない関数を誤って呼び出すようなミスを検出することができた。

しかし、多くの標準ライブラリが`constexpr`対応を進めていくようになり、状況が変化した。

例えば、`std::optional`の`reset`メンバメソッドが`constexpr`に対応するのはC++20以降である。
これは`std::optional`の内部実装が`union`のアクティブメンバを更新しているからであり、[これを定数式内で実行するにはC++20を待たねばならなかった](https://cpprefjp.github.io/lang/cpp20/changing_the_active_member_of_a_union_inside_constexpr.html)。

よって、以下のコードはC++17では不適格だが、C++20では正しいコードとなる。

```cpp
template<typename T>
constexpr void f(std::optional<T>& opt)
{
  opt.reset();
}
```

これを正しく記述するには、`constexpr`指定をするかどうかをマクロで変更しなければならない。
例えばC++20から`constexpr`になる関数群に対して以下のようなマクロを使うか、

```cpp
#if __cplusplus >= 202002L
#  define MYLIB_CXX20_CONSTEXPR constexpr
#else
#  define MYLIB_CXX20_CONSTEXPR
#endif

template<typename T>
MYLIB_CXX20_CONSTEXPR void f(std::optional<T>& opt)
{
  opt.reset();
}
```

あるいはより細かく指定するためにそれぞれの機能テストマクロを使うしかなかった。

```cpp

template<typename T>
#if __cpp_lib_optional >= 202106
constexpr
#endif
void f(std::optional<T>& opt)
{
  o.reset();
}
```

これはいかにも冗長であり、またライブラリの導入時期だけでなくその関数一つ一つが`constexpr`指定されたタイミングを意識する必要があるため、正しく指定するのは非常に難しい。

`constexpr`指定を行わないことによってもこの問題は回避できるが、自身以外のユーザーが存在するライブラリの場合は`constexpr`対応が望まれる可能性があり、その場合はこの問題に対処する必要が生じる。

多くの場合、標準ライブラリ関数が`constexpr`指定されるのは、その機能が定数式実行可能になったバージョンよりも遅れる。
例えば、`std::array`の`operator[]`の非`const`版が`constexpr`指定されるのは、定数式内で変数の変更が許可されるC++14ではなく、その次のC++17である（[参考](https://cpprefjp.github.io/reference/array/array/op_at.html)）。
このような状況では上記のような解決策を用いてもミスを避けることは容易ではない。

現在、登場時点では定数式内で実行できなかったために`constexpr`されていなかった多くの標準ライブラリ関数が、のちにコア言語機能が追加されて`constexpr`指定されている。
現時点で`constexpr`されていない関数は次のバージョンで`constexpr`になるかもしれず、よって現在使用されているバージョンである関数が`constexpr`ではないということを指摘することの意味は薄れている。

以上を鑑みて、`constexpr`関数が定数式実行可能かどうかを判断するのは、実際に定数式内で実行されてからにした方がよいという結論に至った。

実際に定数式内で実行できない関数が定数式内で呼び出された場合、これは従来通りエラーとするほかない。
しかし、定数式内で呼び出されていないのならば、定数式内で実行できない関数が存在していてもプログラムを不適格とはしない。

## 仕様

`constexpr`指定された関数が満たすべき条件を緩和する。

- 関数の返り値は`literal`型でなくともよい。
- 関数の引数はどれも`literal`型でなくともよい。
- その関数が定数式実行可能になるような引数が存在する必要はない。
- 定数式実行可能になるような`template`引数が存在する必要はない。

`constexpr`指定された、`=delete`指定されていないコンストラクタが満たすべき条件を緩和する。

- 非静的メンバ変数のコンストラクタは`constexpr`でなくともよい
- [委譲コンストラクタ](https://cpprefjp.github.io/lang/cpp11/delegating_constructors.html)の場合、委譲先のコンストラクタが`constexpr`でなくともよい

`constexpr`指定された、`=delete`指定されていないデストラクタが満たすべき条件を緩和する。

- 非静的メンバ変数のデストラクタは`constexpr`でなくともよい

また、陽に`default`指定された関数は、それが`constexpr-suitable`である限り、暗黙に`constexpr`指定される。
`constexpr-suitable`とは、コルーチン関数ではなく、仮想基底クラスを持つクラスのコンストラクタまたはデストラクタでもない関数を指す。

## 関連項目

- [C++20 - constexpr関数内でのtry-catchブロックを許可](/lang/cpp20/try-catch_blocks_in_constexpr_functions.html)
- [C++20 - constexpr関数内で未評価のインラインアセンブリを許可することによる組み込み関数のconstexpr有効化](/lang/cpp20/enabling_constexpr_intrinsics_by_permitting_unevaluated_inline-assembly_in_constexpr_functions.html)

## 参照

- [P2448R2 - Relaxing some constexpr restrictions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2448r2.html)
