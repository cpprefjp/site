# operator=
* spanstream[meta header]
* std[meta namespace]
* basic_ospanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
basic_ospanstream& operator=(basic_ospanstream&& rhs);
basic_ospanstream& operator=(const basic_ospanstream&) = delete;
```

## 概要
ムーブ代入を行う。

## 効果
`basic_ostream<CharT, Traits>::operator=(std::move(rhs))`を呼び出し、`sb = std::move(rhs.sb)`を実行する。ここで`sb`は内部の`basic_spanbuf`オブジェクトである。

## 戻り値
`*this`

## 例
```cpp example
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  char buf1[32] = "first";
  char buf2[32] = "";
  std::ospanstream oss1{std::span<char>(buf1)};
  std::ospanstream oss2{std::span<char>(buf2)};
  
  // ムーブ代入
  oss2 = std::move(oss1);
  
  std::cout << oss2.span().data() << std::endl;
}
```
* std::ospanstream[link /reference/spanstream/basic_ospanstream.md]
* std::span<char>[link /reference/span/span.md]
* std::move[link /reference/utility/move.md]
* span()[link span.md]
* data()[link /reference/span/span/data.md]

### 出力
```
first
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
