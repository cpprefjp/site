#make_reverse_iterator (C++14)
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Iterator>
  reverse_iterator<Iterator> make_reverse_iterator(Iterator i);
}
```
* reverse_iterator[link ./reverse_iterator.md]

##概要
`reverse_iterator`オブジェクトを作るヘルパ関数


##戻り値
`reverse_iterator<Iterator>(i)`


##例
```cpp
#include <iostream>
#include <iterator>
#include <algorithm>

int main()
{
  int ar[] = {1, 2, 3};

  std::for_each(
    std::make_reverse_iterator(ar + 3),
    std::make_reverse_iterator(ar),
    [](int x) {
      std::cout << x << std::endl;
    }
  );
}
```
* for_each[link /reference/algorithm/for_each.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
3
2
1
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++14 mode](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [LWG Issue 2285. `make_reverse_iterator`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2285)

