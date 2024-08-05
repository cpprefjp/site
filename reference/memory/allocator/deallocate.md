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


## 事前条件
- C++20まで
    - `p`は、[`allocate()`](allocate.md)によって確保されたポインタ値であること。`n`は、アロケートされた`p`のサイズと同じであること
- C++23以降
    - `p`が[`allocate_at_least()`](allocate_at_least.md)によって確保されたポインタ値である場合、[`allocate_at_least()`](allocate_at_least.md)の戻り値を`ret`、その呼び出しで要求されたサイズを`req`として、
        - `p`は`ret.ptr`と等しいこと
        - `n`は`req <= n <= ret.count`となる値であること
    - そうでなければ、`p`は、[`allocate()`](allocate.md)によって確保されたポインタ値であること。`n`は、アロケートされた`p`のサイズと同じであること


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
- [C++14 サイズ付きデアロケーション](/lang/cpp14/sized_deallocation.md)
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
- [P0401R6 Providing size feedback in the Allocator interface](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0401r6.html)
    - C++23で`allocate_at_least()`関数が導入されたことにより、この関数の事前条件として、渡される値にその関数の戻り値であることも考慮された
