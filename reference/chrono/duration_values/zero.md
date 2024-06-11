# zero
* chrono[meta header]
* std::chrono[meta namespace]
* duration_values[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr Rep zero();          // C++11
static constexpr Rep zero() noexcept; // C++20
```

## 概要
`Rep`型の初期値を取得する


## 戻り値
```cpp
Rep(0)
```


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  std::cout << duration_values<seconds::rep>::zero() << std::endl;
}
```
* zero[color ff0000]


### 出力
```
0
```


## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [P0972R0 `<chrono>` `zero()`, `min()`, and `max()` should be `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0972r0.pdf)
