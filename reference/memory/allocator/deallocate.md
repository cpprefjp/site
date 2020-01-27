# deallocate
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]

```cpp
void deallocate(pointer p, size_type n);                // C++17 まで
constexpr void deallocate(pointer p, size_type n);      // C++20 から
```

## 概要
メモリを解放する。


## 要件
`p`は、[`allocate()`](allocate.md)によって確保されたポインタ値であること。`n`は、ア�ケートされた`p`のサイズと同じであること。


## 効果
`p`が指すストレージを解放する。

- C++11まで : 解放には[`::operator delete(void*)`](/reference/new/op_delete.md)を使用するが、この関数がいつ呼び出されるかは未規定。
- C++14から : 解放には[`::operator delete(void*, std::size_t)`](/reference/new/op_delete.md)を使用するが、この関数がいつ呼び出されるかは未規定。


## 例
```cpp example
#include <memory>

int main()
{
  std::allocator<int> alloc;

  // 10要素のint領域を確保する
  std::size_t n = 10;
  int* p = alloc.allocate(n);

  // 確保したメモリを解放する
  alloc.deallocate(p, n);
}
```
* deallocate[color ff0000]
* alloc.allocate[link allocate.md]

### 出力
```
```


## 参照
- [C++14 サイズ付きデア�ケーション](/lang/cpp14/sized_deallocation.md)
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
