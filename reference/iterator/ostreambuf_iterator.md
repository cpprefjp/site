#ostreambuf_iterator

| |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|


```cpp
namespace std {

  template <class CharT, class Traits = char_traits<CharT> >

  class ostreambuf_iterator

    : public iterator<output_iterator_tag, void, void, void, void>

}
```
* iterator[link /reference/iterator/iterator]
* output_iterator_tag[link /reference/iterator/iterator_tag]

 |


##概要

`ostreambuf_iterator`は出力イテレータであり、代入の際に外部から渡された`ostream`オブジェクトにストリームバッファの`sputc()`メンバ関数で値を出力するイテレータアダプタである。[`ostream_iterator`](/reference/iterator/ostream_iterator)がフォーマットされた出力を扱うのに対し、`osteambuf_iterator`はフォーマットなしの生の出力を扱う。


###メンバ関数


| | |
|--------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [`(constructor)`](./ostreambuf_iterator/ostreambuf_iterator) | コンストラクタ |
| `~ostream_iterator() = default` | デストラクタ |
| [`operator=`](./ostreambuf_iterator/op_assign) | 代入演算子 |
| [`operator*`](./ostreambuf_iterator/op_deref) | 間接参照 |
| [`operator++`](./ostreambuf_iterator/op_increment) | インクリメント |
| [`failed`](./ostreambuf_iterator/failed) | 書き込みが失敗したかを判定する |


###メンバ型



| | |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `char_type` | `CharT (デフォルトはchar)` |
| `traits_type` | `Traits (デフォルトはchar_traits<CharT>)` |
| `streambuf_type` | `basic_streambuf<CharT, Traits>` |
| `ostream_type` | `basic_ostream<CharT, Traits>` |
| `difference_type` | `void` |
| `pointer` | `void` |
| `value_type` | `void` |
| `iterator_category` | [`output_iterator_tag`](/reference/iterator/iterator_tag) |
| `reference` | `void` |


<b>
</b>


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

```cpp
Hello
```

###参照


