# value_comp
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
value_compare value_comp() const;           // (1) C++23
constexpr value_compare value_comp() const; // (1) C++26
```


## 概要
コンテナに関連づけられた要素比較用の関数オブジェクトを返す。これはコンテナ内の二つの要素を比較するために利用できる。
これは同じ型の 2 つの引数をとり、[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従って一つ目の引数が二つ目の引数の前になる場合に `true`、そうでない場合に `false` を返す。


## 戻り値
要素比較用の関数オブジェクト。
`value_compare` はメンバ型であり、`key_compare` と同じく、テンプレートパラメータ `Compare` の別名である。


## 計算量
定数時間。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main()
{
  std::flat_set<int> s;
  std::flat_set<int>::value_compare comp = s.value_comp();

  std::cout << comp(1, 2) << std::endl;
  std::cout << comp(3, 2) << std::endl;
}
```
* value_comp()[color ff0000]

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


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
