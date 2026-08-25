# overflow
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int_type overflow(int_type c = traits::eof());  // (1) C++98
  int_type overflow(int_type c = traits::eof()) override; // (1) C++17
```

## 概要
出力部分列の領域を消費し切った際に、蓄えられた文字をファイルへ書き出す。

このメンバ関数は`protected`であり、[`sputc()`](/reference/streambuf/basic_streambuf/sputc.md)などのpublicメンバ関数を通して間接的に呼び出される。


## 効果
[`basic_streambuf::overflow(c)`](/reference/streambuf/basic_streambuf/overflow.md)の規定に従う。ただし`basic_filebuf`では「文字を消費する」動作が、まず以下のように変換を行ったうえで実施される。

```cpp
charT*       b = pbase();
charT*       p = pptr();
const charT* end;
char         xbuf[XSIZE];
char*        xbuf_end;
codecvt_base::result r =
  a_codecvt.out(state, b, p, end, xbuf, xbuf+XSIZE, xbuf_end);
```
* pbase()[link /reference/streambuf/basic_streambuf/pbase.md]
* pptr()[link /reference/streambuf/basic_streambuf/pptr.md]
* codecvt_base::result[link /reference/locale/codecvt_base.md]
* a_codecvt.out[link /reference/locale/codecvt/out.md]

ここで`a_codecvt`は、このストリームバッファに設定されているロケールの[`codecvt`](/reference/locale/codecvt.md)ファセットである。変換結果`r`に応じて、以下のように動作する。

- `r == codecvt_base::error`の場合、失敗する
- `r == codecvt_base::noconv`の場合、`b`から`p`の直前までの文字を出力する
- `r == codecvt_base::partial`の場合、`xbuf`から`xbuf_end`までの文字をファイルへ出力し、`end`から`p`までの文字を使って繰り返す。出力に失敗した場合は（繰り返さずに）失敗する
- それ以外の場合、`xbuf`から`xbuf_end`までを出力し、出力に失敗したら失敗する。この時点で`b != p`かつ`b == end`である（`xbuf`の領域が足りない）場合は、`XSIZE`を増やして最初から繰り返す

その後、観測可能なチェックポイントを設定する。


## 戻り値
- 成功した場合、[`Traits::not_eof`](/reference/string/char_traits/not_eof.md)`(c)`
- 失敗した場合、[`Traits::eof()`](/reference/string/char_traits/eof.md)

[`is_open()`](is_open.md)`== false`である場合、この関数は常に失敗する。


## 例
```cpp example
#include <iostream>
#include <fstream>

// basic_filebufを継承して、protectedなoverflowの呼び出しを観測する
struct my_filebuf : std::filebuf {
protected:
  int_type overflow(int_type c) override
  {
    std::cout << "overflow" << std::endl;
    return std::filebuf::overflow(c);
  }
};

int main()
{
  my_filebuf buf;
  buf.open("test.txt", std::ios_base::out);

  // 出力領域を持たない状態で書き込むため、overflow()が呼ばれる
  buf.sputc('A');

  // 書き出しのために、closeからもoverflow()が呼ばれる
  buf.close();
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* overflow[color ff0000]
* buf.open[link open.md]
* buf.close()[link close.md]
* buf.sputc[link /reference/streambuf/basic_streambuf/sputc.md]

### 出力例
```
overflow
overflow
```

## バージョン
### 言語
- C++98


## 関連項目
- [`basic_filebuf::sync`](sync.md)
- [`basic_filebuf::close`](close.md)
- [`basic_streambuf::overflow`](/reference/streambuf/basic_streambuf/overflow.md)
- [`codecvt`](/reference/locale/codecvt.md)
