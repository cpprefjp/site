# flat_multimap
* flat_map[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Key,
            class T,
            class Compare = less<Key>,
            class KeyContainer = vector<Key>,
            class MappedContainer = vector<T>>
  class flat_multimap;
}
```
* less[link ../functional/less.md]
* vector[link /reference/vector/vector.md]

## 概要


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------|-------|
| [`(constructor)`](flat_multimap/op_constructor.md) | コンストラクタ | C++23 |
| [`(destructor)`](flat_multimap/op_destructor.md.nolink) | デストラクタ | C++23 |
| [`operator=`](flat_multimap/op_assign.md) | 代入演算子 | C++23 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|--------------------------------------------------|-------|
| [`begin`](flat_multimap/begin.md)     | 先頭を指すイテレータを取得する                   | C++23 |
| [`cbegin`](flat_multimap/cbegin.md)   | 先頭を指す読み取り専用イテレータを取得する       | C++23 |
| [`end`](flat_multimap/end.md)         | 末尾の次を指すイテレータを取得する               | C++23 |
| [`cend`](flat_multimap/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する   | C++23 |
| [`rbegin`](flat_multimap/rbegin.md)   | 末尾を指す逆イテレータを取得する                 | C++23 |
| [`crbegin`](flat_multimap/crbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する     | C++23 |
| [`rend`](flat_multimap/rend.md)       | 先頭の前を指す逆イテレータを取得する             | C++23 |
| [`crend`](flat_multimap/crend.md)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++23 |


### 領域

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|------------------------------------|-------|
| [`empty`](flat_multimap/empty.md)       | コンテナが空であるかどうかを調べる | C++23 |
| [`size`](flat_multimap/size.md)         | 要素数を取得する                   | C++23 |
| [`max_size`](flat_multimap/max_size.md) | 格納可能な最大の要素数を取得する   | C++23 |


### コンテナの変更

| 名前                                            | 説明                                     | 対応バージョン |
|-------------------------------------------------|------------------------------------------|----------------|
| [`clear`](flat_multimap/clear.md)               | 全ての要素を削除する                     | C++23 |
| [`insert`](flat_multimap/insert.md)             | 要素を挿入する                           | C++23 |
| [`insert_range`](flat_multimap/insert_range.md) | Rangeを挿入する                          | C++23 |
| [`emplace`](flat_multimap/emplace.md)           | 要素を直接構築する                       | C++23 |
| [`emplace_hint`](flat_multimap/emplace_hint.md) | ヒントを使って要素を直接構築する         | C++23 |
| [`erase`](flat_multimap/erase.md)               | 要素を削除する                           | C++23 |
| [`swap`](flat_multimap/swap.md)                 | コンテンツを交換する                     | C++23 |
| [`extract`](flat_multimap/extract.md)           | キーのコンテナ、値のコンテナを取得する   | C++23 |
| [`replace`](flat_multimap/replace.md)           | キーのコンテナ、値のコンテナを置き換える | C++23 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|--------------------------------------------------------------|-------|
| [`count`](flat_multimap/count.md)             | 指定したキーにマッチする要素の数を取得する                   | C++23 |
| [`find`](flat_multimap/find.md)               | 指定したキーで要素を探す                                     | C++23 |
| [`contains`](flat_multimap/contains.md)       | 指定したキーの要素が含まれているかを判定する                 | C++23 |
| [`equal_range`](flat_multimap/equal_range.md) | 指定したキーにマッチする要素範囲を取得する                   | C++23 |
| [`lower_bound`](flat_multimap/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを取得する | C++23 |
| [`upper_bound`](flat_multimap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを取得する       | C++23 |

### オブザーバー

| 名前                                        | 説明                                   | 対応バージョン |
|---------------------------------------------|----------------------------------------|----------------|
| [`key_comp`](flat_multimap/key_comp.md)     | キー比較用の関数オブジェクトを取得する | C++23 |
| [`value_comp`](flat_multimap/value_comp.md) | 要素比較用の関数オブジェクトを取得する | C++23 |
| [`keys`](flat_multimap/keys.md)             | キーのコンテナを取得する               | C++23 |
| [`values`](flat_multimap/values.md)         | 値のコンテナを取得する                 | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `key_type` | キーの型。テンプレートパラメータ `Key`  |  C++23 |
| `mapped_type` | 値の型。テンプレートパラメータ `T` | C++23 |
| `value_type` | 要素の型。[`std::pair`](/reference/utility/pair.md)`<key_type, mapped_type>` | C++23 |
| `key_compare` | キー値の大小関係を判定する二項述語の型。テンプレートパラメータ `Compare` | C++23 |
| [`value_compare`](flat_multimap/value_compare.md) | 要素値のキー部分で大小関係を判定する二項述語の型。入れ子クラス | C++23 |
| `reference` | 要素への参照型。[`std::pair`](/reference/utility/pair.md)`<const key_type&, mapped_type&>` | C++23 |
| `const_reference` | 要素への`const`参照型。[`std::pair`](/reference/utility/pair.md)`<const key_type&, const mapped_type&>` | C++23 |
| `size_type` | 要素数を表す符号なし整数型 [`size_t`](/reference/cstddef/size_t.md) | C++23 |
| `difference_type` | 同一のコンテナを指す `iterator` の差を表す符号付き整数型 [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++23 |
| `iterator` | ランダムアクセスイテレータ | C++23 |
| `const_iterator` | 読み取り専用ランダムアクセスイテレータ | C++23 |
| `reverse_iterator` | 逆順ランダムアクセスイテレータ。[`std::reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | C++23 |
| `const_reverse_iterator` | 読み取り専用逆順ランダムアクセスイテレータ。[`std::reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | C++23 |
| `key_container_type` | キーを格納するコンテナ型 `KeyContainer` | C++23 |
| `mapped_container_type` | 値を格納するコンテナ型 `MappedContainer` | C++23 |
| [`containers`](flat_multimap/containers.md) | キーのコンテナと値のコンテナを保持する型 | C++23 |
| [`key_equiv`](flat_multimap/key_equiv.md) | 要素をとってキーの等価比較を行う説明専用の関数オブジェクト | C++23 |


## 非メンバ関数
### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase_if`](flat_multimap/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++23 |


## 非メンバ（*Hidden friends*）関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](flat_multimap/op_equal.md)                          | 左辺と右辺が等しいかの判定を行う                                  | C++23 |
| `bool operator!=(const flat_multimap& x, const flat_multimap& y);` | 左辺と右辺が等しくないかの判定を行う (`==`により使用可能)         | C++23 |
| [`operator<=>`](flat_multimap/op_compare_3way.md)                  | 三方比較を行う                                                    | C++23 |
| `bool operator<(const flat_multimap& x, const flat_multimap& y);`  | 左辺が右辺より小さいかの判定を行う  (`<=>`により使用可能)         | C++23 |
| `bool operator<=(const flat_multimap& x, const flat_multimap& y);` | 左辺が右辺より小さいか等しいかの判定を行う (`<=>`により使用可能)  | C++23 |
| `bool operator>(const flat_multimap& x, const flat_multimap& y);`  | 左辺が右辺より大きいかの判定を行う (`<=>`により使用可能)          | C++23  |
| `bool operator>=(const flat_multimap& x, const flat_multimap& y);` | 左辺が右辺より大きいか等しいかの判定を行う (`<=>`により使用可能)  | C++23 |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](flat_multimap/swap_free.md) | 2つの`flat_multimap`オブジェクトを入れ替える | C++23 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](flat_multimap/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23 |


## その他

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`uses_allocator`](flat_multimap/uses_allocator.md) | `flat_multimap`による特殊化 | C++23 |



## 例
### 基本的な使い方
```cpp example
#include <flat_map>
#include <iostream>

int main()
{
  // intをキー、charを値、として扱う連想配列
  // flat_mapとは異なり、キーが重複してもよい
  std::flat_multimap<int, char> fm = {
    {10, 'A'}, {11, 'B'}, {12, 'C'},
    {10, 'a'}, {11, 'b'}, {12, 'c'},
  };

  // 全体を出力する
  for (const auto& [key, value] : fm) {
    std::cout << key << " : " << value << std::endl;
  }
}
```

#### 出力
```
10 : A
10 : a
11 : B
11 : b
12 : C
12 : c
```



### キーと要素以外のテンプレートを指定
```cpp example
#include <deque>
#include <flat_map>
#include <iostream>

int main()
{
  std::deque<int> keys = {10, 10, 11, 11, 12, 12};
  std::deque<char> values = {'A', 'a', 'B', 'b', 'C', 'c'};

  // intをキー、charを値として扱う連想配列
  // キーの順序はgreater、キーと値のコンテナはdequeで保持
  std::flat_multimap<int,
                     char,
                     std::greater<int>,
                     std::deque<int>,
                     std::deque<char>> fm(keys, values);

  // 全体を出力する
  for (const auto& [key, value] : fm) {
    std::cout << key << " : " << value << std::endl;
  }
}
```

#### 出力
```
12 : C
12 : c
11 : B
11 : b
10 : A
10 : a
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0429R3 A Standard `flat_map`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0429r3.pdf)
    - C++23で`flat_map`が導入された経緯・動機・設計について記載されている
- [P0429R9 A Standard `flat_map`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0429r9.pdf)
    - C++23で導入された`flat_map`の仕様
