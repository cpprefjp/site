# return_temporary_buffer
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
template <class T>
void return_temporary_buffer(T* p);
```

## 概要
[`get_temporary_buffer()`](get_temporary_buffer.md)関数で確保したメモリ領域を解放する。


## 要件
`p`が、先行する[`get_temporary_buffer()`](get_temporary_buffer.md)の呼び出しで返され、その後`return_temporary_buffer(T*)`の呼び出しで無効化されていない値であること。


## 効果
ポインタ`p`が指す領域を解放する。


## 戻り値
なし


## 例外
- 投げない


## 例
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
* std::return_temporary_buffer[color ff0000]
* std::get_temporary_buffer[link get_temporary_buffer.md]
* std::ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]
* std::allocator[link allocator.md]
* std::allocator_traits[link allocator_traits.md]
* traits::construct[link allocator_traits/construct.md]
* traits::destroy[link allocator_traits/destroy.md]

### 出力
```
```

## 参照
- [Why do I need std::get_temporary_buffer? - Stack Overflow](http://stackoverflow.com/questions/3264299/why-do-i-need-stdget-temporary-buffer)
- [LWG2072 Unclear wording about capacity of temporary buffers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2072)
  [`get_temporary_buffer()`](get_temporary_buffer.md)の容量についての規定と併せて、二重解放が未定義動作になること、例外を投げないこと（いずれもC++14まで暗黙的に期待されていたこと）が明確化されている。

