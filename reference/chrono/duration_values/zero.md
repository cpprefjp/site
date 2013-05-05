#zero
```cpp
static constexpr Rep zero();
```

##概要
`Rep`型の初期値を取得する


##戻り値
`Rep(0)`


##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  std::cout << duration_values<seconds::rep>::zero() << std::endl;
}
```
* zero[color ff0000]


###出力
```
0
```


##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1

