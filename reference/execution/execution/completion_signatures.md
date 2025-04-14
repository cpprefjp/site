# completion_signatures
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<completion-signature... Fns>
  struct completion_signatures {};
}
```

## 概要
`completion_signatures`クラステンプレートは、完了シグネチャの集合をテンプレートパラメータとして表現する。


## テンプレートパラメータ制約
`Fns`の各要素`Fn`が、下記の説明専用コンセプト`completion-signature`を満たすこと。

```cpp
template<class Fn>
concept completion-signature = see below;
```
* see below[italic]

型`Fn`が下記いずれかを満たす関数型であるとき、`Fn`はコンセプト`completion-signature`を満たす。
- [`set_value_t`](set_value.md)`(Vs...)`（`Vs`はオブジェクト型または参照型のパック）
- [`set_error_t`](set_error.md)`(Err)`（`Err`はオブジェクト型または参照型）
- [`set_stopped_t`](set_stopped.md)`()`


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  // 下記の完了操作をサポートする
  //   値完了     ex::set_value(int), ex::set_value(int, int)
  //   エラー完了 ex::set_error(std::exception_ptr)
  //   停止完了   ex::set_stopped()
  using Sigs = ex::completion_signatures<
    ex::set_value_t(int),
    ex::set_value_t(int, int),
    ex::set_error_t(std::exception_ptr),
    ex::set_stopped_t()
  >;
}
```
* ex::completion_signatures[color ff0000]
* ex::set_value_t[link set_value.md]
* ex::set_error_t[link set_error.md]
* ex::set_stopped_t[link set_stopped.md]
* std::exception_ptr[link /reference/exception/exception_ptr.md]

### 出力
```
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
- [`execution::receiver`](receiver.md)
- [`execution::set_value_t`](set_value.md)
- [`execution::set_error_t`](set_error.md)
- [`execution::set_stopped_t`](set_stopped.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
