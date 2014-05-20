#front (C++11)
```cpp
reference front();
const_reference front() const;
```

##概要
先頭要素への参照を取得する。


##戻り値
`*`[`begin()`](./begin.md)

##計算量
定数時間


##例
```cpp
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {3, 1, 4};

  int& x = ls.front();
  std::cout << x << std::endl;
}
```
* front[color ff0000]


###出力
```
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


