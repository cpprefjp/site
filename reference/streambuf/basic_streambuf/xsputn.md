# xsputn
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual streamsize xsputn(const char_type* s, streamsize n);

    ……
  };
}
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
出力列に複数文字を書き込む。

## 効果
sからn文字を出力列に書き込む。書き込み可能領域が一杯になると、そこで書き込みを停止する。

## 戻り値
書き込んだ文字数。

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
    std::streamsize xsputn(const char_type* s, std::streamsize n) override {
        // ベースクラスのxsputn()を呼ぶ
        return std::streambuf::xsputn(s, n);
    }
};

int main() {
    char space[10] = {};
    dummy_buf buf{space, space + 5};
    std::cout << buf.xsputn("ABC", 3) << std::endl;  // 3文字全て書き込む
    std::cout << buf.xsputn("ABC", 3) << std::endl;  // 2文字のみ書き込む
    std::cout << space << std::endl;  // 書き込んだ文字列を出力
}
```
* std::streambuf::xsputn[color ff0000]

### 出力
```
3
2
ABCAB
```

## バージョン
### 言語
- C++98

## 参照
- [`sputn()`](sputn.md)
