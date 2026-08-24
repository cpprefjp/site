# コンストラクタ
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
basic_filebuf();                                  // (1) C++98
basic_filebuf(const basic_filebuf&) = delete;     // (2) C++11
basic_filebuf(basic_filebuf&& rhs);               // (3) C++11
```

## 概要
オブジェクトを構築する。

- (1) : デフォルト構築。ファイルを開いていない状態のオブジェクトを構築する
- (2) : コピー構築。この関数は`delete`定義されており、`basic_filebuf`オブジェクトはコピーできない
- (3) : ムーブ構築。`rhs`が開いていたファイルの所有権を`*this`に移動する


## 効果
- (1) : 基底クラスを[`basic_streambuf<CharT, Traits>()`](/reference/streambuf/basic_streambuf/op_constructor.md)で初期化する
- (3) :
    - `*this`のシーケンスポインタ（[`eback()`](/reference/streambuf/basic_streambuf/eback.md), [`gptr()`](/reference/streambuf/basic_streambuf/gptr.md), [`egptr()`](/reference/streambuf/basic_streambuf/egptr.md), [`pbase()`](/reference/streambuf/basic_streambuf/pbase.md), [`pptr()`](/reference/streambuf/basic_streambuf/pptr.md), [`epptr()`](/reference/streambuf/basic_streambuf/epptr.md)）が`rhs`の持っていた値を得るかどうかは、処理系定義である
    - それらの値を得るかどうかに関わらず、構築後の`*this`と`rhs`は（存在する場合）別々のバッファを参照する
    - `*this`は構築前に`rhs`が参照していたファイルを参照し、`rhs`は構築後にいかなるファイルも参照しない
    - `rhs`のオープンモード、ロケール、その他の状態もコピーされる


## 事後条件
- (1) : [`is_open()`](is_open.md)`== false`
- (3) : コンストラクタ呼び出し前の`rhs`の状態を`rhs_p`、呼び出し後の`rhs`の状態を`rhs_a`と表記する
    - [`is_open()`](is_open.md)`== rhs_p.`[`is_open()`](is_open.md)
    - `rhs_a.`[`is_open()`](is_open.md)`== false`
    - `gptr() - eback() == rhs_p.gptr() - rhs_p.eback()`
    - `egptr() - eback() == rhs_p.egptr() - rhs_p.eback()`
    - `pptr() - pbase() == rhs_p.pptr() - rhs_p.pbase()`
    - `epptr() - pbase() == rhs_p.epptr() - rhs_p.pbase()`
    - `eback()`が非ヌルの場合、`eback() != rhs_a.eback()`
    - `gptr()`が非ヌルの場合、`gptr() != rhs_a.gptr()`
    - `egptr()`が非ヌルの場合、`egptr() != rhs_a.egptr()`
    - `pbase()`が非ヌルの場合、`pbase() != rhs_a.pbase()`
    - `pptr()`が非ヌルの場合、`pptr() != rhs_a.pptr()`
    - `epptr()`が非ヌルの場合、`epptr() != rhs_a.epptr()`


## 例
```cpp example
#include <iostream>
#include <fstream>
#include <utility>

int main()
{
  {
    std::filebuf out;
    out.open("test.txt", std::ios_base::out);
    out.sputn("Hello", 5);
  }

  // (1) ファイルを開いていない状態で構築する
  std::filebuf a;
  std::cout << std::boolalpha << a.is_open() << std::endl;

  a.open("test.txt", std::ios_base::in);

  // (3) aが開いていたファイルをbに移動する
  std::filebuf b = std::move(a);

  std::cout << a.is_open() << ' ' << b.is_open() << std::endl;
  std::cout << static_cast<char>(b.sbumpc()) << std::endl;
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* out.open[link open.md]
* a.open[link open.md]
* a.is_open()[link is_open.md]
* b.is_open()[link is_open.md]
* out.sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* b.sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]
* std::move[link /reference/utility/move.md]

### 出力
```
false
false true
H
```

## バージョン
### 言語
- C++98


## 関連項目
- [`basic_filebuf::operator=`](op_assign.md)
- [`basic_filebuf::open`](open.md)
