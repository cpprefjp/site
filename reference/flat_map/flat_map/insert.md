# insert
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
pair<iterator, bool> insert(const value_type& x); // (1) C++23
pair<iterator, bool> insert(value_type&& x);      // (2) C++23

iterator insert(const_iterator position,
                const value_type& x);             // (3) C++23
iterator insert(const_iterator position,
                value_type&& x);                  // (4) C++23

template<class P>
pair<iterator, bool> insert(P&& x);               // (5) C++23

template<class P>
iterator insert(const_iterator position,
                P&&);                             // (6) C++23

template<class InputIterator>
void insert(InputIterator first,
            InputIterator last);                  // (7) C++23

template<class InputIterator>
void insert(sorted_unique_t,
            InputIterator first,
            InputIterator last);                  // (8) C++23

void insert(initializer_list<value_type> il);     // (9) C++23

void insert(sorted_unique_t s,
            initializer_list<value_type> il);     // (10) C++23
```
* initializer_list[link /reference/initializer_list/initializer_list.md]
* sorted_unique_t[link /reference/flat_map/sorted_unique_t.md]

## 概要
新しく一つの要素(引数 `x` を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入し、コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](size.md) を増やす。

`flat_map` コンテナは重複したキーを持つ要素を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じキーかどうかをチェックする。もし同じであれば要素は挿入されず、戻り値を持つ関数の場合はそれへのイテレータなどを返す。

重複した値を許す、類似したコンテナについては [`flat_multimap`](/reference/flat_map/flat_multimap.md) を参照。

内部的に `flat_map` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。

この操作は、適切な引数 `position` を提供することで効率を飛躍的に改善することができる。

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
- (5), (6) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`pair`](/reference/utility/pair.md)`<key_type, mapped_type>, P>`が`true`であること


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
        c.keys.insert(c.keys.end(), std::move(value.first));
        c.values.insert(c.values.end(), std::move(value.second));
    }
    ```
    * c.keys[link containers.md]
    * c.values[link containers.md]
    * end()[link /reference/vector/vector/end.md]
    * insert[link /reference/vector/vector/insert.md]
    * std::move[link /reference/utility/move.md]
    * first[link /reference/utility/pair.md]
    * second[link /reference/utility/pair.md]

    - 次に、新しく挿入された要素の範囲を`value_comp()`を基準にソートする
    - 次に、ソートされた結果の範囲と、既存の要素のソートされた範囲をひとつのソートされた範囲にマージする
    - 最後に、重複する要素を以下のように削除する：

    ```cpp
    auto zv = ranges::zip_view(c.keys, c.values);
    auto it = ranges::unique(zv, key_equiv(compare)).begin();
    auto dist = distance(zv.begin(), it);
    c.keys.erase(c.keys.begin() + dist, c.keys.end());
    c.values.erase(c.values.begin() + dist, c.values.end());
    ```
    * c.keys[link containers.md]
    * c.values[link containers.md]
    * ranges::zip_view[link /reference/ranges/zip_view.md]
    * key_equiv[link key_equiv.md]
    * distance[link /reference/iterator/distance.md]

- (8) : メンバ変数として保持しているコンテナ`c`に、以下のように挿入する：
    ```cpp
    for (; first != last; ++first) {
        value_type value = *first;
        c.keys.insert(c.keys.end(), std::move(value.first));
        c.values.insert(c.values.end(), std::move(value.second));
    }
    ```
    * c.keys[link containers.md]
    * c.values[link containers.md]
    * end()[link /reference/vector/vector/end.md]
    * insert[link /reference/vector/vector/insert.md]
    * std::move[link /reference/utility/move.md]
    * first[link /reference/utility/pair.md]
    * second[link /reference/utility/pair.md]

    - 次に、ソートされた結果の範囲と、既存の要素のソートされた範囲をひとつのソートされた範囲にマージする
    - 最後に、重複する要素を以下のように削除する：

    ```cpp
    auto zv = ranges::zip_view(c.keys, c.values);
    auto it = ranges::unique(zv, key_equiv(compare)).begin();
    auto dist = distance(zv.begin(), it);
    c.keys.erase(c.keys.begin() + dist, c.keys.end());
    c.values.erase(c.values.begin() + dist, c.values.end());
    ```
    * c.keys[link containers.md]
    * c.values[link containers.md]
    * ranges::zip_view[link /reference/ranges/zip_view.md]
    * key_equiv[link key_equiv.md]
    * distance[link /reference/iterator/distance.md]

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
- (7) : Nをこの操作の前の[`size()`](size.md)、Mを[`distance`](/reference/iterator/distance.md)`(first, last)`として、N + MlogM
- (8) : Nをこの操作のあとの[`size()`](size.md)として、Nに対して線形


## 備考
- (7), (8) : この操作はインプレース・マージを行うため、追加のメモリ確保を行う可能性がある


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<int, char> fm;

  // 単一要素を挿入する
  fm.insert(std::pair{3, 'a'});
  fm.insert({3, 'a'});

  std::flat_map<int, char> fm2 = {
    {5, 'd'},
    {15, 'e'}
  };

  // シーケンスを挿入する
  fm.insert(fm2.begin(), fm2.end());

  // 挿入するシーケンスがソート済みかつ重複要素がないことがわかっている場合、
  // 以下のように指定した方が高速になる
  fm.insert(std::sorted_unique, fm2.begin(), fm2.end());

  for (const auto& [key, value] : fm) {
    std::cout << key << " : " << value << std::endl;
  }
}
```
* insert[color ff0000]
* begin()[link begin.md]
* end()[link end.md]
* std::sorted_unique[link /reference/flat_map/sorted_unique_t.md]

### 出力
```
3 : a
5 : d
15 : e
```

## バージョン
### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`flat_map::insert_or_assign`](insert_or_assign.md) | 要素を挿入、あるいは代入する               |
| [`flat_map::insert_range`](insert_range.md)         | Rangeを挿入する                            |
| [`flat_map::emplace`](emplace.md)                   | 要素を直接構築する                         |
| [`flat_map::emplace_hint`](emplace_hint.md)         | ヒントを使って要素を直接構築する           |
| [`flat_map::try_emplace`](try_emplace.md)           | キーが存在しない場合のみ要素を直接構築する |

