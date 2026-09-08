# strtold
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  long double strtold(const char* nptr, char** endptr);
}
```

## 概要
文字列`nptr`を`long double`型の浮動小数点数に変換する。

- `endptr`が非`nullptr`の場合、変換が終了した位置の文字へのポインタがそこに格納される
- 先頭の空白は読み飛ばされ、その後の文字列が以下のいずれかの形式として解釈される
    - 10進数の浮動小数点数（`1.5`、`-3.25e10`など）
    - `0x`／`0X`で始まる16進浮動小数点数（`0x1.8p3`など）
    - `INF`・`INFINITY`（大文字小文字を問わない）
    - `NAN`・`NAN(`文字列`)`（大文字小文字を問わない）


## 戻り値
- 変換可能ならば変換後の数値を返す
- 変換後の数値の絶対値が大きすぎて表現できない場合、`HUGE_VALL`（符号に応じて正または負）を返し、[`errno`](/reference/cerrno/errno.md)に`ERANGE`を設定する
- 変換後の数値の絶対値が小さすぎて表現できない場合、大きさが`long double`の最小の正規化数以下の値（`0`を含む）を返す。この場合に`errno`へ`ERANGE`が設定されるかどうかは処理系定義である
- 変換不可能ならば`0`を返す


## 備考
- 小数点を表す文字は、現在のCロケールに依存する。ロケールに依存しない変換には、[`std::from_chars()`](/reference/charconv/from_chars.md)（C++17）を使用する
- 変換できたかどうかは、戻り値ではなく`endptr`が`nptr`から進んだかどうかで判定する
- 例外を送出する[`std::stold()`](/reference/string/stold.md)も使用できる


## 例
```cpp example
#include <iostream>
#include <cstdlib>

int main()
{
  char* end = nullptr;

  long double a = std::strtold("3.14abc", &end);
  std::cout << static_cast<double>(a) << std::endl;

  // 変換が終了した位置以降の文字列
  std::cout << end << std::endl;

  // 16進浮動小数点数、無限大も解釈できる
  std::cout << static_cast<double>(std::strtold("0x1.8p3", nullptr)) << std::endl;
  std::cout << static_cast<double>(std::strtold("INFINITY", nullptr)) << std::endl;
}
```
* std::strtold[color ff0000]

### 出力
```
3.14
abc
12
inf
```


## 処理系
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

### 備考
- 動作確認した範囲での最小バージョンを記載している。Clangは3.4（Compiler Explorerで利用できる最古のバージョン）、Visual C++は2019（同左）で動作を確認しており、それ以前のバージョンでも使用できる可能性がある


## 関連項目
- [`strtof`](strtof.md)
- [`strtod`](strtod.md)
- [`atof`](atof.md)
- [`std::stold()`](/reference/string/stold.md)
- [`<charconv>`](/reference/charconv.md)
