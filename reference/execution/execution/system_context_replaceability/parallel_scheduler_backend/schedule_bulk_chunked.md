# schedule_bulk_chunked
* execution[meta header]
* std::execution::system_context_replaceability[meta namespace]
* parallel_scheduler_backend[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
virtual void schedule_bulk_chunked(size_t n,
                                   bulk_item_receiver_proxy& r,
                                   span<byte> s) noexcept = 0;
```
* bulk_item_receiver_proxy[link ../bulk_item_receiver_proxy.md]
* span[link /reference/span/span.md]
* byte[link /reference/cstddef/byte.md]

## 概要
[`parallel_scheduler`](../../parallel_scheduler.md)による[`bulk_chunked`](../../bulk_chunked.md)アルゴリズムカスタマイズのバックエンド側を実装する。


## 事前条件
`*this`、`r`が参照するオブジェクト、`s`が参照するストレージの生存期間終了は、`r`に対する[`set_value`](../../set_value.md)／[`set_error`](../../set_error.md)／[`set_stopped`](../../set_stopped.md)いずれかの呼び出しの評価開始よりも後に発生(happen after)すること。


## 効果
派生クラスでは、この関数を下記のように実装すべきである。

- 下記いずれかの式が評価される
    - エラーが発生せず作業が成功したとき、[`r.set_value()`](../receiver_proxy.md)
    - エラーが発生したとき、`eptr`を[`exception_ptr`](/reference/exception/exception_ptr.md)型のオブジェクトとして、[`r.set_error`](../receiver_proxy.md)`(eptr)`
    - 作業がキャンセルされたとき、[`r.set_stopped()`](../receiver_proxy.md)
- [`r.execute`](../bulk_item_receiver_proxy.md)`(b, e)`が呼ばれたとき、`b`と`e`は範囲`[0, n)`内かつ`b < e`である
- 範囲`[0, n)`の各`i`について、`i`が`[b, e)`の範囲内にある[`r.execute`](../bulk_item_receiver_proxy.md)`(b, e)`の呼び出しが最大で1つだけ存在する。
- `r.set_value()`が呼び出されたとき、`[0, n)`の各`i`に対して、`i`が`[b, e)`の範囲内となる[`r.execute`](../bulk_item_receiver_proxy.md)`(b, e)`の呼び出しが正確に1つだけ存在する。
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
- [`execution::bulk_chunked`](../../bulk_chunked.md)
- [`execution::parallel_scheduler`](../../parallel_scheduler.md)


## 参照
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
- [P3914R0 Assorted NB comment resolutions for Kona 2025](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3914r0.html), US 265-398, 266-399
