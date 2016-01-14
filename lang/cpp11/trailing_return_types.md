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


##例
```cpp
```

###出力
```
```


##この機能が必要になった背景・経緯


##検討されたほかの選択肢


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

