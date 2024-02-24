# generator::iterator
* generator[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class Ref, class V, class Allocator>
  class generator<Ref, V, Allocator>::iterator {
    ...
  };
}
```
* generator[link ../generator.md]

## 概要
[`generator`](../generator.md)に対応する説明専用のイテレータ型。

`iterator`の動作説明のため、下記の説明用メンバを用いる。

- `coroutine_` : [`coroutine_handle`](/reference/coroutine/coroutine_handle.md)`<`[`promise_type`](promise_type.md)`>`型のコルーチンハンドル


## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](iterator/op_constructor.md) | コンストラクタ | C++23 |
| `(destructor)` | デストラクタ | C++23 |
| [`operator=`](iterator/op_assign.md) | 代入演算子 | C++23 |

### イテレータ

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator*`](iterator/op_deref.md) | 間接参照 | C++23 |
| [`operator++`](iterator/op_increment.md) | インクリメント | C++23 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|-----|-----|-----|
| [`operator==`](iterator/op_equal.md) | 等値比較 | C++23 |
| [`operator!=`](iterator/op_equal.md) | 非等値比較 (`==`により使用可能) | C++23 |


## メンバ型

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `value_type` | 要素型となる説明用の型[`value`](../generator.md) | C++23 |
| `difference_type` | 2つの値の差を表す整数型`ptrdiff_t` | C++23 |


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [P2502R2 `std::generator`: Synchronous Coroutine Generator for Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2502r2.pdf)
