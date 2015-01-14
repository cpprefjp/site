#operator- (C++11)
```cpp
move_iterator operator-(difference_type n) const;
```

##概要
イテレータを`n`回逆に進める。


##戻り値
`return move_iterator(`[`base`](./base.md)`() - n);`


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

  auto it = std::make_move_iterator(v.end());
  auto it2 = it - 2;
  std::unique_ptr<int> p = *it2;

  std::cout << *p << std::endl;
}
```
* it - 2[color ff0000]

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


