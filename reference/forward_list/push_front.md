#push_front(C++11)
```cpp
void push_front(const T& x);
void push_front(T&& x);
```

##概要
新たな要素を先頭に追加する。


##戻り値
なし


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <forward_list>
#include <string>
#include <algorithm>

int main()
{
  std::forward_list<std::string> ls;

  // const&バージョン
  std::string s = "world";
  ls.push_front(s);

  // &&バージョン
  ls.push_front(std::string("hello"));

  std::for_each(ls.begin(), ls.end(), [](const std::string& x) {
    std::cout << x << std::endl;
  });
}
```
* push_front[color ff0000]

###出力
```
hello
world
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


