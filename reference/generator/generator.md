# generator
* generator[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class Ref, class V = void, class Allocator = void>
  class generator : public ranges::view_interface<generator<Ref, V, Allocator>> {
    ...
  }
}
```


## 概要
`generator`クラステンプレートは、[コルーチン](/lang/cpp20/coroutines.md)の評価により生成される要素列のビュー(view)を表現する。

特殊化された`generator`は[`view`](/reference/ranges/view.md)および[`input_range`](/reference/ranges/input_range.md)のモデルである。

戻り値型`generator`のコルーチン（以降、ジェネレータコルーチン）では`co_yield`式を用いて値を生成する。`co_yield `[`std::ranges::elements_of`](/reference/ranges/elements_of.md)`(rng)`式を用いると、ジェネレータコルーチンから入れ子Range(`rng`)の各要素を逐次生成する。

ジェネレータコルーチンの開始は遅延評価されるため、`generator`利用側が先頭要素[`begin`](generator/begin.md.nolink)を指すイテレータを間接参照するまでジェネレータコルーチンの本体処理は実行されない。


`generator`では下記の説明用メンバ型を定義する。
- `value` == [`conditional_t`](/reference/type_traits/conditional.md)`<`[`is_void_v`](/reference/type_traits/is_void.md)`<V>,` [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<Ref>, V>`
- `reference` == [`conditional_t`](/reference/type_traits/conditional.md)`<`[`is_void_v`](/reference/type_traits/is_void.md)`<V>, Ref&&, Ref>`


## 適格要件
- `Allocator`が`void`ではない場合、[`allocator_traits<Allocator>`](/reference/memory/allocator_traits.md)`::pointer`はポインタ型
- `value`はcv修飾されないオブジェクト型
- `reference`は参照型、または[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルであるcv修飾されないオブジェクト型
- `reference`が参照型の場合は`RRef` == [`remove_reference_t`](/reference/type_traits/remove_reference.md)`<reference>&&`、それ以外の場合は`RRef` == `reference`としたとき、それぞれ下記のモデルであること
  - [`common_reference_with`](/reference/concepts/common_reference_with.md)`<reference&&, value&>`
  - [`common_reference_with`](/reference/concepts/common_reference_with.md)`<reference&&, RRef&&>`
  - [`common_reference_with`](/reference/concepts/common_reference_with.md)`<RRef&&, const value&>`


## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `(constructor)` | コンストラクタ | C++23 |
| `(destructor)`  | デストラクタ   | C++23 |
| `operator=`     | 代入演算子     | C++23 |
| [`begin`](generator/begin.md.nolink) | Viewの先頭を指すイテレータを取得する | C++23 |
| [`end`](generator/end.md.nolink) | Viewの番兵を取得する | C++23 |

## メンバ型

| 名前            | 説明        | 対応バージョン |
|-----------------|-------------|-------|
| `yielded`      | `co_yield`式の引数型  | C++23 |
| `promise_type` | コルーチンのPromise型 | C++23 |


## 例
```cpp example
#include <generator>
#include <ranges>
#include <iostream>

// 偶数値列を(無限に)生成するコルーチン
std::generator<int> evens()
{
  int n = 0;
  while (true) {
    co_yield n;
    n += 2;
  }
}

int main()
{
  for (int n : evens() | std::views::take(5)) {
    std::cout << n << std::endl;
  }
}
```
* std::generator[color ff0000]

### 出力
```
0
2
4
6
8
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [`std::ranges::elements_of`](/reference/ranges/elements_of.md)


## 参照
- [P2502R2 `std::generator`: Synchronous Coroutine Generator for Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2502r2.pdf)
