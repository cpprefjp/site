# allocate_at_least
* memory[meta header]
* std[meta namespace]
* allocator_traits[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
[[nodiscard]
static constexpr
allocation_result<pointer, size_type>
  allocate_at_least(Alloc& a, size_type n); // (1) C++23
static constexpr
allocation_result<pointer, size_type>
  allocate_at_least(Alloc& a, size_type n); // (1) C++26
```
* allocation_result[link /reference/memory/allocation_result.md]

## 概要
指定した要素数以上のメモリを確保する。

多くのメモリアロケータはメモリ確保時に指定されたサイズちょうどではなく、少し大きなサイズを確保する。この関数は、確保されたメモリへのポインタに加えて、実際に確保されたメモリサイズを取得できる。


## 戻り値
式`a.allocate_at_least(n)`が妥当である場合、それを呼び出して返す。そうでなければ、`{a.allocate(n), n}`を返す。


## 例
```cpp example
#include <iostream>
#include <memory>

int main() {
  std::allocator<int> alloc;
  using traits = std::allocator_traits<std::allocator<int>>;

  std::allocation_result<int*> r = traits::allocate_at_least(alloc, 3);
  std::cout << "allocation count:" << r.count
            << " bytes:" << sizeof(int) * r.count
            << std::endl;

  alloc.deallocate(r.ptr, r.count);
}
```
* allocate_at_least[color ff0000]
* std::allocator[link /reference/memory/allocator.md]
* std::allocation_result[link /reference/memory/allocation_result.md]
* alloc.deallocate[link /reference/memory/allocator/deallocate.md]

### 出力例
```
allocation count:4 bytes:16
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10 [mark noimpl]


## 関連項目
- [`std::allocation_result`](/reference/memory/allocation_result.md)
- [`std::allocator`](/reference/memory/allocator.md)`::`[`allocate_at_least()`](/reference/memory/allocator/allocate_at_least.md)


## 参照
- [P0401R6 Providing size feedback in the Allocator interface](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0401r6.html)
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
