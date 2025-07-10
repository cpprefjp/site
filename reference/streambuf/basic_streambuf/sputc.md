# sputc
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    int_type sputc(char_type c);

    ……
  };
}
```

## 概要
出力列に1文字書き込む。

## 効果
- 出力列が存在する場合、現在位置に`c`を書き込み、現在位置を1つ進める。
- それ以外の場合、[`overflow()`](overflow.md)を呼ぶ。

## 戻り値
- 出力列が存在する場合、[`Traits::to_int_type`](../../string/char_traits/to_int_type.md)`(c)`。
- それ以外の場合、[`overflow()`](overflow.md)の戻り値を返す。

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
};

int main() {
    char space[10] = {};
    {
        dummy_buf buf{space, space};  // 空の領域を指定
        std::cout << buf.sputc('A') << std::endl;  // 書き込みは失敗
    }
    {
        dummy_buf buf{space, space + 10};
        std::cout << buf.sputc('A') << " "  // 3文字書き込む
                  << buf.sputc('B') << " "
                  << buf.sputc('C') << std::endl;
        std::cout << space << std::endl;  // 書き込んだ文字列を出力
    }
}
```
* sputc[color ff0000]

### 出力
```
-1
65 66 67
ABC
```

## バージョン
### 言語
- C++98

## 参照
- [`overflow()`](overflow.md)
