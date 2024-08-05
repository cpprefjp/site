# allocation_result
* memory[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Pointer>
  struct allocation_result {
    Pointer ptr;
    std::size_t count;
  };
}
```

## 概要
`std::allocation_result`は、[`std::allocate_at_least()`](allocate_at_least.md)関数の戻り値型であり、以下の要素をもつ：

| 変数名  | 説明 |
|---------|------|
| `ptr`   | 確保されたメモリの先頭を指すポインタ |
| `count` | 実際に確保された要素数 |


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10 [mark noimpl]


## 関連項目
- [`std::allocate_at_least()`](allocate_at_least.md)
- [`std::allocator`](allocator.md)`::`[`allocate_at_least()`](allocator/allocate_at_least.md)


## 参照
- [P0401R6 Providing size feedback in the Allocator interface](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0401r6.html)
