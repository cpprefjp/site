# get_allocator
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_syncbuf[meta class]
* cpp20[meta cpp]


```cpp
allocator_type get_allocator() const noexcept;
```

## 概要
ア�ケータのコピーを取得する。


## 戻り値
コンストラクタまたは代入演算�によって�定されたア�ケータのコピーを返す。


## 例外
投げない。


## 例
```cpp example
#include <syncstream>
#include <iostream>

int main()
{
  std::osyncstream bout{std::cout};
  bout << "Hello, World!";
  auto alloc = bout.rdbuf()->get_allocator();
}
```
* get_allocator[color ff0000]


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
