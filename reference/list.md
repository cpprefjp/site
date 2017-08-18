# list
* list[meta header]
* class template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator = allocator<T> >
  class list;
}
```
* allocator[link /reference/memory/allocator.md]

## 概要
`<list>`ヘッダでは、双方向リンクリストの実装である `list` コンテナを提供する。

任意の位置への挿入や削除を定数時間で行う事が出来るが、高速なランダムアクセスは出来ず、常にシーケンシャルアクセスを行う必要がある。

テンプレートパラメータは、以下を意味する：

- `T`: 格納される要素の型
- `Allocator`: メモリ確保に使用されるアロケータの型。デフォルトでは標準の[`allocator`](/reference/memory/allocator.md)クラスが使用される。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|----------------|-------|
| [`(constructor)`](list/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](list/op_destructor.md) | デストラクタ | |
| [`operator=`](list/op_assign.md) | 代入演算子 | |
| [`assign`](list/assign.md) | コンテナの再代入 | |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|--------------------------------|----------------|-------|
| [`begin`](list/begin.md)     | 先頭要素を指すイテレータを取得する               | |
| [`end`](list/end.md)         | 末尾の次を指すイテレータを取得する               | |
| [`cbegin`](list/cbegin.md)   | 先頭要素を指す読み取り専用イテレータを取得する   | C++11 |
| [`cend`](list/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する   | C++11 |
| [`rbegin`](list/rbegin.md)   | 末尾を指す逆イテレータを取得する                 | |
| [`rend`](list/rend.md)       | 先頭の前を指す逆イテレータを取得する             | |
| [`crbegin`](list/crbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する     | C++11 |
| [`crend`](list/crend.md)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++11 |


### 領域

| 名前 | 説明 | 対応バージョン |
|----------------------------------|----------------------------------|-------|
| [`empty`](list/empty.md)       | コンテナが空かどうかを判定する   | |
| [`size`](list/size.md)         | 要素数を取得する                 | |
| [`max_size`](list/max_size.md) | 格納可能な最大の要素数を取得する | |
| [`resize`](list/resize.md)     | 要素数を変更する                 | |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|----------------------------|----------------------------|-------|
| [`front`](list/front.md) | 先頭要素への参照を取得する | |
| [`back`](list/back.md)   | 末尾要素への参照を取得する | |


### コンテナの変更

| 名前 | 説明 | 対応バージョン |
|-----------------|--------------------------------|-------|
| [`emplace_front`](list/emplace_front.md) | 先頭への直接構築による要素追加 | C++11 |
| [`pop_front`](list/pop_front.md)         | 先頭から要素を削除             | |
| [`emplace_back`](list/emplace_back.md)   | 末尾への直接構築による要素追加 | C++11 |
| [`push_front`](list/push_front.md)       | 先頭に要素を追加する           | |
| [`push_back`](list/push_back.md)         | 末尾に要素を追加する           | |
| [`pop_back`](list/pop_back.md)           | 末尾から要素を削除             | |
| [`emplace`](list/emplace.md)             | 要素の直接構築による挿入       | C++11 |
| [`insert`](list/insert.md)               | 要素の挿入                     | |
| [`erase`](list/erase.md)                 | 要素の削除                     | |
| [`swap`](list/swap.md)                   | コンテナの交換                 | |
| [`clear`](list/clear.md)                 | 全要素削除                     | |


### リスト操作

| 名前 | 説明 | 対応バージョン |
|------------------------------------|------------------------------------------|-------|
| [`splice`](list/splice.md)       | 他のコンテナから要素を移動する           | |
| [`remove`](list/remove.md)       | コンテナから指定された値の要素を削除する | |
| [`remove_if`](list/remove_if.md) | コンテナの条件に合った要素を削除する     | |
| [`unique`](list/unique.md)       | 重複した要素をコンテナから削除する       | |
| [`merge`](list/merge.md)         | 2つのコンテナを併合する                  | |
| [`sort`](list/sort.md)           | コンテナを並べ替える                     | |
| [`reverse`](list/reverse.md)     | コンテナを反転する                       | |


### アロケータ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|------------------------------|-------|
| [`get_allocator`](list/get_allocator.md) | アロケータオブジェクトの取得 | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------|------------------------------|-------|
| `reference`              | `value_type&` | |
| `const_reference`        | `const value_type&` | |
| `iterator`               | 双方向イテレータ | |
| `const_iterator`         | 読み取り専用双方向イテレータ | |
| `size_type`              | 符号なし整数型(通常は[`size_t`](/reference/cstddef/size_t.md)) | |
| `difference_type`        | 符号あり整数型(通常は[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) | |
| `value_type`             | `T` | |
| `allocator_type`         | `Allocator` | |
| `pointer`                | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer` | |
| `const_pointer`          | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer` | |
| `reverse_iterator`       | `std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | |
| `const_reverse_iterator` | `std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|-------------------------------------|-------|
| [`operator==`](list/op_equal.md)         | 等値比較                            | |
| [`operator!=`](list/op_not_equal.md)     | 非等値比較                          | |
| [`operator<`](list/op_less.md)           | 左辺が右辺より小さいかの判定を行う  | |
| [`operator<=`](list/op_less_equal.md)    | 左辺が右辺以下かの判定を行う        | |
| [`operator>`](list/op_greater.md)        | 左辺が右辺より大きいかの判定を行う  | |
| [`operator>=`](list/op_greater_equal.md) | 左辺が右辺以上かの判定を行う        | |
| [`swap`](list/swap_free.md)              | 2つの`list`オブジェクトを入れ替える | |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](list/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp
#include <iostream>
#include <list>
#include <algorithm>

int main ()
{
  std::list<int> ls;

  // 先頭から要素を追加
  ls.push_front(1);
  ls.push_front(2);

  // 末尾から要素を追加
  ls.push_back(3);
  ls.push_back(4);

  // 要素を先頭から順番に表示
  std::for_each(ls.cbegin(), ls.cend(), [](int x){
    std::cout << x << " ";
  });
}
```
* std::list[color ff0000]
* ls.push_front[link list/push_front.md]
* ls.push_back[link list/push_back.md]
* ls.cbegin()[link list/cbegin.md]
* ls.cend()[link list/cend.md]

### 出力
```
2 1 3 4 
```

## 参照
- [N2669 Thread-Safety in the Standard Library (Rev 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2669.htm)


