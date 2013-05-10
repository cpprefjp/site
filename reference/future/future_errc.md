#future_errc
```cpp
namespace std {
  enum class future_errc {
    broken_promise,
    future_already_retrieved,
    promise_already_satisfied,
    no_state
  };
}
```

##概要
future操作に関するエラー値。

| | |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 列挙値 | 説明 |
| `broken_primise` | 共有状態の準備ができていない |
| `future_already_retrieved` | すでに[`promise`](./promise.md)オブジェクトから[`future`](./future.md)オブジェクトを取り出している |
| `promise_already_satisfied` | [`promise`](./promise.md)オブジェクトに、すでに値もしくは例外オブジェクトが設定されている |
| `no_state` | [`promise`](./promise.md)オブジェクトが共有状態を持っていない |


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


