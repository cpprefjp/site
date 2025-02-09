# flat_multiset
* flat_set[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Key,
            class Compare = less<Key>,
            class KeyContainer = vector<Key>>
  class flat_multiset;
}
```
* less[link ../functional/less.md]
* vector[link /reference/vector/vector.md]

## 概要


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------|-------|
| [`(constructor)`](flat_multiset/op_constructor.md) | コンストラクタ | C++23 |
| [`(destructor)`](flat_multiset/op_destructor.md.nolink) | デストラクタ | C++23 |
| [`operator=`](flat_multiset/op_assign.md) | 代入演算子 | C++23 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|--------------------------------------------------|-------|
| [`begin`](flat_multiset/begin.md)     | 先頭を指すイテレータを取得する                   | C++23 |
| [`cbegin`](flat_multiset/cbegin.md)   | 先頭を指す読み取り専用イテレータを取得する       | C++23 |
| [`end`](flat_multiset/end.md)         | 末尾の次を指すイテレータを取得する               | C++23 |
| [`cend`](flat_multiset/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する   | C++23 |
| [`rbegin`](flat_multiset/rbegin.md)   | 末尾を指す逆イテレータを取得する                 | C++23 |
| [`crbegin`](flat_multiset/crbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する     | C++23 |
| [`rend`](flat_multiset/rend.md)       | 先頭の前を指す逆イテレータを取得する             | C++23 |
| [`crend`](flat_multiset/crend.md)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++23 |


### 領域

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|------------------------------------|-------|
| [`empty`](flat_multiset/empty.md)       | コンテナが空であるかどうかを調べる | C++23 |
| [`size`](flat_multiset/size.md)         | 要素数を取得する                   | C++23 |
| [`max_size`](flat_multiset/max_size.md) | 格納可能な最大の要素数を取得する   | C++23 |


### コンテナの変更

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|--------------------------------------------|----------------|
| [`clear`](flat_multiset/clear.md)               | 全ての要素を削除する                       | C++23 |
| [`insert`](flat_multiset/insert.md)             | 要素を挿入する                             | C++23 |
| [`insert_range`](flat_multiset/insert_range.md) | Rangeを挿入する                            | C++23 |
| [`emplace`](flat_multiset/emplace.md)           | 要素を直接構築する                         | C++23 |
| [`emplace_hint`](flat_multiset/emplace_hint.md) | ヒントを使って要素を直接構築する           | C++23 |
| [`erase`](flat_multiset/erase.md)               | 要素を削除する                             | C++23 |
| [`swap`](flat_multiset/swap.md)                 | コンテンツを交換する                       | C++23 |
| [`extract`](flat_multiset/extract.md)           | キーのコンテナを取得する                   | C++23 |
| [`replace`](flat_multiset/replace.md)           | キーのコンテナを置き換える                 | C++23 |

### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|--------------------------------------------|-------|
| [`count`](flat_multiset/count.md)             | 指定したキーにマッチする要素の数を取得する | C++23 |
| [`find`](flat_multiset/find.md)               | 指定したキーで要素を探す                   | C++23 |
| [`contains`](flat_multiset/contains.md)       | 指定したキーの要素が含まれているかを判定する | C++23 |
| [`equal_range`](flat_multiset/equal_range.md) | 指定したキーにマッチする要素範囲を取得する | C++23 |
| [`lower_bound`](flat_multiset/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを取得する | C++23 |
| [`upper_bound`](flat_multiset/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを取得する       | C++23 |

### オブザーバー

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------|----------------|
| [`key_comp`](flat_multiset/key_comp.md)     | キー比較用の関数オブジェクトを取得する | C++23 |
| [`value_comp`](flat_multiset/value_comp.md) | 要素比較用の関数オブジェクトを取得する | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------|---------------------------|----------------|
| `key_type`               | キーの型。テンプレートパラメータ `Key`  |  C++23 |
| `value_type`             | 要素の型。テンプレートパラメータ `Key`  |  C++23 |
| `key_compare`            | キーの大小関係を判定する二項述語の型。テンプレートパラメータ `Compare` | C++23 |
| `value_compare`          | 要素の大小関係を判定する二項述語の型。テンプレートパラメータ `Compare` | C++23 |
| `reference`              | 要素への参照型。`value_type&` | C++23 |
| `const_reference`        | 要素への`const`参照型。`const value_type&` | C++23 |
| `size_type`              | 要素数を表す符号なし整数型 [`size_t`](/reference/cstddef/size_t.md) | C++23 |
| `difference_type`        | 同一のコンテナを指す `iterator` の差を表す符号付き整数型 [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++23 |
| `iterator`               | ランダムアクセスイテレータ | C++23 |
| `const_iterator`         | 読み取り専用ランダムアクセスイテレータ | C++23 |
| `reverse_iterator`       | 逆順ランダムアクセスイテレータ。[`std::reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | C++23 |
| `const_reverse_iterator` | 読み取り専用逆順ランダムアクセスイテレータ。[`std::reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | C++23 |
| `container_type`         | キーを格納するコンテナ型 `KeyContainer` | C++23 |


## 非メンバ関数
### 要素削除

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|-------------------------------------|----------------|
| [`erase_if`](flat_multiset/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++23 |


## 非メンバ（*Hidden friends*）関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------------|----------------------------|-------|
| [`operator==`](flat_multiset/op_equal.md)                          | 左辺と右辺が等しいかの判定を行う           | C++23 |
| `bool operator!=(const flat_multiset& x, const flat_multiset& y);` | 左辺と右辺が等しくないかの判定を行う (`==`により使用可能) | C++23 |
| [`operator<=>`](flat_multiset/op_compare_3way.md)                  | 三方比較を行う                             | C++23 |
| `bool operator<(const flat_multiset& x, const flat_multiset& y);`  | 左辺が右辺より小さいかの判定を行う  (`<=>`により使用可能) | C++23 |
| `bool operator<=(const flat_multiset& x, const flat_multiset& y);` | 左辺が右辺より小さいか等しいかの判定を行う (`<=>`により使用可能) | C++23 |
| `bool operator>(const flat_multiset& x, const flat_multiset& y);`  | 左辺が右辺より大きいかの判定を行う (`<=>`により使用可能) | C++23 |
| `bool operator>=(const flat_multiset& x, const flat_multiset& y);` | 左辺が右辺より大きいか等しいかの判定を行う (`<=>`により使用可能) | C++23 |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](flat_multiset/swap_free.md) | 2つの`flat_multiset`オブジェクトを入れ替える | C++23 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](flat_multiset/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23 |


## その他

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------|-------|
| [`uses_allocator`](flat_multiset/uses_allocator.md) | `flat_multiset`による特殊化 | C++23 |



## 例
### 基本的な使い方
```cpp example
#include <flat_set>
#include <iostream>
#include <string>

int main()
{
  // stringをキーとして扱う連想配列
  std::flat_multiset<std::string> fs = {"Carol", "Alice", "Bob", "Carol"};

  // 検索 : キーを指定し、イテレータを得る
  auto it = fs.find("Alice");
  std::cout << *it << std::endl
            << std::endl;

  // 全体を出力する
  for (const auto& str : fs) {
    std::cout << str << std::endl;
  }
}
```
* fs.find[link flat_multiset/find.md]

#### 出力
```
Alice

Alice
Bob
Carol
Carol
```

### キー以外のテンプレートを指定
```cpp example
#include <deque>
#include <flat_set>
#include <iostream>

int main()
{
  std::deque<int> keys = {1, 4, 2, 8, 5, 7};

  // intをキーとして扱う連想配列
  // キーの順序はgreater、キーのコンテナはdequeで保持
  std::flat_multiset<int,
                     std::greater<int>,
                     std::deque<int>> fs(keys);

  // 全体を出力する
  for (int i : fs) {
    std::cout << i << " ";
  }
  std::cout << std::endl;
}
```
* std::greater[link ../functional/greater.md]

#### 出力
```
8 7 5 4 2 1 
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1222R0 A Standard `flat_set`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1222r0.pdf)
    - C++23で`flat_set`が導入された経緯・動機・設計について記載されている
- [P1222R4 A Standard `flat_set`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1222r4.pdf)
    - C++23で導入された`flat_set`の仕様
