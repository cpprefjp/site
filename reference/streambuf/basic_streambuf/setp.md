# setp
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    void setp(char_type* pbeg, char_type* pend);

    ……
  };
}
```

## 概要
出力部分列の各ポインタを設定する。

## 事後条件
pbeg == [`pbase()`](pbase.md) および pbeg == [`pptr()`](pptr.md) および pend == [`epptr()`](epptr.md)。

## 例
```cpp example
#include <iostream>
#include <streambuf>

// streambufを継承したクラス
class dummy_buf : public std::streambuf {
public:
    dummy_buf(char* begin, char* end) {
        // 出力列の領域を指定
        setp(begin, end);
    }
};

int main(void) {
    char space[10] = {};
    dummy_buf buf{space, space + 10};
    buf.sputc('A');  // 3文字書き込む
    buf.sputc('B');
    buf.sputc('C');
    std::cout << space << std::endl;  // 書き込んだ文字列を出力
}
```
* setp[color ff0000]

### 出力
```
ABC
```

## バージョン
### 言語
- C++98

## 参照
- [`pbase()`](pbase.md)
- [`pptr()`](pptr.md)
- [`epptr()`](epptr.md)
