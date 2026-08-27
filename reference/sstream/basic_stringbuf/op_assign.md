# operator=
* sstream[meta header]
* std[meta namespace]
* basic_stringbuf[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
basic_stringbuf& operator=(basic_stringbuf&& rhs);           // (1) C++11
basic_stringbuf& operator=(const basic_stringbuf&) = delete; // (2) C++11
```

## 概要
ムーブ代入を行う。

## 効果
- (1) : `basic_streambuf<CharT, Traits>::operator=(std::move(rhs))`を呼び出した後、`mode = rhs.mode`、`buf = std::move(rhs.buf)`を実行する。ここで`mode`は内部のオープンモード、`buf`は内部の文字列バッファである。

## 戻り値
`*this`

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>
#include <utility>

int main()
{
  std::stringbuf buf1("first");
  std::stringbuf buf2;
  
  // ムーブ代入
  buf2 = std::move(buf1);
  
  std::cout << buf2.str() << std::endl;
}
```
* str()[link str.md]

### 出力
```
first
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5.0 [mark verified], 3.6.0 [mark verified], 3.7.0 [mark verified], 3.8.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1.0 [mark verified], 5.2.0 [mark verified], 6.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 900. Stream move-assignment](https://cplusplus.github.io/LWG/issue900)
    - C++11で、ムーブ代入の効果が`swap(rhs)`から、ムーブ構築した場合と同じ観測可能な状態になることへ改められた。`swap`では代入先が元々持っていた状態が`rhs`へ残ってしまうため
