
| |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|


```cpp
namespace std {

  template <class Iterator>

  class reverse_iterator

    : public iterator<typename iterator_traits<Iterator>::iterator_category,

                      typename iterator_traits<Iterator>::value_type,

                      typename iterator_traits<Iterator>::difference_type,

                      typename iterator_traits<Iterator>::pointer,

                      typename iterator_traits<Iterator>::reference>;

}
```
* iterator[link /reference/iterator/iterator]
* iterator_traits[link /reference/iterator/iterator_traits]

 |


##概要

<p>`reverse_iterator`は、イテレータを、逆方向に進むイテレータとしてラップするイテレータアダプタである。
`end`イテレータを`reverse_iterator`でラップした場合、`end - 1` (つまり終端要素)を指し、`begin - 1`のイテレータを終端値としてみなす。</p>

##要件
テンプレートパラメータ`Iterator`は、双方向イテレータの要件を満たすこと。ランダムアクセスイテレータであることを必要とする横断操作を使用する場合は、ランダムアクセスイテレータの要件を満たすこと。


###メンバ関数


| | |
|--------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`(constructor)`](./reverse_iterator) | コンストラクタ |
| `~reverse_iterator() = default` | デストラクタ |
| [`operator=`](./op_assign) | 代入演算子 |
| [`base`](/site/cpprefjp/) | 元となったイテレータを取得する |
| [`operator*`](./op_deref) | 間接参照演算子
 |
| [`operator->`](./op_arrow) | メンバアクセス演算子 |
| [`operator++`](./op_increment) | イテレータをインクリメントする |
| [`operator--`](./op_decrement) | イテレータをデクリメントする |
| [`operator+`](./op_plus) | イテレータを進める |
| [`operator+=`](./op_plus_assign) | イテレータ自身を進める |
| [`operator-`](./op_minus) | イテレータを逆に進める |
| [`operator-=`](./op_minus_assign) | イテレータ自身を逆に進める |
| [`operator[]`](./op_at) | 任意の位置にランダムアクセスする |


###protectedメンバ変数


| | |
|----------------------|-----------------------|
| 変数名 | 型 |
| `current` | `Iterator` |


###メンバ型


| | |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
|` ``iterator_type` |` ``Iterator` |
|` difference_type` |` [iterator_traits](/reference/iterator/iterator_traits)<Iterator>::difference_type` |
|` pointer` |` [iterator_traits](/reference/iterator/iterator_traits)<Iterator>::pointer` |
|` value_type` |` [iterator_traits](/reference/iterator/iterator_traits)<Iterator>::value_type` |
|` iterator_category` |` [iterator_traits](/reference/iterator/iterator_traits)<Iterator>::iterator_category` |
|` reference` |` [iterator_traits](/reference/iterator/iterator_traits)<Iterator>::reference` |


###非メンバ関数


| | |
|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| [`operator==`](./op_equal) | 等値比較 |
| [`operator!=`](./op_not_equal) | 非等値比較 |
| [`operator<`](./op_less) | 左辺が右辺より小さいかの判定を行う |
| [`operator<=`](./op_less_equal) | 左辺が右辺以下かの判定を行う |
| [`operator>`](./op_greater) | 左辺が右辺より大きいかの判定を行う |
| [`operator>=`](./op_greater_equal) | 左辺が右辺以上かの判定を行う |
| [`operator-`](./op_minus_free) | 2つの`reverse_iterator`の差を求める |
| [`operator+`](./op_plus_free) | イテレータを進める |




##例


```cpp
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm> // for_each

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 逆順に走査する
  std::reverse_iterator<decltype(v)::iterator> first(v.end());
  std::reverse_iterator<decltype(v)::iterator> last(v.begin());

  std::for_each(first, last, [](int x) {
    std::cout << x << std::endl;
  });
}
```
* reverse_iterator[color ff0000]
* reverse_iterator[color ff0000]

###出力

```cpp
54321
```

###参照


