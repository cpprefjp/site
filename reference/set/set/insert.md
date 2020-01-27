# insert
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
pair<iterator,bool> insert(const value_type& x);               // (1)
pair<iterator,bool> insert(value_type&& y);                    // (2) C++11

iterator insert(iterator position, const value_type& x);       // (3) C++03
iterator insert(const_iterator position, const value_type& x); // (3) C++11

iterator insert(const_iterator position, value_type&& y);      // (4) C++11

template <class InputIterator>
void insert(InputIterator first, InputIterator last);          // (5)

void insert(initializer_list<value_type> init);                // (6)

insert_return_type insert(node_type&& nh);                      // (7) C++17
iterator           insert(const_iterator hint, node_type&& nh); // (8) C++17
```
* pair[link /reference/utility/pair.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
新しく一つの要素(引数 `x`, `y`を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入することにより、 `set` コンテナを拡張する。

 `set` コンテナは重複した値を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既�要素と同じ値かどうかをチェックし、同じ要素がすでにあれば挿入されない。`multiset`の場合には、同じ値の要素でも挿入される。


- (1) : 新たな要素`x`をコピー挿入する
- (2) : 新たな要素`y`をムーブ挿入する
- (3) : 新たな要素`x`をコピー挿入する。`position`パラメータに適切な挿入位置を指定すれば、高速に挿入できる
- (4) : 新たな要素`y`をムーブ挿入する。`position`パラメータに適切な挿入位置を指定すれば、高速に挿入できる
- (5) : イテレータ範囲`[first, last)`の要素を挿入する
- (6) : 初期化�リスト`init`の要素を挿入する
- (7) : `nh`が空の場合、効果はない。
それ以外の場合、`nh.key()`と�価の�ーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する。
- (8) : `nh`が空の場合、効果はなく、`(*this).end()`を返す。
それ以外の場合、`nh.key()`と�価の�ーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する。 `nh.key()`と同�の�ーの要素を指すイテレータを常に返す。要素は、`p`の直前の位置のできるだけ近くに挿入される。


## 戻り値
- (1), (2) : `first` に新しく挿入された要素またはすでに `set` に格納されていた同じ値の要素を指すイテレータを�定する。`second` には、要素が挿入されたときに `true` を、同じ値の要素が�在したときに `false` を�定する。
- (3), (4) : 新しく挿入された要素またはすでに `set` に格納されていた同じ値の要素を指すイテレータを返す。
- (5), (6) : なし
- (7) : [`insert_return_type`](/reference/map/map.md)を返す。`insert_return_type`のイテレータ型メンバ変数`position`、`bool`型メンバ変数`inserted`に格納される値は(1), (2)のものと同じ情報である。`nh`が空の場合は、`position`は終端イテレータである。`node_type`型メンバ変数`node`には、
    - 挿入された場合には、空の[ノードハンドル](/reference/node_handle/node_handle.md)。
    - 挿入されなかった場合には、`nh`の値である。 
- (8) : `nh`が空の場合、`(*this).end()`を返す。そうではない場合、`nh`と�価の�ーの要素を指すイテレータを常に返す。


## 計算量
- (1), (2) : 対数時間
- (3), (4) : 一般に対数時間だが、`x` または `y` が `position` が指す要素の直前に挿入された場合は償却定数時間
- (5), (6) : 一般に N log(size + N)
    - ※ ここで `N` は `first` と `last` の間の距離であり `size` は挿入前のコンテナの [`size()`](size.md)
- (7) : 対数時間
- (8) : 一般に対数時間だが、指定された新たな要素が `position` が指す要素の直前に挿入された場合は償却定数時間。


## 備考
内部的に `set` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。 (7), (8) の場合、要素はコピーもムーブもされない。

## 例
```cpp example
#include <iostream>
#include <set>

int main ()
{
  std::set<int> c1;
  std::set<int> c2;

  c1.insert(10);
  c1.insert(20);
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
| [`find`](find.md)   | 指定した�ーで要素を探す |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
    - (7), (8)経緯となる提案文書