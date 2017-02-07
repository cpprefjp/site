#insert_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Container>
  class insert_iterator
    : public iterator<output_iterator_tag, void, void, void, void>;
}

```
* iterator[link /reference/iterator/iterator.md]
* output_iterator_tag[link /reference/iterator/iterator_tag.md]

##概要
`insert_iterator`は出力イテレータであり、代入の際にコンテナの`insert()`メンバ関数を呼び出すイテレータアダプタである。


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](insert_iterator/op_constructor.md) | コンストラクタ | |
| `~insert_iterator() = default` | デストラクタ | |
| [`operator=`](insert_iterator/op_assign.md) | 代入演算子 | |
| [`operator*`](insert_iterator/op_deref.md) | 間接参照演算子 | |
| [`operator++`](insert_iterator/op_increment.md) | イテレータをインクリメントする | |


##protectedメンバ変数

| 変数名 | 型 | 対応バージョン |
|-------------|-----------------------|-------|
| `container` | `Container*` | |
| `iter`      | `Container::iterator` | |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|---------------------|-------------|-------|
| `container_type`    | `Container` | |
| `difference_type`   | `void` | |
| `pointer`           | `void` | |
| `value_type`        | `void` | |
| `iterator_category` | [`output_iterator_tag`](/reference/iterator/iterator_tag.md) | |
| `reference`         | `void` | |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------|-------------------------------|-------|
| [`inserter`](inserter.md) | `insert_iterator`のヘルパ関数 | |


##例
```cpp
#include <iostream>
#include <set>
#include <iterator>
#include <algorithm>

int main()
{
  std::set<int> src = {1, 2, 3};
  std::set<int> dest;

  // srcの要素をdestに挿入しながらコピー
  std::copy(src.begin(), src.end(), std::inserter(dest, dest.end()));

  for (int x : dest) {
    std::cout << x << std::endl;
  }
}
```
* std::inserter[color ff0000]
* src.begin()[link /reference/set/set/begin.md]
* src.end()[link /reference/set/set/end.md]
* dest.end()[link /reference/set/set/end.md]

###出力
```
1
2
3
```

##参照


