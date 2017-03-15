# max_size
* memory[meta header]
* std[meta namespace]
* allocator_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static size_type max_size(Alloc& a);                // C++11
static size_type max_size(const Alloc& a) noexcept; // C++14
```

## 概要
一度に確保可能なメモリの最大サイズを取得する。


## 戻り値
`a.max_size()`という式が有効ならその戻り値を返し、そうでなければデフォルト実装として[`numeric_limits`](/reference/limits/numeric_limits.md)`<size_type>::`[`max()`](/reference/limits/numeric_limits/max.md)の戻り値を返す。


## 例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::allocator<int> alloc;
  using traits = std::allocator_traits<decltype(alloc)>;

  std::cout << traits::max_size(alloc) << std::endl;
}
```
* max_size[color ff0000]
* std::allocator[link /reference/memory/allocator.md]

### 出力例
```
4611686018427387903
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0

## 参照
- [LWG Issue 2162. `allocator_traits::max_size` missing `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2162)
- [LWG Issue 2284. Inconsistency in `allocator_traits::max_size`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2284)

