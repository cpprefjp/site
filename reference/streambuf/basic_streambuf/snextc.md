# snextc
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    int_type snextc();

    ……
  };
}
```

## 概要
入力列の1文字を捨てて、次の文字を読み取る。

## 効果
[`sbumpc()`](sbumpc.md)を呼んで、1文字分読み進める。

## 戻り値
次の文字。文字データが尽きていれば、[`Traits::eof()`](../../string/char_traits/eof.md)を返す。

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

int main() {
    dummy_buf buf{};
    std::cout << buf.in_avail() << std::endl;
    std::cout << char(buf.snextc()) << std::endl;  // 1文字目の’A'を捨て、次の’B'を読み取る
    std::cout << buf.in_avail() << std::endl;
}
```
* snextc[color ff0000]

### 出力
```
10
B
9
```

## バージョン
### 言語
- C++98

## 参照
- [`sbumpc()`](sbumpc.md)
