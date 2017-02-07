#operator==
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Iterator1, class Iterator2>
  bool operator==(const move_iterator<Iterator1>& x,
                  const move_iterator<Iterator2>& y);
}
```

##概要
2つの`move_iterator`オブジェクトが同じ要素を指しているかを判定する。


##戻り値
`return x.`[`base`](base.md)`() == y.`[`base`](base.md)`();`

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
  auto it2 = std::make_move_iterator(v.begin());

  if (it1 == it2) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* v.emplace_back[link /reference/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]

###出力
```
equal
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


