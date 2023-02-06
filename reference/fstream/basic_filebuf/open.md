# open
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
basic_filebuf* open(const char* s, ios_base::openmode mode); // (1)
basic_filebuf* open(const filesystem::path::value_type* s,
                    ios_base::openmode mode); // (2) C++17
basic_filebuf* open(const string& s, ios_base::openmode mode); // (3)
basic_filebuf* open(const filesystem::path& s, ios_base::openmode mode); // (4) C++17
```

## 概要

- (1): `s`で指定されたファイルを開く。`s`はヌル終端文字列。
- (2): [`std::filesystem::path::value_type`](/reference/filesystem/path.md)の型が`char`ではないときのみ定義される。効果は(1)と同じ。
- (3): ファイルを指定する引数の型が`std::string`である点を除き、(1)と同じ。
- (4): ファイルを指定する引数の型が[`std::filesystem::path`](/reference/filesystem/path.md)である点を除き、(1)と同じ。

## 効果

まず`mode & ~ios_base::ate`の結果からファイルの開くモードが決定される。`fopen`のモード文字列との対応は以下の通り。

| `binary` | `in` | `out` | `trunc` | `app` | 対応する`fopen`のモード文字列 |
|----------|------|-------|---------|-------|--------------------|
|          |      | ○     |         |       | `"w"`              |
|          |      | ○     |         | ○     | `"a"`              |
|          |      |       |         | ○     | `"a"`              |
|          |      | ○     | ○       |       | `"w"`              |
|          | ○    |       |         |       | `"r"`              |
|          | ○    | ○     |         |       | `"r+"`             |
|          | ○    | ○     | ○       |       | `"w+"`             |
|          | ○    | ○     |         | ○     | `"a+"`             |
|          | ○    |       |         | ○     | `"a+"`             |
| ○        |      | ○     |         |       |  `"wb"`            |
| ○        |      | ○     |         | ○     | `"ab"`             |
| ○        |      |       |         | ○     | `"ab"`             |
| ○        |      | ○     | ○       |       | `"wb"`             |
| ○        | ○    |       |         |       | `"rb"`             |
| ○        | ○    | ○     |         |       | `"r+b"`            |
| ○        | ○    | ○     | ○       |       | `"w+b"`            |
| ○        | ○    | ○     |         | ○     | `"a+b"`            |
| ○        | ○    |       |         | ○     | `"a+b"`            |

そしてあたかも`fopen`がこのモード文字列を第二引数に指定して呼び出されたかのように振る舞う。

ファイルを開くのに成功して、`(mode & ios_base::ate) != 0`の場合、ファイル終端にseekする(`fseek(file, 0, SEEK_END)`したかのように振る舞う)

ファイルを開くのに失敗した場合[`close()`](close.md)を呼び出す。

## 戻り値

もし[`is_open()`](/reference/fstream/basic_filebuf/is_open.md)が`false`ではない、もしくは開くのに失敗したならば、`nullptr`を返す。

成功したら`this`を返す

## 例

```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::fstream fs("foo");
  std::filebuf* buf = fs.rdbuf();

  if (buf->open("foo", std::ios_base::out)) {
      std::cout << "opened" << std::endl;
  }
}
```
* buf->open[color ff0000]
* std::fstream[link /reference/fstream/basic_fstream.md]
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* rdbuf()[link /reference/fstream/basic_fstream/rdbuf.md]

## バージョン
### 言語
- C++98
- C++17: `std::filesystem::path`への対応

## 参照

- [LGW issue 2676. Provide filesystem::path overloads for File-based streams](https://wg21.cmeerw.net/lwg/issue2676)
- [LGW issue 2943. Problematic specification of the wide version of basic_filebuf::open](https://wg21.cmeerw.net/lwg/issue2943)
