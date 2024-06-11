# pool_resource
* memory_resource[meta header]
* class[meta id-type]
* std::pmr[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  class synchronized_pool_resource;
  class unsynchronized_pool_resource;
}
```

## 概要
`pool_resource`は幾つかのブロックサイズ毎のメモリプールを管理し、要求サイズ毎に最適なプールからメモリを割り当てる[`memory_resource`](memory_resource.md)実装である。  
メモリ割り当て要求に内部のメモリプールから応えられない場合（最大のブロックサイズを超える要求があった場合）は、上流のメモリリソースからメモリを割り当てる。ほとんどの場合、上流メモリリソースへの割り当て要求は内部プールへの割り当て要求よりも少ない。

以下2つの`pool_resource`が提供される。

| `pool_resource`クラス名            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `synchronized_pool_resource` | スレッドセーフな`pool_resource` |     C++17      |
| `unsynchronized_pool_resource`  | スレッドセーフでない`pool_resource`   |     C++17      |

`synchronized_pool_resource`は外部同期機構無しで複数のスレッドからスレッドセーフにアクセスできる。  
実装によっては同期コストの削減のためにスレッド毎にメモリプールを持つ可能性がある。

`unsynchronized_pool_resource`は複数スレッドからアクセスした際にスレッドセーフ性が保証されないが、シングルスレッドで使用する場合に同期のためのオーバーヘッドを避けることができる。

## `pool_resource`の性質

- 内部管理メモリ領域は様々なブロックサイズのメモリプールに分かれている。
- それぞれのブロックサイズ毎のメモリプールは幾つかのチャンクの集まりであり、各チャンクは均一なサイズ（ブロックサイズ）のブロックに順番に分割されている。
- `do_allocate`によって返されるメモリはブロック単位で割り当てられる。
- `do_allocate(bytes, alignment)`は、`bytes`以上で最小のブロックサイズのプールからメモリを割り当てる。
    - `bytes`が最大ブロックサイズを超える場合、上流メモリリソースから直接割り当てられる。
- あるプールが枯渇した場合、次の`do_allocate`時に上流メモリリソースからチャンク単位でプールを補充する。
    - 補充の度に補充されるチャンクサイズは等比数列に従って増加する（上限有）。
    - 一定のチャンク毎に補充を行うことで連続した割り当てにおける参照局所性を高める狙いがある。
- 最大チャンクサイズ及び最大ブロックサイズは[`pool_options`](pool_options.md)構造体をコンストラクタに渡して調整可能。
    - `max_blocks_per_chunk` : チャンクサイズの上限値、この値よりは大きくならない
    - `largest_required_pool_block` : ブロックサイズの最大値、この値を超える割り当て要求は上流メモリリソースから直接割り当てる
- 管理メモリの解放時は`deallocate`が呼び出されていない領域があっても全てのメモリを解放する。

## メンバ関数

### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](pool_resource/op_constructor.md) | コンストラクタ | C++17 |
| [`(destructor)`](pool_resource/op_destructor.md)  | デストラクタ   | C++17 |
| `operator=(const pool_resource&) = delete;`     | コピー代入演算子（コピー禁止）     | C++17 |

クラス名を`pool_resource`としているのは説明のためのプレースホルダで、`synchronized_pool_resource`と`unsynchronized_pool_resource`で共通ということである。

### 共通メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`release`](pool_resource/release.md) | 割り当てられている全てのメモリを解放する | C++17 |
| [`upstream_resource`](pool_resource/upstream_resource.md) | 利用している上流`memory_resource`を取得する | C++17 |
| [`options`](pool_resource/options.md) | 適用されているプール設定を`pool_options`として取得する | C++17 |

### 非仮想インターフェース（NVI）

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`allocate`](memory_resource/allocate.md) | メモリを確保する | C++17 |
| [`deallocate`](memory_resource/deallocate.md) | メモリを解放する | C++17 |
| [`is_equal`](memory_resource/is_equal.md) | オブジェクトを超えてメモリ領域の解放を行えるかを調べる | C++17 |

### protected オーバーライド関数
| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`do_allocate`](pool_resource/do_allocate.md) | メモリを確保する | C++17 |
| [`do_deallocate`](pool_resource/do_deallocate.md) | メモリを解放する | C++17 |
| [`do_is_equal`](pool_resource/do_is_equal.md) | オブジェクトを超えてメモリ領域の解放を行えるかを調べる | C++17 |

## 非メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator==`](memory_resource/op_equal.md) | 等値比較 | C++17 |
| [`operator!=`](memory_resource/op_not_equal.md) | 非等値比較 | C++17 |

## `synchronized_pool_resource`の処理系毎の実装

### MSVC 2017, 2019
`unsynchronized_pool_resource`を継承し、アクセスを[`mutex`](/reference/mutex/mutex.md)で同期させている。  
スレッド毎にプールを持たない。

### GCC 9.1
スレッド毎にプールを持ち、各プールはリンクリストで管理されている。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`pool_options`](pool_options.md)
- [`memory_resource`](memory_resource.md)


## 参照
- [C++1z 多相アロケータとメモリプール - Faith and Brave - C++で遊ぼう ](https://faithandbrave.hateblo.jp/entry/2016/08/08/170454)
- [memory_resourceについて - 本の虫](https://cpplover.blogspot.com/2015/09/memoryresource.html)
- [Polymorphic Allocator in C++17 - Qita](https://qiita.com/MitsutakaTakeda/items/48980faa9498c46b15b2)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
