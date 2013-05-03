#ULLONG_MAX
```cpp
#define ULLONG_MAX implementation-defined
```
* implementation-defined[italic]

##概要
`unsigned long long` の最大値。
`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<unsigned long long>::`[`max`](/reference/limits/numeric_limits/max.md)`()` と等しい。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << ULLONG_MAX << '\n';
}
```


###出力例
```
18446744073709551615
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.5.3
- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3
- [Visual C++](/implementation#visual_cpp.md): 8.0, 9.0, 10.0

