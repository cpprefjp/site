# operator=
* spanstream[meta header]
* std[meta namespace]
* basic_spanbuf[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
basic_spanbuf& operator=(basic_spanbuf&& rhs);
basic_spanbuf& operator=(const basic_spanbuf&) = delete;
```

## 概要
ムーブ代入を行う。

## 効果
`basic_spanbuf tmp{std::move(rhs)};` として `tmp` を作成後、`this->swap(tmp);` を実行するのと同等。

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
  std::spanbuf sb1{std::span<char>(buf1)};
  std::spanbuf sb2{std::span<char>(buf2)};
  
  // ムーブ代入
  sb2 = std::move(sb1);
  
  std::cout << sb2.span().data() << std::endl;
}
```
* std::spanbuf[link /reference/spanstream/basic_spanbuf.md]
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
