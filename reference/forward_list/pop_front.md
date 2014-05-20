#pop_front (C++11)
```cpp
void pop_front();
```

##概要
先頭要素を削除する


##要件
[`empty()`](./empty.md)` == false`であること。


##戻り値
なし


##例
```cpp
#include <iostream>
#include <forward_list>
#include <algorithm>

int main()
{
  std::forward_list<int> ls = {1, 2, 3};

  ls.pop_front();

  std::for_each(ls.begin(), ls.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* pop_front[color ff0000]


###出力
```
2
3
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


