# uflow
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int_type uflow();  // (1) C++03
  int_type uflow() override; // (1) C++17
```

## 概要
入力部分列に文字がない場合に、ファイルから文字を読み込み、読み取り位置を進める。

このメンバ関数は`protected`であり、[`sbumpc()`](/reference/streambuf/basic_streambuf/sbumpc.md)などのpublicメンバ関数を通して間接的に呼び出される。


## 効果
[`basic_streambuf::uflow()`](/reference/streambuf/basic_streambuf/uflow.md)の規定に従う。ただし`basic_filebuf`では、入力からの文字の読み取りが[`underflow()`](underflow.md)と同じ方法（[`codecvt`](/reference/locale/codecvt.md)ファセットによる変換）で行われる。


## 戻り値
[`basic_streambuf::uflow()`](/reference/streambuf/basic_streambuf/uflow.md)と同じ。読み取りに成功した場合はその文字を、失敗した場合は[`Traits::eof()`](/reference/string/char_traits/eof.md)を返す。


## 例
```cpp example
#include <iostream>
#include <fstream>

// basic_filebufを継承して、protectedなuflowの呼び出しを観測する
struct my_filebuf : std::filebuf {
protected:
  int_type uflow() override
  {
    std::cout << "uflow" << std::endl;
    return std::filebuf::uflow();
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

  // get領域が空なので、uflow()が呼ばれる
  std::cout << static_cast<char>(buf.sbumpc()) << std::endl;

  // 既に読み込み済みの領域から読み取るため、uflow()は呼ばれない
  std::cout << static_cast<char>(buf.sbumpc()) << std::endl;
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* uflow[color ff0000]
* out.open[link open.md]
* buf.open[link open.md]
* out.sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* buf.sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]

### 出力
```
uflow
A
B
```

## バージョン
### 言語
- C++98


## 関連項目
- [`basic_filebuf::underflow`](underflow.md)
- [`basic_streambuf::uflow`](/reference/streambuf/basic_streambuf/uflow.md)
