#next(C++11)
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
[`advance`](/reference/iterator/advance.md)`(x, n);`
`return x;`


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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
[boost::next() - Boost Utility Library](http://www.boost.org/doc/libs/release/libs/utility/utility.htm#functions_next_prior)


