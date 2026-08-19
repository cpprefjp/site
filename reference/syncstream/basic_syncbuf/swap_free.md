# swap (非メンバ関数)
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_syncbuf[meta class]
* cpp20[meta cpp]


```cpp
namespace std {
template<class charT, class traits, class Allocator>
  void swap(basic_syncbuf<charT, traits, Allocator>& a,
            basic_syncbuf<charT, traits, Allocator>& b);
}
```

## 概要
2つの`basic_syncbuf`オブジェクトを入れ替える。


## 効果
`a.`[`swap`](swap.md)`(b);`と等価である。


## 戻り値
なし


## 例外
メンバ関数[`swap`](swap.md)が送出する例外を送出する。


## 例
```cpp example
#include <iostream>
#include <syncstream>

int main()
{
  std::osyncstream aout{std::cout};
  aout << "Hello, ";

  std::osyncstream bout{std::cout};
  bout << "World!";

  std::swap(*aout.rdbuf(), *bout.rdbuf());

  bout.emit(); // "Hello, " が転送される
  aout.emit(); // "World!" が転送される
}
```
* swap[color ff0000]

### 出力
```
Hello, World!
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 10 [mark verified]


## 参照
- [P0053R7 C++ Synchronized Buffered Ostream](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0053r7.pdf)
- [LWG Issue 3616. LWG 3498 seems to miss the non-member swap for `basic_syncbuf`](https://cplusplus.github.io/LWG/issue3616)
    - C++23で、非メンバ`swap`から`noexcept`が除去された
