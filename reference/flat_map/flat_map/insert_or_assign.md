# insert_or_assign
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template<class M>
pair<iterator, bool>
  insert_or_assign(const key_type& k,
                   M&& obj);            // (1) C++23

template<class M>
pair<iterator, bool>
  insert_or_assign(key_type&& k,
                   M&& obj);            // (2) C++23

template<class K, class M>
pair<iterator, bool>
  insert_or_assign(K&& k,
                   M&& obj);            // (3) C++23

template<class M>
iterator
  insert_or_assign(const_iterator hint,
                   const key_type& k,
                   M&& obj);            // (4) C++23

template<class M>
iterator
  insert_or_assign(const_iterator hint,
                   key_type&& k,
                   M&& obj);            // (5) C++23

template<class K, class M>
iterator
  insert_or_assign(const_iterator hint,
                   K&& k,
                   M&& obj);            // (6) C++23
```
* pair[link /reference/utility/pair.md]

## 概要
引数 `k` で指定されたキーが存在しなければ対応する値を引数 `obj` の値として要素を挿入し（`insert`）、さもなければ（`or`）、そのキーに対応する値に引数 `obj` を代入する（`assign`）。

引数 `hint` は、`k` を検索する際のヒントに使用される。

- (1) : `key_type`型のキーをとって挿入もしくは代入する
- (2) : `key_type`型の一時オブジェクトのキーをとって挿入もしくは代入する
- (3) : `key_type`に変換可能な型のキーをとって挿入もしくは代入する
- (4) : 挿入位置のヒントをともない、`key_type`型のキーをとって挿入もしくは代入する
- (5) : 挿入位置のヒントをともない、`key_type`型の一時オブジェクトのキーをとって挿入もしくは代入する
- (6) : 挿入位置のヒントをともない、`key_type`に変換可能な型のキーをとって挿入もしくは代入する


## テンプレートパラメータ制約
- (1), (2), (4), (5) :
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<mapped_type&, M>` が `true` であること
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<mapped_type, M>` が `true` であること
- (3), (6) :
    - `key_compare::is_transparent`が妥当な修飾IDであり、型を示すこと
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<key_type, K>` が `true` であること
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<mapped_type&, M>` が `true` であること
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<mapped_type, M>` が `true` であること

なお、規格に記載はないが、`hint` は [`emplace_hint`](emplace_hint.md) と同様、コンテナの有効な読み取り専用イテレータである必要があるものと思われる。


## 事前条件
- (3), (6) :
    - `key_type`に変換した`k`を`u`として、[`find`](find.md)`(k) ==` [`find`](find.md)`(u)`が`true`であること


## 効果
- (1), (2), (3) :
    - `k`と等価なキーをもつ要素`e`が存在している場合、[`std::forward`](/reference/utility/forward.md)`<M>(obj)`を`e.second`に代入する
    - そうでなければ、以下と等価：
    ```cpp
    try_emplace(std::forward<decltype(k)>(k), std::forward<M>(obj));
    ```
    * try_emplace[link try_emplace.md]
    * std::forward[link /reference/utility/forward.md]

- (4), (5), (6) :
    - `k`と等価なキーをもつ要素`e`が存在している場合、[`std::forward`](/reference/utility/forward.md)`<M>(obj)`を`e.second`に代入する
    - そうでなければ、以下と等価：
    ```cpp
    try_emplace_hint(hint, std::forward<decltype(k)>(k), std::forward<M>(obj));
    ```
    * try_emplace_hint[link try_emplace.md]
    * std::forward[link /reference/utility/forward.md]


## 戻り値
- (1)、(2)、(3) : イテレータと `bool` 値の [`pair`](/reference/utility/pair.md) を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、`second` に `true` が設定される。
    - 代入された場合には、`first` に代入された要素へのイテレータ、`second` に `false` が設定される。
- (4)、(5)、(6) :
    - 挿入された場合には、挿入された要素へのイテレータを返す。
    - 代入された場合には、代入された要素へのイテレータを返す。


## 計算量
- (1)、(2)、(3) : [`emplace`](emplace.md) と同じ
- (4)、(5)、(6) : [`emplace_hint`](emplace_hint.md) と同じ


## 例
```cpp example
#include <iostream>
#include <flat_map>
#include <string>

int main()
{
  std::flat_map<std::string, int> fm;

  auto [it1, b1] = fm.insert_or_assign("foo", 42);
  std::cout << '(' << it1->first << ", " << it1->second << "), " << std::boolalpha << b1 << '\n';

  auto [it2, b2] = fm.insert_or_assign("foo", 0);
  std::cout << '(' << it2->first << ", " << it2->second << "), " << std::boolalpha << b2 << '\n';
}
```
* insert_or_assign[color ff0000]

### 出力
```
(foo, 42), true
(foo, 0), false
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`flat_map::insert`](insert.md)                | 要素を挿入する                             |
| [`flat_map::insert_range`](insert_range.md)    | Rangeを挿入する                            |
| [`flat_map::emplace`](emplace.md)              | 要素を直接構築する                         |
| [`flat_map::emplace_hint`](emplace_hint.md)    | ヒントを使って要素を直接構築する           |
| [`flat_map::try_emplace`](try_emplace.md)      | キーが存在しない場合のみ要素を直接構築する |

