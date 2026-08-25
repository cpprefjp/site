# va_start
* cstdarg[meta header]
* macro[meta id-type]

```cpp
#define va_start(ap, parmN) unspecified // (1) C++98
#define va_start(ap, ...) unspecified   // (1) C++26
```
* unspecified[italic]

## 概要
可変引数へのアクセスを開始し、[`va_list`](va_list.md)オブジェクト`ap`を初期化する。

`ap`を初期化した後は、[`va_arg`](va_arg.md)マクロで各引数を順に取り出せる。使用後は、同じ`ap`に対して[`va_end`](va_end.md)マクロを呼び出さなければならない。

- C++98 : 第2引数`parmN`には、可変引数（`...`）の直前にある関数の仮引数を指定する。
- C++26 : 可変引数マクロとなり、`ap`以降の引数（`...`）は破棄される。歴史的経緯から第2引数を受け付けるが、その値は使用されない。


## 効果
`ap`を、関数に渡された可変引数にアクセスできる状態に初期化する。


## 戻り値
なし


## 備考
- 同じ関数内で、`va_start`で初期化した`ap`は、対応する[`va_end`](va_end.md)で後始末しなければならない。
- C++26では、第2引数以降のいずれかが不均衡なカッコを含む、またはトークンに変換されない前処理トークンに展開される場合、プログラムは不適格となる（診断は要求されない）。


## 例
```cpp example
#include <cstdarg>
#include <iostream>

// count個のint引数の合計を求める
int sum(int count, ...)
{
  std::va_list args;
  va_start(args, count);

  int total = 0;
  for (int i = 0; i < count; ++i) {
    total += va_arg(args, int);
  }

  va_end(args);
  return total;
}

int main()
{
  std::cout << sum(3, 10, 20, 30) << std::endl;
}
```
* va_start[color ff0000]
* std::va_list[link va_list.md]
* va_arg[link va_arg.md]
* va_end[link va_end.md]

### 出力
```
60
```


## バージョン
### 言語
- C++98


## 関連項目
- [`va_arg`](va_arg.md): 次の可変引数を取得する
- [`va_end`](va_end.md): 可変引数へのアクセスを終了する
- [`va_copy`](va_copy.md): `va_list`オブジェクトを複製する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26でC23を参照するようになり、`va_start`が可変引数マクロ`va_start(ap, ...)`となった
- [LWG Issue 4388. Align new definition of `va_start` with C23](https://cplusplus.github.io/LWG/issue4388)
    - C++26で、`va_start`の第2引数以降は破棄されること、およびそれらが不均衡なカッコやトークンに変換されない前処理トークンを含む場合はプログラムが不適格（診断不要）となることが明確化された
