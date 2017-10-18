# return_temporary_buffer
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17deprecated[meta cpp]

```cpp
template <class T>
void return_temporary_buffer(T* p);
```

この機能は、C++17から非推奨となった。短期的な用途のメモリ領域確保には、[`alloca()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/alloca.3.html)のようなスタックからメモリを確保するなど、他の機能を使用すること。


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


## 非推奨の詳細
`std::get_temporary_buffer()`関数と[`std::return_temporary_buffer()`](return_temporary_buffer.md)関数は、関数内での一時的なメモリ確保のために、最適化されたメモリ確保の仕組みを提供することを期待して定義されたが、実際にはどの実装も特別なメモリ確保を行わず、そのために使われてこなかった。

将来的にスタックからメモリ確保をする仕組みが検討されているが、これらの関数は設計として例外安全性やRAIIといったものが考慮されていない。スタックからメモリ確保する機能が入ったとしても、これらの関数の内部を改善することはできないと判断され、非推奨となった。

スタックからメモリ確保する機能は、現在の標準ライブラリにはない。そのため、代わりとしては、配置new構文や、標準外の[`alloca()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/alloca.3.html)関数のような機能を使用すること。


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
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
