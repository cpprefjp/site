# epptr
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    char_type* epptr() const;

    ……
  };
}
```

## 概要
出力部分列の終端へのポインタを返す。

## 戻り値
出力部分列の終端へのポインタ。

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
    char_type* epptr(void) const {
        // ベースクラスのepptr()を呼ぶ
        return std::streambuf::epptr();
    }
};

int main(void) {
    char space[10] = {};
    dummy_buf buf{space, space + 10};
    std::cout << buf.epptr() - space << std::endl;  // epptr()の位置を確認
}
```
* std::streambuf::epptr[color ff0000]

### 出力
```
10
```

## バージョン
### 言語
- C++98

## 参照
- [`pbase()`](pbase.md)
- [`pptr()`](pptr.md)
