# operator=
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_osyncstream[meta class]
* cpp20[meta cpp]

```cpp
basic_osyncstream& operator=(basic_osyncstream&& rhs) noexcept;
```

## 概要
ムーブ代入を行う。このとき、保留�の出力はラップされたストリームへ転送される。


## 効果
保留�の出力を転送するために[`emit()`](emit.md)を呼び出した後、ラップされたストリームであり、プライベートメンバである[`std::basic_syncbuf`](../basic_syncbuf.md)を、`rhs`のものからムーブ代入する。  


## 戻り値
`*this`


## 事後条件
- `nullptr == rhs.get_wrapped()`は`true`である。
- `get_wrapped()`は、以前に`rhs.get_wrapped()`によって返されていた値を返す。


## 例外
投げない。`emit()`から例外が投げられた場合、その例外は捕捉され無視される。


## 備考
この代入演算�は、`rhs`をそのラップされたストリームバッファから切り離し、`rhs`を破棄しても出力が生成されないようにする。


## 例
```cpp example
#include <iostream>
#include <syncstream>
#include <utility>

int main()
{
  std::osyncstream aout{std::cout};
  aout << "Hello, ";

  std::osyncstream bout = std::move(aout); // ここで "Hello, " は転送される。

  bout << "World!";
}
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
