# do_is_equal
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* pool_resource[meta class]
* cpp17[meta cpp]

```cpp
bool do_is_equal(const memory_resource& other) const noexcept override;
```

## 概要
ある`memory_resource`オブジェクトが`*this`自身であるかを調べる。

## 引数
`other` -- 任意の`memory_resource`オブジェクト

## 戻り値

- `synchronized_pool_resource`の場合  
`return this == dynamic_cast<const synchronized_pool_resource*>(&other);`

- `unsynchronized_pool_resource`の場合  
`return this == dynamic_cast<const unsynchronized_pool_resource*>(&other);`

## 例外
投げない。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`memory_resource`](/reference/memory_resource/memory_resource.md)