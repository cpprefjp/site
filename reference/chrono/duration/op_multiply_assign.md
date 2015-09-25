#operator*=
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
duration& operator*=(const rep& rhs);
```

##概要
現在の値に`rhs`を掛ける


##効果
`rep_ *= rhs`


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
  duration<int, micro> d(3);

  d *= 3;

  std::cout << d.count() << std::endl;
}
```


###出力
```
9
```

##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.1, 4.6.1

