# insert
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
iterator insert(const value_type& x);           // (1) C++03
constexpr iterator insert(const value_type& x); // (1) C++26

iterator insert(value_type&& y);           // (2) C++11
constexpr iterator insert(value_type&& y); // (2) C++26

iterator insert(iterator position, const value_type& x);                 // (3) C++03
iterator insert(const_iterator position, const value_type& x);           // (3) C++11
constexpr iterator insert(const_iterator position, const value_type& x); // (3) C++26

iterator insert(const_iterator position, value_type&& y);           // (4) C++11
constexpr iterator insert(const_iterator position, value_type&& y); // (4) C++26

template <class InputIterator>
void insert(InputIterator first, InputIterator last);           // (5) C++03
template <class InputIterator>
constexpr void insert(InputIterator first, InputIterator last); // (5) C++26

void insert(initializer_list<value_type> init);           // (6) C++03
constexpr void insert(initializer_list<value_type> init); // (6) C++26

iterator insert(node_type&& nh);           // (7) C++17
constexpr iterator insert(node_type&& nh); // (7) C++26

iterator insert(const_iterator hint, node_type&& nh);           // (8) C++17
constexpr iterator insert(const_iterator hint, node_type&& nh); // (8) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
新しく一つの要素(引数 `x`, `y`を使う)、要素のシーケンス(入力イテレータまたは `initializer_list` を使う)または[ノードハンドル](/reference/node_handle/node_handle.md)を挿入することにより、 `multiset` コンテナを拡張する。

 `set` コンテナは重複した値を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じ値かどうかをチェックし、同じ要素がすでにあれば挿入されない。`multiset`の場合には、同じ値の要素でも挿入される。


- (1) : 新たな要素`x`をコピー挿入する。既に同じ値を持つ要素が1つ以上ある場合はそれらの一番最後に挿入される。
- (2) : 新たな要素`y`をムーブ挿入する。既に同じ値を持つ要素が1つ以上ある場合はそれらの一番最後に挿入される。
- (3) : 新たな要素`x`を`position`より前の出来るだけ近い位置にコピー挿入する。`position`パラメータに適切な挿入位置を指定すれば、高速に挿入できる
- (4) : 新たな要素`y`を`position`より前の出来るだけ近い位置にムーブ挿入する。`position`パラメータに適切な挿入位置を指定すれば、高速に挿入できる
- (5) : イテレータ範囲`[first, last)`の要素を挿入する
- (6) : 初期化子リスト`init`の要素を挿入する
- (7) : `nh`が空の場合、効果はない。そうでなければ、`nh`が所有する要素を挿入し、新しく挿入された要素を指すイテレータを返す。`nh.key()` と等価なキーを持つ要素を含む範囲がコンテナ内に存在する場合、要素はその範囲の終端に挿入される。`nh` が空でなく、`(*this).get_allocator() == nh.get_allocator()`であれば、動作は未定義である。
- (8) : `nh`が空の場合、効果はなく、`(*this).end()`を返す。そうでなければ、 `nh` によって所有されている要素をコンテナに挿入し、 `nh.key()` と等価なキーを持つ要素を指すイテレータを返す。 `nh.key()` と等しいキーを持つ要素を含む範囲がコンテナ内に存在する場合、要素はその範囲の終端に挿入される。要素は、`hint`の直前の位置のできるだけ近くに挿入される。`nh` が空でなく、`(*this).get_allocator() == nh.get_allocator()`であれば、動作は未定義である。


## 戻り値
- (1), (2), (3), (4) : 挿入された要素へのイテレータ。
- (5), (6) : なし
- (7), (8) : `nh` が空の場合は終端イテレータ、そうでなければ挿入された要素を指すイテレータ。


## 計算量
- (1), (2) : 対数時間
- (3), (4) : 一般に対数時間だが、`x` または `y` が `position` が指す要素の直前に挿入された場合は償却定数時間
- (5), (6) : 一般に N log(size + N)
    - ※ ここで `N` は `first` と `last` の間の距離であり `size` は挿入前のコンテナの [`size()`](size.md)
- (7) : コンテナのサイズの対数、`O(log(size()))`。
- (8) : 挿入が `hint` の直前の位置に行われた場合、償却定数時間。 そうでなければ、コンテナのサイズの対数。


## 備考
- これらの関数が呼ばれた後も、当該コンテナ内の要素を指す参照やイテレータは無効にはならない。  
	なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
- 内部的に `multiset` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。 (7), (8) の場合要素は、コピーもムーブもされない。


## 例
```cpp example
#include <iostream>
#include <set>

int main ()
{
  std::multiset<int> c1;
  std::multiset<int> c2;

  c1.insert(10);
  c1.insert(10);
  c1.insert(30);

  std::cout << c1.size() << std::endl;

  c2.insert(c1.begin(), c1.end());
  c2.insert(40);

  std::cout << c2.size() << std::endl;
}
```
* insert[color ff0000]
* size()[link size.md]
* c1.begin()[link begin.md]
* c1.end()[link end.md]

### 出力
```
3
4
```


## 関連項目

| 名前                  | 説明                     |
|-----------------------|--------------------------|
| [`erase`](erase.md) | 要素を削除する           |
| [`find`](find.md)   | 指定したキーで要素を探す |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
    - (7), (8)経緯となる提案文書
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
