# query_parallel_scheduler_backend
* execution[meta header]
* function[meta id-type]
* std::execution::system_context_replaceability[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution::system_context_replaceability {
  shared_ptr<parallel_scheduler_backend> query_parallel_scheduler_backend();
}
```
* parallel_scheduler_backend[link parallel_scheduler_backend.md]

## 概要
[並列Scheduler](../parallel_scheduler.md)の実装オブジェクトを返す。


## 効果
オブジェクト`p`は、`p.get()`がその生存期間内に最派生オブジェクト`o`基底クラスの部分オブジェクトである[`parallel_scheduler_backend`](parallel_scheduler_backend.md)オブジェクトを指すものとする。
その存続期間内に`q.`[`owner_equal`](/reference/memory/shared_ptr/owner_equal.md)`(p)`が`true`となる[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクト`q`が存在する限り、`o`の存続期間は終了しない。


## 備考
この関数は置換可能(replaceable)である。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::parallel_scheduler`](../parallel_scheduler.md)
- [`execution::system_context_replaceability::parallel_scheduler_backend`](parallel_scheduler_backend.md)


## 参照
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
- [P3914R0 Assorted NB comment resolutions for Kona 2025](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3914r0.html), US 263-396
