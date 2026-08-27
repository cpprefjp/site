# xsputn
* streambuf[meta header]
* std[meta namespace]
* basic_streambuf[meta class]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf {
  protected:
    virtual streamsize xsputn(const char_type* s, streamsize n);

    ……
  };
}
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
出力列に複数文字を書き込む。

## 効果
`s`から`n`文字を、[`sputc()`](sputc.md)を繰り返し呼び出したかのようにして出力列に書き込む。`n`文字を書き込むか、[`sputc()`](sputc.md)の呼び出しが[`Traits::eof()`](/reference/string/char_traits/eof.md)を返す状況になった時点で、書き込みを停止する。


## 戻り値
書き込んだ文字数。


## 備考
- `pptr() == epptr()`となった時点でこの関数が[`overflow()`](overflow.md)を呼び出すか、それとも別の手段で同じ効果を実現するかは、未規定である。
    - そのため、派生クラスで[`overflow()`](overflow.md)のみをオーバーライドしても、`xsputn()`経由の出力でそれが呼ばれるとは限らない。効率のために`xsputn()`自体をオーバーライドする処理系があるためである。


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
    std::streamsize xsputn(const char_type* s, std::streamsize n) override {
        // ベースクラスのxsputn()を呼ぶ
        return std::streambuf::xsputn(s, n);
    }
};

int main() {
    char space[10] = {};
    dummy_buf buf{space, space + 5};
    std::cout << buf.xsputn("ABC", 3) << std::endl;  // 3文字全て書き込む
    std::cout << buf.xsputn("ABC", 3) << std::endl;  // 2文字のみ書き込む
    std::cout << space << std::endl;  // 書き込んだ文字列を出力
}
```
* std::streambuf::xsputn[color ff0000]

### 出力
```
3
2
ABCAB
```

## バージョン
### 言語
- C++98

## 関連項目
- [`sputn()`](sputn.md)


## 参照
- [LWG Issue 565. `xsputn` inefficient](https://cplusplus.github.io/LWG/issue565)
    - C++11で、`pptr() == epptr()`となったときに[`overflow()`](overflow.md)を呼び出すかどうかが未規定であると明記された。デバイスへ直接書き出すなど、`sputc()`や`overflow()`を経由しない効率的な実装を許すためであり、それ以前も同様の実装が行われていた
