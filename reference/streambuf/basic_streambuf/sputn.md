# sputn
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    std::streamsize sputn(const char_type* s, std::streamsize n);

    ……
  };
}
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
出力列に複数文字を書き込む。

## 効果
[`xsputn`](xsputn.md)(s, n)を呼ぶ。xsputn()はprotected virtualなので、継承されていれば、継承先のxsputn()が呼ばれる。

## 戻り値
[`xsputn`](xsputn.md)(s, n)の戻り値。

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
    std::cout << buf.sputn("ABCDE", 3) << std::endl;  // 3文字書き込む
    std::cout << space << std::endl;  // 書き込んだ文字列を出力
}
```
* sputn[color ff0000]

### 出力
```
3
ABC
```

## バージョン
### 言語
- C++98

## 参照
- [`xsputn()`](xsputn.md)
