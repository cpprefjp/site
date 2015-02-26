#key_comp
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
key_compare key_comp() const;
```

##概要
コンテナに関連づけられた比較オブジェクトを返す。このオブジェクトはコンテナ内の二つの要素を比較するために利用できる。 
この比較オブジェクトはオブジェクトの構築時に与えられ、関数へのポインタでも関数オブジェクトでも良い。いずれの場合でも、これは同じ型の 2 つの引数をとり、[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従って一つ目の引数が二つ目の引数より前のときに `true` を返し、そうでないときに `false` を返す。 
`set` コンテナにおいて、要素の値はキーそれ自身であり、従って `key_comp` とその兄弟メンバ関数である [`value_comp`](value_comp.md) は両方とも同じである。


##戻り値
比較オブジェクト。`key_compare` はメンバ型であり、テンプレートパラメータ `Compare` の別名として定義される。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  std::set<int> c;
  std::set<int>::key_compare comp = c.key_comp();

  std::cout << comp(1, 2) << std::endl;
  std::cout << comp(5, 3) << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* key_comp[color ff0000]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]

###出力
```
1
0
```

##参照

| 名前                              | 説明                                                     |
|-----------------------------------|----------------------------------------------------------|
| [`value_comp`](./value_comp.md)   | 値を比較した結果を返す                                   |
| [`find`](./find.md)               | 指定したキーで要素を探す                                 |
| [`count`](./count.md)             | 指定したキーにマッチする要素の数を返す                   |
| [`lower_bound`](./lower_bound.md) | 与えられた値より小さく無い最初の要素へのイテレータを返す |
| [`upper_bound`](./upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す       |
