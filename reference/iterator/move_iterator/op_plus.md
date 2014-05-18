#operator+ (C++11)
```cpp
move_iterator operator+(difference_type n) const;
```

##概要
イテレータを`n`回進める。


##戻り値
`return move_iterator(`[`base`](./base.md)`() + n);`


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
  auto it2 = it + 2;
  std::unique_ptr<int> p = *it2;

  std::cout << *p << std::endl;
}
```
* it + 2[color ff0000]


###出力
```
2
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


