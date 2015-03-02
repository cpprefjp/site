#deallocate
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]

```cpp
void deallocate(pointer p, size_type n);
```

##概要
メモリを解放する。


##要件
`p`は、[`allocate()`](./allocate.md)によって確保されたポインタ値であること。`n`は、アロケートされた`p`のサイズと同じであること。


##効果
`p`が指すストレージを解放する。

解放には[`::operator delete(void*)`](/reference/new/op_delete.md)を使用するが、この関数がいつ呼び出されるかは未規定。


##例
```cpp
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

###出力
```
```


