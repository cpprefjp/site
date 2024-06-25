# add

* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
  template<in-object InObj1,
           in-object InObj2,
           out-object OutObj>
  void add(InObj1 x,
           InObj2 y,
           OutObj z);               // (1)

  template<class ExecutionPolicy,
           in-object InObj1,
           in-object InObj2,
           out-object OutObj>
  void add(ExecutionPolicy&& exec,
           InObj1 x,
           InObj2 y,
           OutObj z);               // (2)
}
```


## 概要
同じサイズの行列またはベクトルの`x`と`y`、`z`に対して、$x + y$ を`z`に代入する:

$$
z \leftarrow x + y
$$


## テンプレートパラメータ制約
- `x`と`y`、`z`の次元が全て等しくなければならない。
    - `x.rank() == y.rank() && y.rank() == z.rank()`


## 適格要件
行列またはベクトルの`x`、`y`、`z`の各次元の静的要素数が同じであること。

- [`possibly-addable`](possibly-addable.md)`<InObj1, InObj2, OutObj>() == true`


## 事前条件
行列またはベクトルの`x`、`y`、`z`の各次元が同じであること。

- [`addable`](addable.md)`(x, y, z) == true`


## 効果
$x + y$ を`z`に代入する。

- (1): 逐次実行する。
- (2): 指定された実行ポリシーに応じて実行する。


## 戻り値
なし


## 備考
`z`を`x`または`y`としてもよい。


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
- [`LAPACK: caxpy`](https://netlib.org/lapack/explore-html/d5/d4b/group__axpy_ga0b7bac1f4d42514074a48f14f5f9caa0.html#ga0b7bac1f4d42514074a48f14f5f9caa0)

