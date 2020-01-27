# operator%
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // duration % N = duration
  template <class Rep1, class Period, class Rep2>
  duration<typename common_type<Rep1, Rep2>::type, Period>
    constexpr operator%(const duration<Rep1, Period>& d,
                        const Rep2& s);                      // (1)

  // duration % duration = duration
  template <class Rep1, class Period1, class Rep2, class Period2>
  typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type
    constexpr operator%(const duration<Rep1, Period1>& lhs,
                        const duration<Rep2, Period2>& rhs); // (2)
}
```
* common_type[link /reference/type_traits/common_type.md]

## 概要
durationの剰余演算を行う


## 要件
- (1) : 右辺の`Rep2`型は、`Rep1`に変換可能でなければならない。変換できない型の場合は、この関数はオーバー�ードから除外される。


## 戻り値
- (1)

```cpp
using cd = duration<typename common_type<Rep1, Rep2>::type, Period>;
return cd(cd(d).count() % s);
```
* common_type[link /reference/type_traits/common_type.md]
* count[link /reference/chrono/duration/count.md]

- (2)

```cpp
using cd = duration<typename common_type<Rep1, Rep2>::type, Period>;
return cd(cd(lhs).count() % cd(rhs).count());
```
* common_type[link /reference/type_traits/common_type.md]
* count[link /reference/chrono/duration/count.md]

## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // duration % rep
  {
    seconds s = seconds(8) % 3;
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(8) % 3;
    std::cout << ms.count() << std::endl;
  }

  // duration / duration
  {
    seconds s = seconds(8) % seconds(3);
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(8) % milliseconds(3);
    std::cout << ms.count() << std::endl;
  }
}
```
* %[color ff0000]
* count()[link count.md]

### 出力
```
2
2
2
2
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012, 2013でサンプルコードをコンパイルしたところ、dulation % dulationでコンパイルエラーになった。
