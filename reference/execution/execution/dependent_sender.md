# dependent_sender
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr>
  concept dependent_sender =
    sender<Sndr> && bool_constant<is-dependent-sender-helper<Sndr>()>::value;
}
```
* sender[link sender.md]
* bool_constant[link /reference/type_traits/bool_constant.md]

## 概要
`dependent_sender`は、[Sender型](sender.md)`Sndr`が[非依存Sender](get_completion_signatures.md)か否かを判定するコンセプトである。

説明用の変数テンプレート`is-dependent-sender-helper`を下記の通り定義する。

```cpp
template<class Sndr>
consteval bool is-dependent-sender-helper() try {  // exposition only
  get_completion_signatures<Sndr>();
  return false;
} catch (dependent_sender_error&) {
  return true;
}
```
* get_completion_signatures[link get_completion_signatures.md]
* dependent_sender_error[link dependent_sender_error.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::sender`](sender.md)
- [`execution::get_completion_signatures`](get_completion_signatures.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
