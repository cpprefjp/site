# max_size
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
size_type max_size() const;                    // (1) C++03
size_type max_size() const noexcept;           // (1) C++11
constexpr size_type max_size() const noexcept; // (1) C++26
```

## 概要
コンテナに格納可能な最大数を取得する。


## 戻り値
コンテナに格納可能な最大数


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls;
  std::size_t s = ls.max_size();

  std::cout << s << std::endl;
}
```
* max_size()[color ff0000]


### 出力例
```
768614336404564650
```


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
