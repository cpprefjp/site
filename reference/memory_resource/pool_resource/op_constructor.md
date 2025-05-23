# コンストラクタ
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* pool_resource[meta class]
* cpp17[meta cpp]

```cpp
pool_resource(const pool_options& opts, memory_resource* upstream);  //(1)

pool_resource()
      : pool_resource(pool_options(), get_default_resource()) {}     //(2)

explicit pool_resource(memory_resource* upstream)
      : pool_resource(pool_options(), upstream) {}                   //(3)

explicit pool_resource(const pool_options& opts)
      : pool_resource(opts, get_default_resource()) {}               //(4)

pool_resource(const pool_resource&) = delete;                        //(5)
```
* pool_options[link /reference/memory_resource/pool_options.md]
* get_default_resource()[link /reference/memory_resource/get_default_resource.md]

## 概要

- (1) : [`pool_options`](/reference/memory_resource/pool_options.md)による設定と上流[`memory_resource`](/reference/memory_resource/memory_resource.md)を受けて構築
- (2) : デフォルトコンストラクタ
- (3) : 上流[`memory_resource`](/reference/memory_resource/memory_resource.md)を受けて構築
- (4) : [`pool_options`](/reference/memory_resource/pool_options.md)による設定を受けて構築
- (5) : コピーコンストラクタ、コピー禁止

クラス名を`pool_resource`としているのは説明のためのプレースホルダで、`synchronized_pool_resource`と`unsynchronized_pool_resource`で共通ということである。

## 要件

- (1), (3) : `upstream`は有効な`memory_resource`オブジェクトを指していること。（当然、nullでないこと）

## 引数

- `opts` -- 内部メモリプール設定を指定する`pool_options`オブジェクト
- `upstream` -- 利用したい上流`memory_resource`へのポインタ

## 効果
- (1) : 内部のメモリプールを`opts`設定により調整し、上流メモリリソースとして`upstream`を利用する`pool_resource`を構築する。
- (2) : デフォルト設定を使用し、 [`get_default_resource()`](/reference/memory_resource/get_default_resource.md)から上流メモリリソースを取得して構築。
- (3) : デフォルト設定を使用し、上流メモリリソースとして`upstream`を利用する`pool_resource`を構築する。
- (4) : 内部のメモリプールを`opts`設定により調整し、[`get_default_resource()`](/reference/memory_resource/get_default_resource.md)から上流メモリリソースを取得して構築。

## 例外
`upstream->allocate()`が例外を投げないのならば、すべてのコンストラクタは例外を投げない。  
ただし、これらのコンストラクタが`upstream->allocate()`を呼び出すかどうか、またはどの様な条件の下で`upstream->allocate()`を呼び出すかは未規定。

## 備考
どのコンストラクタの初期化においても、上流`memory_resource`の所有権を保持しない。

実装は必ずしも`opts`の設定を利用しない。

## 例
以下では`synchronized_pool_resource`で書いてあるが、`unsynchronized_pool_resource`も同様。

```cpp example
#include <memory_resource>

int main() {
  //(1) pool_optionsと上流メモリリソースを受けて構築
  {
    std::pmr::synchronized_pool_resource mr{ {1024, 4096}, std::pmr::new_delete_resource() };
  }

  //(2) デフォルト構築
  {
    std::pmr::synchronized_pool_resource mr{};
  }

  //(3) 上流メモリリソースだけを受けて構築
  {
    std::pmr::monotonic_buffer_resource mono_mr{};
    std::pmr::synchronized_pool_resource mr{ &mono_mr };
  }

  //(4) pool_optionsだけを受けて構築
  {
    std::pmr::synchronized_pool_resource mr{ {4096, 4096} };
  }
}
```
* synchronized_pool_resource[color ff0000]
* new_delete_resource[link /reference/memory_resource/new_delete_resource.md]
* monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`pool_options`](/reference/memory_resource/pool_options.md)
- [`memory_resource`](/reference/memory_resource/memory_resource.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
