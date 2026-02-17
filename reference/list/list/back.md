# back
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
reference back();           // (1) C++03
constexpr reference back(); // (1) C++26

const_reference back() const;           // (2) C++03
constexpr const_reference back() const; // (2) C++26
```

## 概要
末尾要素への参照を取得する


## 戻り値
末尾の要素への参照を返す。

`a.back()` は `{ auto tmp = a.end(); --tmp; return *tmp; }` と同じ結果になる。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {3, 1, 4};

  int& x = ls.back();
  std::cout << x << std::endl;
}
```
* back()[color ff0000]

### 出力
```
4
```


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
