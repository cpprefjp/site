#get_allocator
```cpp
allocator_type get_allocator() const noexcept;
```

##概要
`basic_string`が内包しているアロケータを取得する。


##戻り値
`basic_string`が内包しているアロケータ


##例外
投げない


##備考
noexcept修飾はC++11で追加された。


##例
```cpp
#include <cassert>
#include <string>

int main()
{
  std::allocator<char> alloc;
  std::string s(alloc);

  std::allocator<char> result = s.get_allocator();

  assert(result == alloc);
}
```
* get_allocator[color ff0000]

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.2
- [GCC, C++0x mode](/implementation.md#gcc):
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 8.0, 9.0, 10.0, 11.0, 12.0


