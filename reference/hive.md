# hive
* hive[meta header]
* cpp26[meta cpp]

`<hive>`ヘッダでは、要素のメモリ位置が安定したシーケンスコンテナである[`hive`](hive/hive.md)を提供する。

`hive`は、要素の挿入・削除を定数時間で行いつつ、削除されなかった要素のポインタ・参照・イテレータを無効化しないコンテナである。要素は複数のメモリブロック（要素ブロック）に格納され、削除された要素の位置はスキップされる。挿入位置はコンテナが決定するため、要素の順序は指定できない。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)
- [`<compare>`](compare.md) (C++20)


| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`hive`](hive/hive.md) | 要素のメモリ位置が安定したシーケンスコンテナ (class template) | C++26 |
| [`hive_limits`](hive/hive_limits.md) | 要素ブロックの容量の下限・上限を指定する構造体 (class) | C++26 |
| [`swap`](hive/hive/swap_free.md) | 2つの`hive`オブジェクトを入れ替える (function template) | C++26 |
| [`erase`](hive/hive/erase_free.md) | 指定した値の要素を削除する (function template) | C++26 |
| [`erase_if`](hive/hive/erase_if_free.md) | 条件を満たす要素を削除する (function template) | C++26 |

`std::pmr`名前空間には、以下の型の別名が定義される。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`pmr::hive`](hive/hive.md) | アロケータとして[`pmr::polymorphic_allocator`](memory_resource/polymorphic_allocator.md)を使用する`hive`の別名 (alias template) | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::list`](list.md)
- [`std::deque`](deque.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`<hive>`ヘッダが追加された
