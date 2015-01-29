#reverse_iterator
```
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
* iterator[link /reference/iterator/iterator.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]

##概要
`reverse_iterator`は、イテレータを、逆方向に進むイテレータとしてラップするイテレータアダプタである。
`end`イテレータを`reverse_iterator`でラップした場合、`end - 1` (つまり終端要素)を指し、`begin - 1`のイテレータを終端値としてみなす。


##要件
テンプレートパラメータ`Iterator`は、双方向イテレータの要件を満たすこと。ランダムアクセスイテレータであることを必要とする横断操作を使用する場合は、ランダムアクセスイテレータの要件を満たすこと。


##メンバ関数

| | |
|--------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`(constructor)`](./reverse_iterator/op_constructor.md) | コンストラクタ |
| `~reverse_iterator() = default` | デストラクタ |
| [`operator=`](./reverse_iterator/op_assign.md) | 代入演算子 |
| [`base`](./reverse_iterator/base.md) | 元となったイテレータを取得する |
| [`operator*`](./reverse_iterator/op_deref.md) | 間接参照演算子 |
| [`operator->`](./reverse_iterator/op_arrow.md) | メンバアクセス演算子 |
| [`operator++`](./reverse_iterator/op_increment.md) | イテレータをインクリメントする |
| [`operator--`](./reverse_iterator/op_decrement.md) | イテレータをデクリメントする |
| [`operator+`](./reverse_iterator/op_unary_plus.md) | イテレータを進める |
| [`operator+=`](./reverse_iterator/op_plus_assign.md) | イテレータ自身を進める |
| [`operator-`](./reverse_iterator/op_unary_minus.md) | イテレータを逆に進める |
| [`operator-=`](./reverse_iterator/op_minus_assign.md) | イテレータ自身を逆に進める |
| [`operator[]`](./reverse_iterator/op_at.md) | 任意の位置にランダムアクセスする |


##protectedメンバ変数

| | |
|----------------------|-----------------------|
| 変数名 | 型 |
| `current` | `Iterator` |


##メンバ型

| | |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `iterator_type` | `Iterator` |
| `difference_type` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::difference_type` |
| `pointer` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::pointer` |
| `value_type` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::value_type` |
| `iterator_category` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::iterator_category` |
| `reference` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::reference` |


##非メンバ関数

| | |
|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| [`operator==`](./reverse_iterator/op_equal.md) | 等値比較 |
| [`operator!=`](./reverse_iterator/op_not_equal.md) | 非等値比較 |
| [`operator<`](./reverse_iterator/op_less.md) | 左辺が右辺より小さいかの判定を行う |
| [`operator<=`](./reverse_iterator/op_less_equal.md) | 左辺が右辺以下かの判定を行う |
| [`operator>`](./reverse_iterator/op_greater.md) | 左辺が右辺より大きいかの判定を行う |
| [`operator>=`](./reverse_iterator/op_greater_equal.md) | 左辺が右辺以上かの判定を行う |
| [`operator-`](./reverse_iterator/op_minus.md) | 2つの`reverse_iterator`の差を求める |
| [`operator+`](./reverse_iterator/op_plus.md) | イテレータを進める |

###ヘルパ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`make_reverse_iterator`](./make_reverse_iterator.md) | `reverse_iterator`オブジェクトを作るヘルパ関数 | C++14 |


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

###出力
```
5
4
3
2
1
```

###参照


