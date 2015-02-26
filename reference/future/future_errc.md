#future_errc (C++11)
* future[meta header]
* std[meta namespace]
* enum[meta id-type]

```cpp
namespace std {
  // C++11
  enum class future_errc {
    broken_promise,
    future_already_retrieved,
    promise_already_satisfied,
    no_state
  };

  // C++14
  enum class future_errc {
    broken_promise = implementation-defined,
    future_already_retrieved = implementation-defined,
    promise_already_satisfied = implementation-defined,
    no_state = implementation-defined
  };
}
```
* implementation-defined[italic]

##概要
future操作に関するエラー値。

| 列挙値 | 説明 | 対応バージョン |
|-----------------------------|----------------------------|-------|
| `broken_primise`            | 共有状態の準備ができていない | C++11 |
| `future_already_retrieved`  | すでに[`promise`](./promise.md)オブジェクトから[`future`](./future.md)オブジェクトを取り出している | C++11 |
| `promise_already_satisfied` | [`promise`](./promise.md)オブジェクトに、すでに値もしくは例外オブジェクトが設定されている | C++11 |
| `no_state`                  | [`promise`](./promise.md)オブジェクトが共有状態を持っていない | C++11 |

それぞれの値は、非ゼロである(C++14以降)。

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照
- [LWG2056 - future_errc enums start with value 0 (invalid value for broken_promise)](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2056)
    - C++11の`future_errc`は、開始値が0だった。[`error_code`](/reference/system_error/error_code.md)クラスの[`operator bool()`](/reference/system_error/error_code/op_bool.md)が0を正常値と見なしてしまうため、C++14では`future_errc`の値を実装定義とした。

