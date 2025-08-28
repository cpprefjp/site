# schedule
* execution[meta header]
* std::execution::system_context_replaceability[meta namespace]
* parallel_scheduler_backend[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
virtual void schedule(receiver_proxy& r, span<byte> s) noexcept = 0;
```
* receiver_proxy[link ../receiver_proxy.md.nolink]
* byte[link /reference/cstddef/byte.md]

## 概要
[`parallel_scheduler`](../../parallel_scheduler.md)による[`schedule`](../../schedule.md)アルゴリズムカスタマイズのバックエンド側を実装する。


## 事前条件
`*this`, `r`が参照するオブジェクト, `s`が参照するストレージの生存期間終了は、下記いずれか式の評価開始よりも後に発生(happen after)すること。


## 効果
派生クラスでは、この関数を下記のように実装すべきである。

- 下記いずれかの式が評価される
    - エラーが発生せず作業が成功したとき、`r.set_value()`
    - エラーが発生したとき、`eptr`を[`exception_ptr`](/reference/exception/exception_ptr.md)型のオブジェクトとして、`r.set_error(eptr)`
    - 作業がキャンセルされたとき、`r.set_stopped()`
- 任意の`r.set_value()`呼び出しは、`*this`で表される実行コンテキストの実行エージェント上で発生する。


## 備考
`s`が参照するストレージは、この呼び出しによって開始された操作の実行期間中`*this`によって一時的なストレージとして使用される可能性がある。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::schedule`](../../schedule.md)
- [`execution::parallel_scheduler`](../../parallel_scheduler.md)


## 参照
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
