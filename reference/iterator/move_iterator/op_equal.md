```cpp
namespace std {
  template <class Iterator1, class Iterator2>
  bool operator==(const move_iterator<Iterator1>& x,
                  const move_iterator<Iterator2>& y);
}
```

##概要

<b>2つのmove_iteratorオブジェクトが同じ要素を指しているかを判定する。</b>


##戻り値

`return x.[base](https://sites.google.com/site/cpprefjp/reference/iterator/move_iterator/base)() == y.[base](https://sites.google.com/site/cpprefjp/reference/iterator/move_iterator/base)();`

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
* it1 == it2[color ff0000]

###出力

```cpp
equal
```

##バージョン


###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照


