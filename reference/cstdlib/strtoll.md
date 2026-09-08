# strtoll
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  long long int strtoll(const char* nptr, char** endptr, int base);
}
```

## 概要
文字列`nptr`を`long long`型の整数に変換する。文字列は`base`で指定された基数に従って解釈される。

解釈の規則は[`strtol()`](strtol.md)と同じであり、変換先の型が`long long`である点のみが異なる。

- `endptr`が非`nullptr`の場合、変換が終了した位置の文字へのポインタがそこに格納される
- 基数`base`は2〜36、または0の値をとる。`0`の場合は、`0x`／`0X`で始まれば16進数、`0`で始まれば8進数、それ以外は10進数として解釈される


## 戻り値
- 変換可能ならば変換後の数値を返す
- 変換後の数値が`long long`の範囲外の場合、`LLONG_MAX`または`LLONG_MIN`を返し、[`errno`](/reference/cerrno/errno.md)に`ERANGE`を設定する
- 変換不可能ならば`0`を返す


## 備考
- 変換できたかどうかは、戻り値ではなく`endptr`が`nptr`から進んだかどうかで判定する。変換不可能な場合と、文字列が`"0"`である場合を、戻り値では区別できないためです
- 例外を送出する[`std::stoll()`](/reference/string/stoll.md)や、ロケールに依存しない[`std::from_chars()`](/reference/charconv/from_chars.md)（C++17）も使用できる


## 例
```cpp example
#include <iostream>
#include <cstdlib>
#include <cerrno>

int main()
{
  char* end = nullptr;

  // 16進数として変換する
  long long a = std::strtoll("ff", &end, 16);
  std::cout << a << std::endl;

  // 変換できない場合、endは入力文字列の先頭のまま
  const char* input = "abc";
  std::strtoll(input, &end, 10);
  std::cout << (end == input) << std::endl;

  // 範囲外の場合
  errno = 0;
  std::strtoll("99999999999999999999999999", &end, 10);
  std::cout << (errno == ERANGE) << std::endl;
}
```
* std::strtoll[color ff0000]

### 出力
```
255
1
1
```


## 処理系
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

### 備考
- 動作確認した範囲での最小バージョンを記載している。Clangは3.4（Compiler Explorerで利用できる最古のバージョン）、Visual C++は2019（同左）で動作を確認しており、それ以前のバージョンでも使用できる可能性がある


## 関連項目
- [`strtol`](strtol.md)
- [`strtoul`](strtoul.md)
- [`strtoull`](strtoull.md)
- [`std::stoll()`](/reference/string/stoll.md)
- [`<charconv>`](/reference/charconv.md)
