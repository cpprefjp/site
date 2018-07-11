# push_front
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void push_front(const T& x);
void push_front(T&& x);
```

## 概要
新たな要素を先頭に追加する。


## 戻り値
なし


## 計算量
定数時間


## 例
```cpp example
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
* ls.begin()[link begin.md]
* ls.end()[link end.md]

### 出力
```
hello
world
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


