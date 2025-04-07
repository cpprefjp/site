# 推論補助
* stop_token[meta header]
* std[meta namespace]
* inplace_stop_callback[meta class]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class CallbackFn>
  inplace_stop_callback(inplace_stop_token, CallbackFn) -> inplace_stop_callback<CallbackFn>;
}
```
* inplace_stop_token[link ../inplace_stop_token.md]

## 概要
[`inplace_stop_callback`](../inplace_stop_callback.md)クラステンプレートの型推論補助。

## 例
```cpp example
#include <stop_token>
#include <type_traits>

struct X {
  void operator()() {}
};

int main()
{
  X x;
  std::inplace_stop_token st;
  std::inplace_stop_callback cb { st, x };

  static_assert(std::is_same_v<decltype(cb)::callback_type, X>);
}
```
* std::inplace_stop_token[link ../inplace_stop_token.md]
* std::inplace_stop_callback[link ../inplace_stop_callback.md]

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
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)

## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
