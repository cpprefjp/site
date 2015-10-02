#operator%=
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
duration& operator%=(const rep& rhs);
duration& operator%=(const duration& rhs);
```

##概要
現在の値を`rhs`で割った余りを求める

##効果
- `rep_ %= rhs`
- `rep_ %= rhs.count()`

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
  {
    duration<int, micro> d(9);

    d %= 2;
    std::cout << d.count() << std::endl;
  }
  {
    duration<int, micro> d1(9);
    duration<int, micro> d2(2);

    d1 %= d2;
    std::cout << d1.count() << std::endl;
  }
}
```


###出力
```
1
1
```

##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.1, 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
