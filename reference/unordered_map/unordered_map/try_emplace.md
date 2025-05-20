# try_emplace
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
template <class... Args>
pair<iterator, bool>
  try_emplace(const key_type& k,
              Args&&... args);     // (1) C++17

template <class... Args>
pair<iterator, bool>
  try_emplace(key_type&& k,
              Args&&... args);     // (2) C++17

template<class K, class... Args>
pair<iterator, bool>
  try_emplace(K&& k,
              Args&&... args);     // (3) C++26

template <class... Args>
iterator
  try_emplace(const_iterator hint,
              const key_type& k,
              Args&&... args);     // (4) C++17

template <class... Args>
iterator
  try_emplace(const_iterator hint,
              key_type&& k,
              Args&&... args);     // (5) C++17

template<class K, class... Args>
iterator
  try_emplace(const_iterator hint,
              K&& k,
              Args&&... args);     // (6) C++26
```
* pair[link /reference/utility/pair.md]

## 概要
引数 `k` と等価のキーを持つ要素が存在しない場合、コンテナに新しい要素を挿入する。要素は引数からコンテナ内に直接構築されるため、構築されたオブジェクトはコピーもムーブもされない。  
なお、本メンバ関数は [`emplace`](emplace.md) や [`emplace_hint`](emplace_hint.md) 等と異なり、引数 `k` と等価のキーを持つ要素が既に存在する場合には、`k` や `args` がムーブされてしまうことはない。

引数 `hint` は、`k` を検索する際のヒントに使用される。（が、実際に使用されることはないものと思われる。[`emplace_hint`](emplace_hint.md) の備考を参照）

- (1) : キーをコピーし、値型のコンストラクタ引数をとり直接構築して、新たな要素を挿入する
- (2) : キーをムーブし、値型のコンストラクタ引数をとり直接構築して、新たな要素を挿入する
- (3) : `key_type`型と比較可能なキーを転送し、値型のコンストラクタ引数をとり直接構築して、新たな要素を挿入する
- (4) : 検索位置のヒントを受け取ってキーをコピーし、値型のコンストラクタ引数をとり直接構築して、新たな要素を挿入する
- (5) : 検索位置のヒントを受け取ってキーをムーブし、値型のコンストラクタ引数をとり直接構築して、新たな要素を挿入する
- (6) : 検索位置のヒントを受け取って`key_type`型と比較可能なキーをムーブし、値型のコンストラクタ引数をとり直接構築して、新たな要素を挿入する


## テンプレートパラメータ制約
- (1)、(3)、(4)、(6) : `value_type` は、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(k)`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から `unordered_map` に直接構築可能であること
- (2)、(5) : `value_type` は、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`move`](/reference/utility/move.md)`(k))`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から `unordered_map` に直接構築可能であること
- (3)、(6) :
    - `key_compare::is_transparent` が妥当な式であること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<K&&, const_iterator> == false`であること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<K&&, iterator> == false`であること

なお、規格に記載はないが、`hint` は [`emplace_hint`](emplace_hint.md) と同様、コンテナの有効な読み取り専用イテレータである必要があるものと思われる。


## 効果
- (1)、(3)、(4)、(6) : `unordered_map` が `k` と同値のキーを持つ要素を持っている場合、何もしない（引数への副作用もない）。そうでなければ、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(k)`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から構築した `value_type` 型のオブジェクトを挿入する。
- (2)、(5) : `unordered_map` が `k` と同値のキーを持つ要素を持っている場合、何もしない（引数への副作用もない）。そうでなければ、[`piecewise_construct`](/reference/utility/piecewise_construct_t.md), [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`move`](/reference/utility/move.md)`(k))`, [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` から構築した `value_type` 型のオブジェクトを挿入する。


## 戻り値
- (1)、(2)、(3) : イテレータと `bool` 値の [`pair`](/reference/utility/pair.md) を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、`second` に `true` が設定される。
    - 挿入されなかった場合には、`first` に `k` と等価のキーを持つ既存の要素へのイテレータ、`second` に `false` が設定される。
- (4)、(5)、(6) :
    - 挿入された場合には、挿入された要素へのイテレータを返す。
    - 挿入されなかった場合には、`k` と等価のキーを持つ既存の要素へのイテレータを返す。


## 計算量
- (1)、(2) : [`emplace`](emplace.md) と同じ。
- (4)、(5) : [`emplace_hint`](emplace_hint.md) と同じ。


## 備考
- 概要に記載されているように、本メンバ関数は指定されたキーと等価の要素が既に存在する場合には、引数に副作用が発生しない。  
    - 一方、[`emplace`](emplace.md)、[`emplace_hint`](emplace_hint.md)、[`insert`](insert.md) にはそのような規定は無く、挿入がされなかった場合でも引数に副作用（引数からのムーブ）が発生してしまう可能性があるため、注意が必要である。
- 規格にはこの関数の例外安全性についての記載が無いが、[`emplace`](emplace.md) や [`emplace_hint`](emplace_hint.md) と等価と考えて問題ないと思われる。
- 規格にはこの関数が呼ばれた後のイテレータや要素へのポインタ・参照の有効性についての記載が無いが、[`emplace`](emplace.md) や [`emplace_hint`](emplace_hint.md) と等価と考えて問題ないと思われる。
- (3), (6) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


## 例
```cpp example
#include <iostream>
#include <unordered_map>
#include <string>
#include <utility>
#include <memory>

template <typename T>
void print(const T& t, bool u)
{
  std::cout << "key = " << t.first->first << ", value = " << *t.first->second
    << ", is inserted = " << t.second << ", is empty = " << u << '\n';
}

int main()
{
  std::unordered_map<std::string, std::unique_ptr<int>> um;
  std::cout << std::boolalpha;

  auto u1 = std::make_unique<int>(1);
  auto p1 = um.try_emplace("one", std::move(u1));
  print(p1, !u1);

  auto u2 = std::make_unique<int>(2);
  auto p2 = um.try_emplace("two", std::move(u2));
  print(p2, !u2);

  auto u3 = std::make_unique<int>(42);
  auto p3 = um.try_emplace("two", std::move(u3));
  print(p3, !u3);
}
```
* try_emplace[color ff0000]
* std::move[link /reference/utility/move.md]
* std::make_unique[link /reference/memory/make_unique.md]

### 出力
```
key = one, value = 1, is inserted = true, is empty = true
key = two, value = 2, is inserted = true, is empty = true
key = two, value = 2, is inserted = false, is empty = false
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

| 名前                                      | 説明                                                   |
|-------------------------------------------|--------------------------------------------------------|
| [`emplace`](emplace.md)                   | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](emplace_hint.md)         | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](insert.md)                     | 要素の追加                                             |
| [`insert_or_assign`](insert_or_assign.md) | 要素の追加、あるいは代入                               |
| [`erase`](erase.md)                       | 要素の削除                                             |
| [`clear`](clear.md)                       | 全要素の削除                                           |
| [`swap`](swap.md)                         | 内容の交換                                             |
| [`bucket_count`](bucket_count.md)         | バケット数の取得                                       |
| [`load_factor`](load_factor.md)           | 現在の負荷率（バケットあたりの要素数の平均）を取得     |
| [`max_load_factor`](max_load_factor.md)   | 負荷率の最大値を取得、設定                             |
| [`rehash`](rehash.md)                     | 最小バケット数指定によるバケット数の調整               |
| [`reserve`](reserve.md)                   | 最小要素数指定によるバケット数の調整                   |


## 参照
- [N4006 An improved emplace() for unique-key maps](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4006.html)
- [N4240 Improved insertion interface for unique-key maps (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4240.html)
- [N4279 Improved insertion interface for unique-key maps (Revision 2.3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4279.html)
- [P2363R5: Extending associative containers with the remaining heterogeneous overloads](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2363r5.html)
    - C++26で`template <class K>`のバージョンが追加された
