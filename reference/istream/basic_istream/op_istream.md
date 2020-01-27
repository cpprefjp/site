# operator>>
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
// マニピュレータ
// 3つとも関数へのポインタを引数に取る。
basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& (*pf)(basic_istream<CharT, Traits>&));
basic_istream<CharT, Traits>& operator>>(basic_ios<CharT, Traits>& (*pf)(basic_ios<CharT, Traits>&));
basic_istream<CharT, Traits>& operator>>(ios_base& (*pf)(ios_base&));

// bool値・数値・ポインタ
basic_istream<CharT, Traits>& operator>>(bool& n);
basic_istream<CharT, Traits>& operator>>(short& n);
basic_istream<CharT, Traits>& operator>>(unsigned short& n);
basic_istream<CharT, Traits>& operator>>(int& n);
basic_istream<CharT, Traits>& operator>>(unsigned int& n);
basic_istream<CharT, Traits>& operator>>(long& n);
basic_istream<CharT, Traits>& operator>>(unsigned long& n);
basic_istream<CharT, Traits>& operator>>(long long& n); // C++11
basic_istream<CharT, Traits>& operator>>(unsigned long long& n); // C++11
basic_istream<CharT, Traits>& operator>>(float& f);
basic_istream<CharT, Traits>& operator>>(double& f);
basic_istream<CharT, Traits>& operator>>(long double& f);
basic_istream<CharT, Traits>& operator>>(void*& p);

// ストリームバッファ
basic_istream<CharT, Traits>& operator>>(basic_streambuf<char_type, Traits>* sb);
```

## 概要

ストリームからの入力またはマニピュレータの実行を行う。

- マニピュレータを実行するオーバー�ードそれ自体は、書式化入力関数・非書式化入力関数いずれにも該当しない。
    - マニピュレータが書式化入力関数・非書式化入力関数であるということはあり得る（例: [`ws`](../ws.md)）。
- 数値型（`bool`も含む）と`void*`に対するオーバー�ードは、書式化入力関数である。
- `basic_streambuf`に対するオーバー�ードは、非書式化入力関数である。

## 効果

### マニピュレータ

1. `pf(*this)`を呼び出す。

### bool値・数値・ポインタ

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. `num_get::get`を使用して入力のパース・数値への変換を行う。
    - ただし、`int`と`short`の場合は、`long`を実引数に取るものを使用する。結果が`int`と`short`それぞれの範囲外の値になった場合、`failbit`を追加する。
1. `num_get::get`から得られた`iostate`値を実引数にして`setstate`関数を呼び出す。

### ストリームバッファ

ストリームからの入力を別のストリームバッファに出力する。

1. 仮引数`sb`がヌルポインタの場合、`setstate(failbit)`を呼び出して終了する。
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 以下のいずれかを満たすまで、`this`内のストリームバッファから文�を入力して`sb`へ出力する。
    - EOFに達した。
    - 出力処理に失敗した（この場合、失敗したときの文�は入力側のストリームバッファに戻される）。
    - 例外が発生した。

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

- このほかの`>>`演算�関数
    - [文�(`char`�)・文�列(`char*`�)、および、右辺値ストリームに関するもの](op_istream_free.md)
    - [`std::basic_string`に関するもの](../../string/basic_string/op_istream.md)
- 入力対象の型
    - [`basic_streambuf`](../../streambuf/basic_streambuf.md)


## 参照
- [N2114 `long long` Goes to the Library, Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2114.html)

