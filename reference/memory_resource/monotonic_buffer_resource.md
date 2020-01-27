# monotonic_buffer_resource
* memory_resource[meta header]
* class[meta id-type]
* std::pmr[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  class monotonic_buffer_resource;
}
```


## 概要
`monotonic_buffer_resource`はオブジェクトの破棄時にのみ管理しているメモリを全て開放する特殊な [`memory_resource`](memory_resource.md)実装である。  
少数のオブジェクトを多数構築するために割り当てを行い、最後にまとめて開放するといった状況において高速なメモリ割り当てを行うことを目的としている。

このクラスはスレッドセーフではない。

## `monotonic_buffer_resource`の性質

- `deallocate`（[`do_deallocate`](monotonic_buffer_resource/do_deallocate.md)）は何も行わない、そのためオブジェクトの破棄までメモリ使用量は単調増加する。
- 外部で確保された領域を初期メモリ領域として�定可能
- 上流メモリリソースを指定可能
- 初期メモリが無いか使い果たされると、上流メモリリソースから補充する。
- 補充されるメモリ領域サイズは以前の領域サイズよりも大きくなり、そのサイズは�比数列に従って（補充の度に）増加する。
- 単一スレッドからアクセスされることを前提としており、`allocate`と`deallocate`は互いに非同期である。
- 管理メモリの解放時は`deallocate`が呼び出されていない領域があっても全てのメモリを解放する。

## メンバ関数

### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](monotonic_buffer_resource/op_constructor.md) | コンストラクタ | C++17 |
| [`(destructor)`](monotonic_buffer_resource/op_destructor.md)  | デストラクタ   | C++17 |
| `operator=(const monotonic_buffer_resource&) = delete;`     | コピー代入演算�（コピー禁�）     | C++17 |

### メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`release`](monotonic_buffer_resource/release.md) | 管理�の全てのメモリを解放する | C++17 |
| [`upstream_resource`](monotonic_buffer_resource/upstream_resource.md) | 利用している上流`memory_resource`を取得する | C++17 |

### 非仮想インターフェース（NVI）

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`allocate`](memory_resource/allocate.md) | メモリを確保する | C++17 |
| [`deallocate`](memory_resource/deallocate.md) | メモリを解放する | C++17 |
| [`is_equal`](memory_resource/is_equal.md) | オブジェクトを超えてメモリ領域の解放を行えるかを調べる | C++17 |

### protected オーバーライド関数（`memory_resource`実装）
| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`do_allocate`](monotonic_buffer_resource/do_allocate.md) | メモリを確保する | C++17 |
| [`do_deallocate`](monotonic_buffer_resource/do_deallocate.md) | メモリを解放する | C++17 |
| [`do_is_equal`](monotonic_buffer_resource/do_is_equal.md) | オブジェクトを超えてメモリ領域の解放を行えるかを調べる | C++17 |

## 非メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator==`](memory_resource/op_equal.md) | �値比較 | C++17 |
| [`operator!=`](memory_resource/op_not_equal.md) | 非�値比較 | C++17 |

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`memory_resource`](memory_resource.md)
- [`pool_resource`](pool_resource.md)


## 参照
- [C++1z 多相ア�ケータとメモリプール - Faith and Brave - C++で遊ぼう ](https://faithandbrave.hateblo.jp/entry/2016/08/08/170454)
- [memory_resourceについて - 本の虫](https://cpplover.blogspot.com/2015/09/memoryresource.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
