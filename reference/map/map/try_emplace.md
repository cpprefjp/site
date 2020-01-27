# try_emplace
* map[meta header]
* std[meta namespace]
* map[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
template <class... Args>
pair<iterator, bool> try_emplace(const key_type& k, Args&&... args);            // (1)

template <class... Args>
pair<iterator, bool> try_emplace(key_type&& k, Args&&... args);                 // (2)

template <class... Args>
iterator try_emplace(const_iterator hint, const key_type& k, Args&&... args);   // (3)

template <class... Args>
iterator try_emplace(const_iterator hint, key_type&& k, Args&&... args);        // (4)
```
* pair[link /reference/utility/pair.md]

## 概要
引数 `k` と�価の�ーを持つ要素が�在しない場合、コンテナに新しい要素を挿入する。要素は引数からコンテナ内に直接構築されるため、構築されたオブジェクトはコピーもムーブもされない。  
なお、本メンバ関数は [`emplace`](emplace.md) や [`emplace_hint`](emplace_hint.md) �と異なり、引数 `k` と�価の�ーを持つ要素が既に�在する場合には、`k` や `args` がムーブされてしまうことはない。

引数 `hint` は、`k` を検索する際のヒントに使用される。


## テンプレートパラメータ制約
- (1)、(3) : `value_type` は、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(k)`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から `map` に直接構築可能であること
- (2)、(4) : `value_type` は、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`move`](/reference/utility/move.md)`(k))`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から `map` に直接構築可能であること

なお、規格に記載はないが、`hint` は [`emplace_hint`](emplace_hint.md) と同様、コンテナの有効な�み取り専用イテレータである必要があるものと思われる。


## 効果
- (1)、(3) : `map` が `k` と同値の�ーを持つ要素を持っている場合、何もしない（引数への副作用もない）。そうでなければ、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(k)`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から構築した `value_type` 型のオブジェクトを挿入する。
- (2)、(4) : `map` が `k` と同値の�ーを持つ要素を持っている場合、何もしない（引数への副作用もない）。そうでなければ、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`move`](/reference/utility/move.md)`(k))`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から構築した `value_type` 型のオブジェクトを挿入する。


## 戻り値
- (1)、(2) : イテレータと `bool` 値の [`pair`](/reference/utility/pair.md) を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、`second` に `true` が�定される。
    - 挿入されなかった場合には、`first` に `k` と�価の�ーを持つ既�の要素へのイテレータ、`second` に `false` が�定される。
- (3)、(4) :
    - 挿入された場合には、挿入された要素へのイテレータを返す。
    - 挿入されなかった場合には、`k` と�価の�ーを持つ既�の要素へのイテレータを返す。


## 計算量
- (1)、(2) : [`emplace`](emplace.md) と同じ。
- (3)、(4) : [`emplace_hint`](emplace_hint.md) と同じ。


## 備考
- 概要に記載されているように、本メンバ関数は指定された�ーと�価の要素が既に�在する場合には、引数に副作用が発生しない。  
    一方、[`emplace`](emplace.md)、[`emplace_hint`](emplace_hint.md)、[`insert`](insert.md) にはそのような規定は無く、挿入がされなかった場合でも引数に副作用（引数からのムーブ）が発生してしまう可能性があるため、注意が必要である。

- このメンバ関数の機能テストマク�は以下の通り。  

    | マク�名                    | 値       |
    |-----------------------------|----------|
    | `__cpp_lib_map_try_emplace` | `201411` |



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
- [Clang](/implementation.md#clang): 3.7.0
- [GCC](/implementation.md#gcc): 6.1.0
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
