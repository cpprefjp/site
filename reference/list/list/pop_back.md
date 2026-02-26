# pop_back
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void pop_back();           // (1) C++03
constexpr void pop_back(); // (1) C++26
```

## 概要
末尾要素を削除する


## 堅牢化された事前条件
[`empty()`](empty.md) `== false`であること。


## 戻り値
なし

## 例外

投げない

## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {1, 2, 3};

  ls.pop_back();

  for (int x : ls) {
    std::cout << x << std::endl;
  };
}
```
* pop_back()[color ff0000]


### 出力
```
1
2
```


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
