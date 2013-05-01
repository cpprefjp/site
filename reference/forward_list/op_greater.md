#operator>
```cpp
namespace std {
  template <class T, class Allocator>
  bool operator>(const forward_list<T, Allocator>& x, const forward_list<T, Allocator>& y);
}
```

##概要

<b>forward_listにおいて、左辺が右辺より大きいかを判定する。</b>


##戻り値

`b < a`

##計算量

線形時間


##例

```cpp
#include <iostream>
#include <forward_list>

int main ()
{
  std::forward_list<int> ls1 = {4, 5, 6};
  std::forward_list<int> ls2 = {1, 2, 3};

  std::cout << std::boolalpha;

  std::cout << (ls1 > ls2) << std::endl;
}
```
* ls1 > ls2[color ff0000]

###出力

```cpp
true
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


