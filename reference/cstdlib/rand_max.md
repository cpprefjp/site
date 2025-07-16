# RAND_MAX
* cstdlib[meta header]
* macro[meta id-type]

```cpp
#define RAND_MAX implementation-defined
```

## 概要
`std::rand()`関数で生成される疑似乱数の最大値を定義しているマクロ。

このマクロの値は実装依存である。

また、少なくとも`32767`以上であることは保証されている。

## 例
```cpp example
#include <climits>
#include <cstdlib>
#include <ctime>
#include <iostream>
 
int main()
{
  // use current time as seed for random generator
  std::srand(std::time(NULL));
 
  std::cout << "RAND_MAX: " << RAND_MAX << '\n';
}
```

## 出力例
```
RAND_MAX: 2147483647
```

## 関連項目
- [`rand()`](rand.md): 疑似乱数を生成する。
