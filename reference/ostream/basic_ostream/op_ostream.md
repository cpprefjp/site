# operator<<
* ostream[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]

```cpp
// マニピュレータの実行
// 3つとも関数へのポインタを引数に取る。
basic_ostream&
  operator<<(basic_ostream& (*pf)(basic_ostream&));                       // (1) C++03
basic_ostream<CharT, Traits>&
  operator<<(basic_ios<CharT, Traits>& (*pf)(basic_ios<CharT, Traits>&)); // (2) C++03
basic_ostream<CharT, Traits>&
  operator<<(ios_base& (*pf)(ios_base&));                                 // (3) C++03

// bool値・数値・ポインタの書式化出力
basic_ostream& operator<<(bool n);                   // (4) C++03
basic_ostream& operator<<(short n);                  // (5) C++03
basic_ostream& operator<<(unsigned short n);         // (6) C++03
basic_ostream& operator<<(int n);                    // (7) C++03
basic_ostream& operator<<(unsigned int n);           // (8) C++03
basic_ostream& operator<<(long n);                   // (9) C++03
basic_ostream& operator<<(unsigned long n);          // (10) C++03
basic_ostream& operator<<(long long n);              // (11) C++11
basic_ostream& operator<<(unsigned long long n);     // (12) C++11
basic_ostream& operator<<(float f);                  // (13) C++03
basic_ostream& operator<<(double f);                 // (14) C++03
basic_ostream& operator<<(long double f);            // (15) C++03
basic_ostream& operator<<(extended-floating-point-type f); // (16) C++23
basic_ostream& operator<<(const void* p);            // (17) C++03
basic_ostream& operator<<(const volatile void* val); // (18) C++26
basic_ostream& operator<<(nullptr_t);                // (19) C++17

// ストリームバッファの非書式化出力
basic_ostream& operator<<(basic_streambuf<CharT, Traits>* sb); // (20) C++03
```
* extended-floating-point-type[link /reference/stdfloat.md]

## 概要

ストリームへの出力またはマニピュレータの実行を行う。

- (1)-(3) : マニピュレータを実行するオーバーロードそれ自体は、書式化出力関数・非書式化出力関数いずれにも該当しない
- (4)-(19) : 数値型（`bool`も含む）とポインタに対するオーバーロードは、書式化出力関数である
- (20) : `basic_streambuf`に対するオーバーロードは、非書式化出力関数である

## 効果

### (1)-(3) : マニピュレータの実行

1. `pf(*this)`を呼び出す。

### (4)-(18) : bool値・数値・ポインタの書式化出力

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない
1. `num_put::put`を使用して入力のパース・数値への変換を行う。実引数を渡すに際し、一部の型では以下のように型変換を行う
    - (5) `short`:
        - `flags()`に`hex`または`oct`が設定されていれば`static_cast<long>(static_cast<unsigned short>(n))`
        - それ以外では`static_cast<long>(n)`
    - (6) `unsigned short`: `static_cast<unsigned long>(n)`
    - (7) `int`:
        - `flags()`に`hex`または`oct`が設定されていれば`static_cast<long>(static_cast<unsigned int>(n))`
        - それ以外では`static_cast<long>(n)`
    - (8) `unsigned int`: `static_cast<unsigned long>(n)`
    - (13) `float`: `static_cast<double>(f)`
    - (16) 拡張浮動小数点数型:
        - 変換順位が`double`以下であれば、`static_cast<double>(f)`
        - そうでなく変換順位が`long double`以下であれば、`static_cast<long double>(f)`
        - そうでなければ実装定義の意味論を持ち、この演算子は条件付きサポートとなる
    - (18) `const volatile void*`:
        - `return operator<<(const_cast<const void*>(val));`
1. `num_put::put`から得られた`iostate`値を実引数にして`setstate`関数を呼び出す


### (19) : `nullptr_t`の出力

- C++17 : 実装定義の出力文字列`s`を、`return operator<<(s)`として渡した場合と等価である。


### (20) : ストリームバッファの非書式化出力

別のストリームバッファからの入力をストリームに出力する。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 仮引数`sb`がヌルポインタの場合、`setstate(badbit)`を呼び出して終了する。
1. 以下のいずれかを満たすまで、`sb`から文字を入力して`this`へ出力する。
    - EOFに達した。
    - 出力処理に失敗した（この場合、失敗したときの文字は入力側のストリームバッファに戻される）。
    - 例外が発生した。

入力がなされなかった場合、`setstate(failbit)`を呼び出す。


## 戻り値

`*this`


## 備考
- このクラスにはメンバ関数版の`operator<<`と非メンバ関数版の`operator<<`があるが、ロケールに依存して出力が変わる型へのオーバーロードが、メンバ関数版として定義される設計となっている。
    - 参照 : [N0470 A Draft for the Specification of the IOStream Classes](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/1994/N0470.asc)
- (16) : 実装はCV修飾されていない全ての拡張浮動小数点数型に対するオーバーロードを提供する


## 例
```cpp example
#include <iostream>

int main() {
  std::cout << 101 << std::endl;
}
```

### 出力例
```
101
```


## バージョン
### 言語
- C++98
- C++11: `long long`、`unsigned long long`を実引数として受け取るものが追加された


## 関連項目

- このほかの`<<`演算子関数
    - [文字・文字列の書式化出力、および、右辺値ストリームに対する出力](op_ostream_free.md)
    - [`std::sub_match`に関するもの](../../regex/sub_match/op_ostream.md)
    - [`std::error_code`に関するもの](../../system_error/error_code/op_ostream.md)
    - [`std::complex`に関するもの](../../complex/complex/op_ostream.md)
    - [`std::bitset`に関するもの](../../bitset/bitset/op_ostream.md)
    - [`std::basic_string`に関するもの](../../string/basic_string/op_ostream.md)
    - [`std::shared_ptr`に関するもの](../../memory/shared_ptr/op_ostream.md)
    - [`std::shuffle_order_engine`に関するもの](../../random/shuffle_order_engine/op_ostream.md)
    - [`std::gamma_distribution`に関するもの](../../random/gamma_distribution/op_ostream.md)
    - [`std::geometric_distribution`に関するもの](../../random/geometric_distribution/op_ostream.md)
    - [`std::extreme_value_distribution`に関するもの](../../random/extreme_value_distribution/op_ostream.md)
    - [`std::fisher_f_distribution`に関するもの](../../random/fisher_f_distribution/op_ostream.md)
    - [`std::mersenne_twister_engine`に関するもの](../../random/mersenne_twister_engine/op_ostream.md)
    - [`std::chi_squared_distribution`に関するもの](../../random/chi_squared_distribution/op_ostream.md)
    - [`std::exponential_distribution`に関するもの](../../random/exponential_distribution/op_ostream.md)
    - [`std::discrete_distribution`に関するもの](../../random/discrete_distribution/op_ostream.md)
    - [`std::subtract_with_carry_engine`に関するもの](../../random/subtract_with_carry_engine/op_ostream.md)
    - [`std::piecewise_constant_distribution`に関するもの](../../random/piecewise_constant_distribution/op_ostream.md)
    - [`std::poisson_distribution`に関するもの](../../random/poisson_distribution/op_ostream.md)
    - [`std::student_t_distribution`に関するもの](../../random/student_t_distribution/op_ostream.md)
    - [`std::bernoulli_distribution`に関するもの](../../random/bernoulli_distribution/op_ostream.md)
    - [`std::weibull_distribution`に関するもの](../../random/weibull_distribution/op_ostream.md)
    - [`std::binomial_distribution`に関するもの](../../random/binomial_distribution/op_ostream.md)
    - [`std::piecewise_linear_distribution`に関するもの](../../random/piecewise_linear_distribution/op_ostream.md)
    - [`std::uniform_real_distribution`に関するもの](../../random/uniform_real_distribution/op_ostream.md)
    - [`std::negative_binomial_distribution`に関するもの](../../random/negative_binomial_distribution/op_ostream.md)
    - [`std::discard_block_engine`に関するもの](../../random/discard_block_engine/op_ostream.md)
    - [`std::normal_distribution`に関するもの](../../random/normal_distribution/op_ostream.md)
    - [`std::cauchy_distribution`に関するもの](../../random/cauchy_distribution/op_ostream.md)
    - [`std::lognormal_distribution`に関するもの](../../random/lognormal_distribution/op_ostream.md)
    - [`std::linear_congruential_engine`に関するもの](../../random/linear_congruential_engine/op_ostream.md)
    - [`std::uniform_int_distribution`に関するもの](../../random/uniform_int_distribution/op_ostream.md)
    - [`std::independent_bits_engine`に関するもの](../../random/independent_bits_engine/op_ostream.md)
- 出力対象の型
    - [`basic_streambuf`](../../streambuf/basic_streambuf.md)


## 参照
- [N2114 `long long` Goes to the Library, Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2114.html)
- [LWG Issue 2221. No formatted output operator for `nullptr`](https://wg21.cmeerw.net/lwg/issue2221)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で拡張浮動小数点数型の`ostream`出力がサポートされた
- [P1147R1 Printing `volatile` Pointers](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1147r1.html)
    - C++26で`const volatile void*`のオーバーロードが追加された
