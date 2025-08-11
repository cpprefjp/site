# rdbuf
* spanstream[meta header]
* std[meta namespace]
* basic_ospanstream[meta class]
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
  std::ospanstream oss{std::span<char>{buf}};
  
  std::spanbuf* rd = oss.rdbuf();

  rd->pubseekpos(4, std::ios_base::out);
  rd->sputc('i');
  rd->sputc('n');
  rd->sputc('g');

  // バッファから文字を読み取り
  std::cout << oss.span().data() << std::endl;
}
```
* rdbuf()[color ff0000]
* std::span<char>[link /reference/span/span.md]
* std::spanbuf[link /reference/spanstream/basic_spanbuf.md]
* pubseekpos[link /reference/streambuf/basic_streambuf/pubseekpos.md]
* sputc[link /reference/streambuf/basic_streambuf/sputc.md]
* span()[link span.md]
* data()[link /reference/span/span/data.md]

### 出力
```
testing
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
