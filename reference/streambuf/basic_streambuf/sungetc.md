# sungetc
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  public:
    int_type sungetc();

    ……
  };
}
```

## 概要
直前に読み取った1文字を入力列に戻す。

## 効果
- 入力文字列の現在位置を1つ戻すことができる場合、現在位置を1つ戻す。
- それ以外の場合、[`pbackfail`](pbackfail.md)`(`[`Traits::to_int_type`](../../string/char_traits/to_int_type.md)`(c))`を呼ぶ。

## 戻り値
- 読み取り可能な文字列が存在する場合、更新された現在位置の[`Traits::to_int_type`](../../string/char_traits/to_int_type.md)`(*gptr())`。
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

    std::cout << char(buf.sgetc()) << std::endl;
    std::cout << buf.sungetc() << std::endl;  // 成功。現在位置が1つ戻る
    std::cout << char(buf.sgetc()) << std::endl;

    std::cout << buf.sungetc() << std::endl;  // 失敗（現在位置は既に先頭に達している）
}
```
* sungetc[color ff0000]

### 出力
```
B
65
A
-1
```

## バージョン
### 言語
- C++98

## 参照
- [`pbackfail()`](pbackfail.md)
