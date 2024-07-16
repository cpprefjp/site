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
アロケータのコピーを取得する。


## 戻り値
コンストラクタまたは代入演算子によって設定されたアロケータのコピーを返す。


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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 10 [mark verified]


## 参照
- [P0053R7 C++ Synchronized Buffered Ostream](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0053r7.pdf)
