# operator<< (非メンバ関数)
* ostream[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // 文字の書式化出力
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os, CharT c);              // (1)
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os, char c);               // (2)
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<char, Traits>& os, char c);                 // (3)
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<char, Traits>& os, unsigned char c);        // (4)
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<char, Traits>& os, signed char c);          // (5)

  // 文字列の書式化出力
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os, const CharT* s);       // (6)
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os, const char* s);        // (7)
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<char, Traits>& os, const char* s);          // (8)
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<char, Traits>& os, const unsigned char* s); // (9)
  template<class Traits>
  basic_ostream<char, Traits>& operator<<(basic_ostream<char, Traits>& os, const signed char* s);   // (10)

  // 右辺値参照ストリームへの出力 (C++11)
  template<class CharT, class Traits, class T>
  basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>&& os, const T& x);          // (11) C++11 から
}
```

## 概要

ストリームへの出力を行う。

- 文字に対するオーバーロードは、書式化出力関数である。
- 文字列に対するオーバーロードは、書式化出力関数である。

## 効果

### (1)～(5) 文字の書式化出力

文字 `c` を出力ストリーム `os` に出力する。この際、`os` に設定されている幅、埋め文字、および、整列方向に従う。  
なお、(2) の形式（`os` の文字型（`char_type`）が `char` 以外で `c` が `char` ）の時は、`c` を直接出力するのではなく、`os.`[`widen`](../../ios/basic_ios/widen.md)`(c)` を出力する。  
出力後、幅指定は `0` にリセットされる。

### (6)～(10) 文字列の書式化出力

ヌル終端文字列 `s` を出力ストリーム `os` に出力する。この際、`os` に設定されている幅、埋め文字、および、整列方向に従う。  
出力する文字列の長さは以下で求める。

- (6) と (8) の形式：`Traits::length(s)`
- (7) の形式：`std::`[`char_traits`](../../string/char_traits.md)`<char>::`[`length`](../../string/char_traits/length.md)`(s)`
- (9) と (10) の形式：`Traits::length(reinterpret_cast<const char*>(s))`

なお、(7) の形式（`os` の文字型（`char_type`）が `char` 以外で `s` が `const char*`）の時は、`s` の各文字 `c` を直接出力するのではなく、`os.`[`widen`](../../ios/basic_ios/widen.md)`(c)` を出力する。  
出力後、幅指定は `0` にリセットされる。

### (11) 右辺値参照ストリームへの出力 (C++11)

`os << x`を実行する。  
このオーバーロードは、一時オブジェクトなどに対して`<<`演算子を利用可能にするためのものである。


## 戻り値

`os`


## 備考
- (11) の形式は C++11 から追加されたが、より使いやすくするための変更が提案されている。  
	[LWG1203. More useful rvalue stream insertion](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-active.html#1203)
- (3)、および、(8) の形式は、オーバーロード解決時の曖昧さ解消のために存在する。  
	（これらが存在しないと、`CharT` が `char` 型の場合に、(1) と (2)、あるいは (6) と (7) が同じ優先順位となりオーバーロード解決に失敗してしまう）


## 例

### (1)、(2)、(6)、(7) の例
```cpp
#include <iostream>
#include <iomanip>

int main()
{
  std::wcout << std::left << std::setfill(L'+');

  std::wcout << std::setw(10) << L'C' << std::endl;
  std::wcout << std::setw(10) << 'C' << std::endl;

  std::wcout << std::setw(10) << L"cpprefjp" << std::endl;
  std::wcout << std::setw(10) << "cpprefjp" << std::endl;
}
```
* std::wcout[link ../../iostream/wcout.md.nolink]
* std::left[link ../../ios/left.md]
* std::setfill[link ../../iomanip/setfill.md.nolink]
* std::setw[link ../../iomanip/setw.md.nolink]

### 出力
```
C+++++++++
C+++++++++
cpprefjp++
cpprefjp++
```

### (3)～(5)、(8)～(10) の例
```cpp
#include <iostream>
#include <iomanip>

int main()
{
  std::cout << std::left << std::setfill('+');

  std::cout << std::setw(10) << 'C' << std::endl;
  std::cout << std::setw(10) << static_cast<signed char>('C') << std::endl;
  std::cout << std::setw(10) << static_cast<unsigned char>('C') << std::endl;

  std::cout << std::setw(10) << "cpprefjp" << std::endl;
  std::cout << std::setw(10) << reinterpret_cast<const signed char*>("cpprefjp") << std::endl;
  std::cout << std::setw(10) << reinterpret_cast<const unsigned char*>("cpprefjp") << std::endl;
}
```
* std::left[link ../../ios/left.md]
* std::setfill[link ../../iomanip/setfill.md.nolink]
* std::setw[link ../../iomanip/setw.md.nolink]

### 出力
```
C+++++++++
C+++++++++
C+++++++++
cpprefjp++
cpprefjp++
cpprefjp++
```

### (11) の例
```cpp
#include <fstream>
#include <string>
#include <iostream>

int main()
{
  std::ofstream("test.txt") << "cpprefjp" << std::endl;

  std::string s;
  std::ifstream ifs("test.txt");
  ifs >> s;
  std::cout << s << std::endl;
}
```
* std::ofstream[link ../../fstream/basic_ofstream.md.nolink]
* std::ifstream[link ../../fstream/basic_ifstream.md.nolink]

### 出力
```
cpprefjp
```

なお、この例は C++03 でもコンパイル・実行可能だが、その場合は出力に謎の 16 進数が出力される。  
これは、C++03 では `"cpprefjp"` の出力の際に `operator<<(basic_ostream<char, Traits>&, const char*)` ではなく `basic_ostream<char, Traits>::operator<<(const void*)` が呼び出されるためである。  
（`operator<<(basic_ostream<char, Traits>&, const char*)` は左辺に `const` ではない参照を必要とするため `ofstream` の一時オブジェクトを受け取れないが、`basic_ostream<char, Traits>::operator<<(const void*)` はメンバ関数であるため `ofstream` の一時オブジェクトに対しても呼び出す事が可能）


## 実装例
TBD

## バージョン
### 言語
- C++98
- C++11: ストリームへの右辺値参照を実引数として受け取るものが追加された


## 関連項目

- このほかの`<<`演算子関数
    - [`bool`値・数値・ポインタ、ストリームバッファ、マニピュレータに対するもの](op_ostream.md)
	- [`std::sub_match`に関するもの](../../regex/sub_match/op_ostream.md)
	- [`std::system_error`に関するもの](../../system_error/op_ostream.md)
	- [`std::complex`に関するもの](../../complex/op_ostream.md)
	- [`std::bitset`に関するもの](../../bitset/op_ostream.md)
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
