# allocate_at_least
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  [[nodiscard]] constexpr allocation_result<T*>
    allocate_at_least(size_t n); // (1) C++23
}
```
* allocation_result[link /reference/memory/allocation_result.md]

## 概要
指定した要素数以上のメモリを確保する。

多くのメモリアロケータはメモリ確保時に指定されたサイズちょうどではなく、少し大きなサイズを確保する。この関数は、確保されたメモリへのポインタに加えて、実際に確保されたメモリサイズを取得できる。


## 適格要件
- 型`T`が不完全型ではないこと


## 戻り値
確保された配列の先頭要素へのポインタを`ptr`、`n`以上である実際に確保された要素数を`count`として、

```cpp
return allocation_result<T*>{ptr, count};
```
* allocation_result[link /reference/memory/allocation_result.md]


## 例外
- [`std::numeric_limits`](/reference/limits/numeric_limits.md)`<`[`std::size_t`](/reference/cstddef/size_t.md)`>::`[`max()`](/reference/limits/numeric_limits/max.md) `/ sizeof(T) < n`である場合、[`std::bad_array_new_length`](/reference/new/bad_array_new_length.md)を送出する
- メモリを確保できなかった場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)を送出する


## 備考
- 配列のメモリは`::operator new`を呼び出すことで確保できるが、その関数がいつ・どれくらいの頻度で呼び出されるかは未規定
- この関数は配列オブジェクトの生存期間を開始するが、配列要素の生存期間は開始しない


## 例
```cpp example
#include <iostream>
#include <memory>

int main() {
  std::allocator<int> alloc;

  std::allocation_result<int*> r = alloc.allocate_at_least(3);
  std::cout << "allocation count:" << r.count
            << " bytes:" << sizeof(int) * r.count
            << std::endl;

  alloc.deallocate(r.ptr, r.count);
}
```
* alloc.allocate_at_least[color ff0000]
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
- [`std::allocator_traits`](/reference/memory/allocator_traits.md)`::`[`allocate_at_least()`](/reference/memory/allocator_traits/allocate_at_least.md)


## 参照
- [P0401R6 Providing size feedback in the Allocator interface](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0401r6.html)
