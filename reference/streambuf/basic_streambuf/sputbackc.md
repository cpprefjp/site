# sputbackc
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    int_type sputbackc(char_type c);

    ……
  };
}
```

## 概要
任意の1文字を入力列に戻す。

## 効果
- 入力文字列の現在位置を1つ戻すことができ、かつ、1つ戻った位置の値が`c`と等しければ、現在位置を1つ戻す。
- それ以外の場合、[`pbackfail`](pbackfail.md)`(`[`Traits::to_int_type`](../../string/char_traits/to_int_type.md)`(c))`を呼ぶ。

## 戻り値
- 入力文字列の現在位置を1つ戻すことができ、かつ、1つ戻った位置の値が`c`と等しければ、[`Traits::to_int_type`](../../string/char_traits/to_int_type.md)`(c)`。
- それ以外の場合、[`pbackfail`](pbackfail.md)`(`[`Traits::to_int_type`](../../string/char_traits/to_int_type.md)`(c))`の戻り値を返す。

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

int main(void) {
    dummy_buf buf{};
    buf.sbumpc();  // 現在位置を1つ進める

    std::cout << buf.sputbackc('Z') << std::endl;  // 失敗（1つ前の値は’A'）

    std::cout << buf.sputbackc('A') << std::endl;  // 成功。現在位置が1つ戻る
    std::cout << char(buf.sgetc()) << std::endl;
}
```
* sputbackc[color ff0000]

### 出力
```
-1
65
A
```

## バージョン
### 言語
- C++98

## 参照
- [`pbackfail()`](pbackfail.md)
