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
この関数は、強制ではない要素数の指定`n`に対して、連続する型`T`のオブジェクトのための未初期化の領域を確保する。


##戻り値
領域へのアドレスを`first`、領域の容量（要素数単位）を`second`とする[`pair`](/reference/utility/pair.md)オブジェクトを返す。容量は`n`より小さいかもしれないし、大きいかもしれない。

`n <= 0`の場合、または領域が全く確保できなかった場合は、`first`をヌルポインタ、`second`を`0`として返す。


##例外
- C++11 : 投げない


##備考
例えば[`stable_sort()`](/reference/algorithm/stable_sort.md) など、アルゴリズムによっては追加のメモリ領域を利用することで計算量を低減できるものがあり、この関数は主にそういったアルゴリズムの実装内で使用される。

この関数は、短期的なメモリ領域のため、たとえば実装が保持している空き領域リストからサイズの照合を省いて領域を返すなど、実装が最適化されている可能性がある。[`std::allocator`](allocator.md)`::`[`allocate()`](allocator/allocate.md)を長期的に使用するメモリとして使用することで、この関数との使い分けができるだろう。

ただし、Visual C++ 12.0、GCC 4.8 (libstdc++)、Clang 3.4 (libc++)は単に[`new`](/reference/new/op_new.md)を呼んでいるだけで、最適化はとくに行っていない。


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  // int型のオブジェクトを3つ構築する想定の領域確保を依頼
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
- [LWG2072 Unclear wording about capacity of temporary buffers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2072)

