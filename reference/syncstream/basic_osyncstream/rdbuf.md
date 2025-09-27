# rdbuf
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_syncbuf[meta class]
* cpp20[meta cpp]


```cpp
syncbuf_type* rdbuf() const noexcept;
```

## 概要
ベースとなる[`std::basic_syncbuf`](../basic_syncbuf.md)へのポインタを返す。


## 戻り値
ベースとなるプライベートメンバの[`std::basic_syncbuf`](../basic_syncbuf.md)を`sb`とすると、次と等価である。  `const_cast<syncbuf_type*>(std::addressof(sb));`


## 例外
投げない。


## 例
```cpp example
#include <syncstream>
#include <iostream>

int main()
{
  std::osyncstream bout(std::cout);
  bout << "Hello, ";

  auto syncbuf_ptr = bout.rdbuf();
  syncbuf_ptr->emit(); // 文字が転送される

  bout << "World!" << '\n';
}
```
* rdbuf[color ff0000]


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
- [LWG Issue 3130. §[input.output] needs many `addressof`](https://wg21.cmeerw.net/lwg/issue3130)
