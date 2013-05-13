#operator+=
```cpp
move_iterator& operator+=(difference_type n);
```

##概要
イテレータ自身を`n`回進める。


##効果
`current += n;`
※`current`は、メンバ変数として保持しているアダプト元のイテレータ変数


##戻り値
`return *this;`

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
  it += 2;
  std::unique_ptr<int> p = *it;

  std::cout << *p << std::endl;
}
```
* it += 2[color ff0000]

###出力
```cpp
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


