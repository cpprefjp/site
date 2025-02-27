# allocate
* memory[meta header]
* std[meta namespace]
* allocator_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static pointer
  allocate(Alloc& a, size_type n);     // (1) C++11
[[nodiscard]]
static constexpr pointer
  allocate(Alloc& a, size_type n);     // (1) C++20
static constexpr pointer
  allocate(Alloc& a, size_type n);     // (1) C++26

static pointer
  allocate(Alloc& a, size_type n,
           const_void_pointer hint);   // (2) C++11
[[nodiscard]]
static constexpr pointer
  allocate(Alloc& a, size_type n,
           const_void_pointer hint);   // (2) C++20
static constexpr pointer
  allocate(Alloc& a, size_type n,
           const_void_pointer hint);   // (2) C++26
```

## 概要
メモリを確保する。


## 戻り値
- (1) : `a.allocate(n)`
- (2) : `a.allocate(n, hint)`という式が有効であればそれを呼び出し、そうでなければ`a.allocate(n)`を呼び出す。


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
* allocate[color ff0000]
* traits::deallocate[link deallocate.md]

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
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
    - C++20で`constexpr`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
