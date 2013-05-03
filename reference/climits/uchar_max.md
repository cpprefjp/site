#UCHAR_MAX
```cpp
#define UCHAR_MAX implementation-defined
```
* implementation-defined[italic]

##概要

unsigned char の最大値。

std::[numeric_limits](/reference/limits/numeric_limits.md)<unsigned char>::[max](/reference/limits/numeric_limits/max.md)() と等しい。


##例


```cpp
#include <climits>

#include <iostream>
```

`int main()`

`{`

`  std::cout << UCHAR_MAX << '\n';`

`}`




###出力例

```cpp
255
```

##バージョン


###言語


- C++03

- C++11

###処理系


- [GCC](/implementation#gcc.md): 4.5.3

- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3

- [Visual C++](/implementation#visual_cpp.md): 7.1, 8.0, 9.0, 10.0

