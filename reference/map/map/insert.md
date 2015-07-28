#insert
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
pair<iterator, bool> insert(const value_type& x);              // (1)

template <class P>
pair<iterator, bool> insert(P&& y);                            // (2) C++11から

iterator insert(iterator position, const value_type& x);       // (3) C++11まで
iterator insert(const_iterator position, const value_type& x); // (3) C++11から

template <class P>
iterator insert(const_iterator position, P&& y);               // (4) C++11から

template <class InputIterator>
void insert(InputIterator first, InputIterator last);          // (5)

void insert(initializer_list<value_type> init);                // (6) C++11から
```

##概要
　新しく一つの要素(引数 `x`, `y`を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入することにより、 `map` コンテナを拡張する。

これは、挿入された要素の数だけコンテナの [`size()`](/reference/map/map/size.md) を増やす。

 `map` コンテナは重複したキーを持つ要素を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じキーかどうかをチェックする。もし同じであれば要素は挿入されず、戻り値を持つ関数の場合はそれへのイテレータを返す。

重複した値を許す、類似したコンテナについては `multimap` を参照。

内部的に `map` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。

この操作は、適切な引数 `position` を提供することで効率を飛躍的に改善することができる。


##戻り値
- (1), (2) : `pair` を返すバージョンは、`first` に新しく挿入された要素またはすでに `map` に格納されていた同じ値の要素を指すイテレータをセットする。`second` には、要素が挿入されたときに `true` が、同じ値の要素が存在したときに `false` がセットされる。
- (3), (4) : `iterator` を返すバージョンは、新しく挿入された要素またはすでに `map` に格納されていた同じ値の要素を指すイテレータである。


##計算量
- (1), (2) : 対数時間
- (3), (4) : 般に対数時間だが、指定された新たな要素が `position` が指す要素の前に挿入された場合は償却定数時間。（ただし、備考も参照）
- (5), (6) : 般に N log(size + N)。（ただし、備考も参照）
	- ここで、 `N` は `first` と `last` の間の距離であり `size` は挿入前のコンテナの [`size()`](/reference/map/map/size.md) を表す。


##備考
- (3), (4) : C++03 までの仕様では、計算量が償却定数時間となる条件は、「`position` が指す要素の**後ろ**に挿入された場合」となっているが、主要な実装は以前から `position` が指す**前**に挿入する場合に償却定数時間となっていた。これは、`position` の後ろでは、適切な位置が先頭の場合に指定する方法がないこと、`vector::insert` の場合、`position` の前に挿入されること、STL のオリジナルである HP 社の実装が `position` の前に挿入する場合に償却定数時間であったことなどによる。

- (5) : C++03 までの仕様では、`first` と `last` の間が昇順にソートされていた場合、計算量が線形時間となっていたが、この仕様は実現性がないため C++11 では削除された。（例えば、コンテナの既存の要素が 2 から 100 の偶数のみの場合に、1 から 99 のソートされた奇数の範囲を挿入する場合を考えてみよ）


##例
```cpp
#include <iostream>
#include <map>

int main ()
{
  std::map<char,int> c1;
  std::map<char,int> c2;

  c1.insert(std::make_pair('a', 10));
  c1.insert(std::make_pair('b', 20));
  c1.insert(std::make_pair('c', 30));

  std::cout << c1.size() << std::endl;

  c2.insert(c1.begin(), c1.end());
  c2.insert(std::make_pair('d', 40));

  std::cout << c2.size() << std::endl;

  return 0;
}
```

###出力
```
3
4
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


##参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)


##関連項目

| 名前 | 説明　|
|-------------------------------------------------------------------------------------|--------------------------------------|
| [`map::erase`](/reference/map/map/erase.md) | 要素を削除する |
| [`map::find`](/reference/map/map/find.md) | 指定したキーで要素を探す |


