#assert
* cfloat[meta header]
* macro[meta id-type]

```cpp
#if !defined(NDEBUG)
  #define assert(expr) implementation-defined
#else
  #define assert(ignore) ((void)0)
#endif
```

##概要
式が真であることを表明する。

このマクロは、開発時に除去できるバグを見つけるために使用できる。「関数の引数がある範囲内の値でなければならない」「ある状態でこの関数を呼び出してはならない」といったことを表明することで、その関数を呼び出すユーザーに対する要件として設定できる。

このマクロはデバッグ時にのみ動作し、リリースする際には動作しない。マクロ`NDEBUG`が定義された場合にのみこのマクロは動作し、パラメータで指定された式が偽である場合、[`abort()`](/reference/cstdlib/abort.md)関数が呼び出されてプログラムが異常終了する。リリース時には、いかなるパラメータが渡されても、このマクロは何もしない。

リリース時にも起こりえるエラーにはこのマクロは使用できないので、別な手段として、例外、`bool`型の返却値などを検討すること。


##効果
- マクロ`NDEBUG`が定義されている場合には：
    - パラメータの式が偽であった場合、[`abort()`](/reference/cstdlib/abort.md)関数を呼び出してプログラムを異常終了させる。
- マクロ`NDEBUG`が定義されていない場合は、何もしない

マクロ`NDEBUG`は、標準C++の言語およびライブラリでは定義しない。開発環境やユーザーが定義することとなる。


##例
```cpp
#include <cassert>

void f(int x)
{
  // パラメータxは、正数でなければならない
  assert(x >= 0);

  // …xを使った処理…
}

int main()
{
  f(3);  // OK
  f(-1); // プログラムが異常終了する
}
```


###出力例
```
prog.exe: prog.cc:6: void f(int): Assertion `x >= 0' failed.
```


