#cbegin
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class C>
  constexpr auto cbegin(const C& c)
    noexcept(noexcept(std::begin(c)))
    -> decltype(std::begin(c));
}
```
* std::begin[link begin.md]

##概要
範囲から先頭要素への読み取り専用イテレータを取得する。


##戻り値
```cpp
return std::begin(c);
```
* begin[link begin.md]

パラメータを`const`で受け取っているので、`std::begin()`を経由することで、読み取り専用イテレータを取得している。


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm> // for_each

int main()
{
  std::vector<int> v = {1, 2, 3};

  decltype(v)::const_iterator first = std::cbegin(v);
  decltype(v)::const_iterator last = std::cend(v);

  std::for_each(first, last, [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cbegin[color ff0000]
* std::vector[link /reference/vector.md]
* cend[link cend.md]
* std::for_each[link /reference/algorithm/for_each.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
1
2
3
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.4
- [GCC, C++14 mode](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [LWG Issue 2128. Absence of global functions `cbegin`/`cend`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2128)

