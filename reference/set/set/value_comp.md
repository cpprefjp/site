#value_comp
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
value_compare value_comp() const;
```

##概要
コンテナに関連づけられた比較オブジェクトを返す。これはコンテナ内の二つの要素を比較するために利用できる。  
この比較オブジェクトはオブジェクトの構築時にセットされ、関数ポインタであっても関数オブジェクトであっても良い。いずれにせよこれは同じ型の 2 つの引数をとり、[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従って一つ目の引数が二つ目の引数の前になる場合に `true`、そうでない場合に `false` を返す。  
`set` コンテナでは、要素の値はキーそのものであり、従って `value_comp` とその兄弟メンバ関数である [`key_comp`](key_comp.md) は同じである。


##戻り値
比較オブジェクト。  
`value_compare` はメンバ型であり、テンプレートパラメータ `Compare` の別名として定義される。


##計算量
定数時間。


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  std::set<int> c;
  std::set<int>::value_compare comp = c.value_comp();

  std::cout << comp(1, 2) << std::endl;
  std::cout << comp(5, 3) << std::endl;
}
```
* value_comp()[color ff0000]
* insert[link insert.md]

###出力
```
1
0
```

##参照

| 名前                              | 説明                                                     |
|-----------------------------------|----------------------------------------------------------|
| [`key_comp`](key_comp.md)       | キーを比較した結果を返す                                 |
| [`find`](find.md)               | 指定したキーで要素を探す                                 |
| [`count`](count.md)             | 指定したキーにマッチする要素の数を返す                   |
| [`lower_bound`](lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`upper_bound`](upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す       |
