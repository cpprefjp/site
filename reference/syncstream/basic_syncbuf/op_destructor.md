# デストラクタ
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_syncbuf[meta class]
* cpp20[meta cpp]

```cpp
~basic_syncbuf();
```

## 概要
デストラクタ。`basic_syncbuf`オブジェクトを破棄する。このとき、保留�の出力はラップされたストリームへ転送される。


## 効果
保留�の出力を転送するため、[`emit()`](emit.md)を呼び出す。


## 例外
投げない。`emit()`から例外が投げられた場合は、その例外を捕捉して無視する。


## 例
```cpp example
#include <iostream>
#include <syncstream>

int main()
{
  std::osyncstream bout{std::cout};
  bout << "Hello, World!";
} // デストラクタは、通常 std::basic_osyncstream から呼ばれる。
```

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
