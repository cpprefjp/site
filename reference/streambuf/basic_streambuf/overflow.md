# overflow
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual int_type overflow(int_type c = Traits::eof());

    ……
  };
}
```

## 概要
出力部分列の領域を消費し切った際の処理。

## 効果
デフォルトの動作は[`Traits::eof()`](../../string/char_traits/eof.md)を返すのみ。（この関数をオーバーライドすることで、関数内で改めて[`setp()`](setp.md)を呼んで別の出力部分列を指し直す、のような処理を追加できる。）

## 戻り値
[`Traits::eof()`](../../string/char_traits/eof.md)。

## 備考
出力部分列の領域を消費し切った状態で[`sputc()`](sputc.md)を呼ぶと、overflow()が呼ばれる。[`sputn()`](sputn.md)がoverflow()を呼ぶかどうかは未規定。

## 例
```cpp example
#include <iostream>
#include <streambuf>

// streambufを継承したクラス
class dummy_buf : public std::streambuf {
public:
    dummy_buf(char* begin, char* end) {
        // 出力列の領域を指定
        setp(begin, end);
    }
protected:
    int_type overflow(int_type c) override {
        std::cout << "overflow" << std::endl;
        // ベースクラスのoverflow()を呼ぶ
        return std::streambuf::overflow(c);
    }
};

int main(void) {
    char space[10] = {};
    dummy_buf buf{space, space + 2};
    std::cout << buf.sputc('A') << std::endl;  // 'A'を書き込む
    std::cout << buf.sputc('B') << std::endl;  // 'B'を書き込む
    std::cout << buf.sputc('C') << std::endl;  // 'C'の書き込みに失敗。overflow()が呼ばれ、Traits::eof()が返る
}
```
* std::streambuf::overflow[color ff0000]

### 出力
```
65
66
overflow
-1
```

## バージョン
### 言語
- C++98

## 参照
- [`sputc()`](sputc.md)
