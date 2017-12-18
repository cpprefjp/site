# zero
* chrono[meta header]
* std::chrono[meta namespace]
* duration_values[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr Rep zero();
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
* seconds[link /reference/chrono/seconds.md]


### 出力
```
0
```


## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
