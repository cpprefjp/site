# setbuf
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual basic_streambuf* setbuf(char_type* s, streamsize n);

    ……
  };
}
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
バッファ領域を与える。

## 効果
デフォルトでは何もしない。（オーバーライドした関数の具体的な動作はそのクラスに委ねられる。）

## 戻り値
*this.

## 例
```cpp example
#include <iostream>
#include <sstream>
 
int main() {
    char buf[32] = {};
    std::stringstream ss;

    ss.rdbuf()->pubsetbuf(buf, sizeof(buf));  // std::stringstreamのsetbuf()が呼ばれる
    ss << "ABC";

    std::cout << buf << std::endl;
}
```

## バージョン
### 言語
- C++98

## 参照
- [`pubsetbuf()`](pubsetbuf.md)
