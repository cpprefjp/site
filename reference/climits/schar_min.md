#SCHAR_MIN

```cpp
#define SCHAR_MIN implementation-defined
```
* implementation-defined[italic]

##概要
`signed char` の最小値。
`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<signed char>::`[`min`](/reference/limits/numeric_limits/min.md)`()` と等しい。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << SCHAR_MIN << '\n';
}
```


###出力例
```
-128
```

##バージョン
###言語
- C++03
- C++11


###処理系
- [GCC](/implementation#gcc.md): 4.5.3
- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3
- [Visual C++](/implementation#visual_cpp.md): 7.1, 8.0, 9.0, 10.0

