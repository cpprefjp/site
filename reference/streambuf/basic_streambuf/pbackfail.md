# pbackfail
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual int_type pbackfail(int_type c = Traits::eof());

    ……
  };
}
```

## 概要
1文字を入力列に戻す。

## 効果
[`sungetc()`](sungetc.md)や[`sputbackc()`](sputbackc.md)の中から、入力部分列の現在位置を戻すことができない時に呼ばれる。デフォルトの動作は[`Traits::eof()`](../../string/char_traits/eof.md)を返すのみ。

## 戻り値
[`Traits::eof()`](../../string/char_traits/eof.md)。

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
    int_type pbackfail(int_type c = traits_type::eof()) override {
        std::cout << "pbackfail" << std::endl;
        // ベースクラスのpbackfail()を呼ぶ
        return std::streambuf::pbackfail(c);
    }
};

int main(void) {
    dummy_buf buf{};
    buf.sbumpc();  // 現在位置を1つ進める

    std::cout << buf.sputbackc('A') << std::endl;  // sputbackc()成功
    std::cout << buf.sputbackc('Z') << std::endl;  // sputbackc()失敗
                                                   // sputbackc()の中でpbackfail()が呼ばれる
}
```
* std::streambuf::pbackfail[color ff0000]

### 出力
```
65
pbackfail
-1
```

## バージョン
### 言語
- C++98

## 参照
- [`sputbackc()`](sputbackc.md)
- [`sungetc()`](sungetc.md)
