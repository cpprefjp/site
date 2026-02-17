# insert
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
pair<iterator, bool>
  insert(const value_type& x);  // (1) C++23
constexpr pair<iterator, bool>
  insert(const value_type& x); // (1) C++26

pair<iterator, bool>
  insert(value_type&& x); // (2) C++23
constexpr pair<iterator, bool>
  insert(value_type&& x); // (2) C++26

iterator
  insert(const_iterator position,
         const value_type& x); // (3) C++23
constexpr iterator
  insert(const_iterator position,
         const value_type& x); // (3) C++26

iterator
  insert(const_iterator position,
         value_type&& x); // (4) C++23
constexpr iterator
  insert(const_iterator position,
         value_type&& x); // (4) C++26

template<class P>
pair<iterator, bool>
  insert(P&& x); // (5) C++23
template<class P>
constexpr pair<iterator, bool>
  insert(P&& x); // (5) C++26

template<class P>
iterator
  insert(const_iterator position,
         P&&); // (6) C++23
template<class P>
constexpr iterator
  insert(const_iterator position,
         P&&); // (6) C++26

template<class InputIterator>
void
  insert(InputIterator first,
         InputIterator last); // (7) C++23
template<class InputIterator>
constexpr void
  insert(InputIterator first,
         InputIterator last); // (7) C++26

template<class InputIterator>
void
  insert(sorted_unique_t,
         InputIterator first,
         InputIterator last); // (8) C++23
template<class InputIterator>
constexpr void
  insert(sorted_unique_t,
         InputIterator first,
         InputIterator last); // (8) C++26

void
  insert(initializer_list<value_type> il); // (9) C++23
constexpr void
  insert(initializer_list<value_type> il); // (9) C++26

void
  insert(sorted_unique_t s,
         initializer_list<value_type> il); // (10) C++23
constexpr void
  insert(sorted_unique_t s,
         initializer_list<value_type> il); // (10) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]
* sorted_unique_t[link /reference/flat_set/sorted_unique_t.md]

## 概要
新しく一つの要素(引数 `x` を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入し、コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](size.md) を増やす。

`flat_set` コンテナは重複したキーを持つ要素を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じキーかどうかをチェックする。もし同じであれば要素は挿入されず、戻り値を持つ関数の場合はそれへのイテレータなどを返す。

重複した値を許す、類似したコンテナについては [`flat_multiset`](/reference/flat_set/flat_multiset.md) を参照。

内部的に `flat_set` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。

- (1) : 単一要素を挿入する
- (2) : 単一要素の一時オブジェクトを挿入する
- (3) : 指定された位置に、単一要素を挿入する
- (4) : 指定された位置に、単一要素の一時オブジェクトを挿入する
- (5) : 単一要素として要素型`value_type`のコンストラクタ引数を受け取って挿入する
- (6) : 指定された位置に、要素型`value_type`のコンストラクタ引数を受け取って挿入する
- (7) : イテレータ範囲`[first, last)`を挿入する
- (8) : ソート済みかつ重複要素のないイテレータ範囲`[first, last)`を挿入する
- (9) : 初期化子リストを挿入する
- (10) : ソート済みかつ重複要素のない初期化子リストを挿入する


## 要件
- (5), (6) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<key_type, P>`が`true`であること


## 効果
- (1) :
    ```cpp
    return emplace(x);
    ```
    * emplace[link emplace.md]

- (2) :
    ```cpp
    return emplace(std::move(x));
    ```
    * emplace[link emplace.md]
    * move[link /reference/utility/move.md]

- (3) :
    ```cpp
    return emplace_hint(position, x);
    ```
    * emplace_hint[link emplace_hint.md]

- (4) :
    ```cpp
    return emplace_hint(position, std::move(x));
    ```
    * emplace_hint[link emplace_hint.md]
    * move[link /reference/utility/move.md]

- (5) : 以下と等価：
    ```cpp
    return emplace(std::forward<P>(x));
    ```
    * emplace[link emplace.md]
    * forward[link /reference/utility/forward.md]

- (6) : 以下と等価：
    ```cpp
    return emplace_hint(position, std::forward<P>(x));.
    ```
    * emplace_hint[link emplace_hint.md]
    * forward[link /reference/utility/forward.md]

- (7) : メンバ変数として保持しているコンテナ`c`に、以下のように挿入する：
    ```cpp
    for (; first != last; ++first) {
        value_type value = *first;
        c.insert(c.end(), std::move(value));
    }
    ```
    * end()[link /reference/vector/vector/end.md]
    * insert[link /reference/vector/vector/insert.md]
    * std::move[link /reference/utility/move.md]

    - 次に、新しく挿入された要素の範囲を`value_comp()`を基準にソートする
    - 次に、ソートされた結果の範囲と、既存の要素のソートされた範囲をひとつのソートされた範囲にマージする
    - 最後に、重複する要素を削除する

- (8) : メンバ変数として保持しているコンテナ`c`に、以下のように挿入する：
    ```cpp
    for (; first != last; ++first) {
        value_type value = *first;
        c.insert(c.end(), std::move(value));
    }
    ```
    * end()[link /reference/vector/vector/end.md]
    * insert[link /reference/vector/vector/insert.md]
    * std::move[link /reference/utility/move.md]

    - 次に、ソートされた結果の範囲と、既存の要素のソートされた範囲をひとつのソートされた範囲にマージする
    - 最後に、重複する要素を削除する

- (9) :
    ```cpp
    insert(il.begin(), il.end());
    ```

- (10) :
    ```cpp
    insert(s, il.begin(), il.end());
    ```


## 戻り値
- (1), (2), (5) : 戻り値としては、イテレータと`bool`値の組を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、 `second` に `true` が設定される。
    - 挿入されなかった場合には、 `first` に `x` と等価のキーを持つ要素へのイテレータ、 `second` に `false` が設定される。
- (3), (4), (6) :
    - 挿入された場合には、新しく挿入された要素を指すイテレータを返す。
    - 挿入されなかった場合には、`x`のキーと等価のキーを持つ要素へのイテレータを返す。
- (7), (8), (9), (10) : なし


## 計算量
- (1)~(6) : コンテナサイズ（[`size()`](size.md)）に対して線形
- (7) : Nをこの操作の前の[`size()`](size.md)、Mを[`distance`](/reference/iterator/distance.md)`(first, last)`として、N + MlogM
- (8) : Nをこの操作のあとの[`size()`](size.md)として、Nに対して線形
- (9) : Nをこの操作の前の[`size()`](size.md)、Mを`il.size()`として、N + MlogM
- (10) : Nをこの操作のあとの[`size()`](size.md)として、Nに対して線形


## 備考
- (7), (8) : この操作はインプレース・マージを行うため、追加のメモリ確保を行う可能性がある


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <vector>

int main()
{
  std::flat_set<int> fs;

  // 単一要素を挿入する
  fs.insert(1);

  // シーケンスを挿入する
  std::vector<int> v = {2, 3, 4};
  fs.insert(v.begin(), v.end());

  // 挿入するシーケンスがソート済みかつ重複要素がないことがわかっている場合、
  // 以下のように指定した方が高速になる
  fs.insert(std::sorted_unique, {5, 6, 7});

  for (int i : fs) {
    std::cout << i << std::endl;
  }
}
```
* insert[color ff0000]
* begin()[link /reference/vector/vector/begin.md]
* end()[link /reference/vector/vector/end.md]
* std::sorted_unique[link /reference/flat_set/sorted_unique_t.md]

### 出力
```
1
2
3
4
5
6
7
```

## バージョン
### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                                        | 説明                             |
|---------------------------------------------|----------------------------------|
| [`flat_set::insert_range`](insert_range.md) | Rangeを挿入する                  |
| [`flat_set::emplace`](emplace.md)           | 要素を直接構築する               |
| [`flat_set::emplace_hint`](emplace_hint.md) | ヒントを使って要素を直接構築する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
