# operator<=
* vector[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator>
  bool operator<=(const vector<T, Allocator>& x,
                  const vector<T, Allocator>& y);           // (1) C++03

  template <class T, class Allocator>
  constexpr bool operator<=(const vector<T, Allocator>& x,
                            const vector<T, Allocator>& y); // (1) C++20
}
```

## 概要
`vector`において、左辺が右辺以下かを判定する。


## 戻り値
`!(x` [`>`](op_greater.md) `y)`


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> v1 = {1, 2, 3};
  std::vector<int> v2 = {4, 5, 6};

  std::cout << std::boolalpha;

  std::cout << (v1 <= v2) << std::endl;
}
```

### 出力
```
true
```

## 参照
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
