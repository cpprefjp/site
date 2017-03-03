#fmtflags
* ios[meta header]
* typedef[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
using fmtflags = T1;
```
* T1[italic]

*`T1`* は処理系定義の型。

##概要
`fmtflags` はロケールに依存しないストリームの書式に関するフラグを保持するためのビットマスク型である。  
`fmtflags` には以下の表のようなビットマスク値が存在し、全て [`ios_base`](../ios_base.md) の静的メンバ定数として定義されている。

| 定数 | 設定された場合の効果 |
|------|----------------------|
| `boolalpha` | `bool` 型の入出力をアルファベット形式（`true`、`false`）で行う。 |
| `dec` | 整数の入出力を 10 進数で行う。 |
| `fixed` | 浮動小数点数の出力を固定表記（`12.345670` のような形式）で行う。 |
| `hex` | 整数の入出力を 16 進数で行う。 |
| `internal` | 中央揃え。埋め文字を出力の内側に追加する。出力の内側に追加する適切な場所が無ければ `right` と同一。 |
| `left` | 左寄せ。埋め文字を出力の右側に追加する。 |
| `oct` | 整数の入出力を 8 進数で行う。 |
| `right` | 右寄せ。埋め文字を出力の左側に追加する。 |
| `scientific` | 浮動小数点数の出力を科学表記（`1.234567e+01` のような形式）で行う。 |
| `showbase` | 整数の出力時に先頭に基数を表す出力（8 進数だと `0`、16 進数だと `0x`）を追加する。 |
| `showpoint` | 浮動小数点数の出力時に必ず小数点を出力する。 |
| `showpos` | 負でない数値の出力時に `+` 符号を出力する。 |
| `skipws` | 特定の入力処理の際に、先行する空白文字をスキップする。 |
| `unitbuf` | 各出力処理の後、毎回バッファをフラッシュする。 |
| `uppercase` | 特定の小文字の出力を大文字の出力にする。（`scientific` の `E` や <code>hex &#124; showbase</code> の `0X` など） |


また、上記に加えて、[`setf`](setf.md)`()` の第 2 引数や　[`unsetf`](unsetf.md)`()` の引数に使用するため、 以下のように組み合わせた定数も [`ios_base`](../ios_base.md) の静的メンバ定数として定義されている。

| 定数 | 値 |
|------|----------------------|
| `adjustfield` | <code>left &#124; right &#124; internal</code> |
| `basefield`   | <code>dec &#124; oct &#124; hex</code>         |
| `floatfield`  | <code>scientific &#124; fixed</code>           |

さらに、直接の定数は存在しないが、C++11 からは `fixed | scientific` の組み合わせで 16 進浮動小数点出力を行う。  
（16 進浮動小数点出力が、より直観的な `hex` との組み合わせを使用しないのは、C++03 までとの互換性のため）


##備考
通常はこれらのフラグを直接使用することはあまり無く、対応するマニピュレータを使用することが一般的である。


##例 boolalpha
```cpp
#include <iostream>

int main()
{
  std::cout.setf(std::ios_base::boolalpha);   // std::boolalpha マニピュレータと同等
  std::cout << true << ", " << false << "\n";

  std::cout.unsetf(std::ios_base::boolalpha); // std::noboolalpha マニピュレータと同等
  std::cout << true << ", " << false << "\n";
}
```
* boolalpha[color ff0000]
* std::noboolalpha[link ../noboolalpha.md]

###出力
```
true, false
1, 0
```

##例 showpos
```cpp
#include <iostream>

int main()
{
  std::cout.setf(std::ios_base::showpos);   // std::showpos マニピュレータと同等
  std::cout << 10 << '\n';

  std::cout.unsetf(std::ios_base::showpos); // std::noshowpos マニピュレータと同等
  std::cout << 10 << "\n";
}
```
* showpos[color ff0000]
* std::showpos[link ../showpos.md]
* std::noshowpos[link ../noshowpos.md]

###出力
```
+10
10
```


##例 showpoint
```cpp
#include <iostream>

int main()
{
  std::cout.setf(std::ios_base::showpoint);   // std::showpoint マニピュレータと同等
  std::cout << 10.0 << '\n';

  std::cout.unsetf(std::ios_base::showpoint); // std::noshowpoint マニピュレータと同等
  std::cout << 10.0 << "\n";
}
```
* showpoint[color ff0000]
* std::showpoint[link ../showpoint.md]
* std::noshowpoint[link ../noshowpoint.md]

###出力
```
10.0000
10
```


##例 整数の基数指定
```cpp
#include <iostream>

int main()
{
  std::cout.setf(std::ios_base::showbase);                      // std::showbase マニピュレータと同等
  std::cout.setf(std::ios_base::hex, std::ios_base::basefield); // std::hex マニピュレータと同等
  std::cout << 10 << '\n';
  std::cout.setf(std::ios_base::oct, std::ios_base::basefield); // std::oct マニピュレータと同等
  std::cout << 10 << '\n';
  std::cout.setf(std::ios_base::dec, std::ios_base::basefield); // std::dec マニピュレータと同等
  std::cout << 10 << "\n\n";

  std::cout.unsetf(std::ios_base::showbase);                    // std::noshowbase マニピュレータと同等
  std::cout.setf(std::ios_base::hex, std::ios_base::basefield); // std::hex マニピュレータと同等
  std::cout << 10 << '\n';
  std::cout.setf(std::ios_base::oct, std::ios_base::basefield); // std::oct マニピュレータと同等
  std::cout << 10 << '\n';
  std::cout.setf(std::ios_base::dec, std::ios_base::basefield); // std::dec マニピュレータと同等
  std::cout << 10 << "\n";
}
```
* showbase[color ff0000]
* uppercase[color ff0000]
* basefield[color ff0000]
* hex[color ff0000]
* oct[color ff0000]
* dec[color ff0000]
* std::showbase[link ../showbase.md]
* std::noshowbase[link ../noshowbase.md]
* std::hex[link ../hex.md]
* std::oct[link ../oct.md]
* std::dec[link ../dec.md]

###出力
```
0xa
012
10

a
12
10
```

##例 浮動小数点数のフォーマット
```cpp
#include <iostream>

int main()
{
  std::cout.setf(std::ios_base::uppercase);                                 // std::uppercase マニピュレータと同等
  std::cout.setf(std::ios_base::fixed, std::ios_base::floatfield);          // std::fixed マニピュレータと同等
  std::cout << 12.34567 << '\n';
  std::cout.setf(std::ios_base::scientific, std::ios_base::floatfield);     // std::fixed マニピュレータと同等
  std::cout << 12.34567 << '\n';
  std::cout.setf(std::ios_base::fixed | std::ios_base::scientific, std::ios_base::floatfield);  // C++11 から
                                                                            // std::hexfloat マニピュレータと同等
  std::cout << 12.34567 << '\n';
  std::cout.unsetf(std::ios_base::floatfield);                              // std::defaultfloat マニピュレータと同等
  std::cout << 12.34567 << "\n\n";

  std::cout.unsetf(std::ios_base::uppercase);                               // std::nouppercase マニピュレータと同等
  std::cout.setf(std::ios_base::fixed, std::ios_base::floatfield);          // std::fixed マニピュレータと同等
  std::cout << 12.34567 << '\n';
  std::cout.setf(std::ios_base::scientific, std::ios_base::floatfield);     // std::scientific マニピュレータと同等
  std::cout << 12.34567 << '\n';
  std::cout.setf(std::ios_base::fixed | std::ios_base::scientific, std::ios_base::floatfield);  // C++11 から
                                                                            // std::hexfloat マニピュレータと同等
  std::cout << 12.34567 << '\n';
  std::cout.unsetf(std::ios_base::floatfield);                              // std::defaultfloat マニピュレータと同等
  std::cout << 12.34567 << "\n\n";
}
```
* floatfield[color ff0000]
* fixed[color ff0000]
* scientific[color ff0000]
* std::uppercase[link ../uppercase.md]
* std::nouppercase[link ../nouppercase.md]
* std::fixed[link ../fixed.md]
* std::scientific[link ../scientific.md]
* std::hexfloat[link ../hexfloat.md]
* std::defaultfloat[link ../defaultfloat.md]

###出力
```
12.345670
1.234567E+01
0X1.8B0FBA8826AA9P+3
12.3457

12.345670
1.234567e+01
0x1.8b0fba8826aa9p+3
12.3457
```


```cpp
#include <iostream>

int main()
{
  std::cout.width(10);
  std::cout.setf(std::ios_base::right, std::ios_base::adjustfield);    // std::right マニピュレータと同等
  std::cout << -10 << "|\n";

  std::cout.width(10);
  std::cout.setf(std::ios_base::internal, std::ios_base::adjustfield); // std::internal マニピュレータと同等
  std::cout << -10 << "|\n";

  std::cout.width(10);
  std::cout.setf(std::ios_base::left, std::ios_base::adjustfield);     // std::left マニピュレータと同等
  std::cout << -10 << "|\n";
}
```
* adjustfield[color ff0000]
* right[color ff0000]
* internal[color ff0000]
* left[color ff0000]
* std::right[link ../right.md]
* std::internal[link ../internal.md]
* std::left[link ../left.md]

###出力
```
       -10|
-       10|
-10       |
```


##バージョン
##言語
- C++98
- C++11（`fixed | scientific` による 16 進浮動小数点出力のみ）

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [GCC, C++11 mode](/implementation.md#gcc): 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

###備考
- Clang(libc++) では、C++03 モードでも `fixed | scientific` で 16 進浮動小数点出力を行う。


##参照
- [`ios_base`](../ios_base.md)`::`[`flags`](flags.md)
- [`ios_base`](../ios_base.md)`::`[`setf`](setf.md)
- [`ios_base`](../ios_base.md)`::`[`unsetf`](unsetf.md)
- [`boolalpha`](../boolalpha.md)
- [`noboolalpha`](../noboolalpha.md)
- [`showpos`](../showpos.md)
- [`noshowpos`](../noshowpos.md)
- [`showpoint`](../showpoint.md)
- [`noshowpoint`](../noshowpoint.md)
- [`showbase`](../showbase.md)
- [`noshowbase`](../noshowbase.md)
- [`uppercase`](../uppercase.md)
- [`nouppercase`](../nouppercase.md)
- [`hex`](../hex.md)
- [`oct`](../oct.md)
- [`dec`](../dec.md)
- [`fixed`](../fixed.md)
- [`scientific`](../scientific.md)
- [`hexfloat`](../hexfloat.md)
- [`defaultfloat`](../defaultfloat.md)
- [`right`](../right.md)
- [`internal`](../internal.md)
- [`left`](../left.md)
