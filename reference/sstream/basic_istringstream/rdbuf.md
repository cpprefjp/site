# rdbuf
* sstream[meta header]
* std[meta namespace]
* basic_istringstream[meta class]
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
  std::istringstream ss("test");
  
  std::streambuf* buf = ss.rdbuf();
  
  std::cout << static_cast<char>(buf->sbumpc()) << std::endl; // 't'
  std::cout << static_cast<char>(buf->sbumpc()) << std::endl; // 'e'
}
```
* sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]

### 出力
```
t
e
```
