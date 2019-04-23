# options
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* pool_resource[meta class]
* cpp17[meta cpp]

```cpp
pool_options options() const;
```

## 概要
内部のメモリプールの設定を取得する。

## 戻り値
内部のメモリプールを調整している値を保持した[`pool_options`](/reference/memory_resource/pool_options.md)。

返される値はコンストラクタで設定した値と異なる可能性がある。  
ゼロの値は実装定義のデフォルト値に置き換えられて返され、各サイズ指定は指定していない端数を持つ可能性がある（例えば、2のべき乗等）。

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
- [`pool_options`](/reference/memory_resource/pool_options.md)