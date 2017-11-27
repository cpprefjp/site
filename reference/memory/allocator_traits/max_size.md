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
`a.max_size()`という式が有効ならその戻り値を返し、そうでなければデフォルト実装として以下を返す：

```cpp
std::numeric_limits<value_type>::max() / sizeof(value_type)
```
* max()[link /reference/limits/numeric_limits/max.md]


## 例
```cpp example
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
- [LWG Issue 2162. `allocator_traits::max_size` missing `noexcept`](https://wg21.cmeerw.net/lwg/issue2162)
- [LWG Issue 2284. Inconsistency in `allocator_traits::max_size`](https://wg21.cmeerw.net/lwg/issue2284)
- [LWG Issue 2466. `allocator_traits::max_size()` default behavior is incorrect](https://wg21.cmeerw.net/lwg/issue2466)
