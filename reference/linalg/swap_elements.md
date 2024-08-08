# swap_elements
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<inout-object InOutObj1,
           inout-object InOutObj2>
  void swap_elements(InOutObj1 x,
                     InOutObj2 y);          // (1)

  template<class ExecutionPolicy,
           inout-object InOutObj1,
           inout-object InOutObj2>
  void swap_elements(ExecutionPolicy&& exec,
                     InOutObj1 x,
                     InOutObj2 y);          // (2)
}
```
* inout-object[link inout-object.md]

## 概要
同じサイズの2つの行列またはベクトル`x`と`y`を交換する。


## テンプレートパラメータ制約
`x`と`y`の次元が等しくなければならない。

- `x.rank() == y.rank()`


## 適格要件
- (1), (2): 0以上`x.rank()`未満の整数rに対して、[`compatible-static-extents`](/reference/linalg/compatible-static-extents.md)`<InOutVec1, InOutVec2>(r,r)`が`true`
- (2): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
`x`と`y`の各次元の要素数が等しくなければならない。

- `x.extents() == y.extents()`


## 効果
`x`と`y`の対応する成分全てを交換する。

- (1): 逐次実行する。
- (2): 指定された実行ポリシーに応じて実行する。


## 戻り値
なし


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <cmath>
#include <execution>
#include <iostream>
#include <linalg>
#include <mdspan>
#include <vector>


template <class Vector>
void print(Vector v) {
  for (int i = 0; i < v.extent(0) - 1; ++i) {
    std::cout << v[i] << ", ";
  }
  std::cout << v[v.extent(0) - 1] << std::endl;
}


int main()
{
  constexpr size_t N = 3;

  std::vector<double> a_vec({1, 2, 3});
  std::mdspan a(a_vec.data(), N);

  std::vector<double> b_vec({4, 5, 6});
  std::mdspan b(b_vec.data(), N);

  // (1)
  std::linalg::swap_elements(a, b);
  std::cout << "(1)\n";
  std::cout << "a\n";
  print(a);
  std::cout << "b\n";
  print(b);

  // (2)
  std::linalg::swap_elements(std::execution::par, a, b);
  std::cout << "(2)\n";
  std::cout << "a\n";
  print(a);
  std::cout << "b\n";
  print(b);

  return 0;
}
```
* std::linalg::swap_elements[color ff0000]


### 出力
```
(1)
a
4, 5, 6
b
1, 2, 3
(2)
a
1, 2, 3
b
4, 5, 6
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution`](/reference/execution.md)
- [`mdspan`](/reference/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [`LAPACK: cswap`](https://netlib.org/lapack/explore-html/d7/d51/group__swap_ga1e8d1bbcbd0307e7a3839d0bd10e4118.html#ga1e8d1bbcbd0307e7a3839d0bd10e4118)

