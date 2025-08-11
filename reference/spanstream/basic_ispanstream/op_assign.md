# operator=
* spanstream[meta header]
* std[meta namespace]
* basic_ispanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
basic_ispanstream& operator=(basic_ispanstream&& rhs);
basic_ispanstream& operator=(const basic_ispanstream&) = delete;
```

## 概要
ムーブ代入を行う。

## 効果
`basic_istream<CharT, Traits>::operator=(std::move(rhs))`を呼び出し、`sb = std::move(rhs.sb)`を実行する。ここで`sb`は内部の`basic_spanbuf`オブジェクトである。

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
  std::ispanstream iss1{std::span<char>(buf1)};
  std::ispanstream iss2{std::span<char>(buf2)};
  
  // ムーブ代入
  iss2 = std::move(iss1);
  
  std::cout << iss2.span().data() << std::endl;
}
```
* std::ispanstream[link /reference/spanstream/basic_ispanstream.md]
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
