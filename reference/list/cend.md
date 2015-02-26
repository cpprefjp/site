#cend (C++11)
* list[meta header]
* std[meta namespace]

```cpp
const_iterator cend() const noexcept;
```

##概要
末尾の次を指す読み取り専用イテレータを取得する。


##戻り値
末尾の次を指す読み取り専用イテレータ


##例外
投げない


##例
```cpp
#include <iostream>
#include <list>
#include <algorithm>

int main()
{
  std::list<int>  ls  =  { 1, 2, 3 };

  // このアルゴリズム内ではlsの書き換えを決して行わない
  std::for_each(ls.cbegin(), ls.cend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cend[color ff0000]

###出力
```
1
2
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照


