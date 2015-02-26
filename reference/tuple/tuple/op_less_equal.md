#operator<= (C++11)
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]

```cpp
namespace std {
  template<class... TTypes, class... UTypes>
  bool operator<=(const tuple<TTypes...>&,
                  const tuple<UTypes...>&);           // C++11

  template<class... TTypes, class... UTypes>
  constexpr bool operator<=(const tuple<TTypes...>&,
                            const tuple<UTypes...>&); // C++14
}
```

##概要
2つの`tuple`において、左辺が右辺以下かの判定を行う。


##要件
2つの`tuple`の要素数が同じであること。


##戻り値
`!(u < t)`


##例
```cpp
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, char, std::string> t1(1, 'a', "hello");
  std::tuple<int, char, std::string> t2(2, 'b', "world");
  std::tuple<int, char, std::string> t3(2, 'b', "world");

  std::cout << std::boolalpha;
  {
    bool result = t1 <= t2;
    std::cout << result << std::endl;
  }
  {
    bool result = t2 <= t1;
    std::cout << result << std::endl;
  }
  {
    bool result = t2 <= t3;
    std::cout << result << std::endl;
  }
}
```

###出力
```
true
false
true
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)


##関連項目
- [`operator<`](./op_less.md)

