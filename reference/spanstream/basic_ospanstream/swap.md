# swap
* spanstream[meta header]
* std[meta namespace]
* basic_ospanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
void swap(basic_ospanstream& rhs);
```

## 概要
値を交換する。

## 効果
`basic_ostream<CharT, Traits>::swap(rhs)`を呼び出し、`sb.swap(rhs.sb)`を実行する。ここで`sb`は内部の`basic_spanbuf`オブジェクトである。


## 例
```cpp example
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  char buf1[32] = "first";
  char buf2[32] = "second";
  std::ospanstream oss1{std::span<char>(buf1)};
  std::ospanstream oss2{std::span<char>(buf2)};
  
  // スワップ
  oss1.swap(oss2);
  
  std::cout << oss1.span().data() << std::endl;
  std::cout << oss2.span().data() << std::endl;
}
```
* oss1.swap(oss2);[color ff0000]
* std::ospanstream[link /reference/spanstream/basic_ospanstream.md]
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
