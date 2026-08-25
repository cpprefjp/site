# underflow
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int_type underflow();  // (1) C++98
  int_type underflow() override; // (1) C++17
```

## 概要
入力部分列に文字がない場合に、ファイルから文字を読み込む。

このメンバ関数は`protected`であり、[`sgetc()`](/reference/streambuf/basic_streambuf/sgetc.md)などのpublicメンバ関数を通して間接的に呼び出される。


## 効果
[`basic_streambuf::underflow()`](/reference/streambuf/basic_streambuf/underflow.md)の規定に従う。ただし`basic_filebuf`では、入力シーケンスからの文字の読み取りが、ファイルから内部バッファ（下記の`extern_buf`）へ読み込み、それを以下のように変換したかのように行われる。

```cpp
char         extern_buf[XSIZE];
const char*  extern_end;
charT        intern_buf[ISIZE];
charT*       intern_end;
codecvt_base::result r =
  a_codecvt.in(state, extern_buf, extern_buf+XSIZE, extern_end,
               intern_buf, intern_buf+ISIZE, intern_end);
```
* codecvt_base::result[link /reference/locale/codecvt_base.md]
* a_codecvt.in[link /reference/locale/codecvt/in.md]

ここで`a_codecvt`は、このストリームバッファに設定されているロケールの[`codecvt`](/reference/locale/codecvt.md)ファセットである。

この変換は、`intern_buf`と`intern_end`の間の各文字に対応する位置（`fpos_t`）をクラスが復元できるような方法で行われる。`r`の値が`a_codecvt.in()`が`intern_buf`の領域を使い切ったことを示す場合は、より大きな`intern_buf`で再試行する。


## 戻り値
[`basic_streambuf::underflow()`](/reference/streambuf/basic_streambuf/underflow.md)と同じ。読み取りに成功した場合は次に読み取られる文字を、失敗した場合は[`Traits::eof()`](/reference/string/char_traits/eof.md)を返す。


## 例
```cpp example
#include <iostream>
#include <fstream>

// basic_filebufを継承して、protectedなunderflowの呼び出しを観測する
struct my_filebuf : std::filebuf {
protected:
  int_type underflow() override
  {
    std::cout << "underflow" << std::endl;
    return std::filebuf::underflow();
  }
};

int main()
{
  {
    std::filebuf out;
    out.open("test.txt", std::ios_base::out);
    out.sputn("AB", 2);
  }

  my_filebuf buf;
  buf.open("test.txt", std::ios_base::in);

  // get領域が空なので、underflow()が呼ばれる
  std::cout << static_cast<char>(buf.sgetc()) << std::endl;

  // 既に読み込み済みなので、underflow()は呼ばれない
  std::cout << static_cast<char>(buf.sgetc()) << std::endl;
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* underflow[color ff0000]
* out.open[link open.md]
* buf.open[link open.md]
* out.sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* buf.sgetc()[link /reference/streambuf/basic_streambuf/sgetc.md]

### 出力
```
underflow
A
A
```

## バージョン
### 言語
- C++98


## 関連項目
- [`basic_filebuf::uflow`](uflow.md)
- [`basic_streambuf::underflow`](/reference/streambuf/basic_streambuf/underflow.md)
- [`codecvt`](/reference/locale/codecvt.md)
