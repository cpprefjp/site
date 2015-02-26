#operator-= (C++11)
* chrono[meta header]

```cpp
duration& operator-=(const duration& d);
```

##概要
現在の値から、他の`duration`の値を引く


##効果
`rep_ -= d.`[`count`](/reference/chrono/duration/count.md)`()`


##戻り値
`*this`


##例
```cpp
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::micro;

int main()
{
  duration<int, micro> d1(3);
  duration<int, micro> d2(2);

  d1 -= d2;

  std::cout << d1.count() << std::endl;
}
```


###出力
```
1
```


##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.1, 4.6.1

