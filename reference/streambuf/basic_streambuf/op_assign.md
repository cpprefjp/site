# operator=
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
    basic_streambuf& operator=(const basic_streambuf& rhs);

    ……
  };
}
```

## 概要
入力部分列ポインタ、出力部分列ポインタ、ロケールをコピーする。

## 事後条件
- [`eback()`](eback.md) == `rhs.`[`eback()`](eback.md)
- [`gptr()`](gptr.md) == `rhs.`[`gptr()`](gptr.md)
- [`egptr()`](egptr.md) == `rhs.`[`egptr()`](egptr.md)
- [`pbase()`](pbase.md) == `rhs.`[`pbase()`](pbase.md)
- [`pptr()`](pptr.md) == `rhs.`[`pptr()`](pptr.md)
- [`epptr()`](epptr.md) == `rhs.`[`epptr()`](epptr.md)
- [`getloc()`](getloc.md) == `rhs.`[`getloc()`](getloc.md)

## 戻り値
*this。

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
    void copy(const dummy_buf& rhs) {
        // ベースクラスのoperator=を呼ぶ
        std::streambuf::operator=(rhs);
    }
};

int main() {
    dummy_buf buf1{};
    dummy_buf buf2{};
    std::cout << char(buf1.sbumpc()) << std::endl;
    buf2.copy(buf1);
    std::cout << char(buf2.sbumpc()) << std::endl;
}
```
* std::streambuf::operator=[color ff0000]

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
- [`gptr()`](gptr.md)
- [`egptr()`](egptr.md)
- [`pbase()`](pbase.md)
- [`pptr()`](pptr.md)
- [`epptr()`](epptr.md)
- [`getloc()`](getloc.md)
