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


## 概要
同じサイズの2つのベクトル`x`と`y`を交換する。


## テンプレートパラメータ制約
`x`と`y`の次元が等しくなければならない。
- `x.rank() == y.rank()`


## 適格要件
- 0以上`x.rank()`未満の整数rに対して、[`compatible-static-extents`](/reference/linalg/compatible-static-extents.md)`<InOutVec1, InOutVec2>(r,r)`が`true`


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
- [P0788R3 Standard Library Specification in a Concepts and Contracts World](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0788r3.pdf)
- [`LAPACK: cswap`](https://netlib.org/lapack/explore-html/d7/d51/group__swap_ga1e8d1bbcbd0307e7a3839d0bd10e4118.html#ga1e8d1bbcbd0307e7a3839d0bd10e4118)

