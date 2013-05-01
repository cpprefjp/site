#get_allocator
```cpp
allocator_type get_allocator() const noexcept;
```

##概要

<b>forward_listオブジェクトが内包しているアロケータを取得する。</b>


##戻り値

`forward_list`オブジェクトが内包しているアロケータ



##例外

投げない


##例

```cpp
#include <cassert>
#include <forward_list>

int main()
{
  std::allocator<int> alloc;
  std::forward_list<int> ls(alloc);

  std::allocator<int> result = ls.get_allocator();

  assert(result == alloc);
}
```
* get_allocator[color ff0000]

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


