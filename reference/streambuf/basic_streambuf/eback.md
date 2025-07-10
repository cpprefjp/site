# eback
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    char_type* eback() const;

    ……
  };
}
```

## 概要
入力部分列の先頭へのポインタを返す。

## 戻り値
入力部分列の先頭へのポインタ。

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
    char_type* eback(void) const {
        // ベースクラスのeback()を呼ぶ
        return std::streambuf::eback();
    }
};

int main() {
    dummy_buf buf{};
    std::cout << *buf.eback() << std::endl;  // 先頭のポインタにアクセス
}
```
* std::streambuf::eback[color ff0000]

### 出力
```
A
```

## バージョン
### 言語
- C++98

## 参照
- [`gptr()`](gptr.md)
- [`egptr()`](egptr.md)
