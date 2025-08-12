# rdbuf
* spanstream[meta header]
* std[meta namespace]
* basic_ispanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
basic_spanbuf<charT, traits>* rdbuf() const noexcept;
```
* basic_spanbuf[link /reference/spanstream/basic_spanbuf.md]

## 概要
固定長ストリームバッファオブジェクトを取得する。

## 戻り値
内部の`basic_spanbuf`オブジェクトへのポインタ。

## 例
```cpp example
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  char buf[32] = "test";
  std::ispanstream iss{std::span<char>{buf}};
  
  std::spanbuf* rd = iss.rdbuf();
  
  // バッファから文字を読み取り
  std::cout << static_cast<char>(rd->sbumpc()) << std::endl;
  std::cout << static_cast<char>(rd->sbumpc()) << std::endl;
  std::cout << static_cast<char>(rd->sbumpc()) << std::endl;
  std::cout << static_cast<char>(rd->sbumpc()) << std::endl;
}
```
* rdbuf()[color ff0000]
* std::span<char>[link /reference/span/span.md]
* std::spanbuf[link /reference/spanstream/basic_spanbuf.md]
* sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]

### 出力
```
t
e
s
t
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
