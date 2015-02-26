#push_back
* deque[meta header]

```cpp
void push_back(const T& x);

// C++11から
void push_back(T&& y);
```

##概要
末尾に要素を追加する。


##戻り値
なし


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <deque>
#include <string>

int main()
{
  std::deque<std::string> c;

  // const&バージョン
  std::string s = "hello";
  c.push_back(s);

  // &&バージョン
  c.push_back(std::string("world"));

  for (auto x : c) {
    std::cout << x << std::endl;
  }
}
```
* push_back[color ff0000]

###出力
```
hello
world
```

##参照
| | |
|-------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [`emplace_back`](./emplace_back.md) | 末尾に要素を直接構築で追加する |
| [`push_front`](./push_front.md) | 先頭に要素を追加する |
| [`insert`](./insert.md) | 任意の位置に要素を挿入する |


