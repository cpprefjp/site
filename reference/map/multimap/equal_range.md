#equal_range
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
pair<iterator, iterator> equal_range(const key_type& x); // (1)

template <class K>
pair<iterator, iterator> equal_range(const K& x);        // (2) C++14

pair<const_iterator, const_iterator>
  equal_range(const key_type& x) const;                  // (3)

template <class K>
pair<const_iterator, const_iterator>
  equal_range(const K& x) const;                         // (4) C++14
```
* pair[link /reference/utility/pair.md]

##概要
コンテナ内の、`x` と等しい全てのキー要素を含む範囲の境界を返す。

もし `x` がコンテナ内のどのキーともマッチしなかった場合、戻り値の範囲は長さ 0 になり、両方のイテレータは `x` より大きく最も近い値を指す。そうでない場合、`x` がコンテナ内の全ての要素よりも大きい場合は [`end`](/reference/map/multimap/end.md) を指す。

- (1), (3) : `key_type`型のキーを受け取り、そのキーと等価なキー要素を全て含むイテレータ範囲を取得する。
- (2), (4) : `key_type`と比較可能な`K`型のキーを受け取り、そのキーと等価なキー要素を全て含むイテレータ範囲を取得する。


##戻り値
この関数は `pair` を返す。ここで `pair::first` は [`lower_bound`](./lower_bound.md)`(x)` が返すであろう値と同じ値で範囲の下境界にあたり、`pair::second` は [`upper_bound`](/reference/map/multimap/upper_bound.md)`(x)` が返すであろう値と同じ値で範囲の上境界にあたる。


##計算量
[`size`](/reference/map/multimap/size.md) について対数時間。


##備考
- (2), (4) : この関数がオーバーロード解決に参加する条件は、[`find()`](./find.md)メンバ関数の備考欄を参照。


##例
```cpp
#include <iostream>
#include <string>
#include <map>

int main()
{
  std::multimap<std::string, int> m = {
    {"A", 3},
    {"B", 1},
    {"B", 2},
    {"C", 4},
    {"D", 5}
  };

  using iterator = decltype(m)::iterator;
  std::pair<iterator, iterator> ret = m.equal_range("B");

  for (iterator it = ret.first; it != ret.second; ++it) {
    std::cout << it->first << "," << it->second << std::endl;
  }
}
```
* equal_range[color ff0000]
* std::string[link /reference/string/basic_string.md]
* std::pair[link /reference/utility/pair.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
B,1
B,2
```


##関連項目

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`multimap::count`](/reference/map/multimap/count.md) | 指定したキーにマッチする要素の数を返す |
| [`multimap::lower_bound`](/reference/map/multimap/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`multimap::upper_bound`](/reference/map/multimap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |
| [`multimap::find`](/reference/map/multimap/find.md) | 指定したキーで要素を探す |


##参照
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)

