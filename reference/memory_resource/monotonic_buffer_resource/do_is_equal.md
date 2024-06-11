# do_is_equal
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* monotonic_buffer_resource[meta class]
* cpp17[meta cpp]

```cpp
bool do_is_equal(const memory_resource& other) const noexcept override;
```

## 概要
ある`memory_resource`オブジェクトが`*this`自身であるかを調べる。

## 引数
`other` -- 任意の`memory_resource`オブジェクト

## 戻り値
`return this == &other;`

## 例外
投げない。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`memory_resource`](/reference/memory_resource/memory_resource.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
- [LWG Issue 3000. `monotonic_memory_resource::do_is_equal` uses `dynamic_cast` unnecessarily](https://wg21.cmeerw.net/lwg/issue3000)
