# sgetn
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    streamsize sgetn(char_type* s, streamsize n);

    ……
  };
}
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
入力列から複数文字を読み取る。

## 戻り値
[`xsgetn`](xsgetn.md)`(s, n)`。

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
    char dump[4] = {};

    buf.sgetn(dump, 3);  // 最初の3文字を読み取る
    std::cout << dump << std::endl;
    std::cout << buf.in_avail() << std::endl;  // 現在位置は3進んでいる
}
```
* sgetn[color ff0000]

### 出力
```
ABC
7
```

## バージョン
### 言語
- C++98

## 参照
- [`xsgetn()`](xsgetn.md)
