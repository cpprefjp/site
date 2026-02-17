# front
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
reference front();           // (1) C++03
constexpr reference front(); // (1) C++26

const_reference front() const;           // (2) C++03
constexpr const_reference front() const; // (2) C++26
```

## 概要
先頭要素への参照を取得する。


## 戻り値
`*`[`begin()`](begin.md)


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {3, 1, 4};

  int& x = ls.front();
  std::cout << x << std::endl;
}
```
* front()[color ff0000]


### 出力
```
3
```


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
