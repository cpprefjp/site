#prev
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class BidirectionalIterator>
  BidirectionalIterator prev(BidirectionalIterator x,
                             typename std::iterator_traits<BidirectionalIterator>::difference_type n = 1);
}
```
* iterator_traits[link iterator_traits.md]

##概要
`n`回逆に進めたイテレータを返す。

[`advance()`](/reference/iterator/advance.md)と違い、引数として渡されたイテレータへの参照を書き換えるのではなく、`n`回逆に進んだイテレータのコピーを返す。



##効果
```cpp
advance(x, -n);
return x;
```
* advance[link /reference/iterator/advance.md]


##戻り値
引数として渡されたイテレータを`n`回逆に進めたイテレータのコピー


##例
```cpp
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4, 5, 2};

  {
    decltype(v)::iterator it = std::prev(v.end()); // イテレータを1回逆に進める
    std::cout << *it << std::endl;
  }
  {
    decltype(v)::iterator it = std::prev(v.end(), 2); // イテレータを2回逆に進める
    std::cout << *it << std::endl;
  }
}
```
* std::prev[color ff0000]

###出力
```
2
5
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [boost::prior() - Boost Utility Library](http://www.boost.org/doc/libs/release/libs/utility/utility.htm#functions_next_prior)
- [N2246 2 of the least crazy ideas for the standard library in C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2246.html)


