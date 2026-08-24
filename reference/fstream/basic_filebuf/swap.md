# swap
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(basic_filebuf& rhs); // (1) C++11
```

## 概要
`rhs`との間で、値を交換する。


## 効果
`*this`と`rhs`の状態を交換する。開いているファイル、オープンモード、ロケール、バッファのいずれもが交換対象である。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <fstream>

int main()
{
  {
    std::filebuf out;
    out.open("a.txt", std::ios_base::out);
    out.sputn("A", 1);
  }
  {
    std::filebuf out;
    out.open("b.txt", std::ios_base::out);
    out.sputn("B", 1);
  }

  std::filebuf a;
  a.open("a.txt", std::ios_base::in);

  std::filebuf b;
  b.open("b.txt", std::ios_base::in);

  a.swap(b);

  std::cout << static_cast<char>(a.sbumpc()) << std::endl;
  std::cout << static_cast<char>(b.sbumpc()) << std::endl;
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* a.swap[color ff0000]
* out.open[link open.md]
* a.open[link open.md]
* b.open[link open.md]
* out.sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* a.sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]
* b.sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]

### 出力
```
B
A
```

## バージョン
### 言語
- C++11


## 関連項目
- [`swap` (非メンバ関数)](swap_free.md)
- [`basic_filebuf::operator=`](op_assign.md)
