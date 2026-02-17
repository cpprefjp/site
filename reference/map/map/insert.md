# insert
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
pair<iterator, bool> insert(const value_type& x);           // (1) C++03
constexpr pair<iterator, bool> insert(const value_type& x); // (1) C++26

template <class P>
pair<iterator, bool> insert(P&& x);           // (2) C++11
template <class P>
constexpr pair<iterator, bool> insert(P&& x); // (2) C++26

pair<iterator, bool> insert(value_type&& x);                   // (3) C++17
constexpr pair<iterator, bool> insert(value_type&& x);         // (3) C++26

iterator insert(iterator position, const value_type& x);                 // (4) C++03
iterator insert(const_iterator position, const value_type& x);           // (4) C++11
constexpr iterator insert(const_iterator position, const value_type& x); // (4) C++26

template <class P>
iterator insert(const_iterator position, P&& x);           // (5) C++11
template <class P>
constexpr iterator insert(const_iterator position, P&& x); // (5) C++26

iterator insert(const_iterator position, value_type&& x);           // (6) C++17
constexpr iterator insert(const_iterator position, value_type&& x); // (6) C++26

template <class InputIterator>
void insert(InputIterator first, InputIterator last);           // (7) C++03
template <class InputIterator>
constexpr void insert(InputIterator first, InputIterator last); // (7) C++26

void insert(initializer_list<value_type> init);           // (8) C++11
constexpr void insert(initializer_list<value_type> init); // (8) C++26

insert_return_type insert(node_type&& nh);           // (9) C++17
constexpr insert_return_type insert(node_type&& nh); // (9) C++26

iterator
  insert(const_iterator hint, node_type&& nh); // (10) C++17
constexpr iterator
  insert(const_iterator hint, node_type&& nh); // (10) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
新しく一つの要素(引数 `x` を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)または[ノードハンドル](/reference/node_handle/node_handle.md)を挿入することにより、 `map` コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](size.md) を増やす。

 `map` コンテナは重複したキーを持つ要素を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じキーかどうかをチェックする。もし同じであれば要素は挿入されず、戻り値を持つ関数の場合はそれへのイテレータなどを返す。

重複した値を許す、類似したコンテナについては `multimap` を参照。

内部的に `map` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。

この操作は、適切な引数 `position` を提供することで効率を飛躍的に改善することができる。


- (1) : 単一要素を挿入する
- (2) : 単一要素として要素型`value_type`のコンストラクタ引数を受け取って挿入する
- (3) : 単一要素の一時オブジェクトを挿入する
- (4) : 指定された位置に、単一要素を挿入する
- (5) : 指定された位置に、要素型`value_type`のコンストラクタ引数を受け取って挿入する
- (6) : 指定された位置に、単一要素の一時オブジェクトを挿入する
- (7) : イテレータ範囲`[first, last)`を挿入する
- (8) : 初期化子リストを挿入する
- (9) : [ノードハンドル](/reference/node_handle/node_handle.md)を挿入する
- (10) : 指定された位置に、[ノードハンドル](/reference/node_handle/node_handle.md)を挿入する


## テンプレートパラメータ制約
- (1) : `value_type` は、コンテナに対してコピー挿入可能であること
- (2) : [`std::is_constructible`](/reference/type_traits/is_constructible.md)`<value_type, P&&>::value == true`であること
- (3) : `value_type` は、コンテナに対してムーブ挿入可能であること
- (4) : `value_type` は、コンテナに対してコピー挿入可能であること
- (5) : [`std::is_constructible`](/reference/type_traits/is_constructible.md)`<value_type, P&&>::value == true`であること
- (6) : `value_type` は、コンテナに対してムーブ挿入可能であること


## 事前条件
- (7), (8) : イテレータ範囲`[first, last)`の各イテレータが、`*this`の要素を指さないこと
- (9), (10) : `nh` は空である、または、`(*this).get_allocator() == nh.get_allocator()`であること


## 効果
- (1) : `x`を`*this`の要素としてコピー挿入する。ただし、`x`のキーと等価のキーを持つ要素が`*this`に存在する場合には、挿入されない。
- (2) : [`emplace`](emplace.md)`(`[`std::forward`](/reference/utility/forward.md)`<P>(x))`と等価。
- (3) : `x`を`*this`の要素としてムーブ挿入する。ただし、`x`のキーと等価のキーを持つ要素が`*this`に存在する場合には、挿入されない。
- (4) : `x`を`*this`の要素としてコピー挿入する。ただし、`x`のキーと等価のキーを持つ要素が`*this`に存在する場合には、挿入されない。可能であれば、挿入位置のヒントを表すイテレータ`position`のすぐ前に挿入する。
- (5) : [`emplace_hint`](emplace_hint.md)`(position,` [`std::forward`](/reference/utility/forward.md)`<P>(x))`と等価。
- (6) : `x`を`*this`の要素としてムーブ挿入する。ただし、`x`のキーと等価のキーを持つ要素が`*this`に存在する場合には、挿入されない。可能であれば、挿入位置のヒントを表すイテレータ`position`のすぐ前に挿入する。
- (7) : イテレータ範囲`[first, last)`の各要素を`*this`の要素として挿入する。ただし、`*this`にすでに存在するキーと等価なキーを持つ要素については、挿入されない。
- (8) : `insert(init.begin(), init.end())`と等価。
- (9) : `nh`が空の場合、効果はない。
それ以外の場合、`nh.key()`と等価のキーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する。
- (10) : `nh`が空の場合、効果はなく、`(*this).end()`を返す。それ以外の場合、`nh.key()`と等価のキーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する。`nh.key()`と等価のキーの要素を指すイテレータを常に返す。要素は、`hint`の直前の位置のできるだけ近くに挿入される。


## 戻り値
- (1), (2), (3) : 戻り値としては、イテレータと`bool`値の組を返す。
    - 挿入された場合には、`first` に挿入された要素へのイテレータ、 `second` に `true` が設定される。
    - 挿入されなかった場合には、 `first` に `x` と等価のキーを持つ要素へのイテレータ、 `second` に `false` が設定される。
- (4), (5), (6) :
    - 挿入された場合には、新しく挿入された要素を指すイテレータを返す。
    - 挿入されなかった場合には、`x`のキーと等価のキーを持つ要素へのイテレータを返す。
- (7), (8) : なし
- (9) : 戻り値としては、[`insert_return_type`](/reference/map/map.md)を返す。`insert_return_type`のイテレータ型メンバ変数`position`、`bool`型メンバ変数`inserted`に格納される値は(1), (2)のものと同じ情報である。`nh`が空の場合は、`position`は終端イテレータである。`node_type`型メンバ変数`node`には、
    - 挿入された場合には、空の[ノードハンドル](/reference/node_handle/node_handle.md)。
    - 挿入されなかった場合には、`nh`の値である。 
- (10) : `nh`が空の場合、`(*this).end()`を返す。そうではない場合、`nh`と等価のキーの要素を指すイテレータを常に返す。


## 計算量
- (1), (2), (3) : 対数時間
- (4), (5), (6) : 一般に対数時間だが、指定された新たな要素が `position` が指す要素の直前に挿入された場合は償却定数時間。（ただし、備考も参照）
- (7), (8) : 一般に N log(size + N)。（ただし、備考も参照）
    - ここで、 `N` は `first` と `last` の間の距離であり `size` は挿入前のコンテナの [`size()`](size.md) を表す。
- (9) : 対数時間
- (10) : 一般に対数時間だが、指定された新たな要素が `hint` が指す要素の直前に挿入された場合は償却定数時間。


## 備考
- これらの関数が呼ばれた後も、当該コンテナ内の要素を指す参照やイテレータは無効にはならない。  
	なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
- (4), (5), (6): C++03 までの仕様では、計算量が償却定数時間となる条件は、「`position` が指す要素の**後ろ**に挿入された場合」となっているが、主要な実装はC++03時点から `position` が指す**前**に挿入する場合に償却定数時間となっていた。これは、`position` の後ろでは、適切な位置が先頭の場合に指定する方法がないこと、`vector::insert` の場合、`position` の前に挿入されること、STL のオリジナルである HP 社の実装が `position` の前に挿入する場合に償却定数時間であったことなどによる。
- (7) : C++03 までの仕様では、`first` と `last` の間が昇順にソートされていた場合、計算量が線形時間となっていたが、この仕様は実現性がないため C++11 では削除された。（例えば、コンテナの既存の要素が 2 から 100 の偶数のみの場合に、1 から 99 のソートされた奇数の範囲を挿入する場合を考えてみよ）
- (9), (10) : 要素は、コピーもムーブもされない。


## 例
```cpp example
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> m1;
  std::map<char,int> m2;

  m1.insert(std::make_pair('a', 10));
  m1.insert(std::make_pair('b', 20));
  m1.insert(std::make_pair('c', 30));

  std::cout << m1.size() << std::endl;

  m2.insert(m1.begin(), m1.end());
  m2.insert(std::make_pair('d', 40));

  std::cout << m2.size() << std::endl;

  return 0;
}
```
* insert[color ff0000]
* size()[link size.md]
* m1.begin()[link begin.md]
* m1.end()[link end.md]

### 出力
```
3
4
```

## バージョン
### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 関連項目

| 名前                                           | 説明                                       |
|------------------------------------------------|--------------------------------------------|
| [`map::insert_or_assign`](insert_or_assign.md) | 要素を挿入、あるいは代入する               |
| [`map::emplace`](emplace.md)                   | 要素を直接構築する                         |
| [`map::emplace_hint`](emplace_hint.md)         | ヒントを使って要素を直接構築する           |
| [`map::try_emplace`](try_emplace.md)           | キーが存在しない場合のみ要素を直接構築する |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (6)の経緯となる提案文書
- [LWG Issue 2005. `unordered_map::insert(T&&)` protection should apply to `map` too](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2005)
    - C++14から、(2)と(4)の仕様の書き方が、`unordered_map::insert()`のものと統一された。
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
    - (7), (8)経緯となる提案文書
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
