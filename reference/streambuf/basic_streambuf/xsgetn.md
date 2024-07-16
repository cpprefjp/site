# xsgetn
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual streamsize xsgetn(char_type* s, streamsize n);

    ……
  };
}
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
入力列から複数文字を読み取る。

## 効果
入力列から`n`文字読み取り、`s`に格納する。入力列の読み取り可能領域が尽きれば、そこで読み取りを停止する。

## 戻り値
読み取った文字数。

## 例
```cpp example
#include <iostream>
#include <streambuf>

// streambufを継承したクラス
class dummy_buf : public std::streambuf {
    char space_[5] = {'A', 'B', 'C', 'D', 'E'};
public:
    dummy_buf(void) {
        // 入力列に配列を設定
        setg(space_, space_, space_ + 5);
    }
    std::streamsize xsgetn(char_type* s, std::streamsize n) override {
        // ベースクラスのxsgetn()を呼ぶ
        return std::streambuf::xsgetn(s, n);
    }
};

int main(void) {
    dummy_buf buf{};

    char dump1[4] = {};
    std::cout << buf.xsgetn(dump1, 3) << std::endl;  // 最初の3文字を読み取る
    std::cout << dump1 << std::endl;

    char dump2[4] = {};
    std::cout << buf.xsgetn(dump2, 3) << std::endl;  // 続く2文字のみ読み取る
    std::cout << dump2 << std::endl;
}
```
* std::streambuf::xsgetn[color ff0000]

### 出力
```
3
ABC
2
DE
```

## バージョン
### 言語
- C++98

## 参照
- [`sgetn()`](sgetn.md)
