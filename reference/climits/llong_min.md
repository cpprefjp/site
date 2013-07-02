#LLONG_MIN(C++11)
```cpp
#define LLONG_MIN implementation-defined
```
* implementation-defined[italic]

##概要
`long long` の最小値。
`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<long long>::`[`min`](/reference/limits/numeric_limits/min.md)`()` と等しい。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << LLONG_MIN << '\n';
}
```


###出力例
```
-9223372036854775808
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.5.3
- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3
- [Visual C++](/implementation#visual_cpp.md): 8.0, 9.0, 10.0

