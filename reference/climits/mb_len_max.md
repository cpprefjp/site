#MB_LEN_MAX
```cpp
#define MB_LEN_MAX implementation-defined
```
* implementation-defined[italic]

##概要
サポートされているすべてのロケールのマルチバイト文字のうち、最大のバイト数を表す。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << MB_LEN_MAX << '\n';
}
```


###出力例
```
16
```

##バージョン
###言語
- C++03
- C++11


###処理系
- [GCC](/implementation#gcc.md): 4.5.3
- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3
- [Visual C++](/implementation#visual_cpp.md): 7.1, 8.0, 9.0, 10.0

