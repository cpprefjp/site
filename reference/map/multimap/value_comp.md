# value_comp
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
value_compare value_comp() const;
```

## 概要
コンテナに関連づけられた比較オブジェクトを返す。これはコンテナ内の二つの要素の�ー部分を比較するために利用できる。 
この比較オブジェクトはオブジェクトの構築時にセットされ、関数ポインタであっても関数オブジェクトであっても良い。いずれにせよこれは同じ型の 2 つの引数をとり、[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従って一つ目の引数が二つ目の引数の前になる場合に `true`、そうでない場合に `false` を返す。 



## 戻り値
比較オブジェクト。 
`value_compare` はメンバ型であり、テンプレートパラメータ `Compare` の別名として定義される。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> c;
  const std::multimap<int, char>::value_compare& comp = c.value_comp();

  auto p1 = std::make_pair(1, 'a');
  auto p2 = std::make_pair(2, 'b');
  auto p3 = std::make_pair(3, 'c');

  std::cout << comp(p1, p2) << std::endl;
  std::cout << comp(p3, p2) << std::endl;

  return 0;
}
```
* value_comp()[color ff0000]

### 出力
```
1
0
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012

## 関連項目

| 名前 | 説明|
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`key_comp`](/reference/map/multimap/key_comp.md) | �ーを比較した結果を返す |
| [`find`](/reference/map/multimap/find.md) | 指定した�ーで要素を探す |
| [`count`](/reference/map/multimap/count.md) | 指定した�ーにマッチする要素の数を返す |
| [`lower_bound`](/reference/map/multimap/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`upper_bound`](/reference/map/multimap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


