# value_comp
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
value_compare value_comp() const;
```

## 概要
コンテナに関連づけられた要素比較用の関数オブジェクトを返す。これはコンテナ内の二つの要素のキー部分を比較するために利用できる。
これは同じ型の 2 つの引数をとり、[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従って一つ目の引数が二つ目の引数の前になる場合に `true`、そうでない場合に `false` を返す。



## 戻り値
要素比較用の関数オブジェクト。
[`value_compare`](value_compare.md) はメンバ型である。`key_compare` とは異なり、単なる型の別名ではなく入れ子クラスである。


## 計算量
定数時間。


## 例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::map<int,char> c;
  const std::map<int,char>::value_compare& comp = c.value_comp();

  auto p1 = std::make_pair(1,'a');
  auto p2 = std::make_pair(2,'b');
  auto p3 = std::make_pair(3,'c');

  std::cout << comp(p1, p2) << std::endl;
  std::cout << comp(p3, p2) << std::endl;
}
```
* value_comp()[color ff0000]
* value_compare[link value_compare.md]

### 出力
```
1
0
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

## 参照

| 名前                                               | 説明                                                     |
|----------------------------------------------------|----------------------------------------------------------|
| [`key_comp`](/reference/map/map/key_comp.md)       | キー比較用の関数オブジェクトを返す                       |
| [`find`](/reference/map/map/find.md)               | 指定したキーで要素を探す                                 |
| [`count`](/reference/map/map/count.md)             | 指定したキーにマッチする要素の数を返す                   |
| [`lower_bound`](/reference/map/map/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`upper_bound`](/reference/map/map/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す       |
