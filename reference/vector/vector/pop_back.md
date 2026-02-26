# pop_back
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
void pop_back();           // (1) C++03
constexpr void pop_back(); // (1) C++20
```

## 概要
末尾要素を削除する。


## 堅牢化された事前条件
[`empty()`](empty.md) `== false`であること。


## 戻り値
なし

## 例外

投げない

## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3};

  v.pop_back();

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* pop_back[color ff0000]

### 出力
```
1
2
```

## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
