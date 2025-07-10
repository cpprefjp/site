# swap (非メンバ関数)
* sstream[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class CharT, class Traits, class Allocator>
  void swap(basic_ostringstream<CharT, Traits, Allocator>& x,
            basic_ostringstream<CharT, Traits, Allocator>& y);
}
```

## 概要
2つの`basic_ostringstream`オブジェクトを入れ替える。

## 効果
`x.swap(y)`

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>

int main()
{
  std::ostringstream ss1;
  std::ostringstream ss2;
  
  ss1 << "first";
  ss2 << "second";
  
  std::swap(ss1, ss2);
  
  std::cout << ss1.str() << std::endl;
  std::cout << ss2.str() << std::endl;
}
```
* str()[link str.md]

### 出力
```
second
first
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
