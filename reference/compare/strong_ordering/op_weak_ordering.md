# operator weak_ordering
* compare[meta header]
* std[meta namespace]
* strong_ordering[meta class]
* function[meta id-type]

```cpp
constexpr operator weak_ordering() const noexcept;
```
* weak_ordering[link /reference/compare/weak_ordering.md]

## 概要
[`std::weak_ordering`](/reference/compare/weak_ordering.md)型に変換する。


## 戻り値
以下と�価：

```cpp
return *this == 0 ? weak_ordering::equivalent :
       *this <  0 ? weak_ordering::less :
                    weak_ordering::greater;
```
* weak_ordering[link /reference/compare/weak_ordering.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <compare>

int main()
{
  std::strong_ordering strong = 1 <=> 2;
  std::weak_ordering weak = strong;

  std::cout << std::boolalpha;
  std::cout << (weak == 0) << std::endl;
  std::cout << (weak != 0) << std::endl;
  std::cout << (weak <  0) << std::endl;
  std::cout << (weak <= 0) << std::endl;
  std::cout << (weak >  0) << std::endl;
  std::cout << (weak >= 0) << std::endl;
}
```

### 出力
```
false
true
true
true
false
false
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019

## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
