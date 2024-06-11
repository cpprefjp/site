# operator==
* unordered_map[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Key, class T, class Hash, class Pred, class Alloc>
  bool operator==(const unordered_multimap<Key,T,Hash,Pred,Alloc>& a,
                  const unordered_multimap<Key,T,Hash,Pred,Alloc>& b); // (1) C++11
}
```

## 概要
`unordered_multimap` オブジェクトを等値比較する。


## 要件
- `a.`[`key_eq`](key_eq.md)`()` と `b.`[`key_eq`](key_eq.md)`()` は同じふるまいをすること。
- `key_type` の等値比較演算子（`operator==`）で等値と判定された 2 つのオブジェクトは、[`key_eq`](key_eq.md)`()` でも等値と判定されること。


## 戻り値
以下の両方を満たす場合 `true`、そうでない場合 `false`。

- `a.`[`size`](size.md)`() == b.`[`size`](size.md)`()` である。
- 一方のコンテナの全ての要素が、他方のコンテナにも存在する。ここで、存在するとは、`key_type` の等値比較演算子（`operator==`）で等値と判定されるということである。


## 例外
投げない。


## 計算量
E<sub>i</sub> を `a` の `i` 番目の同値キーのグループの大きさ、`n = a.`[`size`](size.md)`()`であるとして、

- 平均: O(Σ(E<sub>i</sub><sup>2</sup>))
- 最悪: O(n<sup>2</sup>)


## 備考
- 本関数は、コンテナ内の要素の比較に [`key_eq`](key_eq.md)`()` で返されるキー比較用関数オブジェクトを使用しないことに注意。
- 本関数は、標準コンテナの要件を満たさない。これは、標準コンテナの要件では `operator!=` が `iterator` と `std::`[`equal`](/reference/algorithm/equal.md) を用いて定義されているためである。しかし、本関数の戻り値は、両方のコンテナが同じ要素を保持しているという意味においては、標準コンテナと同様とも考えることができる。
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_multimap<int,char> um1;
  um1.insert(std::make_pair(10,'a'));
  um1.insert(std::make_pair(20,'b'));
  um1.insert(std::make_pair(30,'c'));
  um1.insert(std::make_pair(30,'d'));


  std::unordered_multimap<int,char> um2;
  um2.insert(std::make_pair(30,'c'));
  um2.insert(std::make_pair(10,'a'));
  um2.insert(std::make_pair(30,'d'));
  um2.insert(std::make_pair(20,'b'));

  std::cout << (um1 == um2) << std::endl;

  um2.insert(std::make_pair(30,'e'));

  std::cout << (um1 == um2) << std::endl;

  return 0;
}
```
* insert[link insert.md]

### 出力
```
1
0
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
- [P0809R0 Comparing Unordered Containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0809r0.pdf)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
