#zero (C++11)
```cpp
static constexpr duration zero();
```

##概要
`rep`の初期値から成る`duration`を取得する

##戻り値
`duration(`[`duration_values`](/reference/chrono/duration_values.md)`<rep>::`[`zero`](/reference/chrono/duration_values/zero.md)`())`


##例
```cpp
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::micro;

int main()
{
  typedef duration<int, micro> microseconds;

  microseconds m = microseconds::zero();
  std::cout << m.count() << std::endl;
}
```
* zero()[color ff0000]

###出力
```
0
```

##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.1, 4.6.1

