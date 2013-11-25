#insert
```cpp
pair<iterator,bool> insert(const value_type& x);

// since C++11
template<class P>
pair<iterator,bool> insert(P&& y);

// until C++11
iterator insert(iterator position, const value_type& x);

// since C++11
iterator insert(const_iterator position, const value_type& x);

// since C++11
template<class P>
iterator insert(const_iterator position, P&& y);

template <class InputIterator>
void insert(InputIterator first, InputIterator last);

// since C++11
void insert(initializer_list<value_type> init);
```

##概要
　新しく一つの要素(引数 `x`, `y`を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入することにより、 `map` コンテナを拡張する。 
これは、挿入された要素の数だけコンテナの [`size()`](/reference/map/map/size.md) を増やす。 
 `map` コンテナは重複したキーを持つ要素を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じキーかどうかをチェックする。もし同じであれば要素は挿入されず、戻り値を持つ関数の場合はそれへのイテレータを返す。 
重複した値を許す、類似したコンテナについては `multimap` を参照。 
内部的に `map` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。 
この操作は、適切な引数 `position` を提供することで効率を飛躍的に改善することができる。


##パラメータ
- `x` : 挿入される要素の初期値に使われる値。
- `y` : ムーブして挿入される値。
- `first, last` : 要素の範囲を指定するイテレータ。範囲 `[first, last)` にある要素のコピーが `map` に挿入される。この範囲は、`first` と `last` の間の全ての要素を含み、`first` が指す要素を含む一方で `last` が指す要素は含まないことに注意。テンプレートタイプは任意の入力イテレータである。
- `init` : 挿入される値のリスト。


##戻り値
`pair` を返すバージョンは、`first` に新しく挿入された要素またはすでに `map` に格納されていた同じ値の要素を指すイテレータをセットする。`second` には、要素が挿入されたときに `true` が、同じ値の要素が存在したときに `false` がセットされる。 
`iterator` を返すバージョンは、新しく挿入された要素またはすでに `map` に格納されていた同じ値の要素を指すイテレータである。
`iterator` はメンバ型であり、双方向イテレータとして定義される。


##計算量
`x` または `y` のみを引数にとるバージョンは対数時間。 
`x` または `y` と `position` を引数にとるバージョンは一般に対数時間だが、`x` または `y` が `position` が指す要素の前に挿入された場合は償却定数時間。（但し、備考も参照）
入力イテレータを引数にとるバージョンは一般に N log(size + N)※ 。（但し、備考も参照）

※ ここで `N` は `first` と `last` の間の距離であり `size` は挿入前のコンテナの [`size()`](/reference/map/map/size.md)


##備考
- C++11 より前の規格書では、`position` を引数にとるバージョンで計算量が償却定数時間となる条件は、「`position` が指す要素の**後ろ**に挿入された場合」となっているが、主要な実装は以前から `position` が指す**前**に挿入する場合に償却定数時間となっていた。これは、`position` の後ろでは、適切な位置が先頭の場合に指定する方法が無いこと、`vector::insert` の場合、`position` の前に挿入されること、STL のオリジナルである HP 社の実装が `position` の前に挿入する場合に償却定数時間であったことなどによる。

- C++11 より前の規格書では、入力イテレータを引数にとるバージョンで `first` と `last` の間が昇順にソートされていた場合、計算量が線形時間となっていたが、この仕様は実現性が無いため C++11 では削除された。（例えば、コンテナの既存の要素が 2 から 100 の偶数のみの場合に、1 から 99 のソートされた奇数の範囲を挿入する場合を考えてみよ）


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main ()
{
  map<char,int> c1;
  map<char,int> c2;

  c1.insert(std::make_pair('a', 10));
  c1.insert(std::make_pair('b', 20));
  c1.insert(std::make_pair('c', 30));

  cout << c1.size() << endl;

  c2.insert(c1.begin(), c1.end());
  c2.insert(std::make_pair('d', 40));

  cout << c2.size() << endl;

  return 0;
}
```

###出力
```
3
4
```

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0


##参照

| 名前 | 説明　|
|-------------------------------------------------------------------------------------|--------------------------------------|
| [`map::erase`](/reference/map/map/erase.md) | 要素を削除する |
| [`map::find`](/reference/map/map/find.md) | 指定したキーで要素を探す |


