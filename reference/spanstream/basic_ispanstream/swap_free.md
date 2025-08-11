# swap (非メンバ関数)
* spanstream[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class CharT, class Traits>
  void swap(basic_ispanstream<CharT, Traits>& x,
            basic_ispanstream<CharT, Traits>& y);
}
```

## 概要
2つの`basic_ispanstream`オブジェクトを入れ替える。

## 効果
`x.swap(y)`

## 例
```cpp example
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  char buf1[32] = "first";
  char buf2[32] = "second";
  std::ispanstream iss1{std::span<char>(buf1)};
  std::ispanstream iss2{std::span<char>(buf2)};
  
  // スワップ
  std::swap(iss1, iss2);
  
  std::cout << iss1.span().data() << std::endl;
  std::cout << iss2.span().data() << std::endl;
}
```
* std::swap(iss1, iss2);[color ff0000]
* std::ispanstream[link /reference/spanstream/basic_ispanstream.md]
* std::span<char>[link /reference/span/span.md]
* span()[link span.md]
* data()[link /reference/span/span/data.md]

### 出力
```
second
first
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
