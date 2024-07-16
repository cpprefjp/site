# begin
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
iterator begin();                      // (1) C++03
iterator begin() noexcept;             // (1) C++11
constexpr iterator begin() noexcept;   // (1) C++20

const_iterator begin() const;                    // (2) C++03
const_iterator begin() const noexcept;           // (2) C++11
constexpr const_iterator begin() const noexcept; // (2) C++20
```

## 概要
先頭要素を指すイテレータを取得する。


## 戻り値
非`const`な文脈では`iterator`型で先頭要素へのイテレータを返し、

`const`な文脈では`const_iterator`型で先頭要素へのイテレータを返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3};
  const std::vector<int>& cv = v;

  decltype(v)::iterator i = v.begin();
  decltype(v)::const_iterator ci = cv.begin();

  std::cout << *i << std::endl;
  std::cout << *ci << std::endl;
}
```
* begin()[color ff0000]

### 出力
```
1
1
```

## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
