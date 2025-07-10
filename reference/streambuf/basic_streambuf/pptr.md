# pptr
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    char_type* pptr() const;

    ……
  };
}
```

## 概要
出力部分列の現在位置へのポインタを返す。

## 戻り値
出力部分列の現在位置へのポインタ。

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
    char_type* pptr(void) const {
        // ベースクラスのpptr()を呼ぶ
        return std::streambuf::pptr();
    }
};

int main() {
    char space[10] = {};
    dummy_buf buf{space, space + 10};
    std::cout << buf.pptr() - space << std::endl;  // pptr()の位置を確認
    buf.sputc('A');  // 3文字書き込む
    buf.sputc('B');
    buf.sputc('C');
    std::cout << buf.pptr() - space << std::endl;  // pptr()の位置を確認
}
```
* std::streambuf::pptr[color ff0000]

### 出力
```
0
3
```

## バージョン
### 言語
- C++98

## 参照
- [`pbase()`](pbase.md)
- [`epptr()`](epptr.md)
