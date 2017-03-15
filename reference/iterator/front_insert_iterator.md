# front_insert_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Container>
  class front_insert_iterator
    : public iterator<output_iterator_tag, void, void, void, void>;

}
```
* iterator[link /reference/iterator/iterator.md]
* output_iterator_tag[link /reference/iterator/iterator_tag.md]

## 概要
`front_insert_iterator`は出力イテレータであり、代入の際にコンテナの`push_front()`メンバ関数を呼び出すイテレータアダプタである。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](front_insert_iterator/op_constructor.md) | コンストラクタ | |
| `~front_insert_iterator() = default` | デストラクタ | |
| [`operator=`](front_insert_iterator/op_assign.md) | 代入演算子 | |
| [`operator*`](front_insert_iterator/op_deref.md) | 間接参照演算子 | |
| [`operator++`](front_insert_iterator/op_increment.md) | イテレータをインクリメントする | |


## protectedメンバ変数

| 変数名 | 型 | 対応バージョン |
|-------------|--------------|-------|
| `container` | `Container*` | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------------|------------|-------|
| `container_type`    | `Container` | |
| `difference_type`   | `void` | |
| `pointer`           | `void` | |
| `value_type`        | `void` | |
| `iterator_category` | [`output_iterator_tag`](/reference/iterator/iterator_tag.md) | |
| `reference`         | `void` | |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|-------------------------------------|-------|
| [`front_inserter`](front_inserter.md) | `front_insert_iterator`のヘルパ関数 | |


## 例
```cpp
#include <iostream>
#include <deque>
#include <iterator>
#include <algorithm>

int main()
{
  std::deque<int> src = {1, 2, 3};
  std::deque<int> dest;

  // srcの要素をdestの先頭に追加しながらコピー
  std::copy(src.begin(), src.end(), std::front_inserter(dest));

  for (int x : dest) {
    std::cout << x << std::endl;
  }
}
```
* std::front_inserter[color ff0000]
* src.begin()[link /reference/deque/begin.md]
* src.end()[link /reference/deque/end.md]

### 出力
```
3
2
1
```

## 参照

