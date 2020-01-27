# assert
* cassert[meta header]
* macro[meta id-type]

```cpp
# if !defined(NDEBUG)
  #define assert(expr) implementation-defined
# else
  #define assert(ignore) ((void)0)
# endif
```

## 概要
式が真であることを表明する。

このマク�は、開発時に除去できるバグを見つけるために使用できる。「関数の引数がある範囲内の値でなければならない」「ある状態でこの関数を呼び出してはならない」といったことを表明することで、その関数を呼び出すユーザーに対する要件として�定できる。

このマク�は、直前の`<cassert>`（または`<assert.h>`）のインクルード時点でマク�`NDEBUG`が定義されていなかった場合に有効となり、`NDEBUG`が定義されていた場合は無効となる。


## 要件
パラメータの式の型はスカラ型でなければならない。


## 効果
- 有効な場合:
    - パラメータの式を評価し、偽であった場合（`0`と�しい場合）、式をテ�スト化したものに加え`__FILE__`, `__LINE__`, `__func__`の値を標準エラー出力に処理系定義の書式で書き込み、[`abort()`](/reference/cstdlib/abort.md)関数を呼び出してプ�グラムを異常終了させる。
- 無効な場合:
    - パラメータの式は評価はされず、何もしない。

このマク�は、定数式内で使用できる。(C++17)


## 備考
有効・無効に関わらず`void`型の式となる（文などにはならない）ので、カンマ演算�と組み合わせるなどして、式が書けるところならどこにでも記述することができる。

マク�`NDEBUG`は、標準C++の言語およびライブラリでは定義しない。開発環境やユーザーが定義することとなる。`NDEBUG`を定義せず`assert`を有効にした�定を「デバッグビルド」、`NDEBUG`を定義して`assert`を無効にした�定を「リリースビルド」などととして複数のビルド�定を持つ開発環境がある。

マク�`NDEBUG`の定義の状態を変えて`<cassert>`をインクルードしなおすことで翻訳単位�で有効・無効を切り替えることも可能である。

実行環境や入力によって起こりえるエラーに対するエラー処理としてこのマク�を使用すると無効化された場合に意図しない動作となることがあるので、別な手段として、例外、`bool`型の返却値などを検討すること。


## 例
### assertマク�の基本的な使い方
```cpp example
#include <cassert>

void f(int x)
{
  // パラメータxは、�数でなければならない
  assert(x >= 0);

  // …xを使った処理…
}

int main()
{
  f(3);  // OK
  f(-1); // プ�グラムが異常終了する
}
```


#### 出力例
```
prog.exe: prog.cc:6: void f(int): Assertion `x >= 0' failed.
```


### 定数式としてassertマク�を使用する (C++17)
```cpp example
#include <cassert>

constexpr int f(int x)
{
  assert(x >= 0); // constexpr関数内に式としてassertマク�を使用する
  return x + 1;
}

int main()
{
  constexpr int a = f(1);
//constexpr int b = f(-1); // コンパイルエラー！
}
```

### 出力
```
```


## 参照
- C++14 - 19.3 [assertions]
  ただしC++としての規定はほとんど無く、ほぼ参照規格であるISO C 7.2の規定によるものとなっている。
- [What does it mean for C++ that assert takes a scalar argument?](https://groups.google.com/a/isocpp.org/d/topic/std-discussion/6EHDRo1A2EE/discussion)
  パラメータの式の型についての要件は参照規格であるCの規定によるものであり、「スカラ型」が[C++におけるスカラ型](/reference/type_traits/is_scalar.md)となるのか、あるいはCにおけるスカラ型の範囲に限定されるのか、少なくともC++14時点でははっきりしていない。
- [LWG Issue 2234. `assert()` should allow usage in constant expressions](http://wg21.cmeerw.net/lwg/issue2234)

