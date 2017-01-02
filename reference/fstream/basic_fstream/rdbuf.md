#rdbuf
* fstream[meta header]
* std[meta namespace]
* basic_fstream[meta class]
* function[meta id-type]

```cpp
basic_filebuf<CharT, Traits>* rdbuf() const;
```
* basic_filebuf[link ../basic_filebuf.md]

##概要
ストリームバッファオブジェクトを取得する。

`basic_fstream`は内部に`basic_filebuf`オブジェクトを保有しているため、基底クラス`basic_ios`の同名のメンバー関数と以下の点で異なる。

- 値を取得するための関数のみ存在する。これに対して、`basic_ios::rdbuf`関数では、値の取得・設定でオーバーロードされている。
- 戻り値の型が`basic_filebuf`へのポインタに変更されている。

##戻り値
- `*this`が内部で保有しているストリームバッファ（[`basic_filebuf`](../basic_filebuf.md)）オブジェクトへのポインタ。

##例
```cpp
#include <istream> // std::iostream用
#include <fstream>

int main()
{
  std::fstream fs("foo");
  std::filebuf* buf = fs.rdbuf();

  std::iostream ios(buf); // fs.rdbufで得たオブジェクトを元に、別のiostreamオブジェクトを構築。
  int i;
  ios >> i;

  ios.seekg(0, std::ios_base::beg);
  ios << "ABC" << std::endl;
}
```
* istream[link ../../istream.md]
* fstream[link ../../fstream.md]
* filebuf[link ../basic_filebuf.md]
* rdbuf[color ff0000]
* iostream[link ../../istream/basic_iostream.md]
* seekg[link ../../istream/basic_istream/seekg.md]
* ios_base[link ../../ios/ios_base.md]
* beg[link ../../ios/ios_base/type-seekdir.md]
* endl[link ../../ostream/endl.md]

##バージョン
###言語
- C++98

##参照
- [`basic_ios::rdbuf`](../../ios/basic_ios/rdbuf.md): 基底クラスに存在する同名のメンバー関数。
