# completion_signatures_of_t
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Env = env<>>
    requires sender_in<Sndr, Env>
  using completion_signatures_of_t = call-result-t<get_completion_signatures_t, Sndr, Env>;
}
```
* env<>[link env.md]
* sender_in[link sender_in.md]
* call-result-t[link /reference/functional/call-result-t.md]
* get_completion_signatures_t[link get_completion_signatures.md]

## 概要
[Sender型](sender.md)`Sndr`から[環境](../queryable.md)`Env`における[完了シグネチャ集合](completion_signatures.md)を取得する。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::get_completion_signatures`](get_completion_signatures.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
