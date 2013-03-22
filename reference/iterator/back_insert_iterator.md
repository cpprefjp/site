```cpp
namespace std {
  template <class Container>
  class back_insert_iterator
    : public iterator<output_iterator_tag, void, void, void, void>;

}
```
* iterator[link /reference/iterator/iterator]
* output_iterator_tag[link /reference/iterator/iterator_tag]

##概要

`back_insert_iterator`は出力イテレータであり、代入の際にコンテナの`push_back`メンバ関数を呼び出すイテレータアダプタである。

###メンバ関数

| | |
|----------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [`(constructor)`](/reference/iterator/back_insert_iterator/back_insert_iterator) | コンストラクタ |
| `~back_insert_iterator() = default` | デストラクタ |
| [`operator=`](/reference/iterator/back_insert_iterator/op_assign) | 代入演算子 |
| [`operator*`](/reference/iterator/back_insert_iterator/op_deref) | 間接参照演算子 |
| [`operator++`](/reference/iterator/back_insert_iterator/op_increment) | イテレータをインクリメントする |

###protectedメンバ変数

| | |
|------------------------|-------------------------|
| 変数名 | 型 |
| `container` | `Container*` |

###メンバ型

| | |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------|
|` container_type` |` Container` |
|` difference_type` |` void` |
|` pointer` |` void` |
|` value_type` |` void` |
|` iterator_category` |` [output_iterator_tag](/reference/iterator/iterator_tag)` |
|` reference` |` void` |

###非メンバ関数

| | |
|---------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`back_inserter`](/reference/iterator/back_insert_iterator/back_inserter) | `back_insert_iterator`のヘルパ関数 |


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm> // copy

int main()
{
  std::vector<int> src = {1, 2, 3};
  std::vector<int> dest;

  // srcの要素をdestに追加しながらコピー
  dest.reserve(src.size());
  std::copy(src.begin(), src.end(), std::back_inserter(dest));

  for (int x : dest) {
    std::cout << x << std::endl;
  }
}
```
* back_inserter[color ff0000]

###出力
```cpp
123
```

###参照

