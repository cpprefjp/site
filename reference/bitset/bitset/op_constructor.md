# コンストラクタ
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bitset();                                          // (1) C++03
constexpr bitset() noexcept;                       // (1) C++11

bitset(unsigned long val);                         // (2) C++03
constexpr bitset(unsigned long long val) noexcept; // (2) C++11

template <class CharT, class Traits, class Allocator>
explicit bitset(
  const basic_string<CharT, Traits, Allocator>& str,
  typename basic_string<CharT, Traits, Allocator>::size_type pos = 0,
  typename basic_string<CharT, Traits, Allocator>::size_type n =
    basic_string<CharT, Traits, Allocator>::npos);  // (3) C++03

template <class CharT, class Traits, class Allocator>
explicit bitset(
  const basic_string<CharT, Traits, Allocator>& str,
  typename basic_string<CharT, Traits, Allocator>::size_type pos = 0,
  typename basic_string<CharT, Traits, Allocator>::size_type n =
    basic_string<CharT, Traits, Allocator>::npos,
  CharT zero = CharT('0'), CharT one = CharT('1')); // (3) C++11

template <class CharT, class Traits, class Allocator>
constexpr explicit bitset(
  const basic_string<CharT, Traits, Allocator>& str,
  typename basic_string<CharT, Traits, Allocator>::size_type pos = 0,
  typename basic_string<CharT, Traits, Allocator>::size_type n =
    basic_string<CharT, Traits, Allocator>::npos,
  CharT zero = CharT('0'), CharT one = CharT('1')); // (3) C++23

template <class CharT>
explicit bitset(
  const CharT* str,
  typename basic_string<CharT>::size_type n = basic_string<CharT>::npos,
  CharT zero = CharT('0'), CharT one = CharT('1')); // (4) C++11

template <class CharT>
constexpr explicit bitset(
  const CharT* str,
  typename basic_string<CharT>::size_type n = basic_string<CharT>::npos,
  CharT zero = CharT('0'), CharT one = CharT('1')); // (4) C++23
```
* basic_string[link /reference/string/basic_string.md]

## bitsetオブジェクトの構築
- (1) : デフォルトコンストラクタ。
- (2) : 整数値を受け取るコンストラクタ。
- (3) : `'0'`と`'1'`の文字で構成される`basic_string`文字列からビット列を構築する。
- (4) : `'0'`と`'1'`の文字で構成される文字配列からビット列を構築する。


## 要件
- (3) : `pos <= str.`[`size()`](/reference/string/basic_string/size.md)


## 効果
- (1) : 全てのビットを`0`に初期化する。
- (2) : 整数値`val`でビット列を初期化する。`bitset`クラスのテンプレートパラメータ`N`と`val`のビット数のうち、小さい方の大きさで表現可能なビット列となる。クラステンプレートパラメータ`N`よりも`val`のビット数の方が小さい場合は、残りのビットを`0`で初期化する。
- (3) : 文字列`str`でビット列を初期化する。
	- ビット列として扱う文字列は`str`の`n`文字目以降である。`n == npos`の場合は`str`の全文字列を使用する。対象となる文字列範囲を`rstr`とする。
	- C++03 : 文字列`rstr`に含まれる文字`CharT('0')`をビット値`0`、文字`CharT('1')`をビット値`1`と見なし、対応する値でビット列を構築する。
	- C++11 : 文字列`rstr`に含まれる文字`zero`をビット値`0`、文字`one`をビット値`1`と見なし、対応する値でビット列を構築する。
	- クラステンプレートパラメータ`N`と文字列`rstr`の長さのうち、小さい方の大きさで表現可能なビット列となる。クラステンプレートパラメータ`N`よりも文字列`rstr`の長さの方が小さい場合は、残りのビットを`0`で初期化する。
- (4) : 以下のように初期化する：

```cpp
bitset(
  n == basic_string<CharT>::npos
  ? basic_string<CharT>(str)
  : basic_string<CharT>(str, n), 0, n, zero, one)
```


## 例外
- (3) : `pos > str.`[`size()`](/reference/string/basic_string/size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。
	- C++03 : `str`に`'0'`と`'1'`以外の文字が含まれていた場合、[`invalid_argument`](/reference/stdexcept.md)例外を送出する。
	- C++11 : `str`に`zero`と`one`以外の文字が含まれていた場合、[`invalid_argument`](/reference/stdexcept.md)例外を送出する。
- (4) : `str`に`zero`と`one`以外の文字が含まれていた場合、[`invalid_argument`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  // (1) デフォルト構築
  {
    std::bitset<4> bs;
    std::cout << "(1) : " << bs << std::endl;
  }

  // (2) 整数値から構築
  {
    std::bitset<4> bs(10uL);
    std::cout << "(2) : " << bs << std::endl;
  }

  // (3) basic_stringから構築
  {
    std::bitset<4> bs(std::string("1010"));
    std::cout << "(3) : " << bs << std::endl;
  }

  // (4) 文字配列から構築
  {
    std::bitset<4> bs("1010");
    std::cout << "(4) : " << bs << std::endl;
  }
}
```

### 出力
```
(1) : 0000
(2) : 1010
(3) : 1010
(4) : 1010
```


### 処理系
- (4)のコンストラクタ
	- [Clang](/implementation.md#clang): 3.0
	- [GCC](/implementation.md#gcc): 4.5.4
	- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
- [LWG Issue 778. `std::bitset` does not have any constructor taking a string literal](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#778)
    - (4)のコンストラクタが追加された経緯となるレポート
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
