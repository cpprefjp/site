#operator+ (フリー関数版)
```cpp
namespace std {

  template <class Iterator>
  move_iterator<Iterator> operator+(typename move_iterator<Iterator>::difference_type n,
                                    const move_iterator<Iterator>& x);

}
```

##概要

<b>イテレータをN回進める。</b>


##戻り値

`return x + n;`

##例

```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  auto it = std::make_move_iterator(v.begin());
  auto it2 = 2 + it;
  std::unique_ptr<int> p = *it2;

  std::cout << *p << std::endl;
}
```
* 2 + it[color ff0000]

###出力

```cpp
2
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): 
- [GCC, C++0x mode](/implementation#gcc): 4.7.0
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??



##参照


