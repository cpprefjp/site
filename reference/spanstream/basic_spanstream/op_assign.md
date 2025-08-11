# operator=
* spanstream[meta header]
* std[meta namespace]
* basic_spanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
basic_spanstream& operator=(basic_spanstream&& rhs);
basic_spanstream& operator=(const basic_spanstream&) = delete;
```

## 概要
ムーブ代入を行う。

## 効果
`basic_iostream<CharT, Traits>::operator=(std::move(rhs))`を呼び出し、`sb = std::move(rhs.sb)`を実行する。ここで`sb`は内部の`basic_spanbuf`オブジェクトである。

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
  std::spanstream ss1{std::span<char>(buf1)};
  std::spanstream ss2{std::span<char>(buf2)};
  
  // ムーブ代入
  ss2 = std::move(ss1);
  
  std::cout << ss2.span().data() << std::endl;
}
```
* std::spanstream[link /reference/spanstream/basic_spanstream.md]
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
