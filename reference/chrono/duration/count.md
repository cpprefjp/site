# count
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr rep count() const;
```

## 概要
`duration`内の値を取得する。


## 戻り値
`duration`内の`rep`値。


## 例
```cpp example
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::nano;

int main()
{
  duration<int, nano> d(2); // 2ナノ秒

  std::cout << d.count() << std::endl;
}
```
* count[color ff0000]
* nano[link /reference/ratio/si_prefix.md]

### 出力
```
2
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.5.1, 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

