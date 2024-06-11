# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class Rep1, class Period1, class Rep2, class Period2>
  constexpr typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type
    operator-(const duration<Rep1, Period1>& lhs,
              const duration<Rep2, Period2>& rhs); // (1) C++11
}}
```
* common_type[link /reference/chrono/common_type.md]

## 概要
`duration`の減算を行う


## 戻り値
- (1)

```cpp
using cd = common_type<decltype(lhs), decltype(rhs)>;
return cd(cd(lhs).count() - cd(rhs).count());
```
* common_type[link /reference/chrono/common_type.md]
* count()[link count.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  seconds s = seconds{3} - seconds{2};
  std::cout << s.count() << std::endl;

  milliseconds ms = seconds{3} - milliseconds{2};
  std::cout << ms.count() << std::endl;
}
```
* count()[link count.md]

### 出力
```
1
2998
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
