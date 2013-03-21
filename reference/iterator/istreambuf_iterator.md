```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT> >
  class istreambuf_iterator
    : public iterator<input_iterator_tag, CharT, typename Traits::off_type, unspecified, CharT>
}
```
* iterator[link https://sites.google.com/site/cpprefjp/reference/iterator/iterator]
* input_iterator_tag[link https://sites.google.com/site/cpprefjp/reference/iterator/iterator_tag]
* unspecified[italic]

##概要

`istreambuf_iterator`は、`operator++()`でイテレータを進めることにより、ストリームバッファのsbumpc()メンバ関数でストリームからデータを読み込む入力イテレータである。ストリームからの`sgetc()`メンバ関数による読み取りが`Traits::eof()を返した`場合に、イテレータは`end`イテレータと等しくなる。[`istream_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/istream_iterator)とは異なり、スペースや改行が読み飛ばされることはない。いくつかのメンバ関数は、同じ`streambuf`オブジェクトを参照するためにプロキシオブジェクトを返す。

###メンバ関数

| | |
|--------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| [`(constructor)`](https://sites.google.com/site/cpprefjp/reference/iterator/istreambuf_iterator/istreambuf_iterator) | コンストラクタ |
| `~istreambuf_iterator() = default` | デストラクタ |
| [`operator*`](https://sites.google.com/site/cpprefjp/reference/iterator/istreambuf_iterator/op_deref) | 間接参照 |
| [`operator->`](https://sites.google.com/site/cpprefjp/reference/iterator/istreambuf_iterator/op_arrow) | メンバアクセス(C++11) |
| [`operator++`](https://sites.google.com/site/cpprefjp/reference/iterator/istreambuf_iterator/op_increment) | イテレータをインクリメントする |
| [`equal`](https://sites.google.com/site/cpprefjp/reference/iterator/istreambuf_iterator/equal) | `istreambuf_iterator`オブジェクトの等値比較 |

###メンバ型

| | |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `char_type` | `CharT` |
| `traits_type` | `Traits (デフォルトはchar_traits<CharT>)` |
| `int_type` | `Traits::int_type` |
| `streambuf_type` | `basic_streambuf<CharT, Traits>` |
| `istream_type` | `basic_istream<CharT, Traits>` |
| `difference_type` | `Traits::off_type` |
| `pointer` | 未規定 |
| `value_type` | `CharT` |
| `iterator_category` | [`input_iterator_tag`](https://sites.google.com/site/cpprefjp/reference/iterator/iterator_tag) |
| `reference` | `CharT` |

###非メンバ関数

| | |
|----------------------------------------------------------------------------------------------------------------------------------|-----------------|
| [`operator==`](https://sites.google.com/site/cpprefjp/reference/iterator/istreambuf_iterator/op_equal) | 等値比較 |
| [`operator!=`](https://sites.google.com/site/cpprefjp/reference/iterator/istreambuf_iterator/op_not_equal) | 非等値比較 |


##例
```cpp
#include <iostream>
#include <iterator>
#include <sstream>
#include <algorithm> // for_each

int main()
{
  std::stringstream ss;
  ss << "1 2 3" << std::endl
     << "4 5 6";

  // 文字列の入力ストリームから順に文字を読み込むイテレータを用意
  std::istreambuf_iterator<char> it(ss);
  std::istreambuf_iterator<char> last;

  // イテレータを進めることにより、入力ストリームからデータを順に読み取る
  std::for_each(it, last,  { std::cout << c; });
}
```
* [link char c]

###出力
```cpp
1 2 34 5 6
```

###参照

