# strtoumax
* cinttypes[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  uintmax_t
    strtoumax(const char* nptr,
              char** endptr,
              int base);
}
```
* uintmax_t[link /reference/cstdint/uintmax_t.md]

## 概要
文字列`nptr`を、最大幅の符号なし整数型 [`uintmax_t`](/reference/cstdint/uintmax_t.md) に変換する。文字列は`base`で指定された基数に従って解釈される。

`endptr`が非`nullptr`の場合、変換が終了した位置の文字へのポインタがそこに格納される。

基数`base`は 2〜36 または 0 の値を取る。`base`が0の場合、

- 文字列の先頭が`0x`または`0X`のときは16進数
- 文字列の先頭が`0`のときは8進数
- その他のときは10進数

として変換する。

この関数は、[`std::strtoul()`](/reference/cstdlib/strtoul.md.nolink)の変換先の型を[`uintmax_t`](/reference/cstdint/uintmax_t.md)にしたものである。


## 戻り値
- 変換可能ならば変換後の数値。
- 変換後の数値が[`uintmax_t`](/reference/cstdint/uintmax_t.md)の範囲外の場合、[`UINTMAX_MAX`](/reference/cstdint/uintmax_max.md)。
- 変換不可能なら`0`を返す。


## 備考
- 変換後の数値が[`uintmax_t`](/reference/cstdint/uintmax_t.md)の範囲を超えるときは、`errno`に`ERANGE`が設定される。


## 例
```cpp example
#include <iostream>
#include <cinttypes>

int main()
{
  std::uintmax_t x = std::strtoumax("12345", nullptr, 10);
  std::cout << x << std::endl;
}
```
* std::strtoumax[color ff0000]

### 出力
```
12345
```


## バージョン
### 言語
- C++11


## 関連項目
- [`strtoimax`](strtoimax.md)
- [`wcstoumax`](wcstoumax.md)


## 参照
- [N1568 Proposed additions to TR-1 to improve compatibility with C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1568.htm)
