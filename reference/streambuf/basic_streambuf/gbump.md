# gbump
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    void gbump(int n);

    ……
  };
}
```

## 概要
入力部分列の現在位置を指定した量だけ進める。

## 効果
入力部分列の現在位置をnだけ進める。

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
    void gbump(int n) {
        // ベースクラスのgbump()を呼ぶ
        return std::streambuf::gbump(n);
    }
};

int main() {
    dummy_buf buf{};
    buf.gbump(2);  // 現在位置を2つ進める
    std::cout << char(buf.sgetc()) << std::endl;
}
```
* std::streambuf::gbump[color ff0000]

### 出力
```
C
```

## バージョン
### 言語
- C++98
