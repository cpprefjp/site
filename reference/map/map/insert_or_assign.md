# insert_or_assign
* map[meta header]
* std[meta namespace]
* map[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
template <class M>
pair<iterator, bool> insert_or_assign(const key_type& k, M&& obj);              // (1)

template <class M>
pair<iterator, bool> insert_or_assign(key_type&& k, M&& obj);                   // (2)

template <class M>
iterator insert_or_assign(const_iterator hint, const key_type& k, M&& obj);     // (3)

template <class M>
iterator insert_or_assign(const_iterator hint, key_type&& k, M&& obj);          // (4)
```
* pair[link /reference/utility/pair.md]

## 概要
引数 `k` で指定された�ーが�在しなければ対応する値を引数 `obj` の値として要素を挿入し（`insert`）、さもなければ（`or`）、その�ーに対応する値に引数 `obj` を代入する（`assign`）。

引数 `hint` は、`k` を検索する際のヒントに使用される。


## テンプレートパラメータ制約
- (1)、(3) : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<mapped_type&, M&&>` が `true` であること。`value_type` は、`k`, [`forward`](/reference/utility/forward.md)`<M>(obj)` から `map` に直接構築可能であること
- (2)、(4) : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<mapped_type&, M&&>` が `true` であること。`value_type` は、[`move`](/reference/utility/move.md)`(k)`, [`forward`](/reference/utility/forward.md)`<M>(obj)` から `map` に直接構築可能であること

なお、規格に記載はないが、`hint` は [`emplace_hint`](emplace_hint.md) と同様、コンテナの有効な�み取り専用イテレータである必要があるものと思われる。


## 効果
- (1)、(3) : `map` が `k` と同値の�ーを持つ要素 `e` を持っている場合、`e.second` に [`forward`](/reference/utility/forward.md)`<M>(obj)` を代入する。そうでなければ、`k`, [`forward`](/reference/utility/forward.md)`<M>(obj)` から構築した `value_type` 型のオブジェクトを挿入する。
- (2)、(4) : `map` が `k` と同値の�ーを持つ要素 `e` を持っている場合、`e.second` に [`forward`](/reference/utility/forward.md)`<M>(obj)` を代入する。そうでなければ、[`move`](/reference/utility/move.md)`(k)`, [`forward`](/reference/utility/forward.md)`<M>(obj)` から構築した `value_type` 型のオブジェクトを挿入する。


## 戻り値
- (1)、(2) : イテレータと `bool` 値の [`pair`](/reference/utility/pair.md) を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、`second` に `true` が�定される。
    - 代入された場合には、`first` に代入された要素へのイテレータ、`second` に `false` が�定される。
- (3)、(4) :
    - 挿入された場合には、挿入された要素へのイテレータを返す。
    - 代入された場合には、代入された要素へのイテレータを返す。


## 計算量
- (1)、(2) : [`emplace`](emplace.md) と同じ。
- (3)、(4) : [`emplace_hint`](emplace_hint.md) と同じ。


## 備考
このメンバ関数の機能テストマク�は以下の通り。

| マク�名                    | 値       |
|-----------------------------|----------|
| `__cpp_lib_map_try_emplace` | `201411` |


## 例
```cpp example
#include <iostream>
#include <map>
#include <string>

int main()
{
  std::map<std::string, int> m;

  auto [it1, b1] = m.insert_or_assign("foo", 42);
  std::cout << '(' << it1->first << ", " << it1->second << "), " << std::boolalpha << b1 << '\n';

  auto [it2, b2] = m.insert_or_assign("foo", 0);
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
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.7.0
- [GCC](/implementation.md#gcc): 6.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`map::insert`](insert.md)                     | 要素を挿入する                             |
| [`map::emplace`](emplace.md)                   | 要素を直接構築する                         |
| [`map::emplace_hint`](emplace_hint.md)         | ヒントを使って要素を直接構築する           |
| [`map::try_emplace`](try_emplace.md)           | �ーが�在しない場合のみ要素を直接構築する |


## 参照
- [N3873 Improved insertion interface for unique-key maps](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3873.html)
- [N4006 An improved emplace() for unique-key maps](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4006.html)
- [N4240 Improved insertion interface for unique-key maps (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4240.html)
- [N4279 Improved insertion interface for unique-key maps (Revision 2.3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4279.html)
