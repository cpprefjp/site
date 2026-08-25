# showmanyc
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual streamsize showmanyc();  // (1) C++98
  streamsize showmanyc() override; // (1) C++17
```
* streamsize[link /reference/ios/type-streamsize.md]

## 概要
ブロックせずに読み取れると期待される文字数を得る。

このメンバ関数は`protected`であり、[`std::basic_streambuf`](/reference/streambuf/basic_streambuf.md)の`public`メンバ関数[`in_avail()`](/reference/streambuf/basic_streambuf/in_avail.md)を通して間接的に呼び出される。


## 効果
[`basic_streambuf::showmanyc()`](/reference/streambuf/basic_streambuf/showmanyc.md)と同じ動作をする。


## 戻り値
[`basic_streambuf::showmanyc()`](/reference/streambuf/basic_streambuf/showmanyc.md)と同じ。


## 備考
処理系は、入力シーケンスからさらに文字を読み取れるかどうかを判断できる場合、この関数シグニチャに対するオーバーライド定義を提供してもよい。


## 例
```cpp example
#include <iostream>
#include <fstream>

int main()
{
  {
    std::filebuf out;
    out.open("test.txt", std::ios_base::out);
    out.sputn("ABCDE", 5);
  }

  std::filebuf buf;
  buf.open("test.txt", std::ios_base::in);

  // get領域に文字を読み込む
  buf.sgetc();

  // 読み込み済みの領域に残っている文字数を得る
  std::cout << (buf.in_avail() > 0) << std::endl;
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* out.open[link open.md]
* buf.open[link open.md]
* out.sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* buf.sgetc()[link /reference/streambuf/basic_streambuf/sgetc.md]
* buf.in_avail()[link /reference/streambuf/basic_streambuf/in_avail.md]

### 出力
```
1
```

## バージョン
### 言語
- C++98


## 関連項目
- [`basic_streambuf::showmanyc`](/reference/streambuf/basic_streambuf/showmanyc.md)
- [`basic_streambuf::in_avail`](/reference/streambuf/basic_streambuf/in_avail.md)
