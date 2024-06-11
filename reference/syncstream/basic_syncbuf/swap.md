# swap
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_syncbuf[meta class]
* cpp20[meta cpp]


```cpp
void swap(basic_syncbuf& other) noexcept;
```

## 概要
他の`basic_syncbuf`オブジェクトと、データを交換する。


## 事前条件
`allocator_traits<Allocator>::propagate_on_container_swap::value`が`true`であるか、または
`this->get_allocator() == other.get_allocator()`が`true`である。


## 効果
`*this`と`other`の状態を交換する。


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

  aout.rdbuf()->swap(*bout.rdbuf());

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
