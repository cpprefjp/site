# operator=
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
basic_filebuf& operator=(const basic_filebuf&) = delete; // (1) C++11
basic_filebuf& operator=(basic_filebuf&& rhs);           // (2) C++11
```

## 概要
- (1) : コピー代入。この演算子は`delete`定義されており、`basic_filebuf`オブジェクトはコピーできない
- (2) : ムーブ代入。`rhs`が管理していたファイルの所有権を`*this`に移動する


## 効果
- (2) : [`close()`](close.md)を呼び出したのち、`rhs`からムーブ代入する


## 事後条件
- (2) : `*this`は、`rhs`からムーブ構築された場合と同じ観測可能な状態を持つ。詳細は[コンストラクタ](op_constructor.md)を参照
    - `rhs`は、いかなるファイルも参照しない状態（[`is_open()`](is_open.md)`== false`）となる


## 戻り値
- (2) : `*this`


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

  std::filebuf a;
  a.open("test.txt", std::ios_base::in);

  std::filebuf b;
  b = std::move(a); // aが開いていたファイルをbに移動する

  std::cout << std::boolalpha
            << a.is_open() << ' '
            << b.is_open() << std::endl;

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
false true
H
```

## バージョン
### 言語
- C++11


## 関連項目
- [`basic_filebuf`のコンストラクタ](op_constructor.md)
- [`basic_filebuf::swap`](swap.md)
