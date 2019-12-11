# open
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
basic_filebuf* open(const char* s, ios_base::openmode mode); // (1)
basic_filebuf* open(const filesystem::path::value_type* s,
                    ios_base::openmode mode); // (2) C++17
```

## 概要

- (1): `s`で指定されたファイルを開く。`s`はヌル終端文字列。
- (2): [`std::filesystem​::​path​::​value_­type`](/reference/filesystem/path.md)の型が`char`ではないときのみ定義される。効果は(1)と同じ。

## 効果

まず`mode & ~ios_­base​::​ate`の結果からファイルの開くモードが決定される。`fopen`のモード文字列との対応は以下の通り。

<!--
TODO: Table 117 — File open modes を引っ張ってくる
https://timsong-cpp.github.io/cppwp/n4659/filebuf.members#tab:iostreams.file.open.modes
-->

このようにしてあたかも`fopen`がこのモード文字列を第二引数に指定して呼び出されたかのように振る舞う。

ファイルを開くのに成功して、`(mode & ios_­base​::​ate) != 0`の場合、ファイル終端にseekする(`fseek(file, 0, SEEK_­END)`したかのように振る舞う)

ファイルを開くのに失敗した場合`close()`を呼び出す。

## 戻り値

もし[`is_­open()`](/reference/fstream/basic_filebuf/is_open.md)が`false`ではない、もしくは開くのに失敗したならば、`nullptr`を返す。

成功したら`this`を返す

## 例

<!-- TODO: 例を差し替える -->


```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::fstream fs("foo");
  std::filebuf* buf = fs.rdbuf();

  if (buf->open()) {
      std::cout << "opened" << std::endl;
  }
}
```
* std::fstream[link /reference/fstream/basic_fstream.md]
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* rdbuf()[link /reference/fstream/basic_fstream/rdbuf.md]
* open()[link ff0000]

## バージョン
### 言語
- C++98
