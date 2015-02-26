#ostream_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T, class CharT = char, class Traits = char_traits<CharT> >
  class ostream_iterator
    : public iterator<output_iterator_tag, void, void, void, void>
}
```
* iterator[link /reference/iterator/iterator.md]
* output_iterator_tag[link /reference/iterator/iterator_tag.md]

##概要
`ostream_iterator`は出力イテレータであり、代入の際に外部から渡された`ostream`オブジェクトに`operator<<()`で値を出力するイテレータアダプタである。


###メンバ関数

| | |
|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [`(constructor)`](./ostream_iterator/op_constructor.md) | コンストラクタ |
| `~ostream_iterator() = default` | デストラクタ |
| [`operator=`](./ostream_iterator/op_assign.md) | 代入演算子 |
| [`operator*`](./ostream_iterator/op_deref.md) | 間接参照 |
| [`operator++`](./ostream_iterator/op_increment.md) | インクリメント |


###メンバ型

| | |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `char_type` | `CharT (デフォルトはchar)` |
| `traits_type` | `Traits (デフォルトはchar_traits<CharT>)` |
| `ostream_type` | [`basic_ostream<CharT, Traits>`](../ostream/basic_ostream.md) |
| `difference_type` | `void` |
| `pointer` | `void` |
| `value_type` | `void` |
| `iterator_category` | [`output_iterator_tag`](/reference/iterator/iterator_tag.md) |
| `reference` | `void` |


###例
```cpp
#include <iostream>
#include <iterator>
#include <vector>
#include <algorithm> // copy

int main()
{
  const std::vector<int> v = {1, 2, 3};

  // vの要素をイテレートしながらstd::coutに出力(区切り文字にカンマ)
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, ","));
}
```
* ostream_iterator[color ff0000]

###出力
```
1,2,3,
```

###参照

