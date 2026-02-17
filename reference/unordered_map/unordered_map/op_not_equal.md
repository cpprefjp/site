# operator!=
* unordered_map[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator==により、以下の演算子が使用可能になる (C++20)
  template <class Key, class T, class Hash, class Pred, class Alloc>
  bool operator!=(const unordered_map<Key,T,Hash,Pred,Alloc>& a,
                  const unordered_map<Key,T,Hash,Pred,Alloc>& b); // (1) C++11
  template <class Key, class T, class Hash, class Pred, class Alloc>
  constexpr bool operator!=(const unordered_map<Key,T,Hash,Pred,Alloc>& a,
                  const unordered_map<Key,T,Hash,Pred,Alloc>& b); // (1) C++26
}
```

## 概要
`unordered_map` オブジェクトを非等値比較する。


## 要件
- `a.`[`key_eq`](key_eq.md)`()` と `b.`[`key_eq`](key_eq.md)`()` は同じふるまいをすること。
- `key_type` の等値比較演算子（`operator==`）で等値と判定された 2 つのオブジェクトは、[`key_eq`](key_eq.md)`()` でも等値と判定されること。


## 戻り値
以下と等価：

```cpp
return !(a == b);
```
* ==[link op_equal.md]


## 例外
投げない。


## 計算量
- 平均: [`size()`](size.md) に対して線形時間
- 最悪: [`size()`](size.md) に対して二乗時間


## 備考
- 本関数は、コンテナ内の要素の比較に [`key_eq`](key_eq.md)`()` で返されるキー比較用関数オブジェクトを使用しないことに注意。
- 本関数は、標準コンテナの要件を満たさない。これは、標準コンテナの要件では `operator!=` が `iterator` と `std::`[`equal`](/reference/algorithm/equal.md) を用いて定義されているためである。しかし、本関数の戻り値は、両方のコンテナが同じ要素を保持しているという意味においては、標準コンテナと同様とも考えることができる。


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int,char> um1;
  um1[0] = 'a';

  auto um2 = um1;

  std::cout << (um1 != um2) << std::endl;

  um2[0] = 'b';

  std::cout << (um1 != um2) << std::endl;

  return 0;
}
```

### 出力
```
0
1
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
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
