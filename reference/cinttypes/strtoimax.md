# strtoimax
* cinttypes[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  intmax_t
    strtoimax(const char* nptr,
              char** endptr,
              int base);
}
```
* intmax_t[link /reference/cstdint/intmax_t.md]

## 概要
文字列`nptr`を、最大幅の符号付き整数型 [`intmax_t`](/reference/cstdint/intmax_t.md) に変換する。文字列は`base`で指定された基数に従って解釈される。

`endptr`が非`nullptr`の場合、変換が終了した位置の文字へのポインタがそこに格納される。

基数`base`は 2〜36 または 0 の値を取る。`base`が0の場合、

- 文字列の先頭が`0x`または`0X`のときは16進数
- 文字列の先頭が`0`のときは8進数
- その他のときは10進数

として変換する。

この関数は、[`std::strtol()`](/reference/cstdlib/strtol.md)の変換先の型を[`intmax_t`](/reference/cstdint/intmax_t.md)にしたものである。


## 戻り値
- 変換可能ならば変換後の数値。
- 変換後の数値が[`intmax_t`](/reference/cstdint/intmax_t.md)の範囲外の場合、[`INTMAX_MAX`](/reference/cstdint/intmax_max.md)または[`INTMAX_MIN`](/reference/cstdint/intmax_min.md)。
- 変換不可能なら`0`を返す。


## 備考
- 変換後の数値が[`intmax_t`](/reference/cstdint/intmax_t.md)の範囲を超えるときは、`errno`に`ERANGE`が設定される。


## 例
```cpp example
#include <iostream>
#include <cinttypes>

int main()
{
  char* end = nullptr;
  std::intmax_t x = std::strtoimax("  -0x1F rest", &end, 0);

  std::cout << x << std::endl;
  std::cout << "未変換部分: \"" << end << "\"" << std::endl;
}
```
* std::strtoimax[color ff0000]

### 出力
```
-31
未変換部分: " rest"
```


## バージョン
### 言語
- C++11


## 関連項目
- [`strtoumax`](strtoumax.md)
- [`wcstoimax`](wcstoimax.md)
- [`strtol - <cstdlib>`](/reference/cstdlib/strtol.md)


## 参照
- [N1568 Proposed additions to TR-1 to improve compatibility with C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1568.htm)
