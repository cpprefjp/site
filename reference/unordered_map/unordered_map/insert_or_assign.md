# insert_or_assign
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
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
引数 `k` で指定されたキーが存在しなければ対応する値を引数 `obj` のキーとして要素を挿入し（`insert`）、さもなければ（`or`）、そのキーに対応する値に引数 `obj` を代入する（`assign`）。

引数 `hint` は、`k` を検索する際のヒントに使用される。（が、実際に使用されることはないものと思われる。[`emplace_hint`](emplace_hint.md) の備考を参照）


## テンプレートパラメータ制約
- (1)、(3) : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<mapped_type&, M&&>` が `true` であること。`value_type` は、`k`, [`forward`](/reference/utility/forward.md)`<M>(obj)` から `map` に直接構築可能であること
- (2)、(4) : [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<mapped_type&, M&&>` が `true` であること。`value_type` は、[`move`](/reference/utility/move.md)`(k)`, [`forward`](/reference/utility/forward.md)`<M>(obj)` から `map` に直接構築可能であること


## 効果
- (1)、(3) : `unordered_map` が `k` と同値のキーを持つ要素 `e` を持っている場合、`e.second` に [`forward`](/reference/utility/forward.md)`<M>(obj)` を代入する。そうでなければ、`k`, [`forward`](/reference/utility/forward.md)`<M>(obj)` から構築した `value_type` 型のオブジェクトを挿入する。
- (2)、(4) : `unordered_map` が `k` と同値のキーを持つ要素 `e` を持っている場合、`e.second` に [`forward`](/reference/utility/forward.md)`<M>(obj)` を代入する。そうでなければ、[`move`](/reference/utility/move.md)`(k)`, [`forward`](/reference/utility/forward.md)`<M>(obj)` から構築した `value_type` 型のオブジェクトを挿入する。


## 戻り値
- (1)、(2) : イテレータと `bool` 値の [`pair`](/reference/utility/pair.md) を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、`second` に `true` が設定される。
    - 代入された場合には、`first` に代入された要素へのイテレータ、`second` に `false` が設定される。
- (3)、(4) :
    - 挿入された場合には、挿入された要素へのイテレータを返す。
    - 代入された場合には、代入された要素へのイテレータを返す。


## 計算量
- (1)、(2) : [`emplace`](emplace.md) と同じ。
- (3)、(4) : [`emplace_hint`](emplace_hint.md) と同じ。


## 備考
- 規格にはこの関数の例外安全性についての記載が無いが、[`emplace`](emplace.md) や [`emplace_hint`](emplace_hint.md) と等価と考えて問題ないと思われる。

- 規格にはこの関数が呼ばれた後のイテレータや要素へのポインタ・参照の有効性についての記載が無いが、[`emplace`](emplace.md) や [`emplace_hint`](emplace_hint.md) と等価と考えて問題ないと思われる。

- このメンバ関数の[`機能テストマクロ`](/lang/cpp17/feature_test_macros.md)は以下の通り。

    | マクロ名                              | 値       |
    |---------------------------------------|----------|
    | `__cpp_lib_unordered_map_try_emplace` | `201411` |


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
  auto p1 = um.insert_or_assign("one", std::move(u1));
  print(p1, !u1);

  auto u2 = std::make_unique<int>(2);
  auto p2 = um.insert_or_assign("two", std::move(u2));
  print(p2, !u2);

  auto u3 = std::make_unique<int>(42);
  auto p3 = um.insert_or_assign("two", std::move(u3));
  print(p3, !u3);
}
```
* insert_or_assign[color ff0000]
* std::move[link /reference/utility/move.md]
* std::make_unique[link /reference/memory/make_unique.md]

### 出力
```
key = one, value = 1, is inserted = true, is empty = true
key = two, value = 2, is inserted = true, is empty = true
key = two, value = 42, is inserted = false, is empty = true
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
