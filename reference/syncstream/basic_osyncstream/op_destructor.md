# デストラクタ
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_osyncstream[meta class]
* cpp20[meta cpp]

```cpp
~basic_osyncstream();
```

## 概要
デストラクタ。


## 効果
[`emit()`](emit.md)を呼び出す。


## 例外
投げない。`emit()`から例外が投げられた場合、その例外は捕捉され無視される。


## 例
```cpp example
#include <iostream>
#include <syncstream>

int main()
{
  std::osyncstream bout{std::cout};
  bout << "Hello, World!";
} // bout は emit() を呼び出し、破棄される
```

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
