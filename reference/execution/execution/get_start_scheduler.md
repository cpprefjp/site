# get_start_scheduler
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct get_start_scheduler { unspecified };
  inline constexpr get_start_scheduler_t get_start_scheduler{};
}
```
* unspecified[italic]

## 概要
`get_start_scheduler`は、操作を[開始(start)](start.md)予定もしくは開始された[Scheduler](scheduler.md)を取得する[クエリオブジェクト](../queryable.md)である。

コア定数式[`forwarding_query`](../forwarding_query.md)`(get_start_scheduler)`は`true`値を返す。


## 効果
部分式`env`に対して、呼び出し式`get_start_scheduler(env)`は[`MANDATE-NOTHROW`](MANDATE-NOTHROW.md)`(`[`AS-CONST`](AS-CONST.md)`(env).query(get_start_scheduler))`と等価な式。

上記の式が適格なとき、その型は[`scheduler`](scheduler.md)を満たすこと。


## 例外
投げない


## カスタマイゼーションポイント
const修飾[クエリ可能オブジェクト](../queryable.md)`cenv`に対して式`cenv.query(get_start_scheduler)`が呼び出される。
このとき、`noexcept(cenv.query(get_start_scheduler)) == true`であること。

[`sender_to`](sender_to.md)`<decltype((sndr)), decltype((rcvr))>`が`true`かつ式`get_start_scheduler(`[`get_env`](get_env.md)`(rcvr))`が適格となる式`sndr`と`rcvr`に対して、[`connect`](connect.md)`(sndr, rcvr)`の呼び出し結果である[Operation State](operation_state.md)が[開始(start)](start.md)される場合、[Scheduler](scheduler.md)`get_start_scheduler(`[`get_env`](get_env.md)`(rcvr))`に関連付けられた実行エージェント上で開始されなければならない。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::scheduler`](scheduler.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
