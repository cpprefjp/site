#equal_range
* map[meta header]

```cpp
pair<iterator,iterator> equal_range(const key_type& x);
pair<const_iterator,const_iterator> equal_range(const key_type& x) const;
```

##概要
コンテナ内の、`x` と等しい全てのキー要素を含む範囲の境界を返す。

もし `x` がコンテナ内のどのキーともマッチしなかった場合、戻り値の範囲は長さ 0 になり、両方のイテレータは `x` より大きく最も近い値を指す。そうでない場合、`x` がコンテナ内の全ての要素よりも大きい場合は [`end`](/reference/map/multimap/end.md) を指す。


##パラメータ
- `x` : 比較されるキー値。`key_type` はメンバ型であり、`multimap` コンテナ内で `Key` の別名として定義される。ここで `Key` は最初のテンプレートパラメータである。


##戻り値
この関数は `pair` を返す。ここで `pair::first` は [`lower_bound`](./lower_bound.md)`(x)` が返すであろう値と同じ値で範囲の下境界にあたり、`pair::second` は [`upper_bound`](/reference/map/multimap/upper_bound.md)`(x)` が返すであろう値と同じ値で範囲の上境界にあたる。`iterator` はメンバ型であり `multimap` において双方向イテレータとして定義される。


##計算量
[`size`](/reference/map/multimap/size.md) について対数時間。


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::multimap<int,char> c;

  c.insert(std::make_pair(1,'a'));
  c.insert(std::make_pair(2,'b'));
  c.insert(std::make_pair(3,'c'));
  c.insert(std::make_pair(4,'d'));
  c.insert(std::make_pair(5,'e'));

  typedef std::multimap<int,char>::iterator it_t;
  std::pair<it_t, it_t> ret = c.equal_range(3);

  std::cout << "low: " << ret.first->first << " " << ret.first->second << std::endl;
  std::cout << "up: " << ret.second->first << " " << ret.second->second << std::endl;
}
```

###出力
```
low: 3 c
up: 4 d
```


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


##参照


| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`multimap::count`](/reference/map/multimap/count.md) | 指定したキーにマッチする要素の数を返す |
| [`multimap::lower_bound`](/reference/map/multimap/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`multimap::upper_bound`](/reference/map/multimap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |
| [`multimap::find`](/reference/map/multimap/find.md) | 指定したキーで要素を探す |


