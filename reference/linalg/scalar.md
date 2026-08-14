# scalar
* [meta exposition-only]
* linalg[meta header]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
concept scalar =
  semiregular<T> && (!is-mdspan<T>) && (!is_execution_policy_v<T>);
```
* semiregular[link /reference/concepts/semiregular.md]
* is-mdspan[link is-mdspan.md]
* is_execution_policy_v[link /reference/execution/is_execution_policy.md]

## 概要
型`T`が、線形代数演算においてスカラー値として扱える型であることを表す、説明専用のコンセプトである。

`<linalg>`の各アルゴリズムで、スカラー値をとるテンプレートパラメータ（各種rank更新の`alpha`など）を制約するために使用される。

具体的には、[`semiregular`](/reference/concepts/semiregular.md)のモデルであり、かつ[`mdspan`](/reference/mdspan/mdspan.md)の特殊化でも実行ポリシー型（[`is_execution_policy`](/reference/execution/is_execution_policy.md)`_v`が`true`となる型）でもない型が、このコンセプトを満たす。


## バージョン
### 言語
- C++26


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [P3371R5 Fix C++26 BLAS rank updates consistency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3371r5.html)
    - C++26で、スカラー値をとるテンプレートパラメータを制約するために、説明専用コンセプト`scalar`が追加された
