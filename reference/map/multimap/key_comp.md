# key_comp
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
key_compare key_comp() const;
```

## 概要
コンテナに関連づけられた比較オブジェクトを返す。このオブジェクトはコンテナ内の二つの要素の�ー値を比較するために利用できる。 
この比較オブジェクトはオブジェクトの構築時に与えられ、関数へのポインタでも関数オブジェクトでも良い。いずれの場合でも、これは同じ型の 2 つの引数をとり、�義の弱順序に従って一つ目の引数が二つ目の引数より前のときに `true` を返し、そうでないときに `false` を返す。 


## 戻り値
比較オブジェクト。`key_compare` はメンバ型であり、テンプレートパラメータ `Compare` の別名として定義される。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> c;
  std::multimap<int, char>::key_compare comp = c.key_comp();

  std::cout << comp(1, 2) << std::endl;
  std::cout << comp(3, 2) << std::endl;

  return 0;
}
```
* key_comp()[color ff0000]

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
| [`value_comp`](/reference/map/multimap/value_comp.md) | 値を比較した結果を返す |
| [`find`](/reference/map/multimap/find.md) | 指定した�ーで要素を探す |
| [`count`](/reference/map/multimap/count.md) | 指定した�ーにマッチする要素の数を返す |
| [`lower_bound`](/reference/map/multimap/lower_bound.md) | 与えられた値より小さく無い最初の要素へのイテレータを返す |
| [`upper_bound`](/reference/map/multimap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


