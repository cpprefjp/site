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
    数字列の前にあって良いのは`-`符号のみである（`+`やスペース含めてその他の文字から始まる場合は必ず失敗する）。  
    数字列の途中でスペースが現れた場合、そこでマッチングは終了する（数字列中のスペース読み飛ばしをしない）。
    
- (1) : `base`の値をnとすると、n進数の数字列を10進整数値へ変換する。  
    nを基数としたCロケールによる`strtol`で変換する際と同様のパターンを用いる。  
    ただし、`value`の型が符号付である場合にのみ`-`は考慮され、`+`や16進数の`0x`等の他の記号は考慮されない。
    
- (2)～(4) : 浮動小数点数字列を浮動小数点数へ変換する。  
    Cロケールによる`strtod`で変換する際と同様のパターンを用いる。ただし、以下の違いがある。  
    数字の先頭の符号は`-`のみが考慮され、`+`等は考慮されない。  
    また、`fmt`に`chars_format::general`が設定されておらず（`scientific`と`fixed`が同時に設定されておらず）
    - `fmt`に`chars_format::scientific`が設定されているなら指数部は必須。そうでないならあっても無くてもいい。
    - `fmt`に`chars_format::fixed`が設定されているなら指数部は現れてはならない。
    - `fmt`に`chars_format::hex`が設定されている場合に数字列の先頭に`0x, 0X`があると正しく変換されない  
        - `0x123`という文字列が値`0`と残りの文字列`x123`としてパースされる。
  
  結果の値は[`std::round_to_nearest`](/reference/limits/float_round_style.md)に従った丸めによって一つの値が選択される。

なお、[`to_chars`](../charconv/to_chars.md)関数によって値を正確に復元できるのは両関数が同じ処理系で提供されているときにのみ保証される。

全てのオーバーロードにおいて、変換に失敗した場合に`value`の値は変更されない。

## 戻り値
[`from_chars_result`](../charconv/from_chars_result.md)の値。

- 成功した場合
    - `ptr` : 指定されたパターンに一致しなかった最初の文字の位置。全てが一致した場合は`ptr == last`
    - `ec` : `ec == errc{}`
- 失敗した場合
    - `ptr` : `ptr == first`
    - `ec` : 
        - パターンにマッチする文字列が見つからない場合、`ec == ` [`errc::invalid_argument`](/reference/system_error/errc.md)
        - 変換した結果の値が`value`の型では表現できない場合、`ec == ` [`errc::result_out_of_range`](/reference/system_error/errc.md)

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
  {
    const char str[] = "00000123456789 is decimal";
    int value{};

    //(1) 10進数文字列からintへ変換
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }

  {
    const char str[] = "1111111111111111 is (65535)_10";
    int value{};

    //(1) 2進数文字列からintへ変換
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value, 2); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }

  {
    const char str[] = "Z is (35)_10";
    int value{};

    //(1) 36進数文字列からintへ変換
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value, 36); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }

  {
    const char str[] = "255";
    char value{};

    //(1) 失敗する例 MSVCにおけるcharの範囲は-128～127
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }

  std::cout << std::setprecision(16);

  {
    const char str[] = "3.1415926535897932384626433832795 is pi";
    double value{};

    //(3) 固定小数表記文字列からdoubleへ変換
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }

  {
    const char str[] = "1.10001e-01 is Liouville number";
    double value{};

    //(3) 指数表記文字列からdoubleへ変換
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }

  {
    const char str[] = "1.c29068986fcdf000p-4 is Liouville number";
    double value{};

    //(3) 16進指数表記文字列からdoubleへ変換
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value, std::chars_format::hex); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }

  {
    const char str[] = " 3.1415926535897932384626433832795 is pi";
    double value{};

    //(3) 失敗する例 ホワイトスペース読み飛ばし
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }

  {
    const char str[] = "NaN";
    double value{};

    //(3) NaNの読み取り
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }

  {
    const char str[] = "-INF";
    double value{};

    //(3) INFの読み取り
    if (auto [ptr, ec] = std::from_chars(std::begin(str), std::end(str), value); ec == std::errc{}) {
      std::cout << value << std::endl;
    }
    else {
      std::cout << "conversion failed." << std::endl;
    }
  }
}
```
* std::from_chars[color ff0000]

### 出力例（VS2019 preview4.1）
```
123456789
65535
35
conversion failed.
3.141592653589793
0.110001
0.110001
conversion failed.
nan
-inf
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0(整数のみ)
- [GCC](/implementation.md#gcc): 8.0(整数のみ)
- [Visual C++](/implementation.md#visual_cpp): 2017 update 7(整数のみ), update 9(full support)


## 関連項目
- [`chars_format`](../charconv/chars_format.md)
- [`from_chars_result`](../charconv/from_chars_result.md)
- [`to_chars`](../charconv/to_chars.md)

## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)
- [P0682R1: Repairing elementary string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0682r1.html)
- [How to Use The Newest C++ String Conversion Routines - std::from_chars - Bartek's coding blog ](https://www.bfilipek.com/2018/12/fromchars.html)
