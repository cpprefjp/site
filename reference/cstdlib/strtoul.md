# strtoul
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  unsigned long int strtoul(const char* nptr, char** endptr, int base);
}
```

## 概要
文字列`nptr`を`unsigned long`型の整数に変換する。文字列は`base`で指定された基数に従って解釈される。

解釈の規則は[`strtol()`](strtol.md)と同じであり、変換先の型が`unsigned long`である点のみが異なる。

- `endptr`が非`nullptr`の場合、変換が終了した位置の文字へのポインタがそこに格納される
- 基数`base`は2〜36、または0の値をとる。`0`の場合は、`0x`／`0X`で始まれば16進数、`0`で始まれば8進数、それ以外は10進数として解釈される


## 戻り値
- 変換可能ならば変換後の数値を返す
- 変換後の数値が`unsigned long`の範囲外の場合、`ULONG_MAX`を返し、[`errno`](/reference/cerrno/errno.md)に`ERANGE`を設定する
- 変換不可能ならば`0`を返す


## 備考
- 変換できたかどうかは、戻り値ではなく`endptr`が`nptr`から進んだかどうかで判定する。変換不可能な場合と、文字列が`"0"`である場合を、戻り値では区別できないためです
- 負の符号が付いた文字列も変換され、その値の符号を反転した結果が返る。たとえば`"-1"`は最大値へ変換される
- 例外を送出する[`std::stoul()`](/reference/string/stoul.md)や、ロケールに依存しない[`std::from_chars()`](/reference/charconv/from_chars.md)（C++17）も使用できる


## 例
```cpp example
#include <iostream>
#include <cstdlib>
#include <cerrno>

int main()
{
  char* end = nullptr;

  // 16進数として変換する
  unsigned long a = std::strtoul("ff", &end, 16);
  std::cout << a << std::endl;

  // 変換できない場合、endは入力文字列の先頭のまま
  const char* input = "abc";
  std::strtoul(input, &end, 10);
  std::cout << (end == input) << std::endl;

  // 範囲外の場合
  errno = 0;
  std::strtoul("99999999999999999999999999", &end, 10);
  std::cout << (errno == ERANGE) << std::endl;
}
```
* std::strtoul[color ff0000]

### 出力
```
255
1
1
```


## 関連項目
- [`strtol`](strtol.md)
- [`strtoll`](strtoll.md)
- [`strtoull`](strtoull.md)
- [`std::stoul()`](/reference/string/stoul.md)
- [`<charconv>`](/reference/charconv.md)
