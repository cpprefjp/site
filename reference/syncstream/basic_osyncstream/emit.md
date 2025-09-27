# emit
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_osyncstream[meta class]
* cpp20[meta cpp]

```cpp
void emit();
```

## 概要
格納されている文字データを、ラップされたストリームに転送する。このような転送は、同じストリームを持つ他のオブジェクトによる転送に関してアトミックである。


## 効果
ラップしたストリームバッファの[`emit()`](../basic_syncbuf/emit.md)を呼び出す。  
その呼び出しが`false`を返す場合は、`setstate(ios::badbit)`を呼び出す。  


## 戻り値
なし。


## 例外
投げる可能性がある。このメンバ関数は、基礎となるストリームに対する操作からの例外を処理するために使用できる。

```cpp
{
  osyncstream bout(cout);
  bout << "Hello, " << "World!" << '\n';
  try {
    bout.emit();
  } catch (...) {
    // 例外を処理する
  }
}
```
* emit[color ff0000]

## 例
```cpp example
#include <iostream>
#include <syncstream>
#include <utility>

int main()
{
  std::osyncstream bout(std::cout);
  bout << "Hello," << '\n';      // フラッシュしない
  bout.emit();                   // 文字は転送される。std::cout はフラッシュしない
  bout << "World!" << std::endl; // フラッシュしない。std::cout はフラッシュしない
  bout.emit();                   // 文字は転送される。std::cout はフラッシュする
  bout << "Greetings." << '\n';  // フラッシュしない
} // 文字は転送される。std::cout はフラッシュしない
```
* emit[color ff0000]

### 出力
```
Hello,
World!
Greetings.
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
