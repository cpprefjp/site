# try_emplace
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <class... Args>
pair<iterator, bool>
  try_emplace(const key_type& k,
              Args&&... args); // (1) C++23
template <class... Args>
constexpr pair<iterator, bool>
  try_emplace(const key_type& k,
              Args&&... args); // (1) C++26

template <class... Args>
pair<iterator, bool>
  try_emplace(key_type&& k,
              Args&&... args); // (2) C++23
template <class... Args>
constexpr pair<iterator, bool>
  try_emplace(key_type&& k,
              Args&&... args); // (2) C++26

template <class... Args>
iterator
  try_emplace(const_iterator hint,
              const key_type& k,
              Args&&... args); // (3) C++23
template <class... Args>
constexpr iterator
  try_emplace(const_iterator hint,
              const key_type& k,
              Args&&... args); // (3) C++26

template <class... Args>
iterator
  try_emplace(const_iterator hint,
              key_type&& k,
              Args&&... args); // (4) C++23
template <class... Args>
constexpr iterator
  try_emplace(const_iterator hint,
              key_type&& k,
              Args&&... args); // (4) C++26

template <class K, class... Args>
pair<iterator, bool>
  try_emplace(K&& k
              Args&&... args); // (5) C++23
template <class K, class... Args>
constexpr pair<iterator, bool>
  try_emplace(K&& k
              Args&&... args); // (5) C++26

template <class K, class... Args>
iterator
  try_emplace(const_iterator hint,
              K&& k,
              Args&&... args); // (6) C++23
template <class K, class... Args>
constexpr iterator
  try_emplace(const_iterator hint,
              K&& k,
              Args&&... args); // (6) C++26
```

## 概要
指定されたキーが存在しない場合のみ要素を直接構築で挿入する。

引数 `k` と等価のキーを持つ要素が存在しない場合、コンテナに新しい要素を挿入する。要素は引数からコンテナ内に直接構築されるため、構築されたオブジェクトはコピーもムーブもされない。  
なお、本メンバ関数は [`emplace`](emplace.md) や [`emplace_hint`](emplace_hint.md) 等と異なり、引数 `k` と等価のキーを持つ要素が既に存在する場合には、`k` や `args` がムーブされてしまうことはない。

引数 `hint` は、`k` を検索する際のヒントに使用される。

- (1) : 指定されたキーが存在しない場合に、要素を直接構築で挿入する
- (2) : 指定された一時オブジェクトのキーが存在しない場合に、要素を直接構築で挿入する
- (3) : キーを検索するヒントを指定し、指定されたキーが存在しない場合に、要素を直接構築で挿入する
- (4) : キーを検索するヒントを指定し、指定された一時オブジェクトのキーが存在しない場合に、要素を直接構築で挿入する
- (5) : `key_type`と比較可能なキーが指定され、対応する存在しない場合に、要素を直接構築で挿入する
- (6) : keyを研削するヒントと`key_type`と比較可能なキーが指定され、対応する存在しない場合に、要素を直接構築で挿入する


## テンプレートパラメータ制約
- [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<mapped_type, Args...>`が`true`であること
- (5), (6) :
    - `Compare::is_transparent`が有効な式であること
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<key_type, K>`が`true`であること
- (5) :
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<K&&, const_iterator>`と[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<K&&, iterator>`がどちらも`false`であること

なお、規格に記載はないが、`hint` は [`emplace_hint`](emplace_hint.md) と同様、コンテナの有効な読み取り専用イテレータである必要があるものと思われる。


## 事前条件
- (5), (6) : `k`から`key_type`への変換は、[`find`](find.md)`(k) ==` [`find`](find.md)`(u)`が`true`となるオブジェクト`u`を構築する


## 効果
`k` と同値のキーを持つ要素を持っている場合、何もしない（引数への副作用もない）。そうでなければ、以下と等価：

- (1), (2), (3), (4) :
    ```cpp
    auto key_it = ranges::upper_bound(c.keys, k, compare);
    auto value_it = c.values.begin() + distance(c.keys.begin(), key_it);
    c.keys.insert(key_it, std::forward<decltype(k)>(k));
    c.values.emplace(value_it, std::forward<Args>(args)...);
    ```
    * c.keys[link containers.md]
    * c.values[link containers.md]
    * ranges::upper_bound[link /reference/algorithm/ranges_upper_bound.md]
    * begin()[link /reference/vector/vector/begin.md]
    * distance[link /reference/iterator/distance.md]
    * insert[link /reference/vector/vector/insert.md]
    * emplace[link /reference/vector/vector/emplace.md]

- (5), (6) :
    ```cpp
    auto key_it = ranges::upper_bound(c.keys, k, compare);
    auto value_it = c.values.begin() + distance(c.keys.begin(), key_it);
    c.keys.emplace(key_it, std::forward<K>(k));
    c.values.emplace(value_it, std::forward<Args>(args)...);
    ```
    * c.keys[link containers.md]
    * c.values[link containers.md]
    * ranges::upper_bound[link /reference/algorithm/ranges_upper_bound.md]
    * begin()[link /reference/vector/vector/begin.md]
    * distance[link /reference/iterator/distance.md]
    * emplace[link /reference/vector/vector/emplace.md]


## 戻り値
- (1), (2), (5) : イテレータと `bool` 値の [`pair`](/reference/utility/pair.md) を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、`second` に `true` が設定される。
    - 挿入されなかった場合には、`first` に `k` と等価のキーを持つ既存の要素へのイテレータ、`second` に `false` が設定される。
- (3), (4), (6) :
    - 挿入された場合には、挿入された要素へのイテレータを返す。
    - 挿入されなかった場合には、`k` と等価のキーを持つ既存の要素へのイテレータを返す。


## 計算量
- (1), (2), (5) : [`emplace`](emplace.md) と同じ
- (3), (4), (6) : [`emplace_hint`](emplace_hint.md) と同じ


## 備考
- 概要に記載されているように、本メンバ関数は指定されたキーと等価の要素が既に存在する場合には、引数に副作用が発生しない。  
    一方、[`emplace`](emplace.md)、[`emplace_hint`](emplace_hint.md)、[`insert`](insert.md) にはそのような規定は無く、挿入がされなかった場合でも引数に副作用（引数からのムーブ）が発生してしまう可能性があるため、注意が必要である。


## 例
```cpp example
#include <iostream>
#include <flat_map>
#include <memory>
#include <utility>

int main()
{
  std::flat_map<int, std::unique_ptr<int>> fm;

  auto u1 = std::make_unique<int>(114);
  auto [it1, b1] = fm.try_emplace(42, std::move(u1));
  std::cout << std::boolalpha << (u1.get() == nullptr) << ", " << *it1->second << ", " << b1 << '\n';

  auto u2 = std::make_unique<int>(514);
  auto [it2, b2] = fm.try_emplace(42, std::move(u2));
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
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`flat_map::insert`](insert.md)                     | 要素を挿入する                             |
| [`flat_map::insert_range`](insert_range.md)         | Rangeを挿入する                            |
| [`flat_map::insert_or_assign`](insert_or_assign.md) | 要素を挿入、あるいは代入する               |
| [`flat_map::emplace`](emplace.md)                   | 要素を直接構築する                         |
| [`flat_map::emplace_hint`](emplace_hint.md)         | ヒントを使って要素を直接構築する           |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
