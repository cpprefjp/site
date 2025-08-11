# コンストラクタ
* spanstream[meta header]
* std[meta namespace]
* basic_spanbuf[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
basic_spanbuf() : basic_spanbuf(ios_base::in | ios_base::out) {} // (1)

explicit basic_spanbuf(ios_base::openmode which)
  : basic_spanbuf(std::span<charT>(), which) {}                  // (2)

explicit basic_spanbuf(std::span<charT> s,
  ios_base::openmode which = ios_base::in | ios_base::out);      // (3)

basic_spanbuf(const basic_spanbuf&) = delete;                    // (4)

basic_spanbuf(basic_spanbuf&& rhs);                              // (5)
```
* ios_base[link /reference/ios/ios_base.md]
* std::span[link /reference/span/span.md]

## 概要
`basic_spanbuf`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : 指定されたモードで構築する
- (3) : 入力データとして[`std::span`](/reference/span/span.md)オブジェクトと、指定されたモードで構築する
- (4) : （削除）コピーコンストラクタ
- (5) : ムーブコンストラクタ


## 効果
- (1) : 内部のバッファを空にし、モードは`ios_base::in | ios_base::out`に設定する
- (2) : 内部のバッファを空にし、モードは`which`に設定する
- (3) : 内部のバッファを`s`に設定し、モードは`which`に設定する
- (4) : （削除）
- (5) : `rhs`から`basic_spanbuf`オブジェクトをムーブ構築する


## 例
```cpp example
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  // (1)
  std::spanbuf sb1{};

  std::cout << "(1)" << std::endl;
  std::cout << "  in_avail:" << sb1.in_avail() << std::endl;
  std::cout << std::endl;

  // (3)
  char buf[3] = {'A', 'B', 'C'};
  std::span<char> span{buf};
  std::spanbuf sb3{span};

  std::cout << "(3)" << std::endl;
  std::cout << "  in_avail:" << sb3.in_avail() << std::endl;
  std::cout << "  [0]:" << (char)sb3.sbumpc() << std::endl;
  std::cout << "  [1]:" << (char)sb3.sbumpc() << std::endl;
  std::cout << "  [2]:" << (char)sb3.sbumpc() << std::endl;
  std::cout << std::endl;

  // (5)
  sb3.pubseekpos(0);
  std::spanbuf sb5{std::move(sb3)};

  std::cout << "(5)" << std::endl;
  std::cout << "  in_avail:" << sb5.in_avail() << std::endl;
  std::cout << "  [0]:" << (char)sb5.sbumpc() << std::endl;
  std::cout << "  [1]:" << (char)sb5.sbumpc() << std::endl;
  std::cout << "  [2]:" << (char)sb5.sbumpc() << std::endl;
  std::cout << std::endl;
}
```
* std::span<char>[link /reference/span/span.md]
* in_avail()[link /reference/streambuf/basic_streambuf/in_avail.md]
* sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]
* pubseekpos()[link /reference/streambuf/basic_streambuf/pubseekpos.md]
* std::move[link /reference/utility/move.md]

### 出力
```
(1)
  in_avail:0

(3)
  in_avail:3
  [0]:A
  [1]:B
  [2]:C

(5)
  in_avail:3
  [0]:A
  [1]:B
  [2]:C
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
