#operator!=
```cpp
namespace std {
  template<class... TTypes, class... UTypes>
  bool operator!=(const tuple<TTypes...>& t, const tuple<UTypes...>& u);
}
```
* tuple[link ../tuple.md]

##概要
2つの`tuple`オブジェクトの非等値比較を行う。


##要件
2つの`tuple`オブジェクトの要素数が同じであること。


##戻り値
`!(t `[`==`](./equal.md)` u);`


##例
```cpp
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, char, const char*> t1(1, 'a', "hello");
  std::tuple<int, char, std::string> t2(1, 'a', "hello");
  std::tuple<int, char, std::string> t3(1, 'a', "hellot");

  std::cout << std::boolalpha;
  {
    bool result = t1 != t2;
    std::cout << result << std::endl;
  }
  {
    bool result = t1 != t3;
    std::cout << result << std::endl;
  }
}
```

###出力
```
false
true
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
- [`operator==`](./equal.md)

