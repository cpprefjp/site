# span
* spanstream[meta header]
* std[meta namespace]
* basic_ispanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
std::span<const charT> span() const noexcept; // (1)

void span(std::span<charT> s) noexcept;       // (2)

template<class ROS>
void span(ROS&& s) noexcept;                  // (3)
```
* std::span[link /reference/span/span.md]

## 概要
固定長バッファの取得または設定をする。
- (1) : [`std::span`](/reference/span/span.md) 型の固定長バッファを取得する
- (2) : [`std::span`](/reference/span/span.md) 型の固定長バッファ `s` を設定する
- (3) : `s` から [`std::span`](/reference/span/span.md) 型の固定長バッファを作成し、それを設定する


## テンプレートパラメータ制約
- (3) : `ROS` が [`ranges::borrowed_range`](/reference/ranges/borrowed_range.md) の要求を満たすこと (`(!convertible_to<ROS, std::span<charT>>) && convertible_to<ROS, std::span<const charT>>`が`true`であること)。


## 効果
- (1) : `return rdbuf()->span();` と同等
- (2) : `rdbuf()->span(s)` と同等
- (3) : `std::span<const charT>(std::forward<ROS>(s))` を `sp` とした時、`this->span(std::span<charT>(const_cast<charT*>(sp.data()), sp.size()))` と同等

## 例
```cpp example
#include <array>
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  char buf1[32] = "default";
  std::span<char> span1{buf1};
  std::ispanstream iss{span1};

  // (1)
  std::span<const char> read = iss.span();

  std::cout << "(1)" << std::endl;
  std::cout << read.data() << std::endl;
  std::cout << std::endl;

  char buf2[32] = "overwritten";
  std::span<char> span2{buf2};

  // (2)
  iss.span(span2);

  std::cout << "(2)" << std::endl;
  std::cout << iss.span().data() << std::endl;
  std::cout << std::endl;

  std::array<char, 5> buf3 = {'l', 'a', 's', 't', '\0'};

  // (3)
  iss.span(buf3);

  std::cout << "(3)" << std::endl;
  std::cout << iss.span().data() << std::endl;
}
```
* iss.span();[color ff0000]
* iss.span(span2);[color ff0000]
* iss.span(buf3);[color ff0000]
* std::span<char>[link /reference/span/span.md]
* std::span<const char>[link /reference/span/span.md]
* data()[link /reference/span/span/data.md]

### 出力
```
(1)
default

(2)
overwritten

(3)
last
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
