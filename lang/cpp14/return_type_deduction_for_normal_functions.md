#通常関数の戻り値型推論
* cpp14[meta cpp]

##概要
関数宣言の構文において、先頭の戻り値型を`auto`もしくは`decltype(auto)`とすることで、戻り値の型が関数の`return`文から推論される。

```cpp
// 関数f()の戻り値型はint
auto f()
{
  return 42;
}
```

`decltype(auto)`は、戻り値として変数への参照を返したい場合に使用する。

```cpp
// autoの場合はintが戻り値型となるが、
// decltype(auto)とすることでint&が戻り値型となる。
decltype(auto) f(int& r)
{
  return r;
}
```

この関数宣言構文はメンバ関数に対しても使用できる。

先行宣言をする場合、その関数を使用するコードから、関数の定義が見える必要がある。


##仕様
###先行宣言と再宣言
戻り値の型を推論する関数宣言構文は、先行宣言と再宣言を許可する。

```cpp
auto f(); // 先行宣言

auto f() // 定義
{
  return 42;
}

auto f(); // 再宣言
```

これは、関数テンプレートの場合も同様である。

ただし、戻り値の型を推論する関数宣言構文で先行宣言した場合に、通常の戻り値型を指定する関数宣言構文では再宣言できない。

```cpp
auto f(); // 先行宣言
int f(); // コンパイルエラー : 再宣言に別な関数宣言構文を使用できない
```

関数テンプレートの明示的な特殊化とインスタンス化の場合も、同じ関数宣言構文を使用する必要がある。


(執筆中)

##例
(執筆中)
```cpp
```


###出力
```
```


##関連項目
- [C++11 戻り値の型を後置する関数宣言構文](/lang/cpp11/trailing_return_types.md)


##参照
- [N2954 Unified Function Syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2954.html)
- [N3386 Return type deduction for normal functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3386.html)
- [N3582 Return type deduction for normal functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3582.html)
- [N3638 Return type deduction for normal functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3638.html)
- [CWG Issue 1048. `auto` deduction and lambda return type deduction.](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1048)
- [CWG Issue 1588. Deducing cv-qualified `auto`](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1588)

