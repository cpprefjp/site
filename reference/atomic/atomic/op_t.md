#operator T
```cpp
operator T() const volatile noexcept;
operator T() const noexcept;
```

##概要

<b>型Tへの暗黙の型変換</b>


##戻り値

[`load`](/reference/atomic/atomic/load.md)()

##例外

投げない


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  int value = x;
  std::cout << value << std::endl;
}
```
* x[color ff0000]

###出力

```cpp
1
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


