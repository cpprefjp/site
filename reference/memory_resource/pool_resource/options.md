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
#include <memory_resource>

int main() {

  {
    std::pmr::synchronized_pool_resource mr{ {4096, 4096} };
    auto option = mr.options();

    std::cout << option.max_blocks_per_chunk << std::endl;
    std::cout << option.largest_required_pool_block << std::endl;
  }

  //異なる値が返ってくる例
  {
    std::pmr::synchronized_pool_resource mr{ {0, 0} };
    auto option = mr.options();

    std::cout << option.max_blocks_per_chunk << std::endl;
    std::cout << option.largest_required_pool_block << std::endl;
  }
}
```
* options[color ff0000]
* synchronized_pool_resource[link /reference/memory_resource/synchronized_pool_resource.md]

### 出力例（MSVC 2019 Preview2）
```
4096
4096
9223372036854775807
576460752303423488
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