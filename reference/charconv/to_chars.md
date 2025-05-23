# to_chars
* charconv[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  //整数型用
  to_chars_result
    to_chars(char* first,
             char* last,
             /*see below*/ value,
             int base = 10);        // (1) C++17
  constexpr to_chars_result
    to_chars(char* first,
             char* last,
             integer-type value,
             int base = 10);        // (1) C++23

  //boolの変換は禁止
  to_chars_result
    to_chars(char* first,
             char* last,
             bool value,
             int base = 10) = delete; // C++20

  //精度、フォーマット指定なし
  to_chars_result
    to_chars(char* first,
             char* last,
             float value);               // (2) C++17からC++20まで
  to_chars_result
    to_chars(char* first,
             char* last,
             double value);              // (3) C++17からC++20まで
  to_chars_result
    to_chars(char* first,
             char* last,
             long double value);         // (4) C++17からC++20まで
  to_chars_result
    to_chars(char* first,
             char* last,
             floating-point-type value); // (5) C++23

  //精度指定なし
  to_chars_result
    to_chars(char* first,
             char* last,
             float value,
             chars_format fmt);          // (6) C++17からC++20まで
  to_chars_result
    to_chars(char* first,
             char* last,
             double value,
             chars_format fmt);          // (7) C++17からC++20まで
  to_chars_result
    to_chars(char* first,
             char* last,
             long double value,
             chars_format fmt);          // (8) C++17からC++20まで
  to_chars_result
    to_chars(char* first,
             char* last,
             floating-point-type value,
             chars_format fmt);          // (9) C++23

  //精度とフォーマットを指定
  to_chars_result
    to_chars(char* first,
             char* last,
             float value,
             chars_format fmt,
             int precision);             // (10) C++17からC++20まで
  to_chars_result
    to_chars(char* first,
             char* last,
             double value,
             chars_format fmt,
             int precision);             // (11) C++17からC++20まで
  to_chars_result
    to_chars(char* first,
             char* last,
             long double value,
             chars_format fmt,
             int precision);             // (12) C++17からC++20まで
  to_chars_result
    to_chars(char* first,
             char* last,
             floating-point-type value,
             chars_format fmt,
             int precision);             // (13) C++23
}
```
* see below[italic]
* integer-type[italic]
* to_chars_result[link to_chars_result.md]

## 概要
与えられた数値（`value`）を文字列へ変換し、`[first, last)`内へ出力する。  
変換に際し、メモリ確保を行わず例外を投げることもない。

C++標準はこれら関数の実装の詳細について何も規定しない。これは、各実装において可能な最も高速なアルゴリズムが選択されることを意図しての事である。

- (1) : 整数型に対するオーバーロード
- (2) : `float`に対するオーバーロード (精度・フォーマット指定なし)
- (3) : `double`に対するオーバーロード (精度・フォーマット指定なし)
- (4) : `long double`に対するオーバーロード (精度・フォーマット指定なし)
- (5) : 浮動小数点数型に対するオーバーロード (精度・フォーマット指定なし)
- (6) : `float`に対するオーバーロード (精度指定なし)
- (7) : `double`に対するオーバーロード (精度指定なし)
- (8) : `long double`に対するオーバーロード (精度指定なし)
- (9) : 浮動小数点数型に対するオーバーロード (精度指定なし)
- (10) : `float`に対するオーバーロード (精度・フォーマット指定)
- (11) : `double`に対するオーバーロード (精度・フォーマット指定)
- (12) : `long double`に対するオーバーロード (精度・フォーマット指定)
- (13) : 浮動小数点数型に対するオーバーロード (精度・フォーマット指定)

## 要件
- 全て : 出力イテレータ範囲`[first, last)`は有効な範囲であること（charのオブジェクトが構築済みであり、連続していること）。
- (1) : `base`は2～36までの値であること。
- (6)-(13)  : `fmt`は[`chars_format`](../charconv/chars_format.md)の列挙値のうちの一つであること。

## 引数
- `first` -- 変換結果の文字列を出力する範囲の先頭ポインタ。
- `last` -- 変換結果の文字列を出力する範囲の終端ポインタ。
- `value` -- 文字列へ変換する値。
- `base` -- 整数の出力基数（n進数のn）指定、2進数から36進数まで。
- `fmt` -- 浮動小数点数の出力フォーマット指定、[`chars_format`](../charconv/chars_format.md)のいずれか。
- `precision` -- 浮動小数点数の出力精度（小数点以下の桁数）指定、`printf`において`%.nf, %.ne`などとしたときの`n`にあたる。

## 効果
- 全て : `value`の値を文字列へ変換し、結果文字列を`[first, last)`に書き込む。  
    出力文字列が`[first, last)`に収まらない場合は失敗する。

- (1) : `base`の値をnとすると、整数値をn進数の文字列へ変換する（ `value`が負なら`-`が先頭に付く）。  
    10 < nの場合、10～35の値はアルファベットの小文字a～zがあてられる。  
    桁数を合わせるために左側を0をパディングすること（0埋め）は行われない。
    
- (2), (3), (4), (5) : Cロケールで`printf`によって行われたかのように浮動小数点数を文字列へ変換する。  
    フォーマット指定子は`%f,%e`どちらかを出力文字列が最も短くなるように（両者が同じなら`%f`が優先）選択する。
    
- (6), (7), (8), (9) : `fmt`によって指定されたフォーマット指定子を用いて、Cロケールで`printf`によって行われたかのように浮動小数点数を文字列へ変換する。  
    出力文字列が最も短くなるように変換される。  
    `chars_format::general`が指定された場合は(2), (3), (4), (5)と同等。
    
- (10), (11), (12), (13) : `fmt`と`precision`によって指定されたフォーマット指定子と精度を用いて、Cロケールで`printf`によって行われたかのように浮動小数点数を文字列へ変換する。  
    精度は、`chars_format::fixed`では小数点以下の正確な桁数、`chars_format::scientific`と`chars_format::hex`では最小の桁数を表す。  
    `chars_format::general`が指定された場合は次のようになる。
    - 指数表記したときの指数を`X`、`precision`と1の大きいほうを`P`とする。
    - `P > X ≥ −4` のとき、精度 `P - 1 - X` で固定小数形式を使用する。
    - それ以外の場合は、精度 `P - 1` で指数形式を使用する。

出力文字列が最も短くなるようにとは、小数点の前に少なくとも1桁あり、対応する[`from_chars`](../charconv/from_chars.md)関数によって値を正確に復元できるような最小の文字数、になることである。  
そのような文字列表現が複数ある場合、`value`の値との差が最も小さくなる物が選ばれ、それも複数あるときは[`std::round_to_nearest`](/reference/limits/float_round_style.md)に従った丸めによって一つを選択する。

なお、[`from_chars`](../charconv/from_chars.md)関数によって値を正確に復元できるのは両関数が同じ処理系で提供されているときにのみ保証される。

全てのオーバーロードにおいて、変換に失敗した場合の`[first, last)`の状態は未規定。

## 戻り値
[`to_chars_result`](../charconv/to_chars_result.md)の値。

- 成功した場合
    - `ptr` : 書き込まれた最後の文字の次の位置を指す（一般的なイテレータ範囲におけるendに相当）。
    - `ec` : `ec == errc{}`
- 失敗した場合
    - `ptr` : `ptr == last`
    - `ec` : `ec == ` [`errc::value_too_large`](/reference/system_error/errc.md)

どちらの場合も`*ptr == '\0'`や`*(--ptr) == '\0'`は保証されない。すなわち、変換後文字列はnull終端されない。

## 例外
投げない。

## 備考
- MSVCでは浮動小数点数→10進文字列変換の実装に[Ryu](https://github.com/ulfjack/ryu)というアルゴリズムを利用している。
- (1) : 実装によって全ての整数型（符号付、無し）および`char`のオーバーロードが提供される
- (5), (9), (13) : 浮動小数点数型は拡張浮動小数点数型を含む


## 例
### 基本の使用例 (C++17)
```cpp example
#include <iostream>
#include <charconv>

int main()
{
  char out[50]{};
  auto begin = std::begin(out);
  auto end = std::end(out);

  //(1) 10進数文字列へ変換
  if (auto [ptr, ec] = std::to_chars(begin, end, 10); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(1) 2進数文字列へ変換
  if (auto [ptr, ec] = std::to_chars(begin, end, 65535, 2); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(1) 36進数文字列へ変換
  if (auto [ptr, ec] = std::to_chars(begin, end, 35, 36); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }

  //リウヴィル数
  constexpr double l = 0.11000100000000000000000100000000000;

  //(3) 精度・フォーマット指定なしの浮動小数点数変換
  if (auto [ptr, ec] = std::to_chars(begin, end, l); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }

  //(7) 精度指定なしの浮動小数点数変換、指数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::scientific); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(7) 精度指定なしの浮動小数点数変換、固定小数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::fixed); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(7) 精度指定なしの浮動小数点数変換、16進指数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::hex); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }

  //(11) 精度指定ありの浮動小数点数変換、指数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::scientific, 16); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(11) 精度指定ありの浮動小数点数変換、固定小数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::fixed, 16); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(11) 精度指定ありの浮動小数点数変換、16進指数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::hex, 16); ec == std::errc{}) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
}
```
* std::to_chars[color ff0000]
* std::chars_format[link chars_format.md]
* std::errc[link /reference/system_error/errc.md]

#### 出力例（VS2019 16.5 preview 1）
```
10
1111111111111111
z
0.110001
1.10001e-01
0.110001
1.c29068986fcdfp-4
1.1000100000000000e-01
0.1100010000000000
1.c29068986fcdf000p-4
```

### 基本の使用例 (C++26)
```cpp example
#include <iostream>
#include <charconv>

int main()
{
  char out[50]{};
  auto begin = std::begin(out);
  auto end = std::end(out);

  //(1) 10進数文字列へ変換
  if (auto [ptr, ec] = std::to_chars(begin, end, 10)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(1) 2進数文字列へ変換
  if (auto [ptr, ec] = std::to_chars(begin, end, 65535, 2)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(1) 36進数文字列へ変換
  if (auto [ptr, ec] = std::to_chars(begin, end, 35, 36)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }

  //リウヴィル数
  constexpr double l = 0.11000100000000000000000100000000000;

  //(3) 精度・フォーマット指定なしの浮動小数点数変換
  if (auto [ptr, ec] = std::to_chars(begin, end, l)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }

  //(7) 精度指定なしの浮動小数点数変換、指数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::scientific)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(7) 精度指定なしの浮動小数点数変換、固定小数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::fixed)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(7) 精度指定なしの浮動小数点数変換、16進指数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::hex)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }

  //(11) 精度指定ありの浮動小数点数変換、指数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::scientific, 16)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(11) 精度指定ありの浮動小数点数変換、固定小数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::fixed, 16)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
  //(11) 精度指定ありの浮動小数点数変換、16進指数表記
  if (auto [ptr, ec] = std::to_chars(begin, end, l, std::chars_format::hex, 16)) {
    std::cout << std::string_view(begin, ptr - begin) << std::endl;
  }
  else {
    std::cout << "conversion failed." << std::endl;
  }
}
```

#### 出力例
```
10
1111111111111111
z
0.110001
1.10001e-01
0.110001
1.c29068986fcdfp-4
1.1000100000000000e-01
0.1100010000000000
1.c29068986fcdf000p-4
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0(整数のみ) [mark verified], 14.0(full support) [mark verified]
- [GCC](/implementation.md#gcc): 8.0(整数のみ) [mark verified], 11.1(full support) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 7(整数のみ) [mark verified], update 9(full support) [mark verified]

## 関連項目
- [`chars_format`](../charconv/chars_format.md)
- [`to_chars_result`](../charconv/to_chars_result.md)
- [`from_chars`](../charconv/from_chars.md)
- [C++26 条件式での構造化束縛の使用を許可](/lang/cpp26/structured_binding_declaration_as_a_condition.md)


## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)
- [P0682R1: Repairing elementary string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0682r1.html)
- [LWG Issue 3266. `to_chars(bool)` should be deleted](https://wg21.cmeerw.net/lwg/issue3266)
- [Visual Studio 2017 version 15.9.0 - Visual Studio 2017 version 15.9 Release Notes](https://docs.microsoft.com/en-us/visualstudio/releasenotes/vs2017-relnotes#-c)
- [P2291R3: Add Constexpr Modifiers to Functions to_chars and from_chars for Integral Types in `<charconv>` Header](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2291r3.pdf)
    - C++23での(1)constexpr指定
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で拡張浮動小数点数型に対応した
- [C言語リファレンス - fprintf](https://ja.cppreference.com/w/c/io/fprintf)
