# seekdir
* ios[meta header]
* type-alias[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
using seekdir = T4;
```
* T4[italic]

*`T4`* は処理系定義の型。

## 概要
`seekdir` はストリームのシークの起点を指定するための列挙型である。  
`seekdir` には以下の表のような値が�在し、全て [`ios_base`](../ios_base.md) の静的メンバ定数として定義されている。

| 定数 | 意味 |
|------|----------------------|
| `beg` | ストリームの先�を基準にシークするように要求する。（begin の略） |
| `cur` | ストリームの現在位置を基準にシークするように要求する。（current の略） |
| `end` | ストリームの現在の終端を基準にシークするように要求する。 |


## 例
### stringstream の例
```cpp example
#include <iostream>
#include <sstream>

void seek(std::ios_base::seekdir dir)
{
  std::ostringstream oss("cpprefjp", std::ios_base::out);
  oss << "ABC" << std::flush;
  oss.seekp(0, dir);
  oss << "YZ" << std::flush;
  std::cout << oss.str() << '\n';
}

int main()
{
  seek(std::ios_base::beg);
  seek(std::ios_base::cur);
  seek(std::ios_base::end);
}
```
* std::ios_base[link ../ios_base.md]
* std::ostringstream[link ../../sstream/basic_ostringstream.md.nolink]
* seekp[link ../../ostream/basic_ostream/seekp.md]
* std::flush[link ../../ostream/flush.md]
* str()[link ../../sstream/basic_ostringstream/str.md.nolink]
* out[link type-openmode.md]
* seekdir[color ff0000]
* beg[color ff0000]
* cur[color ff0000]
* end[color ff0000]

### 出力
```
YZCrefjp
ABCYZfjp
ABCrefjpYZ
```

### fstream の例
```cpp example
#include <iostream>
#include <fstream>
#include <string>

void seek(std::ios_base::seekdir dir)
{
  static const char filename[] = "test.txt";

  {
    std::fstream ofs(filename, std::ios_base::out);
    ofs << "cpprefjp";
  }
  {
    std::ofstream ofs(filename, std::ios_base::in | std::ios_base::out);
    ofs << "ABC" << std::flush;
    ofs.seekp(0, dir);
    ofs << "YZ" << std::flush;
  }
  {
    std::string s;
    std::ifstream ifs(filename, std::ios_base::in);
    ifs >> s;
    std::cout << s << '\n';
  }
}

int main()
{
  seek(std::ios_base::beg);
  seek(std::ios_base::cur);
  seek(std::ios_base::end);
}
```
* std::ios_base[link ../ios_base.md]
* std::fstream[link ../../fstream/basic_fstream.md]
* std::ofstream[link ../../fstream/basic_ofstream.md]
* std::ifstream[link ../../fstream/basic_ifstream.md]
* seekp[link ../../ostream/basic_ostream/seekp.md]
* std::flush[link ../../ostream/flush.md]
* in[link type-openmode.md]
* out[link type-openmode.md]
* seekdir[color ff0000]
* beg[color ff0000]
* cur[color ff0000]
* end[color ff0000]

### 出力
```
YZCrefjp
ABCYZfjp
ABCrefjpYZ
```

上記の例で、入力しないにもかかわらず `openmode` に `in` が付いているのは、`in` が無い場合には `trunc` を指定していなくてもファイルが切り詰められてしまうからである。

## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
