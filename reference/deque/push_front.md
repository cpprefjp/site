#push_front
* deque[meta header]
* std[meta namespace]
* deque[meta class]

```cpp
void push_front(const T& x);

// C++11から
void push_front(T&& y);
```

##概要
先頭に要素を追加する。


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
  std::string s = "world";
  c.push_front(s);

  // &&バージョン
  c.push_front(std::string("hello"));

  for (auto x : c) {
    std::cout << x << std::endl;
  }
}
```
* push_front[color ff0000]

###出力
```
hello
world
```

##参照
| | |
|-------------------------------------------------------------------------------------------------------|-----------------------------------------|
| [`push_back`](./push_back.md) | 末尾に要素を追加する |
| [`pop_front`](./pop_front.md) | 先頭要素を削除する |
| [`insert`](./insert.md) | 任意の位置に要素を挿入する |


