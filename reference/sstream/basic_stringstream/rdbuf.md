# rdbuf
* sstream[meta header]
* std[meta namespace]
* basic_stringstream[meta class]
* function[meta id-type]

```cpp
basic_stringbuf<CharT, Traits, Allocator>* rdbuf() const;
```
* basic_stringbuf[link /reference/sstream/basic_stringbuf.md]

## 概要
ストリームバッファオブジェクトを取得する。

## 戻り値
内部の`basic_stringbuf`オブジェクトへのポインタ。

## 例
```cpp example
#include <iostream>
#include <sstream>

int main()
{
  std::stringstream ss("test");
  
  std::streambuf* buf = ss.rdbuf();
  
  // バッファから文字を読み取り
  std::cout << static_cast<char>(buf->sbumpc()) << std::endl; // 't'
  
  // バッファに文字を書き込み
  buf->sputc('!');
  
  std::cout << ss.str() << std::endl;
}
```
* sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]
* sputc[link /reference/streambuf/basic_streambuf/sputc.md]
* str()[link str.md]

### 出力
```
t
est!
```
