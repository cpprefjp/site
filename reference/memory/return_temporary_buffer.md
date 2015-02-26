#return_temporary_buffer
* memory[meta header]

```cpp
template <class T>
void return_temporary_buffer(T* p);
```

##概要
[`get_temporary_buffer()`](./get_temporary_buffer.md)関数で確保したメモリを解放する。


##要件
ポインタ`p`が指すバッファが、[`get_temporary_buffer()`](./get_temporary_buffer.md)関数で確保されたものであること。


##効果
ポインタ`p`が指すバッファを解放する。


##戻り値
なし


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

