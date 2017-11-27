# allocate
* memory[meta header]
* std[meta namespace]
* allocator_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static pointer allocate(Alloc& a, size_type n);   // (1)
static pointer allocate(Alloc& a, size_type n,
                        const_void_pointer hint); // (2)
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
* std::allocator[link /reference/memory/allocator.md]
* traits::deallocate[link deallocate.md]

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0
