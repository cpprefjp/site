# pool_options
* memory_resource[meta header]
* class[meta id-type]
* std::pmr[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  struct pool_options {
    std::size_t max_blocks_per_chunk = 0;
    std::size_t largest_required_pool_block = 0;
  };
}
```

## 概要
このクラスは[`synchronized_pool_resource`](pool_resource.md)及び[`unsynchronized_pool_resource`](pool_resource.md)のコンストラクタに渡し、その内部メモリプールの設定を行うためのクラスである。

## メンバ変数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `max_blocks_per_chunk` | メモリプールを補充する際に上流`memory_resource`から1度に取得するブロックサイズの最大値。<br/>すなわち、サイズ毎のプール内の1チャンク辺りの最大ブロック数。<br/>各メモリプールを補充する際はチャンク単位で補充されチャンクサイズはそのたびに増加するが、この値よりは大きくならない。 | C++17 |
| `largest_required_pool_block` | 各メモリプールの最も大きなブロックのサイズ。<br/>この値より大きなメモリの割り当て要求は上流の`memory_resource`から直接割り当てられる。 | C++17 |

両変数共に、設定値が0もしくは実装定義の最大値を上回る場合は実装定義の最大値が利用される。  
また、それが各[`pool_resource`](pool_resource.md)のデフォルト設定となる。

## 備考

処理系は指定された値を必ずしも利用しない可能性がある。  
すなわち、`max_blocks_per_chunk`よりも小さい値を利用するかもしれず、プール毎に異なった値を利用するかもしれないし、`largest_required_pool_block`よりも大きな最大プールサイズを選択するかもしれない。

## バージョン
### 言語
- C++17

### 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目

- [`synchronized_pool_resource`](pool_resource.md)
- [`unsynchronized_pool_resource`](pool_resource.md)

## 参照

- [C++1z 多相アロケータとメモリプール - Faith and Brave - C++で遊ぼう ](https://faithandbrave.hateblo.jp/entry/2016/08/08/170454)
- [memory_resourceについて - 本の虫](https://cpplover.blogspot.com/2015/09/memoryresource.html)
- [Polymorphic Allocator in C++17 - Qita](https://qiita.com/MitsutakaTakeda/items/48980faa9498c46b15b2)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
