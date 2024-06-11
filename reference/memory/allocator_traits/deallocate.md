# deallocate
* memory[meta header]
* std[meta namespace]
* allocator_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static void deallocate(Alloc& a, pointer p, size_type n);               // C++17 まで
static constexpr void deallocate(Alloc& a, pointer p, size_type n);     // C++20 から
```

## 概要
メモリを解放する。


## 効果
`a.deallocate(p, n)`


## 例外
投げない


## 例
```cpp example
#include <memory>

int main()
{
  std::allocator<int> alloc;
  using traits = std::allocator_traits<decltype(alloc)>;

  // 10要素のint領域を確保する
  std::size_t n = 10;
  int* p = traits::allocate(alloc, n);

  // 確保したメモリを解放する
  traits::deallocate(alloc, p, n);
}
```
* deallocate[color ff0000]
* traits::allocate[link allocate.md]

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 参照
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
