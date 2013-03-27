#prev
```cpp
namespace std {

  template <class BidirectionalIterator>
  BidirectionalIterator prev(BidirectionalIterator x,
                             typename std::iterator_traits<BidirectionalIterator>::difference_type n = 1);

}
```

##概要

<b>n回逆に進めた</b><b>イテレータを返す</b><b>。</b>
<b>[advance](/reference/iterator/advance.md)()と違い、引数として渡されたイテレータへの参照を書き換えるのではなく、n回逆に進んだイテレータのコピーを返す。</b>



##効果

`[advance](/reference/iterator/advance.md)(x, -n);`<br style='color:rgb(0,0,0)'/>`return x;`



##戻り値

引数として渡されたイテレータをn回逆に進めたイテレータのコピー



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
* prev[color ff0000]

###出力

```cpp
2
5
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

[boost::prior() - Boost Utility Library](http://www.boost.org/doc/libs/release/libs/utility/utility.htm#functions_next_prior)


