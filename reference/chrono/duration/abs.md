# abs
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::chrono {
  template <class Rep, class Period>
  constexpr duration<Rep, Period> abs(duration<Rep, Period> d);
}
```

## 概要
絶対値を求める。


## 戻り値
```cpp
return d >= d.zero() ? d : -d;
```
* d.zero()[link zero.md]


## 備考
- [`numeric_limits`](/reference/limits/numeric_limits.md)`<Rep>::is_signed == true`でない場合、この関数はオーバー�ード解決の候補から外れる


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  seconds s{-123};
  seconds result = abs(s);

  std::cout << result.count() << std::endl;
}
```
* abs[color ff0000]
* result.count()[link count.md]

### 出力
```
123
```

## バージョン
### 言語
- C++17

### 処理系
- [GCC](/implementation.md#gcc): 7.3
- [Clang](/implementation.md#clang): 3.8
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0092R1 Polishing `<chrono>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0092r1.html)
