# setg
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    void setg(char_type* gbeg, char_type* gnext, char_type* gend);

    ……
  };
}
```

## 概要
入力部分列の各ポインタを設定する。

## 事後条件
`gbeg == `[`eback()`](eback.md) および `gnext == `[`gptr()`](gptr.md) および `gend == `[`egptr()`](egptr.md)。

## 例
```cpp example
#include <iostream>
#include <streambuf>

// streambufを継承したクラス
class dummy_buf : public std::streambuf {
    char space_[10] = {'A', 'B', 'C'};
public:
    dummy_buf(void) {
        // 入力列に配列を設定
        setg(space_, space_, space_ + 10);
    }
};

int main(void) {
    dummy_buf buf{};
    std::cout << char(buf.sgetc()) << std::endl;  // 現在位置の文字を読み取る
}
```
* setg[color ff0000]

### 出力
```
A
```

## バージョン
### 言語
- C++98

## 参照
- [`eback()`](eback.md)
- [`gptr()`](gptr.md)
- [`egptr()`](egptr.md)
