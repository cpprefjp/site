#equal_range
```cpp
pair<iterator,iterator> equal_range(const key_type& x);
pair<const_iterator,const_iterator> equal_range(const key_type& x) const;
```

##概要
コンテナ内の、`x` と等しい全てのキー要素を含む範囲の境界を返す。`set` コンテナではキーの重複は無いため、この範囲は最大一つの要素を含む。 

もし `x` がコンテナ内のどのキーともマッチしなかった場合、戻り値の範囲は長さ 0 になり、両方のイテレータは `x` より大きく最も近い値を指す。そうでない場合、`x` がコンテナ内の全ての要素よりも大きい場合は [`end`](./end.md) を指す。


##パラメータ
- `x` : 比較されるキー値。`key_type` はメンバ型であり、`set` コンテナ内で `Key` の別名として定義される。ここで `Key` は最初のテンプレートパラメータでありコンテナに格納される要素の型である。


##戻り値
この関数は `pair` を返す。ここで `pair::first` は [`lower_bound`](./lower_bound.md)`(x)` が返すであろう値と同じ値で範囲の下境界にあたり、`pair::second` は [`upper_bound`](./upper_bound.md)`(x)` が返すであろう値と同じ値で範囲の上境界にあたる。`iterator` はメンバ型であり `set` において双方向イテレータとして定義される。


##計算量
[`size`](./size.md) について対数時間。


##例
```cpp
#include <iostream>
#include <set>
using namespace std;
 
int main()
{
  set<int> c;
 
  c.insert(10);
  c.insert(20);
  c.insert(30);
  c.insert(40);
  c.insert(50);
 
  typedef set<int>::iterator it_t;
  pair<it_t, it_t> ret = c.equal_range(30);
 
  cout << "low: " << *ret.first << endl;
  cout << "up: " << *ret.second << endl;
}
```

###出力
```
low: 30
up: 40
```

##参照

| | |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`count`](./count.md) | 指定したキーにマッチする要素の数を返す |
| [`lower_bound`](./lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`upper_bound`](./upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |
| [`find`](./find.md) | 指定したキーで要素を探す |


