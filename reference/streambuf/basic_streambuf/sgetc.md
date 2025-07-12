# sgetc
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    int_type sgetc();

    ……
  };
}
```

## 概要
入力列の現在位置の文字を読み取る。

## 戻り値
- 読み取り可能な文字列が存在する場合、現在位置の文字。
- それ以外の場合、[`underflow()`](underflow.md)を返す。

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
    std::cout << char(buf.sgetc()) << std::endl;  // 現在位置の文字を読み取る
}
```
* sgetc[color ff0000]

### 出力
```
A
```

## バージョン
### 言語
- C++98

## 参照
- [`underflow()`](underflow.md)
