# to_chars
* charconv[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  //整数型用
  to_chars_result to_chars(char* first, char* last, /*see below*/ value,  int base = 10); // (1)

  //精度、フォーマット指定なし
  to_chars_result to_chars(char* first, char* last, float value);        // (2)
  to_chars_result to_chars(char* first, char* last, double value);       // (3)
  to_chars_result to_chars(char* first, char* last, long double value);  // (4)

  //精度指定なし
  to_chars_result to_chars(char* first, char* last, float value,
                           chars_format fmt);                            // (5)
  to_chars_result to_chars(char* first, char* last, double value,
                           chars_format fmt);                            // (6)
  to_chars_result to_chars(char* first, char* last, long double value,
                           chars_format fmt);                            // (7)

  //精度とフォーマットを指定
  to_chars_result to_chars(char* first, char* last, float value,
                           chars_format fmt, int precision);             // (8)
  to_chars_result to_chars(char* first, char* last, double value,
                           chars_format fmt, int precision);             // (9)
  to_chars_result to_chars(char* first, char* last, long double value,
                           chars_format fmt, int precision);             // (10)
}
```

## 概要
与えられた数値（`value`）を文字列へ変換し、`[fisrt, last)`内へ出力する。

## 要件
- 全て : 出力範囲`[fisrt, last)`は有効な範囲であること（charのオブジェクトが構築済みであり、連続していること）。
- (1) : `base`は2～36までの値であること。
- (5)～(10)  : `fmt`は[`chars_format`](../charconv/chars_format.md)の列挙値のうちの一つであること。

これらが満たされない場合は未定義動作となる。

## 引数
- `first` -- 変換結果の文字列を出力する範囲の先頭。
- `last` -- 変換結果の文字列を出力する範囲の終端の次。
- `value` -- 文字列へ変換する値。
- `base` -- 整数の出力基数（n進数のn）指定、2進数から36進数まで。
- `fmt` -- 浮動小数点の出力フォーマット指定、[`chars_format`](../charconv/chars_format.md)のいずれか。
- `precision` -- 浮動小数点の出力精度（小数点以下の桁数）指定、`printf`において`%.nf, %.ne`などとしたときの`n`にあたる。

## 効果
- 全て : `value`の値を文字列へ変換し、結果文字列を`[fisrt, last)`に書き込む。
- (1) : `base`の値をnとすると、整数値をn進数の文字列へ変換する（ `value`が負なら`-`が先頭に付く）。10 < nの場合、10～36の値はアルファベットの小文字a～zがあてられる。
- (2)(3)(4) : Cロケールで`printf`によって行われたかのように変換する。フォーマット指定子は`%f,%e`どちらかを出力文字列が最も短くなるように（両者が同じなら`%f`が優先）、選択する。
- (5)(6)(7) : `fmt`によって指定されたフォーマット指定子を用いて、Cロケールで`printf`によって行われたかのように変換する。出力文字列が最も短くなるように変換される。
- (8)(9)(10) : `fmt`と`precision`によって指定されたフォーマット指定子と精度を用いて、Cロケールで`printf`によって行われたかのように変換する。

出力文字列が最も短くなるようにとは、小数点の前に少なくとも1桁あり、対応する[`from_chars`](../charconv/from_chars.md)関数によって値を正確に復元できるような最小の文字数、になることである。  
そのような文字列表現が複数ある場合、`value`の値との差が最も小さくなる物が選ばれ、それも複数あるときは[`std::round_to_nearest`](/reference/limits/float_round_style.md)に従った丸めによって一つを選択する。

なお、[`from_chars`](../charconv/from_chars.md)関数によって値を正確に復元できるのは両関数が同じ処理系で提供されているときにのみ保証される。

## 戻り値
[`to_chars_result`](../charconv/to_chars_result.md)の値。
- 成功した場合
  - `ptr` : 書き込まれた最後の文字の次の位置を指す（一般的なイテレータ範囲におけるendに相当）。
  - `ec` : `ec == errc{}`
- 失敗した場合
  - `ptr` : `ptr == last`、`[fisrt, last)`の状態は未規定。
  - `ec` : `ec == errc::value_too_large`

## 例外
投げない。

## 備考
(1)の関数は実装によって全ての整数型（符号付、無し）および`char`のオーバーロードが提供される。

## 例

```cpp example
#include <tuple>
#include <array>
#include <iostream>

int main()
{
}
```
* std::make_from_tuple[color ff0000]
* std::make_tuple[link ../tuple/make_tuple.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 update 7, update 9(full suport)


## 関連項目
- [`chars_format`](../charconv/chars_format.md)
- [`to_chars_result`](../charconv/to_chars_result.md)
- [`from_chars`](../charconv/from_chars.md)

## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)
- [P0682R1: Repairing elementary string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0682r1.html)