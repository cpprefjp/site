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
            basic_syncbuf<charT, traits, Allocator>& b) noexcept;
}
```

## 概要
2つの`basic_syncbuf`オブジェクトを入れ替える。


## 効果
`a.`[`swap`](swap.md)`(b);`と�価である。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <syncstream>

int main()
{
  std::osyncstream aout{std::cout};
  aout << "Hello, ";

  std::osyncstream bout;
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
- [Clang](/implementation.md#clang): 9.0.0 現在未対応
- [GCC](/implementation.md#gcc): 10.0.0 現在未対応
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0053R7 C++ Synchronized Buffered Ostream](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0053r7.pdf)
