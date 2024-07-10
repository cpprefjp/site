# copy

* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
  template<in-object InObj,
          out-object OutObj>
  void copy(InObj x,
           OutObj y);                 // (1)

  template<class ExecutionPolicy,
           in-object InObj,
           out-object OutObj>
  void copy(ExecutionPolicy&& exec,
            InObj x,
            OutObj y);                // (2)
}
```


## 概要
同じサイズの行列またはベクトルの`x`と`y`に対して、`x`を`y`にコピーする。


## テンプレートパラメータ制約
`x`と`y`の次元が等しくなければならない。
- `x.rank() == y.rank()`


## 適格要件
- (1), (2): 0以上`x.rank()`未満の整数rに対して、[`compatible-static-extents`](/reference/linalg/compatible-static-extents.md)`<InVec, OutVec>(r,r)`が`true`
- (2): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`

## 事前条件
`x`と`y`の各次元の要素数が等しくなければならない。
- `x.extents() == y.extents()`



## 効果
`x`の各成分を`y`にコピーする。

- (1): 逐次実行する。
- (2): 指定された実行ポリシーに応じて実行する。


## 戻り値
なし


## 例


### 出力


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
- [`LAPACK: ccopy`](https://netlib.org/lapack/explore-html/d5/d2b/group__copy_gab395a30db1137d3deabe520b8e73097d.html#gab395a30db1137d3deabe520b8e73097d)
