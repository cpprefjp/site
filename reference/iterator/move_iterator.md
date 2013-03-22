```cpp
namespace std {
  template <class Iterator> class move_iterator;
}
```

##概要

move_iteratorは、イテレータをラップし、間接参照時に参照先の要素をムーブするイテレータアダプタである。その他の操作は、元のイテレータそのものの動作をする。

###要件

move_iteratorクラスのテンプレートパラメータIteratorは、入力イテレータの要件を満たすこと。双方向またはランダムアクセスの横断を必要とする操作を行う場合は、それぞれ双方向イテレータまたはランダムアクセスイテレータの要件を満たすこと。

###メンバ関数

| | |
|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [(constructor)](./move_iterator) | コンストラクタ |
| ~move_iterator() = default | デストラクタ |
| [operator=](./op_assign) | 代入演算子 |
| [base](./base) | 元のイテレータを取得する |
| [operator*](./op_deref) | 間接参照演算子 |
| [operator->](./op_arrow) | メンバアクセス演算子 |
| [operator++](./op_increment) | イテレータをインクリメントする |
| [operator--](./op_decrement) | イテレータをデクリメントする |
| [operator+](./op_plus) | イテレータを進める |
| [operator+=](./op_plus_assign) | イテレータ自身を進める |
| [operator-](./op_minus) | イテレータを逆に進める |
| [operator-=](./op_minus_assign) | イテレータ自身を逆に進める |
| [operator[]](./op_at) | 任意の位置にランダムアクセスする |

###メンバ型

| | |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| iterator_type | Iterator |
| difference_type | [iterator_traits](/reference/iterator/iterator_traits)<Iterator>::difference_type |
| pointer | Iterator |
| value_type | [iterator_traits](/reference/iterator/iterator_traits)<Iterator>::value_type |
| iterator_category | [iterator_traits](/reference/iterator/iterator_traits)<Iterator>::iterator_category |
| reference | value_type&& |

###非メンバ関数

| | |
|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [operator==](./op_equal) | 等値比較 |
| [operator!=](./op_not_equal) | 非等値比較 |
| [operator<](./op_less) | 左辺が右辺より小さいかの判定を行う |
| [operator<=](./op_less_equal) | 左辺が右辺以下かの判定を行う |
| [operator>](./op_greater) | 左辺が右辺より大きいかの判定を行う |
| [operator>=](./op_greater_equal) | 左辺が右辺以上かの判定を行う |
| [operator-](./op_minus_free) | 2つのmove_iteratorの差を求める |
| [operator+](./op_plus_free) | イテレータを進める |
| [make_move_iterator](./make_move_iterator) | move_iteratorのヘルパ関数 |


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
* make_move_iterator[color ff0000]

###出力

```cpp
0
1
2
3
4


```

##

##バージョン

###言語

- C++11

###処理系

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): 
- [GCC, C++0x mode](/implementation#gcc): 4.7.0
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??


###参照

