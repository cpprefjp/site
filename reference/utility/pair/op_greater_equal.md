#operator>=
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class T1, class T2>
  bool operator>=(const pair<T1, T2>& x, const pair<T1, T2>& y);           // C++03

  template <class T1, class T2>
  constexpr bool operator>=(const pair<T1, T2>& x, const pair<T1, T2>& y); // C++14
}
```

##概要
2つの`pair`において、左辺が右辺以上かの判定を行う


##戻り値
`!(x < y)`


##例
```cpp
#include <iostream>
#include <utility>
#include <string>

int main()
{
  std::pair<int, std::string> p1(1, "aaa");
  std::pair<int, std::string> p2(2, "bbb");
  std::pair<int, std::string> p3(2, "bbb");

  std::cout << std::boolalpha;
  std::cout << (p1 >= p2) << std::endl;
  std::cout << (p2 >= p1) << std::endl;
  std::cout << (p2 >= p3) << std::endl;
}
```

###出力
```
false
true
true
```


##参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
