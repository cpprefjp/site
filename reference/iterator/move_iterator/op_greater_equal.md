#operator>=
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Iterator1, class Iterator2>
  bool operator>=(const move_iterator<Iterator1>& x,
                  const move_iterator<Iterator2>& y);
}
```

##概要
2つの`move_iterator`オブジェクトにおいて、左辺が右辺以上かを判定する。


##戻り値
`return !(x < y);`


##例
```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  auto it1 = std::make_move_iterator(v.begin());
  auto it2 = std::make_move_iterator(v.begin() + 1);

  if (it2 >= it1) {
    std::cout << "greater" << std::endl;
  }
  else {
    std::cout << "not greater" << std::endl;
  }
}
```
* v.emplace_back[link /reference/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]

###出力
```
greater
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


