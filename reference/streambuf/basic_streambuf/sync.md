# sync
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual int sync();

    ……
  };
}
```

## 概要
出力列の同期。

## 効果
デフォルトの動作は 0 を返すのみ。（オーバーライドした関数では、flushに相当する動作をすることが求められる。）

## 戻り値
0。

## 例
```cpp example
#include <iostream>
#include <streambuf>

// streambufを継承したクラス
class dummy_buf : public std::streambuf {
public:
    dummy_buf(void) {
    }
protected:
    virtual int sync(void) override {
        std::cout << "sync" << std::endl;
        // ベースクラスのsync()を呼ぶ
        return std::streambuf::sync();
    }
};

int main() {
    dummy_buf buf;
    buf.pubsync();  // pubsync()を介してsync()を呼ぶ
}
```
* std::streambuf::sync[color ff0000]

## バージョン
### 言語
- C++98

## 参照
- [`pubsync()`](pubsync.md)
