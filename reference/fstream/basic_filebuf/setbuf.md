# setbuf
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual basic_streambuf<CharT, Traits>*
    setbuf(char_type* s, streamsize n);          // (1) C++03
  basic_streambuf<CharT, Traits>*
    setbuf(char_type* s, streamsize n) override; // (1) C++17
```
* basic_streambuf[link /reference/streambuf/basic_streambuf.md]
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
バッファ領域を与える。

このメンバ関数は`protected`であり、[`std::basic_streambuf`](/reference/streambuf/basic_streambuf.md)の`public`メンバ関数[`pubsetbuf()`](/reference/streambuf/basic_streambuf/pubsetbuf.md)を通して間接的に呼び出される。


## 効果
そのストリームに対して入出力が行われる前に`setbuf(0, 0)`が呼び出された場合、ストリームはバッファリングされない状態（unbuffered）になる。それ以外の場合の結果は処理系定義である。

「バッファリングされない」とは、[`pbase()`](/reference/streambuf/basic_streambuf/pbase.md)と[`pptr()`](/reference/streambuf/basic_streambuf/pptr.md)が常にヌルポインタを返し、ファイルへの出力が可能な限り速やかに行われることを意味する。


## 戻り値
規格に規定はない。主要な処理系は`this`を返す。


## 例
```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::filebuf buf;

  // 入出力を行う前に呼び出すことで、バッファリングを無効化する
  buf.pubsetbuf(nullptr, 0);

  buf.open("test.txt", std::ios_base::out);
  buf.sputn("Hello", 5);

  // バッファリングされていないため、この時点で既にファイルへ書き込まれている
  std::filebuf in;
  in.open("test.txt", std::ios_base::in);
  std::cout << static_cast<char>(in.sbumpc()) << std::endl;
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* buf.pubsetbuf[link /reference/streambuf/basic_streambuf/pubsetbuf.md]
* buf.open[link open.md]
* in.open[link open.md]
* buf.sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* in.sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]

### 出力
```
H
```

## バージョン
### 言語
- C++98


## 関連項目
- [`basic_streambuf::setbuf`](/reference/streambuf/basic_streambuf/setbuf.md)
- [`basic_streambuf::pubsetbuf`](/reference/streambuf/basic_streambuf/pubsetbuf.md)
