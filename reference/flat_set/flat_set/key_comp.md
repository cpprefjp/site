# key_comp
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
key_compare key_comp() const;           // (1) C++23
constexpr key_compare key_comp() const; // (1) C++26
```


## 概要
コンテナに関連づけられたキー比較用の関数オブジェクトを返す。このオブジェクトはコンテナ内の二つのキーを比較するために利用できる。
この比較オブジェクトはオブジェクトの構築時に与えられ、関数へのポインタでも関数オブジェクトでも良い。いずれの場合でも、これは同じ型の 2 つの引数をとり、[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従って一つ目の引数が二つ目の引数より前のときに `true` を返し、そうでないときに `false` を返す。


## 戻り値
比較オブジェクト。`key_compare` はメンバ型であり、テンプレートパラメータ `Compare` の別名として定義される。


## 計算量
定数時間。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_set<int> s;
  std::flat_set<int>::key_compare comp = s.key_comp();

  std::cout << comp(1, 2) << std::endl;
  std::cout << comp(3, 2) << std::endl;
}
```
* key_comp()[color ff0000]

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
| [`value_comp`](value_comp.md)       | 要素比較用の関数オブジェクトを返す                       |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
