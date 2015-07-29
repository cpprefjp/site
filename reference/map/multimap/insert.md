#insert
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
iterator insert(const value_type& x);

// since C++11
template<class P>
iterator insert(P&& &);

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
　新しく一つの要素(引数 `x`, `y`を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入することにより、 `multimap` コンテナを拡張する。 
これは、挿入された要素の数だけコンテナの [`size()`](/reference/map/multimap/size.md) を増やす。 
内部的に `multimap` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。 
この操作は、適切な位置パラメータを提供することで効率を飛躍的に改善することができる。


##パラメータ
- `x` : 挿入される要素の初期値に使われる値。
- `y` : ムーブして挿入される値。
- `first, last` : 要素の範囲を指定するイテレータ。範囲 `[first, last)` にある要素のコピーが `multimap` に挿入される。この範囲は、`first` と `last` の間の全ての要素を含み、`first` が指す要素を含む一方で `last` が指す要素は含まないことに注意。テンプレートタイプは任意の入力イテレータである。
- `init` : 挿入される値のリスト。


##戻り値
`iterator` を返すバージョンは、新しく挿入された要素である。
`iterator` はメンバ型であり、双方向イテレータとして定義される。


##計算量
`x` または `y` のみを引数にとるバージョンは対数時間。 
`x` または `y` と `position` を引数にとるバージョンは一般に対数時間だが、`x` または `y` が `position` が指す要素の後に挿入された場合は償却定数時間。 
入力イテレータを引数にとるバージョンは一般に N log(size + N)※ だが、`first` と `last` の間がコンテナで使われているものと同じ順序基準に従ってソート済みである場合は線形時間。 

※ ここで `N` は `first` と `last` の間の距離であり `size` は挿入前のコンテナの [`size()`](/reference/map/multimap/size.md)


##例
```cpp
#include <iostream>
#include <map>

int main ()
{
  std::multimap<char,int> c1;
  std::multimap<char,int> c2;

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
| [`multimap::erase`](/reference/map/multimap/erase.md) | 要素を削除する |
| [`multimap::find`](/reference/map/multimap/find.md) | 指定したキーで要素を探す |


##参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)

