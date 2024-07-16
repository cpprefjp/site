# generator::promise_type
* generator[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class Ref, class V, class Allocator>
  class generator<Ref, V, Allocator>::promise_type {
    ...
  };
}
```
* generator[link ../generator.md]


## 概要
ジェネレータコルーチン動作を制御する[Promise型](/lang/cpp20/coroutines.md)。
プログラマが本クラスを直接利用することは想定されていない。


`generator::promise_type`クラスの動作説明のため、以下の説明専用メンバを用いる。

- `value_` : [`add_pointer_t`](/reference/type_traits/add_pointer.md)`<`[`yielded`](../generator.md)`>`型の生成値 
- `except_` : [`exception_ptr`](/reference/exception/exception_ptr.md)型の例外ポインタ


## メンバ関数
### コルーチン

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`get_return_object`](promise_type/get_return_object.md) | [`generator`](../generator.md)戻り値の取得 | C++23 |
| [`initial_suspend`](promise_type/initial_suspend.md) | 初期サスペンドポイント動作の制御 | C++23 |
| [`final_suspend`](promise_type/final_suspend.md) | 最終サスペンドポイント動作の制御 | C++23 |
| [`yield_value`](promise_type/yield_value.md) | co_yield式動作の制御 | C++23 |
| [`await_transform`](promise_type/await_transform.md) | co_await式動作の制御 | C++23 |
| [`return_void`](promise_type/return_void.md) | コルーチンreturn動作の制御 | C++23 |
| [`unhandled_exception`](promise_type/unhandled_exception.md) | 未処理例外の制御 | C++23 |
| [`operator new`](promise_type/op_new.md) | new演算子オーバーロード | C++23 |
| [`operator delete`](promise_type/op_delete.md) | delete演算子オーバーロード | C++23 |


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
