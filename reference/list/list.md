# list
* list[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator = allocator<T> >
  class list;

  namespace pmr {
    template <class T>
      using list = std::list<T, polymorphic_allocator<T>>;  // C++17から
  }
}
```
* allocator[link /reference/memory/allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

## 概要
`list`は、双方向リンクリストのデータ構造をもつクラスである。

任意の位置への挿入や削除を定数時間で行う事が出来るが、高速なランダムアクセスは出来ず、常にシーケンシャルアクセスを行う必要がある。

テンプレートパラメータは、以下を意味する：

- `T`: 格納される要素の型、C++17以降は不完全型をサポートしている
- `Allocator`: メモリ確保に使用されるアロケータの型。デフォルトでは標準の[`allocator`](/reference/memory/allocator.md)クラスが使用される。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|----------------|-------|
| [`(constructor)`](list/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](list/op_destructor.md) | デストラクタ | |
| [`operator=`](list/op_assign.md) | 代入演算子 | |
| [`assign`](list/assign.md) | コンテナの再代入 | |
| [`assign_range`](list/assign_range.md) | Rangeの要素を再代入 | C++23 |


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
| [`push_front`](list/push_front.md)       | 先頭に要素を追加する           | |
| [`emplace_front`](list/emplace_front.md) | 先頭への直接構築による要素追加 | C++11 |
| [`prepend_range`](list/prepend_range.md) | 先頭にRangeの要素を追加する   | C++23 |
| [`push_back`](list/push_back.md)         | 末尾に要素を追加する           | |
| [`emplace_back`](list/emplace_back.md)   | 末尾への直接構築による要素追加 | C++11 |
| [`append_range`](list/append_range.md)   | 末尾にRangeの要素を追加する   | C++23 |
| [`insert`](list/insert.md)               | 要素の挿入                     | |
| [`emplace`](list/emplace.md)             | 要素の直接構築による挿入       | C++11 |
| [`insert_range`](list/insert_range.md)   | 任意の位置にRangeの要素を挿入する | C++23 |
| [`pop_front`](list/pop_front.md)         | 先頭から要素を削除             | |
| [`pop_back`](list/pop_back.md)           | 末尾から要素を削除             | |
| [`erase`](list/erase.md)                 | 要素の削除                     | |
| [`clear`](list/clear.md)                 | 全要素削除                     | |
| [`swap`](list/swap.md)                   | コンテナの交換                 | |


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
| `difference_type`        | 符号付き整数型(通常は[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) | |
| `value_type`             | `T` | |
| `allocator_type`         | `Allocator` | |
| `pointer`                | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer` | |
| `const_pointer`          | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer` | |
| `reverse_iterator`       | `std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | |
| `const_reverse_iterator` | `std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | |


## 非メンバ関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|-------------------------------------|-------|
| [`operator==`](list/op_equal.md)         | 等値比較                            | |
| [`operator!=`](list/op_not_equal.md)     | 非等値比較                          | |
| [`operator<=>`](list/op_compare_3way.md) | 三方比較                            | C++20 |
| [`operator<`](list/op_less.md)           | 左辺が右辺より小さいかの判定を行う  | |
| [`operator<=`](list/op_less_equal.md)    | 左辺が右辺以下かの判定を行う        | |
| [`operator>`](list/op_greater.md)        | 左辺が右辺より大きいかの判定を行う  | |
| [`operator>=`](list/op_greater_equal.md) | 左辺が右辺以上かの判定を行う        | |

### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](list/swap_free.md) | 2つの`list`オブジェクトを入れ替える | |

### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase`](list/erase_free.md) | 指定した値をもつ要素とその分の領域を、コンテナから削除する | C++20 |
| [`erase_if`](list/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++20 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](list/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
### 基本的な使い方
```cpp example
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

#### 出力
```
2 1 3 4 
```

### 不完全型を要素にする例 (C++17)

不完全型を要素型に出来るようになった事で、階層構造や多分木などの再帰的データ構造を実装することが容易になる。  
他にも、[`vector`](/reference/vector/vector.md)と[`forward_list`](/reference/forward_list/forward_list.md)が不完全型をサポートしている。

```cpp example
#include <iostream>
#include <list>
#include <string>

//簡易なディレクトリ構造表現クラス
class directory {

  //不完全型（クラス定義内ではそのクラス自身は不完全）を要素型に指定
  std::list<directory> m_subdir{};
  std::string m_name{};

public:

  directory(const char* name) : m_name{name}
  {}

  //サブディレクトリ追加
  template<typename Dir>
  void add(Dir&& dir) {
    m_subdir.emplace_back(std::forward<Dir>(dir));
  }

  //ディレクトリ名取得
  auto get() const -> const std::string& {
    return m_name;
  }

  auto begin() const {
    return m_subdir.begin();
  }

  auto end() const {
    return m_subdir.end();
  }
};

//ルートより下のディレクトリについて整形して出力
void recursive_out(const directory& dir, unsigned int depth) {

  if (1 < depth) std::cout << "| ";
  for (auto i = depth; 2 < i; --i) {
    std::cout << " ";
  }
  if (2 < depth) std::cout << " ";

  std::cout << "|-" << dir.get() << std::endl;

  for (auto& subdir : dir) {
    recursive_out(subdir, depth + 1);
  }
}

//ディレクトリ構造を出力する
void out_directorytree(const directory& dir) {
  std::cout << dir.get() << std::endl;

  for (auto& subdir : dir) {
    recursive_out(subdir, 1);
  }
}

int main() {
  directory dir{"root"};
  dir.add("sub1");

  directory sub2{"sub2"};
  sub2.add("sub2.1");

  directory sub22{"sub2.2"};
  sub22.add("sub2.2.1");

  sub2.add(std::move(sub22));

  dir.add(std::move(sub2));
  dir.add("sub3");

  out_directorytree(dir);
}
```
* std::list[color ff0000]
* emplace_back[link list/emplace_back.md]
* begin[link list/begin.md]
* end[link list/end.md]
* for[link /lang/cpp11/range_based_for.md]
* std::move[link /reference/utility/move.md]

#### 出力
```
root
|-sub1
|-sub2
| |-sub2.1
| |-sub2.2
|   |-sub2.2.1
|-sub3
```

## 参照
- [N2669 Thread-Safety in the Standard Library (Rev 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2669.htm)
- [N4510 Minimal incomplete type support for standard containers, revision 4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4510.html)


