#prev (C++11)
```cpp
namespace std {
  template <class BidirectionalIterator>
  BidirectionalIterator prev(BidirectionalIterator x,
                             typename std::iterator_traits<BidirectionalIterator>::difference_type n = 1);
}
```

##概要
`n`回逆に進めたイテレータを返す。
[`advance`](/reference/iterator/advance.md)`()`と違い、引数として渡されたイテレータへの参照を書き換えるのではなく、`n`回逆に進んだイテレータのコピーを返す。



##効果
[`advance`](/reference/iterator/advance.md)`(x, -n);`
`return x;`


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
* prev[color ff0000]

###出力
```
2
5
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照

[boost::prior() - Boost Utility Library](http://www.boost.org/doc/libs/release/libs/utility/utility.htm#functions_next_prior)


