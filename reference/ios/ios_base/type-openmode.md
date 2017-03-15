# openmode
* ios[meta header]
* type-alias[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
using openmode = T3;
```
* T3[italic]

*`T3`* は処理系定義の型。

## 概要
`openmode` はストリームのオープンモードを指定するためのビットマスク型である。  
`openmode` には以下の表のようなビットマスク値が存在し、全て [`ios_base`](../ios_base.md) の静的メンバ定数として定義されている。

| 定数 | 設定された場合の効果 |
|------|----------------------|
| `app` | 各書き込み（出力）の前に、ストリームの最後にシークする。（append の略） |
| `ate` | ストリームのオープン直後に、ストリームの最後にシークする。（at end の略） |
| `binary` | 入出力をバイナリで行う。（テキストモードの反対） |
| `in` | 入力のためにオープンする。 |
| `out` | 出力のためにオープンする。 |
| `trunc` | 既存のストリームをオープンする際に、ストリームの内容を切り詰める。（truncate の略） |


## 例
### stringstream の例
```cpp
#include <iostream>
#include <sstream>

void output(std::ios_base::openmode mode)
{
  std::ostringstream oss("test1", mode);
  std::cout << oss.str() << '\n';
  oss << "TE2" << std::flush;
  oss.seekp(0);
  oss << "ST3" << std::flush;
  std::cout << oss.str() << '\n';
}

int main()
{
  output(std::ios_base::out | std::ios_base::ate);
  output(std::ios_base::out | std::ios_base::app);
}
```
* std::ios_base[link ../ios_base.md]
* std::ostringstream[link ../../sstream/basic_ostringstream.md.nolink]
* seekp[link ../../ostream/basic_ostream/seekp.md]
* std::flush[link ../../ostream/flush.md]
* str()[link ../../sstream/basic_ostringstream/str.md.nolink]
* openmode[color ff0000]
* out[color ff0000]
* ate[color ff0000]
* app[color ff0000]

### 出力
```
test1
ST3t1TE2
test1TE2ST3
```

`app` の説明からすると上記の出力が正しいと思われるが、GCC(libstdc++) も Clang(libc++) も `app` の出力が `ate` の出力と同様となる。  
	どちらの出力が正しいのかは確認できていない。

### fstream の例
```cpp
#include <iostream>
#include <fstream>
#include <string>

void print(const char* filename)
{
  std::string s;
  std::ifstream ifs(filename, std::ios_base::in);
  ifs >> s;
  std::cout << s << '\n';
}

void output(std::ios_base::openmode mode)
{
  static const char filename[] = "test.txt";

  {
    std::fstream ofs(filename, std::ios_base::out);
    ofs << "test1";
  }
  print(filename);

  {
    std::ofstream ofs(filename, mode);
    ofs << "TE2" << std::flush;
    ofs.seekp(0);
    ofs << "ST3" << std::flush;
  }
  print(filename);
}

int main()
{
  output(std::ios_base::in | std::ios_base::out | std::ios_base::ate);
  output(std::ios_base::in | std::ios_base::out | std::ios_base::app);
}
```
* std::ios_base[link ../ios_base.md]
* std::fstream[link ../../fstream/basic_fstream.md]
* std::ofstream[link ../../fstream/basic_ofstream.md.nolink]
* seekp[link ../../ostream/basic_ostream/seekp.md]
* std::flush[link ../../ostream/flush.md]
* openmode[color ff0000]
* out[color ff0000]
* ate[color ff0000]
* app[color ff0000]
* in[color ff0000]

### 出力
```
test1
ST3t1TE2
test1
test1TE2ST3
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
