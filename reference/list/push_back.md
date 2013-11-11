#push_back
```cpp
void push_back(const T& x);
void push_back(T&& x); // C++11
```

##概要
新たな要素を末尾に追加する。


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
  std::string s = "hello";
  ls.push_back(s);

  // &&バージョン
  ls.push_back(std::string("world"));

  for (const std::string& x : ls) {
    std::cout << x << std::endl;
  };
}
```
* push_back[color ff0000]

###出力
```
hello
world
```


