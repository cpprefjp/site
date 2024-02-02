# uflow
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual int_type uflow();

    ……
  };
}
```

## 概要
入力部分列の領域を消費し切った際の処理。

## 効果
デフォルトの動作は[`overflow()`](overflow.md)を呼ぶ。

- [`overflow()`](overflow.md)の戻り値が[`Traits::eof()`](../../string/char_traits/eof.md)であれば、[`Traits::eof()`](../../string/char_traits/eof.md)を返すのみ。
- [`overflow()`](overflow.md)の戻り値が[`Traits::eof()`](../../string/char_traits/eof.md)でなければ、[`Traits::to_int_type`](../../string/char_traits/to_int_type.md)`(*`[`gptr()`](gptr.md)`)`を返しつつ、[`gptr()`](gptr.md)を一つ進める。

なお、[`overflow()`](overflow.md)はデフォルト動作では、常に[`Traits::eof()`](../../string/char_traits/eof.md)を返す。

## 備考
入力部分列の領域を消費し切った状態で[`sbumpc()`](sbumpc.md)を呼ぶと、`uflow()`が呼ばれる。

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
    int_type uflow(void) override {
        std::cout << "uflow" << std::endl;
        // ベースクラスのuflow()を呼ぶ
        return std::streambuf::uflow();
    }
};

int main(void) {
    dummy_buf buf{};
    std::cout << buf.sbumpc() << std::endl;  // 1文字目の’A'を読み取る
    std::cout << buf.sbumpc() << std::endl;  // 2文字目の’B'を読み取る
    std::cout << buf.sbumpc() << std::endl;  // 文字の読み取りに失敗。uflow()が呼ばれ、Traits::eof()が返る
}
```
* std::streambuf::uflow[color ff0000]

### 出力
```
65
66
uflow
-1
```

## バージョン
### 言語
- C++98

## 参照
- [`underflow()`](underflow.md)
