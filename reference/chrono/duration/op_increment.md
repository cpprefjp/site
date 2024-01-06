# operator++
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
duration& operator++();             // (1) C++11
constexpr duration& operator++();   // (1) C++17

duration operator++(int);           // (2) C++11
constexpr duration operator++(int); // (2) C++17
```

## 概要
`duration`の値をインクリメントする

## 戻り値
- `duration& operator++()` : `++rep_; return *this;`
- `duration operator++(int)` : `return duration(rep_++);`

※ `rep_`は内部で保持している値。メンバ変数名は説明用のもの。


## 例
```cpp example
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::nano;

int main()
{
  // 前置インクリメント
  {
    duration<int, nano> d(2);

    std::cout << (++d).count() << std::endl;
    std::cout << d.count() << std::endl;
  }
  std::cout << std::endl;

  // 後置インクリメント
  {
    duration<int, nano> d(2);

    std::cout << (d++).count() << std::endl;
    std::cout << d.count() << std::endl;
  }
}
```
* nano[link /reference/ratio/si_prefix.md]
* count()[link count.md]

### 出力
```
3
3

2
3
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.5.1, 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
- [P0505R0 Wording for GB 50](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0505r0.html)
