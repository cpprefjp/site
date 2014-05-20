#empty (C++11)
```cpp
bool empty() const noexcept;
```

##概要
コンテナが空かどうかを判定する


##戻り値
コンテナが空であれば`true`、そうでなければ`false`を返す。


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <forward_list>

int main()
{
  // 空
  {
    std::forward_list<int> ls;
    bool b = ls.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
  // 空じゃない
  {
    std::forward_list<int> ls = {1, 2, 3};
    bool b = ls.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
}
```
* empty[color ff0000]

###出力
```
true
false
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


