# flat_map
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
  class flat_map;
}
```
* less[link ../functional/less.md]
* vector[link /reference/vector/vector.md]

## 概要


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------|-------|
| [`(constructor)`](flat_map/op_constructor.md.nolink) | コンストラクタ | C++23 |
| [`(destructor)`](flat_map/op_destructor.md.nolink) | デストラクタ | C++23 |
| [`operator=`](flat_map/op_assign.md.nolink) | 代入演算子 | C++23 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------|--------------------------------------------------|-------|
| [`begin`](flat_map/begin.md)     | 先頭を指すイテレータを取得する                   | C++23 |
| [`cbegin`](flat_map/cbegin.md)   | 先頭を指す読み取り専用イテレータを取得する       | C++23 |
| [`end`](flat_map/end.md)         | 末尾の次を指すイテレータを取得する               | C++23 |
| [`cend`](flat_map/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する   | C++23 |
| [`rbegin`](flat_map/rbegin.md)   | 末尾を指す逆イテレータを取得する                 | C++23 |
| [`crbegin`](flat_map/crbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する     | C++23 |
| [`rend`](flat_map/rend.md)       | 先頭の前を指す逆イテレータを取得する             | C++23 |
| [`crend`](flat_map/crend.md)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++23 |


### 領域

| 名前 | 説明 | 対応バージョン |
|------------------------------------|------------------------------------|-------|
| [`empty`](flat_map/empty.md)       | コンテナが空であるかどうかを調べる | C++23 |
| [`size`](flat_map/size.md)         | 要素数を取得する                   | C++23 |
| [`max_size`](flat_map/max_size.md) | 格納可能な最大の要素数を取得する   | C++23 |


### コンテナの変更

| 名前                                          | 説明                                       | 対応バージョン |
|-----------------------------------------------|--------------------------------------------|----------------|
| [`clear`](flat_map/clear.md)                       | 全ての要素を削除する                       | C++23 |
| [`insert`](flat_map/insert.md)                     | 要素を挿入する                             | C++23 |
| [`insert_or_assign`](flat_map/insert_or_assign.md) | 要素を挿入、あるいは代入する               | C++23 |
| [`insert_range`](flat_map/insert_range.md)         | Rangeを挿入する                            | C++23 |
| [`emplace`](flat_map/emplace.md)                   | 要素を直接構築する                         | C++23 |
| [`emplace_hint`](flat_map/emplace_hint.md)         | ヒントを使って要素を直接構築する           | C++23 |
| [`try_emplace`](flat_map/try_emplace.md)           | キーが存在しない場合のみ要素を直接構築する | C++23 |
| [`erase`](flat_map/erase.md)                       | 要素を削除する                             | C++23 |
| [`swap`](flat_map/swap.md)                         | コンテンツを交換する                       | C++23 |
| [`extract`](flat_map/extract.md)                   | キーのコンテナ、値のコンテナを取得する     | C++23 |
| [`replace`](flat_map/replace.md)                   | キーのコンテナ、値のコンテナを置き換える   | C++23 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|--------------------------------------------|-------|
| [`operator[]`](flat_map/op_at.md)        | 指定したキーを持つ要素を取得する           | C++23 |
| [`at`](flat_map/at.md)                   | 指定したキーを持つ要素を取得する           | C++23 |
| [`count`](flat_map/count.md)             | 指定したキーにマッチする要素の数を取得する | C++23 |
| [`find`](flat_map/find.md)               | 指定したキーで要素を探す                   | C++23 |
| [`contains`](flat_map/contains.md)       | 指定したキーの要素が含まれているかを判定する | C++23 |
| [`equal_range`](flat_map/equal_range.md) | 指定したキーにマッチする要素範囲を取得する | C++23 |
| [`lower_bound`](flat_map/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを取得する | C++23 |
| [`upper_bound`](flat_map/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを取得する       | C++23 |

### オブザーバー

| 名前                                | 説明                                   | 対応バージョン |
|-------------------------------------|----------------------------------------|----------------|
| [`key_comp`](flat_map/key_comp.md.nolink)     | キー比較用の関数オブジェクトを取得する | C++23 |
| [`value_comp`](flat_map/value_comp.md.nolink) | 要素比較用の関数オブジェクトを取得する | C++23 |
| [`keys`](flat_map/keys.md.nolink)             | キーのコンテナを取得する | C++23 |
| [`values`](flat_map/values.md.nolink)         | 値のコンテナを取得する | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `key_type` | キーの型。テンプレートパラメータ `Key`  |  C++23 |
| `mapped_type` | 値の型。テンプレートパラメータ `T` | C++23 |
| `value_type` | 要素の型。[`std::pair`](/reference/utility/pair.md)`<key_type, mapped_type>` | C++23 |
| `key_compare` | キー値の大小関係を判定する二項述語の型。テンプレートパラメータ `Compare` | C++23 |
| [`value_compare`](flat_map/value_compare.md.nolink) | 要素値のキー部分で大小関係を判定する二項述語の型。入れ子クラス | C++23 |
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
| [`containers`](flat_map/containers.md) | キーのコンテナと値のコンテナを保持する型 | C++23 |
| [`key_equiv`](flat_map/key_equiv.md) | 要素をとってキーの等価比較を行う説明専用の関数オブジェクト | C++23 |


## 非メンバ関数
### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase_if`](flat_map/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++23 |


## 非メンバ（*Hidden friends*）関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](flat_map/op_equal.md)         | 左辺と右辺が等しいかの判定を行う           | C++23 |
| `bool operator!=(const flat_map& x, const flat_map& y);` | 左辺と右辺が等しくないかの判定を行う (`==`により使用可能) | C++23 |
| [`operator<=>`](flat_map/op_compare_3way.md) | 三方比較を行う                             | C++23 |
| `bool operator<(const flat_map& x, const flat_map& y);`  | 左辺が右辺より小さいかの判定を行う  (`<=>`により使用可能) | C++23 |
| `bool operator<=(const flat_map& x, const flat_map& y);` | 左辺が右辺より小さいか等しいかの判定を行う (`<=>`により使用可能) | C++23 |
| `bool operator>(const flat_map& x, const flat_map& y);`  | 左辺が右辺より大きいかの判定を行う (`<=>`により使用可能) | C++23 |
| `bool operator>=(const flat_map& x, const flat_map& y);` | 左辺が右辺より大きいか等しいかの判定を行う (`<=>`により使用可能) | C++23 |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](flat_map/swap_free.md.nolink) | 2つの`flat_map`オブジェクトを入れ替える | C++23 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](flat_map/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23 |


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <string>
#include <flat_map>

int main()
{
  // stringをキー、intを値として扱う連想配列
  std::flat_map<std::string, int> fm = {
    {"Carol", 4},
    {"Alice", 3},
    {"Bob", 1}
  };

  // 検索 : キー(string)を指定し、値(int)を得る
  int r = fm.at("Alice");
  std::cout << r << std::endl;

  // 全体を出力する
  for (const auto& [key, value] : fm) {
    std::cout << key << " : " << value << std::endl;
  }
}
```
* fm.at[link flat_map/at.md]

#### 出力
```
3
Alice : 3
Bob : 1
Carol : 4
```



### ユーザー定義型をキーとして使用する (`operator<=>`を定義)
```cpp example
#include <iostream>
#include <string>
#include <flat_map>

// 要素がひとつの場合
struct MyInt {
  int value;

  friend auto operator<=>(const MyInt& a, const MyInt& b) noexcept {
    return a.value <=> b.value;
  }
};

// 要素が複数の場合
struct Person {
  int id;
  int age;
  std::string name;

  friend auto operator<=>(const Person& a, const Person& b) noexcept {
    if (auto comp = a.id <=> b.id; comp != 0) {
      return comp;
    }
    if (auto comp = a.age <=> b.age; comp != 0) {
      return comp;
    }
    return a.name <=> b.name;
  }
};

int main()
{
  std::flat_map<MyInt, int> fm1 {
    {MyInt{1}, 3},
    {MyInt{2}, 1},
    {MyInt{3}, 4},
  };
  std::cout << fm1[MyInt{2}] << std::endl;

  std::flat_map<Person, int> fm2 {
    {Person{1, 18, "Alice"}, 3},
    {Person{2, 30, "Bob"}, 1},
    {Person{3, 30, "Carol"}, 4},
  };
  std::cout << fm2[Person{2, 30, "Bob"}] << std::endl;
}
```

#### 出力
```
1
1
```


### ユーザー定義型をキーとして使用する (大小比較の関数オブジェクトを定義)
```cpp example
#include <iostream>
#include <string>
#include <tuple>
#include <flat_map>

// 要素がひとつの場合
struct MyInt {
  int value;
};

struct MyIntLess {
  bool operator()(const MyInt& a, const MyInt& b) const noexcept {
    return a.value < b.value;
  }
};

// 要素が複数の場合
struct Person {
  int id;
  int age;
  std::string name;
};

struct PersonLess {
  bool operator()(const Person& a, const Person& b) const noexcept {
    // キーとして比較したい要素を列挙する
    return std::tie(a.id, a.age, a.name) < std::tie(b.id, b.age, b.name);
  }
};

int main()
{
  std::flat_map<MyInt, int, MyIntLess> fm1 {
    {MyInt{1}, 3},
    {MyInt{2}, 1},
    {MyInt{3}, 4},
  };
  std::cout << fm1[MyInt{2}] << std::endl;

  std::flat_map<Person, int, PersonLess> fm2 {
    {Person{1, 18, "Alice"}, 3},
    {Person{2, 30, "Bob"}, 1},
    {Person{3, 30, "Carol"}, 4},
  };
  std::cout << fm2[Person{2, 30, "Bob"}] << std::endl;
}
```

#### 出力
```
1
1
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
