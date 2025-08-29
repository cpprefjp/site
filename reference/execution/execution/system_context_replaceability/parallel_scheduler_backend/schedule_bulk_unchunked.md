# schedule_bulk_unchunked
* execution[meta header]
* std::execution::system_context_replaceability[meta namespace]
* parallel_scheduler_backend[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
virtual void schedule_bulk_unchunked(size_t n,
                                     bulk_item_receiver_proxy& r,
                                     span<byte> s) noexcept = 0;
```
* bulk_item_receiver_proxy[link ../bulk_item_receiver_proxy.md]
* span[link /reference/span/span.md]
* byte[link /reference/cstddef/byte.md]

## 概要
[`parallel_scheduler`](../../parallel_scheduler.md)による[`bulk_unchunked`](../../bulk_unchunked.md)アルゴリズムカスタマイズのバックエンド側を実装する。


## 事前条件
`*this`, `r`が参照するオブジェクト, `s`が参照するストレージの生存期間終了は、下記いずれか式の評価開始よりも後に発生(happen after)すること。


## 効果
派生クラスでは、この関数を下記のように実装すべきである。

- 下記いずれかの式が評価される
    - エラーが発生せず作業が成功したとき、[`r.set_value()`](../receiver_proxy.md)
    - エラーが発生したとき、`eptr`を[`exception_ptr`](/reference/exception/exception_ptr.md)型のオブジェクトとして、[`r.set_error`](../receiver_proxy.md)`(eptr)`
    - 作業がキャンセルされたとき、[`r.set_stopped()`](../receiver_proxy.md)
- [`r.execute`](../bulk_item_receiver_proxy.md)`(b, e)`が呼ばれたとき、`b`は範囲`[0, n)`内かつ`e`は`b + 1`に等しい。`[0, n)`の各`i`について、[`r.execute`](../bulk_item_receiver_proxy.md)`(i, i + 1)`の呼び出しが最大で1つだけ存在する。
- `r.set_value()`が呼び出されたとき、`[0, n)`の各`i`に対して、[`r.execute`](../bulk_item_receiver_proxy.md)`(i, i + 1)`の呼び出しが正確に1つだけ存在する。
- `r`上での全ての`execute`呼び出しは、`r`上での`set_value`／`set_error`／`set_stopped`いずれかの呼び出しよりも前に発生する。
- `r`上での全ての`execute`および`set_value`呼び出しは、`*this`で表される実行コンテキストの実行エージェント上で行われる。


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
- [`execution::bulk_unchunked`](../../bulk_unchunked.md)
- [`execution::parallel_scheduler`](../../parallel_scheduler.md)


## 参照
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
