# back
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
reference back();                       // (1) C++03
constexpr reference back();             // (1) C++20

const_reference back() const;           // (2) C++03
constexpr const_reference back() const; // (2) C++20
```

## 概要
末尾要素への参照を取得する


## 戻り値
末尾の要素への参照を返す。


## 備考
この関数の効果は、以下と等価になる：

```cpp
{
  auto tmp = end();
  --tmp;
  return *tmp;
}
```


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  int& x = v.back();
  std::cout << x << std::endl;
}
```
* back()[color ff0000]

### 出力
```
4
```

## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
