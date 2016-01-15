#戻り値の型を後置する関数宣言構文
* cpp11[meta cpp]

##概要
従来の関数宣言構文では、戻り値の型は先頭に記述していた。

C++11から、戻り値の型をパラメータリストの後ろに記述する関数宣言構文が追加された。これにより、戻り値の型の文脈で、パラメータの変数を使用できる。

戻り値の型を後置するには、関数宣言の先頭に`auto`を書き、パラメータリストの後ろに`->`記号を書き、その後ろに戻り値の型を書く。ここでの`auto`は、「後ろに書いた戻り値の型を、`auto`と書いたところに置き換えて使用する」というプレースホルダーを意味する。

```cpp
// int f() と同じく、戻り値の型としてintを返す関数
auto f() -> int
{
  return 42;
}

// パラメータの変数aとbを+演算子で足し合わせた結果の型を、
// 関数g()の戻り値型とする
auto g(int a, int b) -> decltype(a + b)
{
  return a + b;
}
```


##仕様
戻り値の型を後置する関数宣言の構文は、以下のようになっている：

```
auto 関数名(パラメータリスト) CV修飾 opt 参照修飾 opt 例外仕様 opt 属性 opt -> 戻り値の型
```
* opt[italic]

「opt」が後ろに付いている要素は、省略できる。

「-> 戻り値の型」という組み合わせは、「trailing return type (後ろに付く戻り値型)」という名称になっており、[ラムダ式](lambda_expressions.md)の戻り値型も同様の扱いとなる。

戻り値の型を前置する関数宣言構文と違い、こちらは戻り値の型の文脈で、パラメータリストの情報を参照できる。


##例
```cpp
#include <iostream>

// 関数オブジェクトfを呼び出した結果の型を、関数g()の戻り値型にする
template <class F>
auto g(F f) -> decltype(f()) { return f(); }

int h() { return 3; }

int main()
{
  int result = g(h);
  std::cout << result << std::endl;
}
```
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
3
```


##この機能が必要になった背景・経緯
戻り値の型を前置する従来の関数宣言構文では、戻り値の型を決定する文脈からパラメータリストを参照できなかった。これは、[`decltype`](decltype.md.nolink)によって式の型を求め、それを関数の戻り値型としたい場合に問題となる。

戻り値の型の文脈からパラメータリストを参照できない場合、「return文に記述された式の結果となる型を、戻り値の型とする」というようなことをする際に、以下のように書くことになる：

```cpp
template <class T, class U>
decltype((*(T*)0)+(*(U*)0)) add(T t, U u) { return t + u; }
```

戻り値の型を後置する構文では、パラメータを直接参照して、以下のように書ける：

```cpp
template <class T, class U>
auto add(T t, U u) -> decltype(t+u) { return t + u; }
```

テンプレートを駆使した複雑な関数を実装する場合に、戻り値の型を求めるのが困難な状況で、この構文は役立つ。


##検討されたほかの選択肢
戻り値型の後置は、[ラムダ式](lambda_expressions.md)でもそうしている。

そのため、通常の関数宣言構文もラムダ式の構文と同様にすることが検討された。

```cpp
// ラムダ式
auto f = [](int a, int b) -> int { return a + b; }

// 関数宣言構文
[] g(int a, int b) -> int { return a + b; }
```

これはつまり、現在`auto`を使っている部分を、ラムダ導入子`[ ]`にするという案である。そうすることで、ラムダ式は「名前のついていない関数」、関数宣言構文は「名前のついているラムダ式」のように、関数宣言を統一的な構文にできるようになる。それと同時に、ラムダ式と同様に戻り値型の推論もできるようになる。

しかし、この構文は採用されなかった。ラムダ導入子は関数宣言構文にとってはただのマーキングであり機能を持たないが、`auto`の場合はプレースホルダーであるために、将来的にそれを`auto*`、`auto&`のように、置き換えられる戻り値の型をさらに修飾できるようにするためである。


##関連項目
- [C++14 通常関数の戻り値型推論](/lang/cpp14/return_type_deduction_for_normal_functions.md)


##参照
- [N2445 New Function Declarator Syntax Wording](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2445.html)
- [N2541 New Function Declarator Syntax Wording](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2541.htm)
- [N2763 Unified Function Syntax](http://www.open-std.org/JTC1/SC22/WG21/docs/papers/2008/n2763.htm)
- [N2835 Unified Function Syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2825.html)
- [N2927 New wording for C++0x Lambdas (rev. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2927.pdf)
    - ラムダ式の仕様と合わせて「trailing-return-type」という言葉が使われるようになった
- [N2931 Unified Function Syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2931.html)
- [N2954 Unified Function Syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2954.html)

