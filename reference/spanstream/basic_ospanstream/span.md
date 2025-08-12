# span
* spanstream[meta header]
* std[meta namespace]
* basic_ospanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
std::span<charT> span() const noexcept; // (1)

void span(std::span<charT> s) noexcept; // (2)
```
* std::span[link /reference/span/span.md]

## 概要
固定長バッファの取得または設定をする。
- (1) : [`std::span`](/reference/span/span.md) 型の固定長バッファを取得する
- (2) : [`std::span`](/reference/span/span.md) 型の固定長バッファ `s` を設定する


## 効果
- (1) : `return rdbuf()->span();` と同等
- (2) : `rdbuf()->span(s)` と同等


## 例
```cpp example
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  char buf1[32] = "default";
  std::span<char> span1{buf1};
  std::ospanstream oss{span1};

  // (1)
  std::span<char> read = oss.span();

  std::cout << "(1)" << std::endl;
  std::cout << read.data() << std::endl;
  std::cout << std::endl;

  char buf2[32] = "overwritten";
  std::span<char> span2{buf2};

  // (2)
  oss.span(span2);

  std::cout << "(2)" << std::endl;
  std::cout << oss.span().data() << std::endl;
  std::cout << std::endl;
}
```
* oss.span();[color ff0000]
* oss.span(span2);[color ff0000]
* std::span<char>[link /reference/span/span.md]
* data()[link /reference/span/span/data.md]

### 出力
```
(1)
default

(2)
overwritten
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`basic_spanbuf::span`](../basic_spanbuf/span.md)
