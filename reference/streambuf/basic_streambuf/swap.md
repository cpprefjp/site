# swap
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    void swap(basic_streambuf& rhs);

    ……
  };
}
```

## 概要
rhsと値を交換する。

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
    void swap(dummy_buf& rhs) {
        // ベースクラスのswap()を呼ぶ
        std::streambuf::swap(rhs);
    }
};

int main(void) {
    dummy_buf buf1{};
    dummy_buf buf2{};
    std::cout << char(buf1.sbumpc()) << std::endl;
    buf2.swap(buf1);
    std::cout << char(buf2.sbumpc()) << std::endl;
}
```
* std::streambuf::swap[color ff0000]

### 出力
```
A
B
```

## バージョン
### 言語
- C++98
