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

## 概要

- (1) : `pool_options`による設定と上流[`memory_resource`](/reference/memory_resource/memory_resource.md)を受けて構築
- (2) : デフォルトコンストラクタ
- (3) : 上流[`memory_resource`](/reference/memory_resource/memory_resource.md)を受けて構築
- (4) : `pool_options`による設定を受けて構築
- (5) : コピーコンストラクタ、コピー禁止

クラス名を`pool_resource`としているのは説明のためのプレースホルダで、`synchronized_pool_resource`と`unsynchronized_pool_resource`で共通ということである。

## 要件

- (2) : `upstream`は有効な`memory_resource`オブジェクトを指していること。（当然、nullでないこと）

## 引数

- `opts` -- 内部メモリプール設定を指定する`pool_options`オブジェクト
- `upstream` -- 利用したい上流`memory_resource`へのポインタ

## 効果

- (1) : [`get_default_resource()`](/reference/memory_resource/get_default_resource.md)からデフォルトの`memory_resource`を取得して構築
- (2) : `r`を`memory_resource`として構築
- (3)(4) : [`other.resource()`](resource.md)から`memory_resource`を取得して構築

## 例外
- (1)(4) : 投げない

## 備考
どのコンストラクタの初期化においても、上流`memory_resource`の所有権を保持しない。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>

```
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]

### 出力
```
equal
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`pool_options`](pool_options.md)
- [`memory_resource`](memory_resource/memory_resource.md)