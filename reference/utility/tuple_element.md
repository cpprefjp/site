#tuple_element
```cpp
namespace std {
  template <size_t I, class T> class tuple_element;

  template <class T1, class T2>
  struct tuple_element<0, std::pair<T1, T2>> {
    typedef T1 type;
  };

  template <class T1, class T2>
  struct tuple_element<1, pair<T1, T2>> {
    typedef T2 type;
  };
}
```
* pair[link ./pair.md]


##概要
`tuple_element`は、タプルとして見なせる型から、`I`番目の要素型を取得するためのクラスである。

`<utility>`ヘッダでは、`pair`に関する特殊化を定義する。


##例
```cpp
#include <utility>
#include <type_traits>

int main()
{
  static_assert(std::is_same<
                  std::tuple_element<0, std::pair<int, double>>::type,
                  int
                >::value, "");

  static_assert(std::is_same<
                  std::tuple_element<1, std::pair<int, double>>::type,
                  double
                >::value, "");
}
```
* tuple_element[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0


##参照
- [`tuple_element - <tuple>`](/reference/tuple/tuple_element.md)

