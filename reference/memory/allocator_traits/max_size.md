#max_size (C++11)
```cpp
static size_type max_size(Alloc& a);          // C++11
static size_type max_size(Alloc& a) noexcept; // C++14
```

##概要
一度に確保可能なメモリの最大サイズを取得する。


##戻り値
`a.max_size()`という式が有効ならその戻り値を返し、そうでなければデフォルト実装として[`numeric_limits`](/reference/limits/numeric_limits.md)`<size_type>::`[`max()`](/reference/limits/numeric_limits/max.md)の戻り値を返す。


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::allocator<int> alloc;
  using traits = std::allocator_traits<decltype(alloc)>;

  std::cout << traits::max_size(alloc) << std::endl;
}
```

###出力例
```
4611686018427387903
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 3.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.3
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0, 12.0

##参照
- [LWG2162 - allocator_traits::max_size missing noexcept](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2162)
