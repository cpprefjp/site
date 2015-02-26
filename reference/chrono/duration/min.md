#min (C++11)
* chrono[meta header]

```cpp
static constexpr duration min();
```

##概要
`rep`の最小値から成る`duration`を取得する

##戻り値
`duration(`[`duration_values`](/reference/chrono/duration_values.md)`<rep>::`[`min`](/reference/chrono/duration_values/min.md)`())`


##例
```cpp
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::micro;

int main()
{
  typedef duration<int, micro> microseconds;

  microseconds m = microseconds::min();
  std::cout << m.count() << std::endl;
}
```
* min()[color ff0000]


###出力例
```
-2147483648
```

##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.1, 4.6.1

