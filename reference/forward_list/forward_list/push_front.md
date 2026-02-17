# push_front
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void push_front(const T& x);           // (1) C++11
constexpr void push_front(const T& x); // (1) C++26

void push_front(T&& x);           // (2) C++11
constexpr void push_front(T&& x); // (2) C++26
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
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
