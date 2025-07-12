# gptr
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    char_type* gptr() const;

    ……
  };
}
```

## 概要
入力部分列の現在位置へのポインタを返す。

## 戻り値
入力部分列の現在位置へのポインタ。

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
    char_type* gptr(void) const {
        // ベースクラスのgptr()を呼ぶ
        return std::streambuf::gptr();
    }
};

int main() {
    dummy_buf buf{};
    std::cout << *buf.gptr() << std::endl;  // 現在位置のポインタにアクセス
    buf.snextc();  // 現在位置を1つ進める
    std::cout << *buf.gptr() << std::endl;  // 現在位置のポインタにアクセス
}
```
* std::streambuf::gptr[color ff0000]

### 出力
```
A
B
```

## バージョン
### 言語
- C++98

## 参照
- [`eback()`](eback.md)
- [`egptr()`](egptr.md)
