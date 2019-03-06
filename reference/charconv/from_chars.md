# from_chars
* charconv[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  //整数型用
  from_chars_result from_chars(const char* first, const char* last,
                               /*see below*/& value, int base = 10);      // (1)

  //浮動小数点型用
  from_chars_result from_chars(const char* first, const char* last, float& value,
                               chars_format fmt = chars_format::general); // (2)
  from_chars_result from_chars(const char* first, const char* last, double& value,
                               chars_format fmt = chars_format::general); // (3)
  from_chars_result from_chars(const char* first, const char* last, long double& value,
                               chars_format fmt = chars_format::general); // (4)
}
```

## 概要
与えられた`[fisrt, last)`内の文字列から、オーバーロードと基数・フォーマット指定によって決まるパターンにマッチングする最初の数字文字列を見つけて、数値へ変換する。  
変換に際し、メモリ確保を行わず例外を投げることもない。

C++標準はこれら関数の実装の詳細について何も規定しない。これは、各実装において可能な最も高速なアルゴリズムが選択されることを意図しての事である。

## 要件
- 全て : 出力範囲`[fisrt, last)`は有効な範囲であること（charのオブジェクトが構築済みであり、連続していること）。
- (1) : `base`は2～36までの値であること。
- (2)～(4)  : `fmt`は[`chars_format`](../charconv/chars_format.md)の列挙値のうちの一つであること。

## 引数
- `first` -- 入力文字列の先頭のポインタ。
- `last` -- 入力文字列の終端の次を指すポインタ。
- `value` -- 変換結果を出力する変数。
- `base` -- 入力文字列の整数の基数（n進数のn）指定、2進数から36進数まで。
- `fmt` -- 入力文字列の浮動小数点数のフォーマット指定、[`chars_format`](../charconv/chars_format.md)のいずれか。

## 効果
- 全て : `[fisrt, last)`からパターンにマッチする文字列を探し、それを変換した数値を`value`に書き込む。
- (1) : `base`の値をnとすると、n進数の数字列を10進整数値へ変換する。  
`base`の値を基数としたCロケールによる`strtol`で変換する際と同様のパターンを用いる。  
`value`の型が符号付である場合にのみ`-`は考慮されるが、`+`や16進数の`0x`等の他の記号は考慮されない。
- (2)～(4) : 浮動小数点数字列を浮動小数点数へ変換する。  
Cロケールによる`strtod`で変換する際と同様のパターンを用いる。  
数字の先頭の符号は`-`はのみが考慮され、`+`等は無視される。  
結果の値は[`std::round_to_nearest`](/reference/limits/float_round_style.md)に従って丸めによって一つの値が選択される。  
また、`fmt`に`chars_­format​::general`がセットされておらず（`​scientific`と`fixed`が同時にセットされておらず）
  - `fmt`に`chars_­format​::​scientific`がセットされているなら指数部は必須。そうでないならあっても無くてもいい。
  - `fmt`に`chars_­format​::fixed`がセットされているなら指数部は現れてはいけない。
  - `fmt`に`chars_­format​::hex`がセットされている場合に数字列の先頭に`0x, 0X`があると正しく変換されない  
  `0x123`という文字列が値`0`と残りの文字列`x123`としてパースされる。

## 戻り値
[`from_chars_result`](../charconv/from_chars_result.md)の値。
- 成功した場合
  - `ptr` : 指定されたパターンに一致しなかった文字列の最初の文字の位置。全てが一致した場合は`ptr == last`
  - `ec` : `ec == errc{}`
- 失敗した場合
  - `ptr` : `ptr == first`、`value`は変更されない。
  - `ec` : 
    - パターンにマッチする文字列が見つからない場合、`ec == ` [`errc::invalid_­argument`](/reference/system_error/errc.md)
    - 変換した結果の値が`value`の型では表現できない場合、`ec == ` [`errc::result_­out_­of_­range`](/reference/system_error/errc.md)

## 例外
投げない。

## 備考
(1)の関数は実装によって全ての整数型（符号付、無し）および`char`の参照型のオーバーロードが提供される。

## 例

```cpp example
#include <iostream>
#include <charconv>

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
- [Clang](/implementation.md#clang): 7.0(整数のみ)
- [GCC](/implementation.md#gcc): 8.0(整数のみ)
- [Visual C++](/implementation.md#visual_cpp): 2017 update 7(整数のみ), update 9(full suport)


## 関連項目
- [`chars_format`](../charconv/chars_format.md)
- [`from_chars_result`](../charconv/from_chars_result.md)
- [`to_chars`](../charconv/to_chars.md)

## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)
- [P0682R1: Repairing elementary string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0682r1.html)
- [How to Use The Newest C++ String Conversion Routines - std::from_chars - Bartek's coding blog ](https://www.bfilipek.com/2018/12/fromchars.html)