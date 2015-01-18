#insert
```cpp
pair<iterator,bool> insert(const value_type& x);

// since C++11
pair<iterator,bool> insert(value_type&& &);

// until C++11
iterator insert(iterator position, const value_type& x);

// since C++11
iterator insert(const_iterator position, const value_type& x);

// since C++11
iterator insert(const_iterator position, value_type&& y);

template <class InputIterator>
void insert(InputIterator first, InputIterator last);

// since C++11
void insert(initializer_list<value_type> init);
```

##概要
　新しく一つの要素(引数 `x`, `y`を使う)または要素のシーケンス(入力イテレータまたは `initializer_list` を使う)を挿入することにより、 `set` コンテナを拡張する。 
これは、挿入された要素の数だけコンテナの [`size()`](./size.md) を増やす。 
 `set` コンテナは重複した値を許さないため、挿入操作はそれぞれの要素が他のコンテナ内の既存要素と同じ値かどうかをチェックする。もし同じであれば要素は挿入されず、戻り値を持つ関数の場合はそれへのイテレータを返す。 
重複した値を許す、類似したコンテナについては `multiset` を参照。 
内部的に `set` コンテナは、コンストラクト時に指定された比較オブジェクトによって要素を下位から上位へとソートして保持する。 
この操作は、適切な位置パラメータを提供することで効率を飛躍的に改善することができる。


##パラメータ
- `x` : 挿入される要素の初期値に使われる値。メンバ型 `value_type` は `set` コンテナ内で `Key` （一つ目のテンプレートパラメータであり、コンテナ内に格納される要素の型）の別名として定義される。
- `y` : ムーブして挿入される値。メンバ型 `value_type` は `set` コンテナ内で `Key` （一つ目のテンプレートパラメータであり、コンテナ内に格納される要素の型）の別名して定義される。
- `first, last` : 要素の範囲を指定するイテレータ。範囲 `[first, last)` にある要素のコピーが `set` に挿入される。この範囲は、`first` と `last` の間の全ての要素を含み、`first` が指す要素を含む一方で `last` が指す要素は含まないことに注意。テンプレートタイプは任意の入力イテレータである。
- `init` : 挿入される値のリスト。


##戻り値
`pair` を返すバージョンは、`first` に新しく挿入された要素またはすでに `set` に格納されていた同じ値の要素を指すイテレータをセットする。`second` には、要素が挿入されたときに `true` が、同じ値の要素が存在したときに `false` がセットされる。 
`iterator` を返すバージョンは、新しく挿入された要素またはすでに `set` に格納されていた同じ値の要素を指すイテレータである。
`iterator` はメンバ型であり、双方向イテレータとして定義される。


##計算量
`x` または `y` のみを引数にとるバージョンは対数時間。 
`x` または `y` と `position` を引数にとるバージョンは一般に対数時間だが、`x` または `y` が `position` が指す要素の後に挿入された場合は償却定数時間。 
入力イテレータを引数にとるバージョンは一般に N log(size + N)※ だが、`first` と `last` の間がコンテナで使われているものと同じ順序基準に従ってソート済みである場合は線形時間。 

※ ここで `N` は `first` と `last` の間の距離であり `size` は挿入前のコンテナの [`size()`](./size.md)


##例
```cpp
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

  return 0;
}
```

###出力
```
3
4
```

##参照

| | |
|-------------------------------------------------------------------------------------|--------------------------------------|
| [`erase`](./erase.md) | 要素を削除する |
| [`find`](./find.md) | 指定したキーで要素を探す |


