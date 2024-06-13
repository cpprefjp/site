# addable

* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
constexpr bool addable(
  const in-vector auto& in1,
  const in-vector auto& in2,
  const in-vector auto& out)
{
  return out.extent(0) == in1.extent(0) &&
         out.extent(0) == in2.extent(0);
} // (1)

constexpr bool addable(
  const in-matrix auto& in1,
  const in-matrix auto& in2,
  const in-matrix auto& out)
{
  return out.extent(0) == in1.extent(0) &&
         out.extent(1) == in1.extent(1) &&
         out.extent(0) == in2.extent(0) &&
         out.extent(1) == in2.extent(1);
} // (2)
}
```


## 概要
テンプレートパラメータに指定されたベクトルまたは行列の次元が同じかどうかを判定する、説明専用の関数である。


## 戻り値
`In1`、`In2`、`Out`の各次元が同じ場合`true`を返す。そうでない場合は、`false`を返す。

- (1): ベクトル
- (2): 行列


## バージョン
### 言語
- C++26


## 関連項目
- [`mdspan`](/reference/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)


