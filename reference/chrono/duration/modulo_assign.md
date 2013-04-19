#operator%=
```cpp
duration& operator%=(const rep& rhs);
duration& operator%=(const duration& rhs);
```

##概要
現在の値をrhsで割った余りを求める

##効果
<code>
- rep_ %= rhs
- rep_ %= rhs.count()
</code>

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
* %=[color ff0000]
* %=[color ff0000]

###出力
```cpp
1
1
```

##バージョン

###言語

- C++11

###処理系

- GCC: 4.5.1, 4.6.1

