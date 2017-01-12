#math_errhandling
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define math_errhandling implementation-defined
```
* implementation-defined[italic]

##概要
`math_errhandling` は、[`<cmath>`](../cmath.md) 内の関数がエラーをどのように取り扱うかを表すマクロである。  
取りうる値とその意味は以下の通り。

| 値 | 関数でエラーが発生した際の取り扱い |
|----|------------------------------------|
| [`MATH_ERRNO`](math_errno.md) | エラー内容を [`errno`](../cerrno/errno.md) に設定する。 |
| [`MATH_ERREXCEPT`](math_errexcept.md) | エラー内容に応じた浮動小数点例外を発生させる。（C++ の例外ではない事に注意） |
| [`MATH_ERRNO`](math_errno.md) <code>&#x7c;</code> [`MATH_ERREXCEPT`](math_errexcept.md) | 上記の両方を行う。 |



##備考
- 上記では「マクロ」としているが、規格上は外部リンケージの識別子であっても構わないとされている。  
	なお、その場合でも `math_errhandling` の値はプログラムの実行中は定数であり、実行中に変わる事はない。
- `math_errhandling &` [`MATH_ERRNO`](math_errno.md) がゼロの場合に [`errno`](../cerrno/errno.md) がどのようになるかは C99 規格（C++11、C++14 の参照規格）では明記されていないが、C11 では `math_errhandling &` [`MATH_ERRNO`](math_errno.md) が非ゼロの場合と同様に設定するか、全く変更しないかのいずれかである事が明記されている。
- エラーが発生しなかった場合に [`errno`](../cerrno/errno.md) がどのようになるかは C99 規格（C++11、C++14 の参照規格）では明記されていないが、C11 では `math_errhandling` の値によらず変更されない事が明記されている。
- C99（C++11、C++14 の参照規格）では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、`math_errhandling &` [`MATH_ERREXCEPT`](math_errexcept.md) は非ゼロと規定されている。


##例
```cpp
#include <iostream>
#include <cerrno>
#include <cstring>
#include <cfenv>
#include <cmath>

// エラー状態のクリア
void clearerr()
{
  if (math_errhandling & MATH_ERREXCEPT) {
    std::feclearexcept(FE_ALL_EXCEPT);
  } else {
    errno = 0;
  }
}

// エラー状態の出力
void printerr()
{
  if (math_errhandling & MATH_ERREXCEPT) {
    int excepts = std::fetestexcept(FE_ALL_EXCEPT);
    if (excepts & FE_INVALID) {
      std::cout << "FE_INVALID\n";
    }
    if (excepts & FE_DIVBYZERO) {
      std::cout << "FE_DIVBYZERO\n";
    }
    if (excepts & FE_OVERFLOW) {
      std::cout << "FE_OVERFLOW\n";
    }
    if (excepts & FE_UNDERFLOW) {
      std::cout << "FE_UNDERFLOW\n";
    }
    if (excepts & FE_INEXACT) {
      std::cout << "FE_INEXACT\n";
    }
  } else {
    int err = errno;
    if (err != 0) {
      std::cout << std::strerror(err) << '\n';
    }
  }
}

int main()
{
  clearerr();
  double result = std::log(0.0);
  printerr();
  std::cout << "log(0) = " << result << '\n';
}
```
* math_errhandling[color ff0000]
* std::log[link log.md]
* FE_ALL_EXCEPT[link ../cfenv/fe_all_except.md]
* FE_INEXACT[link ../cfenv/fe_inexact.md]
* FE_INVALID[link ../cfenv/fe_invalid.md]
* FE_OVERFLOW[link ../cfenv/fe_overflow.md]
* FE_UNDERFLOW[link ../cfenv/fe_underflow.md]
* FE_DIVBYZERO[link ../cfenv/fe_divbyzero.md]
* std::feclearexcept[link ../cfenv/feclearexcept.md]
* std::fetestexcept[link ../cfenv/fetestexcept.md]
* errno[link ../cerrno/errno.md]

###出力例
```
FE_DIVBYZERO
log(0) = -inf
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
