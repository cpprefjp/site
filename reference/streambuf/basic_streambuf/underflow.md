# underflow
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual int_type underflow();

    ……
  };
}
```

## 概要
入力部分列の領域を消費し切った際の処理。

## 効果
デフォルトの動作は[`Traits::eof()`](../../string/char_traits/eof.md)を返すのみ。（この関数をオーバーライドすることで、関数内で改めて[`setg()`](setg.md)を呼んで別の入力部分列を指し直す、のような処理を追加できる。）

## 戻り値
[`Traits::eof()`](../../string/char_traits/eof.md)。

## 備考
入力部分列の領域を消費し切った状態で[`sgetc()`](sgetc.md)を呼ぶと、`underflow()`が呼ばれる。

## 例
```cpp example
#include <iostream>
#include <streambuf>

// streambufを継承したクラス
class dummy_buf : public std::streambuf {
    char space_[10] = {'A', 'B'};
public:
    dummy_buf(void) {
        // 入力列に配列を設定
        setg(space_, space_, space_ + 2);
    }
protected:
    int_type underflow(void) override {
        std::cout << "underflow" << std::endl;
        // ベースクラスのunderflow()を呼ぶ
        return std::streambuf::underflow();
    }
};

int main() {
    dummy_buf buf{};
    std::cout << buf.sgetc() << std::endl;  // 1文字目の’A'を読み取る
    buf.sbumpc();  // 1文字進める
    buf.sbumpc();  // 1文字進める
    std::cout << buf.sgetc() << std::endl;  // 文字の読み取りに失敗。underflow()が呼ばれ、Traits::eof()が返る
}
```
* std::streambuf::underflow[color ff0000]

### 出力
```
65
underflow
-1
```

## バージョン
### 言語
- C++98

## 参照
- [`uflow()`](uflow.md)
