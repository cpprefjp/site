#ostreambuf_iterator
```
namespace std {
  template <class CharT, class Traits = char_traits<CharT> >
  class ostreambuf_iterator
    : public iterator<output_iterator_tag, void, void, void, void>
}
```
* iterator[link /reference/iterator/iterator.md]
* output_iterator_tag[link /reference/iterator/iterator_tag.md]

##概要
`ostreambuf_iterator`は出力イテレータであり、代入の際に外部から渡された`streambuf`オブジェクトにストリームバッファの`sputc()`メンバ関数で値を出力するイテレータアダプタである。[`ostream_iterator`](/reference/iterator/ostream_iterator.md)がフォーマットされた出力を扱うのに対し、`osteambuf_iterator`はフォーマットなしの生の出力を扱う。


###メンバ関数

| | |
|--------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [(constructor)](./ostreambuf_iterator//op_constructor.md) | コンストラクタ |
| `~ostream_iterator() = default` | デストラクタ |
| [`operator=`](./ostreambuf_iterator/op_assign.md) | 代入演算子 |
| [`operator*`](./ostreambuf_iterator/op_deref.md) | 間接参照 |
| [`operator++`](./ostreambuf_iterator/op_increment.md) | インクリメント |
| [`failed`](./ostreambuf_iterator/failed.md) | 書き込みが失敗したかを判定する |


###メンバ型

| | |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `char_type` | `CharT (デフォルトはchar)` |
| `traits_type` | `Traits (デフォルトはchar_traits<CharT>)` |
| `streambuf_type` | [`basic_streambuf<CharT, Traits>`](../streambuf/basic_streambuf.md) |
| `ostream_type` | [`basic_ostream<CharT, Traits>`](../ostream/basic_ostream.md) |
| `difference_type` | `void` |
| `pointer` | `void` |
| `value_type` | `void` |
| `iterator_category` | [`output_iterator_tag`](/reference/iterator/iterator_tag.md) |
| `reference` | `void` |


##例
```cpp
#include <iostream>
#include <iterator>
#include <algorithm> // copy
#include <string>

int main()
{
  const std::string s = "Hello";

  // 文字列"Hello"を標準出力に出力する
  std::copy(s.begin(), s.end(), std::ostreambuf_iterator<char>(std::cout));
}
```
* ostreambuf_iterator[color ff0000]

###出力
```
Hello
```

###参照
- [`basic_streambuf`](../streambuf/basic_streambuf.md)
