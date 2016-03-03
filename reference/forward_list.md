#forward_list
* forward_list[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator = allocator<T>>
  class forward_list;
}
```
* allocator[link /reference/memory/allocator.md]

##概要
`<forward_list>`ヘッダでは、単方向リンクリストの実装である`forward_list`コンテナを提供する。

`forward_list`は、標準ライブラリではシーケンスコンテナの一種として定義されるが、いくつかの点でシーケンスコンテナの要件を満たさない：

- `size()`メンバ関数を提供しない。
    - `size()`メンバ関数は全てのコンテナにO(1)計算量を要求するため、単方向リストの実装ではサイズのためのメンバ変数が必要になる。`forward_list`では、サイズメンバ変数を内部に持たないことを示すために`size()`メンバ関数は提供しない。要素数が必要な場合は[`distance()`](/reference/iterator/distance.md)を使用して取得する。

- `insert()/emplace()/erase()`メンバ関数を提供しない。
    - 双方向リンクリストである[`list`](/reference/list.md)の[`insert()`](/reference/list/insert.md)／[`emplace()`](/reference/list/emplace.md)／[`erase()`](/reference/list/erase.md)はinsert-before方式をとっておりO(1)計算量だが、単方向リストの典型的なinsert-beforeの実装ではO(N)計算量になってしまう。
    - `forward_list`では、単方向リンクリストでO(1)計算量であるinsert-after方式を使用することを示す[`insert_after()`](forward_list/insert_after.md)／[`emplace_after()`](forward_list/emplace_after.md)／[`erase_after()`](forward_list/erase_after.md)メンバ関数を提供する。先頭に挿入するために[`before_begin()`](forward_list/before_begin.md)メンバ関数を提供する。

`forward_list`は、C言語で単方向リンクリストを実装する場合と比べ、空間的にもパフォーマンス的にもゼロオーバーヘッドであるよう設計されている。  
また、`forward_list`はリンクリストの性質上、挿入・削除のような破壊的操作を行なってもイテレータは無効にならない。

各テンプレートパラメータの意味は次の通りである。

- `T`: 格納される要素の型
- `Allocator`: メモリ確保に使用されるアロケータの型。無指定の場合は標準の[`allocator`](/reference/memory/allocator.md)クラスが使用される。


##メンバ関数
###構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|----------------|-------|
| [`(constructor)`](forward_list/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](forward_list/op_destructor.md) | デストラクタ | C++11 |
| [`operator=`](forward_list/op_assign.md) | 代入演算子 | C++11 |
| [`assign`](forward_list/assign.md) | コンテナの再代入 | C++11 |


###イテレータ

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|----------------------------------------|-------|
| [`before_begin`](forward_list/before_begin.md)  | 先頭要素の前を指すイテレータを取得する | C++11 |
| [`begin`](forward_list/begin.md) | 先頭要素を指すイテレータを取得する | C++11 |
| [`end`](forward_list/end.md) | 末尾の次を指すイテレータを取得する | C++11 |
| [`cbegin`](forward_list/cbegin.md) | 先頭要素を指す読み取り専用イテレータを取得する | C++11 |
| [`cbefore_begin`](forward_list/before_cbegin.md) | 先頭要素の前を指す読み取り専用イテレータを取得する | C++11 |
| [`cend`](forward_list/cend.md) | 末尾の次を指す読み取り専用イテレータを取得する | C++11 |


###領域

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|----------------------------------|-------|
| [`empty`](forward_list/empty.md)       | コンテナが空かどうかを判定する   | C++11 |
| [`max_size`](forward_list/max_size.md) | 格納可能な最大の要素数を取得する | C++11 |


###要素アクセス

| 名前 | 説明 | 対応バージョン |
|------------------------------------|----------------------------|-------|
| [`front`](forward_list/front.md) | 先頭要素への参照を取得する | C++11 |


###コンテナの変更

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|--------------------------------|-------|
| [`emplace_front`](forward_list/emplace_front.md) | 先頭への直接構築による要素追加 | C++11 |
| [`push_front`](forward_list/push_front.md) | 先頭に要素を追加する | C++11 |
| [`pop_front`](forward_list/pop_front.md) | 先頭から要素を削除 | C++11 |
| [`emplace_after`](forward_list/emplace_after.md) | 任意の位置への直接構築による要素挿入 | C++11 |
| [`insert_after`](forward_list/insert_after.md) | 任意の位置への要素挿入 | C++11 |
| [`erase_after`](forward_list/erase_after.md) | イテレータを使用して要素を削除する | C++11 |
| [`swap`](forward_list/swap.md) | コンテナの交換 | C++11 |
| [`resize`](forward_list/resize.md) | 要素数を変更する | C++11 |
| [`clear`](forward_list/clear.md) | 全要素削除 | C++11 |


###単方向リスト操作

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|-------------------------|-------|
| [`splice_after`](forward_list/splice_after.md) | 他のコンテナから要素を移動する | C++11 |
| [`remove`](forward_list/remove.md) | コンテナから指定された値の要素を削除する | C++11 |
| [`remove_if`](forward_list/remove_if.md) | コンテナから条件に合った要素を削除する | C++11 |
| [`unique`](forward_list/unique.md) | 重複した要素をコンテナから削除する | C++11 |
| [`merge`](forward_list/merge.md) | 2つのコンテナを併合する | C++11 |
| [`sort`](forward_list/sort.md) | コンテナを並べ替える | C++11 |
| [`reverse`](forward_list/reverse.md) | コンテナを反転する | C++11 |


###アロケータ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|-------------------------|-------|
| [`get_allocator`](forward_list/get_allocator.md) | アロケータオブジェクトの取得 | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|-------------------------|-------|
| `reference` | `T&` | C++11 |
| `const_reference` | `const T&` | C++11 |
| `iterator` | 前方向イテレータ | C++11 |
| `const_iterator` | 読み取り専用前方向イテレータ | C++11 |
| `size_type` | 符号なし整数型(通常は[`size_t`](/reference/cstddef/size_t.md)) | C++11 |
| `difference_type` | 符号あり整数型(通常は[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) | C++11 |
| `value_type` | `T` | C++11 |
| `allocator_type` | `Allocator` | C++11 |
| `pointer` | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer` | C++11 |
| `const_pointer` | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer` | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|----------|-------|
| [`operator==`](forward_list/op_equal.md)         | 等値比較 | C++11 |
| [`operator!=`](forward_list/op_not_equal.md)     | 非等値比較 | C++11 |
| [`operator<`](forward_list/op_less.md)           | 左辺が右辺より小さいかの判定を行う | C++11 |
| [`operator<=`](forward_list/op_less_equal.md)    | 左辺が右辺以下かの判定を行う | C++11 |
| [`operator>`](forward_list/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | C++11 |
| [`operator>=`](forward_list/op_greater_equal.md) | 左辺が右辺以上かの判定を行う | C++11 |
| [`swap`](forward_list/swap_free.md)              | 2つの`forward_list`オブジェクトを入れ替える | C++11 |


##例
```cpp
#include <iostream>
#include <forward_list>
#include <algorithm> // for_each

int main()
{
  std::forward_list<int> ls;

  ls.push_front(3);               // 先頭に3を追加
  ls.insert_after(ls.begin(), 1); // 先頭の後ろに1を追加

  // イテレータを介して全要素に対して操作を行う
  std::for_each(ls.cbegin(), ls.cend(), [](int x) {
    std::cout << x << std::endl;
  });
}
```

###出力
```
3
1
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [N2543 STL singly linked lists (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2543.htm) [[概要の日本語訳](http://faithandbrave.hateblo.jp/entry/20080905/1220611240)]

