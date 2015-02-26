#operator/= (C++11)
* chrono[meta header]
* std::chrono[meta namespace]

```cpp
duration& operator/=(const rep& rhs);
```

##概要
現在の値を`rhs`で割る


##効果
`rep_ /= rhs`


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
  duration<int, micro> d(9);

  d /= 2;

  std::cout << d.count() << std::endl;
}
```


###出力
```
4
```


##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.1, 4.6.1

