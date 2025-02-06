# insert
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
iterator insert(const value_type& x);         // (1) C++23
iterator insert(value_type&& x);              // (2) C++23

iterator insert(const_iterator position,
                const value_type& x);         // (3) C++23
iterator insert(const_iterator position,
                value_type&& x);              // (4) C++23

template<class P>
iterator insert(P&& x);                       // (5) C++23

template<class P>
iterator insert(const_iterator position,
                P&&);                         // (6) C++23

template<class InputIterator>
void insert(InputIterator first,
            InputIterator last);              // (7) C++23

template<class InputIterator>
void insert(sorted_equivalent_t,
            InputIterator first,
            InputIterator last);              // (8) C++23

void insert(initializer_list<value_type> il); // (9) C++23

void insert(sorted_equivalent_t,
            initializer_list<value_type> il); // (10) C++23
```
* initializer_list[link /reference/initializer_list/initializer_list.md]
* sorted_equivalent_t[link /reference/flat_set/sorted_equivalent_t.md]

## 概要
新しく一つの要素(引数 `x` を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入し、コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](size.md) を増やす。

内部的に `flat_multiset` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。

この操作は、適切な引数 `position` を提供することで効率を飛躍的に改善することができる。

- (1) : 単一要素を挿入する
- (2) : 単一要素の一時オブジェクトを挿入する
- (3) : 指定された位置に、単一要素を挿入する
- (4) : 指定された位置に、単一要素の一時オブジェクトを挿入する
- (5) : 単一要素として要素型`value_type`のコンストラクタ引数を受け取って挿入する
- (6) : 指定された位置に、要素型`value_type`のコンストラクタ引数を受け取って挿入する
- (7) : イテレータ範囲`[first, last)`を挿入する
- (8) : ソート済みのイテレータ範囲`[first, last)`を挿入する
- (9) : 初期化子リストを挿入する
- (10) : ソート済みの初期化子リストを挿入する


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

- (9) :
    ```cpp
    insert(il.begin(), il.end());
    ```

- (10) :
    ```cpp
    insert(s, il.begin(), il.end());
    ```


## 戻り値
- (1)-(6) : 挿入された要素へのイテレータ
- (7)-(10) : なし


## 計算量
- (7) : Nをこの操作の前の[`size()`](size.md)、Mを[`distance`](/reference/iterator/distance.md)`(first, last)`として、N + MlogM
- (8) : Nをこの操作のあとの[`size()`](size.md)として、Nに対して線形


## 備考
- (7), (8) : この操作はインプレース・マージを行うため、追加のメモリ確保を行う可能性がある


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <vector>

int main()
{
  std::flat_multiset<int> fs;

  // 単一要素を挿入する
  fs.insert(1);

  // シーケンスを挿入する
  std::vector<int> v = {2, 3, 4};
  fs.insert(v.begin(), v.end());

  // 挿入するシーケンスがソート済みであることがわかっている場合、
  // 以下のように指定した方が高速になる
  fs.insert(std::sorted_equivalent, {5, 6, 7});

  for (int i : fs) {
    std::cout << i << std::endl;
  }
}
```
* insert[color ff0000]
* begin()[link /reference/vector/vector/begin.md]
* end()[link /reference/vector/vector/end.md]
* std::sorted_equivalent[link /reference/flat_set/sorted_equivalent_t.md]

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
| 名前                                             | 説明                             |
|--------------------------------------------------|----------------------------------|
| [`flat_multiset::insert_range`](insert_range.md) | Rangeを挿入する                  |
| [`flat_multiset::emplace`](emplace.md)           | 要素を直接構築する               |
| [`flat_multiset::emplace_hint`](emplace_hint.md) | ヒントを使って要素を直接構築する |
