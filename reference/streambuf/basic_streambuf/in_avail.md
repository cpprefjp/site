# in_avail
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    streamsize in_avail();

    ……
  };
}
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
現在の入力列の読み取り可能な文字数を返す。

## 戻り値
- 読み取り可能な文字列が存在する場合、[`egptr()`](egptr.md) `-` [`gptr()`](gptr.md)を返す。
- それ以外の場合、[`showmanyc()`](showmanyc.md)を返す。

## 例
```cpp example
#include <iostream>
#include <streambuf>

// streambufを継承したクラス
class dummy_buf : public std::streambuf {
    char space_[10] = {};
public:
    dummy_buf(void) {
        // 入力列に配列を設定
        setg(space_, space_, space_ + 10);
    }
};

int main() {
    dummy_buf buf{};
    std::cout << buf.in_avail() << std::endl;
}
```
* in_avail[color ff0000]

### 出力
```
10
```

## バージョン
### 言語
- C++98

## 参照
- [`egptr()`](egptr.md)
- [`gptr()`](gptr.md)
- [`showmanyc()`](showmanyc.md)
