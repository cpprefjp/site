#raw_storage_iterator
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class OutputIterator, class T>
  class raw_storage_iterator
    : public iterator<output_iterator_tag, void, void, void, void>;
}
```
* iterator[link /reference/iterator/iterator.md]
* output_iterator_tag[link /reference/iterator/iterator_tag.md]

##概要
`raw_storage_iterator`は、未初期化領域のイテレータをラップし、構築しながら値を出力していく出力イテレータクラスである。

未初期化領域に特化したアルゴリズム以外の、[`std::copy()`](/reference/algorithm/copy.md)や[`std::transform()`](/reference/algorithm/transform.md)のような出力イテレータをともなうアルゴリズムに、未初期化領域を出力として使用するためにある。


テンプレートパラメータは、以下を意味する：

- `OutputIterator` : 元となる未初期化領域の出力イテレータ型
- `T` : このイテレータが出力する型


##メンバ関数

| 名前 | 説明 |
|--------------------------------------|-------------------------------|
| [`(constructor)`](./raw_storage_iterator/op_constructor.md) | コンストラクタ |
| `~raw_storage_iterator() = default;` | デストラクタ |
| [`operator=`](./raw_storage_iterator/op_assign.md)     | 代入演算子 |
| [`operator*`](./raw_storage_iterator/op_deref.md)      | 間接参照演算子 |
| [`operator++`](./raw_storage_iterator/op_increment.md) | イテレータをインクリメントする |


##メンバ型

| 名前 | 説明 |
|---------------------|--------------------------------------------------------------|
| `difference_type`   | イテレータの差を表す型。 `void` |
| `pointer`           | ポインタ型。 `void` |
| `value_type`        | 値の型。 `void` |
| `iterator_category` | イテレータ種別。 [`output_iterator_tag`](/reference/iterator/iterator_tag.md) |
| `reference`         | 参照型。 `void` |


##例
```cpp
#include <iostream>
#include <memory>

#include <vector>
#include <algorithm>

int main()
{
  const std::vector<int> v = {1, 2, 3};

  std::allocator<int> alloc;

  // メモリ確保。
  // この段階では、[p, p + size)の領域は未初期化
  const std::size_t size = 3;
  int* p = alloc.allocate(size);

  // 未初期化領域pを初期化しつつ範囲vから要素をコピー
  // uninitialized_copy()と同じ効果
  std::copy(v.begin(), v.end(),
    std::raw_storage_iterator<int*, int>(p));

  // pの領域が初期化され、かつvからpに要素がコピーされているか確認
  std::for_each(p, p + size, [](int x) {
    std::cout << x << std::endl;
  });

  // 要素を破棄
  for (std::size_t i = 0; i < size; ++i) {
    alloc.destroy(p + i);
  }

  // メモリ解放
  alloc.deallocate(p, size);
}
```
* raw_storage_iterator[color ff0000]

###出力
```
1
2
3
```

##参照
- [`uninitialized_copy`](./uninitialized_copy.md)
- [`uninitialized_copy_n`](./uninitialized_copy_n.md)
- [`uninitialized_fill`](./uninitialized_fill.md)
- [`uninitialized_fill_n`](./uninitialized_fill_n.md)

