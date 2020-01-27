# back_insert_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Container>
  class back_insert_iterator
    : public iterator<output_iterator_tag, void, void, void, void>;

}
```
* iterator[link /reference/iterator/iterator.md]
* output_iterator_tag[link /reference/iterator/iterator_tag.md]

## 概要
`back_insert_iterator`は出力イテレータであり、代入の際にコンテナの`push_back()`メンバ関数を呼び出すイテレータアダプタである。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](back_insert_iterator/op_constructor.md) | コンストラクタ | |
| `~back_insert_iterator() = default` | デストラクタ | |
| [`operator=`](back_insert_iterator/op_assign.md) | 代入演算� | |
| [`operator*`](back_insert_iterator/op_deref.md) | 間接参照演算� | |
| [`operator++`](back_insert_iterator/op_increment.md) | イテレータをインクリメントする | |

## protectedメンバ変数

| 変数名 | 型 | 対応バージョン |
|-------------|--------------|-------|
| `container` | `Container*` | |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------------|---------------------------------|-------|
| `container_type`    | `Container` | |
| `difference_type`   | `void` | |
| `pointer`           | `void` | |
| `value_type`        | `void` | |
| `iterator_category` | [`output_iterator_tag`](/reference/iterator/iterator_tag.md) | |
| `reference`         | `void` | |

## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------|-----------------------------------------------------|-------|
| [`back_inserter`](back_inserter.md) | `back_insert_iterator`のヘルパ関数 | |


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>

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
* std::back_inserter[color ff0000]
* dest.reserve[link /reference/vector/vector/reserve.md]
* src.size()[link /reference/vector/vector/size.md]
* src.begin()[link /reference/vector/vector/begin.md]
* src.end()[link /reference/vector/vector/end.md]

### 出力
```
1
2
3
```

## 参照

