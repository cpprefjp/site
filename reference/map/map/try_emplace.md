# try_emplace
* map[meta header]
* std[meta namespace]
* map[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
template <class... Args>
pair<iterator, bool>
  try_emplace(const key_type& k, Args&&... args); // (1) C++17

template <class... Args>
pair<iterator, bool>
  try_emplace(key_type&& k, Args&&... args);      // (2) C++17

template <class... Args>
iterator
  try_emplace(const_iterator hint,
              const key_type& k,
              Args&&... args);        // (3) C++17

template <class... Args>
iterator
  try_emplace(const_iterator hint,
              key_type&& k,
              Args&&... args);        // (4) C++17

template <class K, class... Args>
pair<iterator, bool>
  try_emplace(K&& k, Args&&... args); // (5) C++26

template <class K, class... Args>
iterator
  try_emplace(const_iterator hint,
              K&& k,
              Args&&... args);        // (6) C++26
```
* pair[link /reference/utility/pair.md]

## 概要
指定されたキーが存在しない場合のみ要素を直接構築で挿入する。

引数 `k` と等価のキーを持つ要素が存在しない場合、コンテナに新しい要素を挿入する。要素は引数からコンテナ内に直接構築されるため、構築されたオブジェクトはコピーもムーブもされない。  
なお、本メンバ関数は [`emplace`](emplace.md) や [`emplace_hint`](emplace_hint.md) 等と異なり、引数 `k` と等価のキーを持つ要素が既に存在する場合には、`k` や `args` がムーブされてしまうことはない。

引数 `hint` は、`k` を検索する際のヒントに使用される。

- (1) : 指定されたキーが存在しない場合に、要素を直接構築で挿入する
- (2) : 指定された一時オブジェクトのキーが存在しない場合に、要素を直接構築で挿入する
- (3) : キーを検索するヒントを指定し、指定されたキーが存在しない場合に、要素を直接構築で挿入する
- (4) : キーを検索するヒントを指定し、指定された一時オブジェクトのキーが存在しない場合に、要素を直接構築で挿入する
- (5) : `key_type`型と比較可能なキーが存在しない場合に、要素を直接構築で挿入する
- (6) : キーを検索するヒントを指定し、指定された`key_type`型と比較可能なキーが存在しない場合に、要素を直接構築で挿入する


## テンプレートパラメータ制約
- (1)、(3)、(5)、(6) : `value_type` は、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(k)`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から `map` に直接構築可能であること
- (2)、(4) : `value_type` は、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`move`](/reference/utility/move.md)`(k))`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から `map` に直接構築可能であること
- (5), (6) : `key_compare::is_transparent` が妥当な式であること
- (5) : 以下のすべてを満たすこと：
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<K&&, const_iterator> == false`
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<K&&, iterator> == false`

なお、規格に記載はないが、`hint` は [`emplace_hint`](emplace_hint.md) と同様、コンテナの有効な読み取り専用イテレータである必要があるものと思われる。


## 効果
- (1)、(3)、(5)、(6) : `map` が `k` と同値のキーを持つ要素を持っている場合、何もしない（引数への副作用もない）。そうでなければ、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(k)`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から構築した `value_type` 型のオブジェクトを挿入する。
- (2)、(4) : `map` が `k` と同値のキーを持つ要素を持っている場合、何もしない（引数への副作用もない）。そうでなければ、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`move`](/reference/utility/move.md)`(k))`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から構築した `value_type` 型のオブジェクトを挿入する。


## 戻り値
- (1)、(2)、(5) : イテレータと `bool` 値の [`pair`](/reference/utility/pair.md) を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、`second` に `true` が設定される。
    - 挿入されなかった場合には、`first` に `k` と等価のキーを持つ既存の要素へのイテレータ、`second` に `false` が設定される。
- (3)、(4)、(6) :
    - 挿入された場合には、挿入された要素へのイテレータを返す。
    - 挿入されなかった場合には、`k` と等価のキーを持つ既存の要素へのイテレータを返す。


## 計算量
- (1)、(2)、(5) : [`emplace`](emplace.md) と同じ。
- (3)、(4)、(6) : [`emplace_hint`](emplace_hint.md) と同じ。


## 備考
- 概要に記載されているように、本メンバ関数は指定されたキーと等価の要素が既に存在する場合には、引数に副作用が発生しない。  
    - 一方、[`emplace`](emplace.md)、[`emplace_hint`](emplace_hint.md)、[`insert`](insert.md) にはそのような規定は無く、挿入がされなかった場合でも引数に副作用（引数からのムーブ）が発生してしまう可能性があるため、注意が必要である。
- (5), (6) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <iostream>
#include <map>
#include <memory>
#include <utility>

int main()
{
  std::map<int, std::unique_ptr<int>> m;

  auto u1 = std::make_unique<int>(114);
  auto [it1, b1] = m.try_emplace(42, std::move(u1));
  std::cout << std::boolalpha << (u1.get() == nullptr) << ", " << *it1->second << ", " << b1 << '\n';

  auto u2 = std::make_unique<int>(514);
  auto [it2, b2] = m.try_emplace(42, std::move(u2));
  std::cout << std::boolalpha << (u2.get() == nullptr) << ", " << *it2->second << ", " << b2 << '\n';
}
```
* try_emplace[color ff0000]
* get[link /reference/memory/unique_ptr/get.md]
* std::move[link /reference/utility/move.md]

#### 出力
```
true, 114, true
false, 114, false
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.7.0 [mark verified]
- [GCC](/implementation.md#gcc): 6.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`map::insert`](insert.md)                     | 要素を挿入する                             |
| [`map::insert_or_assign`](insert_or_assign.md) | 要素を挿入、あるいは代入する               |
| [`map::emplace`](emplace.md)                   | 要素を直接構築する                         |
| [`map::emplace_hint`](emplace_hint.md)         | ヒントを使って要素を直接構築する           |


## 参照
- [N3873 Improved insertion interface for unique-key maps](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3873.html)
- [N4006 An improved emplace() for unique-key maps](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4006.html)
- [N4240 Improved insertion interface for unique-key maps (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4240.html)
- [N4279 Improved insertion interface for unique-key maps (Revision 2.3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4279.html)
- [P2363R5: Extending associative containers with the remaining heterogeneous overloads](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2363r5.html)
    - C++26で`template <class K>`のバージョンが追加された
