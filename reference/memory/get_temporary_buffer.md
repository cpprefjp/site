#get_temporary_buffer
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
// C++03
template <class T>
pair<T*, ptrdiff_t> get_temporary_buffer(ptrdiff_t n);

// C++11
template <class T>
pair<T*, ptrdiff_t> get_temporary_buffer(ptrdiff_t n) noexcept;
```
* pair[link /reference/utility/pair.md]
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

##概要
短期的なメモリ領域を確保する。


##効果
この関数は、型`T`のオブジェクトを`n`個格納するのに十分な領域を確保する。


##戻り値
バッファへのアドレスを`first`、確保した要素数を`second`とする[`pair`](/reference/utility/pair.md)オブジェクトを返す。

`n <= 0`の場合は、バッファをヌルポインタ、確保した要素数を`0`として返す。


##例外
- C++11 : 投げない


##備考
アルゴリズムによっては、一時的なメモリ確保を必要とするものがある。

この関数は、短期的なメモリ領域のために実装が最適化している可能性がある。[`std::allocator`](./allocator.md)`::`[`allocate()`](./allocator/allocate.md)を長期的に使用するメモリとして使用することで、この関数との使い分けができるだろう。


ただし、Visual C++ 12.0、GCC 4.8 (libstdc++)、Clang 3.4 (libc++)は単に[`new`](/reference/new/op_new.md)を呼んでいるだけで、最適化はとくに行っていない。



##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  // int型のオブジェクトが3つ入る領域を確保
  std::pair<int*, std::ptrdiff_t> result = std::get_temporary_buffer<int>(3);

  int* p = result.first;
  std::size_t size = static_cast<std::size_t>(result.second);

  std::allocator<int> alloc;
  using traits = std::allocator_traits<std::allocator<int>>;

  // オブジェクトを構築
  for (std::size_t i = 0; i < size; ++i) {
    traits::construct(alloc, p + i);
  }

  // オブジェクトを破棄
  for (std::size_t i = 0; i < size; ++i) {
    traits::destroy(alloc, p + i);
  }

  // 確保した領域を解放
  std::return_temporary_buffer(p);
}
```

###出力
```
```

##参照
- [Why do I need std::get_temporary_buffer? - Stack Overflow](http://stackoverflow.com/questions/3264299/why-do-i-need-stdget-temporary-buffer)

