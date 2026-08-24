# swap (非メンバ関数)
* fstream[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits>
  void swap(basic_filebuf<CharT, Traits>& x,
            basic_filebuf<CharT, Traits>& y); // (1) C++11
}
```

## 概要
2つの`basic_filebuf`オブジェクトの値を交換する。


## 効果
`x.`[`swap`](swap.md)`(y)`と等価


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

  std::swap(a, b);

  std::cout << static_cast<char>(a.sbumpc()) << std::endl;
  std::cout << static_cast<char>(b.sbumpc()) << std::endl;
}
```
* std::swap[color ff0000]
* std::filebuf[link /reference/fstream/basic_filebuf.md]
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
- [`basic_filebuf::swap`](swap.md)
