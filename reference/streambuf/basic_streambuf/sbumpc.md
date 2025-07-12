# sbumpc
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    int_type sbumpc();

    ……
  };
}
```

## 概要
入力列の現在位置の文字を読み取り、現在位置を1文字進める。

## 効果
- 読み取り可能な文字列が存在する場合、現在位置の文字を返し、また、現在位置を1つ進める。
- それ以外の場合、[`uflow()`](uflow.md)を呼ぶ。

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
    std::cout << char(buf.sbumpc()) << std::endl;  // 1文字目の’A'を読み取り、現在位置を1つ進める
    std::cout << buf.in_avail() << std::endl;
}
```
* sbumpc[color ff0000]

### 出力
```
10
A
9
```

## バージョン
### 言語
- C++98

## 参照
- [`uflow()`](uflow.md)
