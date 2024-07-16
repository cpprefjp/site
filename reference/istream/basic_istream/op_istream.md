# operator>>
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
// マニピュレータ
// 3つとも関数へのポインタを引数に取る。
basic_istream<CharT, Traits>&
  operator>>(basic_istream<CharT, Traits>& (*pf)(basic_istream<CharT, Traits>&)); // (1) C++03
basic_istream<CharT, Traits>&
  operator>>(basic_ios<CharT, Traits>& (*pf)(basic_ios<CharT, Traits>&));         // (2) C++03
basic_istream<CharT, Traits>&
  operator>>(ios_base& (*pf)(ios_base&));                                         // (3) C++03

// bool値・数値・ポインタ
basic_istream<CharT, Traits>& operator>>(bool& n);               // (4) C++03
basic_istream<CharT, Traits>& operator>>(short& n);              // (5) C++03
basic_istream<CharT, Traits>& operator>>(unsigned short& n);     // (6) C++03
basic_istream<CharT, Traits>& operator>>(int& n);                // (7) C++03
basic_istream<CharT, Traits>& operator>>(unsigned int& n);       // (8) C++03
basic_istream<CharT, Traits>& operator>>(long& n);               // (9) C++03
basic_istream<CharT, Traits>& operator>>(unsigned long& n);      // (10) C++03
basic_istream<CharT, Traits>& operator>>(long long& n);          // (11) C++11
basic_istream<CharT, Traits>& operator>>(unsigned long long& n); // (12) C++11
basic_istream<CharT, Traits>& operator>>(float& f);              // (13) C++03
basic_istream<CharT, Traits>& operator>>(double& f);             // (14) C++03
basic_istream<CharT, Traits>& operator>>(long double& f);        // (15) C++03
basic_istream<CharT, Traits>&
  operator>>(extended-floating-point-type& f);                   // (16) C++23
basic_istream<CharT, Traits>& operator>>(void*& p);              // (17) C++03

// ストリームバッファ
basic_istream<CharT, Traits>&
  operator>>(basic_streambuf<char_type, Traits>* sb); // (18) C++03
```

## 概要

ストリームからの入力またはマニピュレータの実行を行う。

- (1)-(3) : マニピュレータを実行するオーバーロードそれ自体は、書式化入力関数・非書式化入力関数いずれにも該当しない。
    - マニピュレータが書式化入力関数・非書式化入力関数であるということはあり得る（例: [`ws`](../ws.md)）。
- (4)-(17) : 数値型（`bool`も含む）と`void*`に対するオーバーロードは、書式化入力関数である。
- (18) : `basic_streambuf`に対するオーバーロードは、非書式化入力関数である。

## 効果

### (1)-(3) : マニピュレータ

1. `pf(*this)`を呼び出す。

### (4)-(17) : bool値・数値・ポインタ

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない
1. `num_get::get`を使用して入力のパース・数値への変換を行う。
    - `int`と`short` : `long`を実引数に取るものを使用する。結果が`int`と`short`それぞれの範囲外の値になった場合、`failbit`を追加する
    - 拡張浮動小数点数型 :
        - 拡張浮動小数点数型の変換順位が`long double`より大きい場合、条件付きサポートとなる
        - そうでない場合、対応する標準浮動小数点数型`FP`を以下のように定義し、`FP`型の値として値を入力したあと、拡張浮動小数点数型にキャストして代入する
            - 拡張浮動小数点数型の変換順位が`float`以下の場合、`FP`を`float`とする
            - そうでなく、拡張浮動小数点数型の変換順位が`double`以下の場合、`FP`を`double`とする
            - そうでない場合、`FP`を`long double`とする
1. `num_get::get`から得られた`iostate`値を実引数にして`setstate`関数を呼び出す

### (18) : ストリームバッファ

ストリームからの入力を別のストリームバッファに出力する。

1. 仮引数`sb`がヌルポインタの場合、`setstate(failbit)`を呼び出して終了する
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない
1. 以下のいずれかを満たすまで、`this`内のストリームバッファから文字を入力して`sb`へ出力する
    - EOFに達した
    - 出力処理に失敗した（この場合、失敗したときの文字は入力側のストリームバッファに戻される）
    - 例外が発生した

入力がなされなかった場合、`setstate(failbit)`を呼び出す。


## 戻り値

`*this`

## 例（数値）
```cpp example
#include <iostream>

int main() {
  int x;
  // 好きな整数を入力してください
  if (std::cin >> x) {
    std::cout << x << "が入力されました。" << std::endl;
  }
}
```
* std::cin[link /reference/iostream/cin.md]

### 入力
```
1
```

### 出力
```
1が入力されました。
```

## 実装例
TBD

## バージョン
### 言語
- C++98
- C++11: `long long`、`unsigned long long` を実引数として受け取るものが追加された

## 関連項目

- このほかの`>>`演算子関数
    - [文字(`char`等)・文字列(`char*`等)、および、右辺値ストリームに関するもの](op_istream_free.md)
    - [`std::basic_string`に関するもの](../../string/basic_string/op_istream.md)
- 入力対象の型
    - [`basic_streambuf`](../../streambuf/basic_streambuf.md)


## 参照
- [N2114 `long long` Goes to the Library, Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2114.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で拡張浮動小数点数型の`istream`入力がサポートされた
