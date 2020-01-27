# ostreambuf_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT> >
  class ostreambuf_iterator
    : public iterator<output_iterator_tag, void, void, void, void>
}
```
* char_traits[link /reference/string/char_traits.md]
* iterator[link /reference/iterator/iterator.md]
* output_iterator_tag[link /reference/iterator/iterator_tag.md]

## 概要
`ostreambuf_iterator`は出力イテレータであり、代入の際に外部から渡された`streambuf`オブジェクトにストリームバッファの`sputc()`メンバ関数で値を出力するイテレータアダプタである。

[`ostream_iterator`](/reference/iterator/ostream_iterator.md)がフォーマットされた出力を扱うのに対し、`osteambuf_iterator`はフォーマットなしの生の出力を扱う。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------|-----------------------|---|
| [`(constructor)`](ostreambuf_iterator/op_constructor.md) | コンストラクタ | |
| `~ostream_iterator() = default` | デストラクタ | |
| [`operator=`](ostreambuf_iterator/op_assign.md) | 代入演算� | |
| [`operator*`](ostreambuf_iterator/op_deref.md) | 間接参照 | |
| [`operator++`](ostreambuf_iterator/op_increment.md) | インクリメント | |
| [`failed`](ostreambuf_iterator/failed.md) | 書き込みが失敗したかを判定する | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------------------------|-----------------------|---|
| `char_type`         | `CharT` | |
| `traits_type`       | `Traits` (デフォルトは`char_traits<CharT>`) | |
| `streambuf_type`    | [`basic_streambuf<CharT, Traits>`](../streambuf/basic_streambuf.md) | |
| `ostream_type`      | [`basic_ostream<CharT, Traits>`](../ostream/basic_ostream.md) | |
| `difference_type`   | `void` | |
| `pointer`           | `void` | |
| `value_type`        | `void` | |
| `iterator_category` | [`output_iterator_tag`](/reference/iterator/iterator_tag.md) | |
| `reference`         | `void` | |


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <algorithm>
#include <string>

int main()
{
  const std::string s = "Hello";

  // 文�列"Hello"を標準出力に出力する
  std::copy(s.begin(), s.end(), std::ostreambuf_iterator<char>(std::cout));
}
```
* std::ostreambuf_iterator[color ff0000]

### 出力
```
Hello
```

## 関連項目
- [`basic_streambuf`](../streambuf/basic_streambuf.md)
