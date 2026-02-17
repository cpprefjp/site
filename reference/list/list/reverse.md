# reverse
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void reverse();                    // (1) C++03
void reverse() noexcept;           // (1) C++11
constexpr void reverse() noexcept; // (1) C++26
```

## 概要
要素の並びを逆にする


## 戻り値
なし


## 例外
投げない


## 計算量
線形時間


## 備考
この操作はイテレータと参照の有効性に影響しない


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {1, 2, 3};

  ls.reverse();

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* reverse()[color ff0000]

### 出力
```
3
2
1
```


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
