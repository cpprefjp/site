#move_iterator (C++11)
```cpp
namespace std {
  template <class Iterator> class move_iterator;
}
```

##概要
`move_iterator`は、イテレータをラップし、間接参照時に参照先の要素をムーブするイテレータアダプタである。その他の操作は、元のイテレータそのものの動作をする。

###要件
`move_iterator`クラスのテンプレートパラメータ`Iterator`は、入力イテレータの要件を満たすこと。双方向またはランダムアクセスの横断を必要とする操作を行う場合は、それぞれ双方向イテレータまたはランダムアクセスイテレータの要件を満たすこと。

###メンバ関数

| | |
|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`(constructor)`](./move_iterator/move_iterator.md) | コンストラクタ |
| `~move_iterator() = default` | デストラクタ |
| [`operator=`](./move_iterator/op_assign.md) | 代入演算子 |
| [`base`](./move_iterator/base.md) | 元のイテレータを取得する |
| [`operator*`](./move_iterator/op_deref.md) | 間接参照演算子 |
| [`operator->`](./move_iterator/op_arrow.md) | メンバアクセス演算子 |
| [`operator++`](./move_iterator/op_increment.md) | イテレータをインクリメントする |
| [`operator--`](./move_iterator/op_decrement.md) | イテレータをデクリメントする |
| [`operator+`](./move_iterator/op_plus.md) | イテレータを進める |
| [`operator+=`](./move_iterator/op_plus_assign.md) | イテレータ自身を進める |
| [`operator-`](./move_iterator/op_minus.md) | イテレータを逆に進める |
| [`operator-=`](./move_iterator/op_minus_assign.md) | イテレータ自身を逆に進める |
| [`operator[]`](./move_iterator/op_at.md) | 任意の位置にランダムアクセスする |

###メンバ型

| | |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| `iterator_type` | `Iterator` |
| `difference_type` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::difference_type` |
| `pointer` | `Iterator` |
| `value_type` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::value_type` |
| `iterator_category` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::iterator_category` |
| `reference` | `value_type&&` |

###非メンバ関数

| | |
|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`operator==`](./move_iterator/op_equal.md) | 等値比較 |
| [`operator!=`](./move_iterator/op_not_equal.md) | 非等値比較 |
| [`operator<`](./move_iterator/op_less.md) | 左辺が右辺より小さいかの判定を行う |
| [`operator<=`](./move_iterator/op_less_equal.md) | 左辺が右辺以下かの判定を行う |
| [`operator>`](./move_iterator/op_greater.md) | 左辺が右辺より大きいかの判定を行う |
| [`operator>=`](./move_iterator/op_greater_equal.md) | 左辺が右辺以上かの判定を行う |
| [`operator-`](./move_iterator/op_minus_free.md) | 2つの`move_iterator`の差を求める |
| [`operator+`](./move_iterator/op_plus_free.md) | イテレータを進める |
| [`make_move_iterator`](./move_iterator/make_move_iterator.md) | `move_iterator`のヘルパ関数 |


##例
```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  std::vector<std::unique_ptr<int>> v2;
  v2.assign(std::make_move_iterator(v.begin()),
            std::make_move_iterator(v.end()));

  std::for_each(v2.begin(), v2.end(),
    [](const std::unique_ptr<int>& v) { std::cout << *v << std::endl; });
}
```
* make_move_iterator[color ff0000]

###出力
```
0
1
2
3
4
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


###参照

