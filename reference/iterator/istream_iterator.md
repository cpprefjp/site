
| |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|


```cpp
namespace std {

  template <class T, class CharT = char,

            class Traits = char_traits<CharT>, class Distance = ptrdiff_t>

  class istream_iterator

    : public iterator<input_iterator_tag, T, Distance, const T*, const T&>

}
```
* iterator[link /reference/iterator/iterator]
* input_iterator_tag[link /reference/iterator/iterator_tag]

 |


##概要

`istream_iterator`は、`operator++()`でイテレータを進めることにより、入力ストリームの`operator>>()`でストリームからデータを読み込む入力イテレータである。ストリームからの読み取りが`fail() == true`となる場合に、イテレータは`end`イテレータと等しくなる。


###メンバ関数


| | |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [`(constructor)`](./istream_iterator) | コンストラクタ |
| `~istream_iterator() = default` | デストラクタ |
| <code>operator=(const istream_iterator&) = default
 operator=(istream_iterator&&) = default</code> | 代入演算子 |
| [`operator*`](./op_deref) | 間接参照 |
| [`operator->`](./op_arrow) | メンバアクセス |
| [`operator++`](./op_increment) | イテレータをインクリメントする |


###メンバ型


| | |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `char_type` | `CharT (デフォルトはchar)` |
| `traits_type` | `Traits (デフォルトはchar_traits<CharT>)` |
| `difference_type` | `Distance (デフォルトはptrdiff_t)` |
| `pointer` | `const T*` |
| `value_type` | `T` |
| `iterator_category` | [`input_iterator_tag`](/reference/iterator/iterator_tag) |
| `reference` | `const T&` |


###非メンバ関数


| | |
|-------------------------------------------------------------------------------------------------------------------------------|-----------------|
| [`operator==`](./op_equal) | 等値比較 |
| [`operator!=`](./op_not_equal) | 非等値比較 |




##例


```cpp
#include <iostream>

#include <iterator>

#include <sstream>

#include <algorithm> // for_each
```

int main()

{

  // 文字列の入力ストリームにデータを入れる

  std::stringstream ss;

  ss << 1 << std::endl

     << 2 << std::endl

     << 3;


  // 文字列の入力ストリームからデータを読み込むイテレータを作る

  std::<color=ff0000>istream_iterator</color><int> it(ss);

  std::<color=ff0000>istream_iterator</color><int> last;


  // イテレータを進めることにより、入力ストリームからデータを順に読み取る

  std::for_each(it, last, [](int x) {

    std::cout << x << std::endl;

  });

}




###出力

```cpp
1
2
3
```

###参照


