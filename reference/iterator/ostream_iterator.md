```cpp
namespace std {
  template <class T, class CharT = char, class Traits = char_traits<CharT> >
  class ostream_iterator
    : public iterator<output_iterator_tag, void, void, void, void>
}
```
* iterator[link /reference/iterator/iterator]
* output_iterator_tag[link /reference/iterator/iterator_tag]

##概要
<p>`ostream_iterator`は出力イテレータであり、代入の際に外部から渡された`ostream`オブジェクトに`operator<<()`で値を出力するイテレータアダプタである。
</p>

###メンバ関数

| | |
|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [`(constructor)`](./ostream_iterator) | コンストラクタ |
| `~ostream_iterator() = default` | デストラクタ |
| [`operator=`](./op_assign) | 代入演算子 |
| [`operator*`](./op_deref) | 間接参照 |
| [`operator++`](./op_increment) | インクリメント |

###メンバ型

| | |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `char_type` | `CharT (デフォルトはchar)` |
| `traits_type` | `Traits (デフォルトはchar_traits<CharT>)` |
| `ostream_type` | `basic_ostream<CharT, Traits>` |
| `difference_type` | `void` |
| `pointer` | `void` |
| `value_type` | `void` |
| `iterator_category` | [`output_iterator_tag`](/reference/iterator/iterator_tag) |
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
```cpp
1,2,3,
```

###参照

