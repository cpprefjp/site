# env_of_t
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class T>
  using env_of_t = decltype(get_env(declval<T>()));
}
```
* get_env[link get_env.md]

## 概要
型`T`に関連付けられた[クエリ可能オブジェクト](../queryable.md)の型を取得する。

- [Sender](sender.md)に関連付けられた属性
- [Receiver](receiver.md)に関連付けられた環境


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::get_env`](get_env.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
