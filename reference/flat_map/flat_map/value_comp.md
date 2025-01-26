# value_comp
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
value_compare value_comp() const; // C++23
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
```cpp example
#include <flat_map>
#include <iostream>
#include <utility>

int main()
{
  std::flat_map<int, char> m;
  std::flat_map<int, char>::value_compare comp = m.value_comp();

  auto p1 = std::make_pair(1, 'a');
  auto p2 = std::make_pair(2, 'b');
  auto p3 = std::make_pair(3, 'c');

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


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                | 説明                                                     |
|-------------------------------------|----------------------------------------------------------|
| [`key_comp`](key_comp.md)           | キー比較用の関数オブジェクトを取得する                      |
| [`value_compare`](value_compare.md) | 要素値のキー部分で大小関係を判定する二項述語の型             |
