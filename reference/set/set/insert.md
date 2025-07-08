# insert
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
pair<iterator,bool> insert(const value_type& x);           // (1) C++03
pair<iterator,bool> insert(value_type&& y);                // (2) C++11

template <class K>
pair<iterator, bool> insert(K&& x);                        // (3) C++26

iterator insert(iterator hint, const value_type& x);       // (4) C++03
iterator insert(const_iterator hint, const value_type& x); // (4) C++11

iterator insert(const_iterator hint, value_type&& y);      // (5) C++11

template <class K>
iterator insert(const_iterator hint, K&& x);               // (6) C++26

template <class InputIterator>
void insert(InputIterator first, InputIterator last);      // (7) C++03

void insert(initializer_list<value_type> init);            // (8) C++03

insert_return_type insert(node_type&& nh);                      // (9) C++17
iterator           insert(const_iterator hint, node_type&& nh); // (10) C++17
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
新しく一つの要素(引数 `x`, `y`を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入することにより、 `set` コンテナを拡張する。

 `set` コンテナは重複した値を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じ値かどうかをチェックし、同じ要素がすでにあれば挿入されない。`multiset`の場合には、同じ値の要素でも挿入される。

- (1) : 新たな要素`x`をコピー挿入する
- (2) : 新たな要素`y`をムーブ挿入する
- (3) : `value_type`に変換可能な`K`型の新たな要素`x`を転送して挿入する
- (4) : 新たな要素`x`をコピー挿入する。`hint`パラメータに適切な挿入位置を指定すれば、高速に挿入できる
- (5) : 新たな要素`y`をムーブ挿入する。`hint`パラメータに適切な挿入位置を指定すれば、高速に挿入できる
- (6) : `value_type`に変換可能な`K`型の新たな要素`x`を転送して挿入する。`hint`パラメータに適切な挿入位置を指定すれば、高速に挿入できる
- (7) : イテレータ範囲`[first, last)`の要素を挿入する
- (8) : 初期化子リスト`init`の要素を挿入する
- (9) : `nh`が空の場合、効果はない。
それ以外の場合、`nh.key()`と等価のキーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する。
- (10) : `nh`が空の場合、効果はなく、`(*this).end()`を返す。
それ以外の場合、`nh.key()`と等価のキーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する。 `nh.key()`と同等のキーの要素を指すイテレータを常に返す。要素は、`hint`の直前の位置のできるだけ近くに挿入される。


## テンプレートパラメータ制約
- (3), (6) :
    - `key_compare::is_transparent` が妥当な式であること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<K&&, const_iterator> == false`であること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<K&&, iterator> == false`であること
    - `value_type`が[`std::forward`](/reference/utility/forward.md)`<K>(x)`によって直接構築可能であること


## 戻り値
- (1), (2), (3) : `first` に新しく挿入された要素またはすでに `set` に格納されていた同じ値の要素を指すイテレータを設定する。`second` には、要素が挿入されたときに `true` を、同じ値の要素が存在したときに `false` を設定する。
- (4), (5), (6) : 新しく挿入された要素またはすでに `set` に格納されていた同じ値の要素を指すイテレータを返す。
- (7), (8) : なし
- (9) : [`insert_return_type`](/reference/map/map.md)を返す。`insert_return_type`のイテレータ型メンバ変数`position`、`bool`型メンバ変数`inserted`に格納される値は(1), (2)のものと同じ情報である。`nh`が空の場合は、`position`は終端イテレータである。`node_type`型メンバ変数`node`には、
    - 挿入された場合には、空の[ノードハンドル](/reference/node_handle/node_handle.md)。
    - 挿入されなかった場合には、`nh`の値である。 
- (10) : `nh`が空の場合、`(*this).end()`を返す。そうではない場合、`nh`と等価のキーの要素を指すイテレータを常に返す。


## 計算量
- (1), (2), (3) : 対数時間
- (4), (5), (6) : 一般に対数時間だが、`x` または `y` が `hint` が指す要素の直前に挿入された場合は償却定数時間
- (7), (8) : 一般に N log(size + N)
    - ※ ここで `N` は `first` と `last` の間の距離であり `size` は挿入前のコンテナの [`size()`](size.md)
- (9) : 対数時間
- (10) : 一般に対数時間だが、指定された新たな要素が `hint` が指す要素の直前に挿入された場合は償却定数時間。


## 備考
- これらの関数が呼ばれた後も、当該コンテナ内の要素を指す参照やイテレータは無効にはならない。  
	なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
- 内部的に `set` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。 (9), (10) の場合、要素はコピーもムーブもされない。
- (3), (6) :
    - `is_transparent`は、標準ライブラリの[`std::less`](/reference/functional/less.md)、[`std::greater`](/reference/functional/greater.md)といった関数オブジェクトの、`void`に対する特殊化で定義される。それ以外のテンプレートパラメータで`is_transparent`が定義されないのは、互換性のためである。
    - これらのオーバーロードは、`map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある。


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
| [`find`](find.md)   | 指定したキーで要素を探す |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
    - C++17で導入されたノード挿入(9), (10)の経緯となる提案文書
- [P2363R5: Extending associative containers with the remaining heterogeneous overloads](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2363r5.html)
    - C++26で`template <class K>`のバージョンが追加された
