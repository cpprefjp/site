# showmanyc
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual streamsize showmanyc();

    ……
  };
}
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
ブロックせずに読み取れると期待される文字数を得る。

## 効果
デフォルトの動作は 0 を返すのみ。（入力部分列以外の領域がある場合、この関数をオーバーライドすることで、入力部分列以外の領域のサイズを返すようにする。）

## 戻り値
0。

## 例
```cpp example
#include <iostream>
#include <streambuf>

// streambufを継承したクラス
class dummy_buf : public std::streambuf {
    char space_[10] = {};
public:
    dummy_buf(void) {
        // 入力列に配列を設定
        setg(space_, space_, space_ + 2);
    }
    std::streamsize showmanyc(void) override {
        std::cout << "showmanyc" << std::endl;
        // ベースクラスのshowmanyc()を呼ぶ
        return std::streambuf::showmanyc();
    }
};

int main(void) {
    dummy_buf buf{};
    std::cout << buf.in_avail() << std::endl;  // 残2文字
    buf.sbumpc();  //　1文字進める
    buf.sbumpc();  //　1文字進める
    std::cout << buf.in_avail() << std::endl;  // 残0文字。in_avail()からshowmanyc()が呼ばれる
}
```
* std::streambuf::showmanyc[color ff0000]

### 出力
```
2
showmanyc
0
```

## バージョン
### 言語
- C++98

## 参照
- [`in_avail()`](in_avail.md)
