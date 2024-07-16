# pbase
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    char_type* pbase() const;

    ……
  };
}
```

## 概要
出力部分列の先頭へのポインタを返す。

## 戻り値
出力部分列の先頭へのポインタ。

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
    char_type* pbase(void) const {
        // ベースクラスのpbase()を呼ぶ
        return std::streambuf::pbase();
    }
};

int main(void) {
    char space[10] = {};
    dummy_buf buf{space, space + 10};
    std::cout << buf.pbase() - space << std::endl;  // pbase()の位置を確認
}
```
* std::streambuf::pbase[color ff0000]

### 出力
```
0
```

## バージョン
### 言語
- C++98

## 参照
- [`pptr()`](pptr.md)
- [`epptr()`](epptr.md)
