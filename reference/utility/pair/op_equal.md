#operator==
```cpp
namespace std {
  template <class T1, class T2>
  bool operator==(const pair<T1, T2>& x, const pair<T1, T2>& y);
}
```

##概要
2つの`pair`の等値比較を行う


##戻り値
`x.first == y.first && x.second == y.second`


##例
```cpp
#include <iostream>
#include <utility>
#include <string>

int main()
{
  std::pair<int, std::string> p1(1, "aaa");
  std::pair<int, std::string> p2(1, "aaa");
  std::pair<int, std::string> p3(2, "bbb");

  std::cout << std::boolalpha;
  std::cout << (p1 == p2) << std::endl;
  std::cout << (p1 == p3) << std::endl;
}
```

###出力
```
true
false
```

##参照
