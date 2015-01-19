#push_front
```cpp
void push_front(const T& x); // (1)
void push_front(T&& x);      // (2) C++11
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
#include <list>
#include <string>
#include <algorithm>

int main()
{
  std::list<std::string> ls;

  // const&バージョン
  std::string s = "world";
  ls.push_front(s);

  // &&バージョン
  ls.push_front(std::string("hello"));

  for (const std::string& x : ls) {
    std::cout << x << std::endl;
  };
}
```
* push_front[color ff0000]

###出力
```
hello
world
```


