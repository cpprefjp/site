# rdbuf
* sstream[meta header]
* std[meta namespace]
* basic_ostringstream[meta class]
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
  std::ostringstream ss;
  
  std::streambuf* buf = ss.rdbuf();
  
  buf->sputc('t');
  buf->sputc('e');
  buf->sputc('s');
  buf->sputc('t');
  
  std::cout << ss.str() << std::endl;
}
```
* sputc[link /reference/streambuf/basic_streambuf/sputc.md]
* str()[link str.md]

### 出力
```
test
```
