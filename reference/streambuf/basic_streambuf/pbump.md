# pbump
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    void pbump(int n);

    ……
  };
}
```

## 概要
出力部分列の現在位置を指定した量だけ進める。

## 効果
出力部分列の現在位置をnだけ進める。

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
    void pbump(int n) {
        // ベースクラスのpbump()を呼ぶ
        return std::streambuf::pbump(n);
    }
};

int main(void) {
    char space[10] = {};
    dummy_buf buf{space, space + 10};
    buf.pbump(2);  // 現在位置を2つ進める
    buf.sputc('A');  // 1文字書き込む
    std::cout << space[2] << std::endl;  // [2]に書き込まれた
}
```
* std::streambuf::pbump[color ff0000]

### 出力
```
A
```

## バージョン
### 言語
- C++98
