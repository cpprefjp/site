#assert
* cassert[meta header]
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

このマクロは、直前の`<cassert>`（または`<assert.h>`）のインクルード時点でマクロ`NDEBUG`が定義されていなかった場合に有効となり、`NDEBUG`が定義されていた場合は無効となる。

実行環境や入力によって起こりえるエラーにはこのマクロは使用できないので、別な手段として、例外、`bool`型の返却値などを検討すること。


##効果
- 有効な場合には：
    - パラメータの式が偽であった場合、[`abort()`](/reference/cstdlib/abort.md)関数を呼び出してプログラムを異常終了させる。
- 無効な場合は、何もしない


##備考
マクロ`NDEBUG`は、標準C++の言語およびライブラリでは定義しない。開発環境やユーザーが定義することとなる。`NDEBUG`を定義せず`assert`を有効にした設定を「デバッグビルド」、`NDEBUG`を定義して`assert`を無効にした設定を「リリースビルド」などととして複数のビルド設定を持つ開発環境がある。

マクロ`NDEBUG`の定義の状態を変えて`<cassert>`をインクルードしなおすことで翻訳単位中で有効・無効を切り替えることも可能である。


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


##参照
- C++14 - 19.3 [assertions]
  ただしC++としての規定はほとんど無く、ほぼ参照規格であるISO C 7.2の規定によるものとなっている。
