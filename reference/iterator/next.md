#next (C++11)
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator>
  ForwardIterator next(ForwardIterator x,
                       typename std::iterator_traits<ForwardIterator>::difference_type n = 1);
}
```

##概要
`n`回進めたイテレータを返す。

[`advance`](/reference/iterator/advance.md)`()`と違い、引数として渡されたイテレータへの参照を書き換えるのではなく、`n`回進んだイテレータのコピーを返す。


##効果
```cpp
advance(x, n);
return x;
```
* advance[link /reference/iterator/advance.md]


##戻り値
引数として渡されたイテレータを`n`回進めたイテレータのコピー


##例
```cpp
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4, 5, 2};

  {
    decltype(v)::iterator it = std::next(v.begin()); // イテレータを1回進める
    std::cout << *it << std::endl;
  }
  {
    decltype(v)::iterator it = std::next(v.begin(), 2); // イテレータを2回進める
    std::cout << *it << std::endl;
  }
}
```
* next[color ff0000]

###出力
```
1
4
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
[boost::next() - Boost Utility Library](http://www.boost.org/doc/libs/release/libs/utility/utility.htm#functions_next_prior)


