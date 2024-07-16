# options
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* pool_resource[meta class]
* cpp17[meta cpp]

```cpp
pool_options options() const;
```
* pool_options[link /reference/memory_resource/pool_options.md]

## 概要
内部のメモリプールの設定を取得する。

## 戻り値
内部のメモリプールを調整している値を保持した[`pool_options`](/reference/memory_resource/pool_options.md)。

返される値はコンストラクタで設定した値と異なる可能性がある。  
ゼロの値は実装定義のデフォルト値に置き換えられて返され、各サイズ指定は指定していない端数を持つ可能性がある（例えば、2の累乗等）。

## 例
以下では`synchronized_pool_resource`で書いてあるが、`unsynchronized_pool_resource`も同様。

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
* synchronized_pool_resource[link /reference/memory_resource/pool_resource.md]

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
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`pool_options`](/reference/memory_resource/pool_options.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
