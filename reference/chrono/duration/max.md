# max
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr duration max();
```

## 概要
`rep`の最大値から成る`duration`を取得する

## 戻り値
`duration(`[`duration_values`](/reference/chrono/duration_values.md)`<rep>::`[`max()`](/reference/chrono/duration_values/max.md)`)`


## 例
```cpp
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::micro;

int main()
{
  using microseconds = duration<int, micro>;

  microseconds m = microseconds::max();
  std::cout << m.count() << std::endl;
}
```
* max()[color ff0000]
* micro[link /reference/ratio/si_prefix.md]
* count()[link count.md]


### 出力例
```
2147483647
```

## バージョン
### 言語
- C++11

### 処理系
- GCC: 4.5.1, 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
