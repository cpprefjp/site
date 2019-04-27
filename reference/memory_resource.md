# memory_resource
* memory_resource[meta header]
* cpp17[meta cpp]

`<memory_resource>`ヘッダでは、ポリモルフィックなアロケータ（多相アロケータ、型に依存しないアロケータ）とそれを実装するためのインターフェースを提供する。

## インターフェースとアダプタ

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|[`memory_resource`](memory_resource/memory_resource.md) | アロケータ実装を抽象化するためのインターフェース | C++17 |
|[`polymorphic_allocator`](memory_resource/polymorphic_allocator.md) | `memory_resource`実装をアロケータ要求にアダプトするアダプタ | C++17 |

## 標準`memory_resource`実装

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|[`synchronized_pool_resource`](memory_resource/pool_resource.md) | スレッドセーフなメモリプール | C++17 |
|[`unsynchronized_pool_resource`](memory_resource/pool_resource.md) | スレッドセーフではないメモリプール | C++17 |
|[`monotonic_buffer_resource`](memory_resource/monotonic_buffer_resource.md) | 最後にまとめて領域を解放する`memory_resource` | C++17 |
|[`pool_options`](memory_resource/pool_options.md) | 上記二つの`pool_resource`クラスのブロックサイズ上限設定のためのクラス | C++17 |

## 関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|[`new_delete_resource`](memory_resource/new_delete_resource.md) | グローバルな`operator new`、`operator delete`を利用する`memory_resource`を取得 | C++17 |
|[`null_memory_resource`](memory_resource/null_memory_resource.md) | 確保も開放も行わない`memory_resource`を取得 | C++17 |
|[`set_default_resource`](memory_resource/set_default_resource.md) | 各コンテナでデフォルト使用される`memory_resource`の設定 | C++17 |
|[`get_default_resource`](memory_resource/get_default_resource.md) | 各コンテナでデフォルト使用される`memory_resource`の取得 | C++17 |

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
[`<scoped_allocator>`](scoped_allocator.md)

## 参照
- [C++1z 多相アロケータとメモリプール - Faith and Brave - C++で遊ぼう ](https://faithandbrave.hateblo.jp/entry/2016/08/08/170454)
- [memory_resourceについて - 本の虫](https://cpplover.blogspot.com/2015/09/memoryresource.html)
- [Polymorphic Allocator in C++17 - Qita](https://qiita.com/MitsutakaTakeda/items/48980faa9498c46b15b2)
- [C++17の新機能 アロケータ編 / new features of C++17 - allocator](https://speakerdeck.com/kariyamitsuru/new-features-of-c-plus-plus-17-allocator)
- [Allocators@C++11 - Cryolite](http://www.slideshare.net/Cryolite/allocator11final)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)