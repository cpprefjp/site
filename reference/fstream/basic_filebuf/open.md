# open
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
basic_filebuf* open(const char* s, ios_base::openmode mode); // (1) C++98
basic_filebuf* open(const filesystem::path::value_type* s,
                    ios_base::openmode mode); // (2) C++17
basic_filebuf* open(const string& s, ios_base::openmode mode); // (3) C++11
basic_filebuf* open(const filesystem::path& s, ios_base::openmode mode); // (4) C++17
template <class T>
basic_filebuf* open(const T& s, ios_base::openmode mode); // (4) C++23
```

## 概要

- (1): `s`で指定されたファイルを開く。`s`はヌル終端文字列。
- (2): [`std::filesystem::path::value_type`](/reference/filesystem/path.md)の型が`char`ではないときのみ定義される。効果は(1)と同じ。
- (3): ファイルを指定する引数の型が`std::string`である点を除き、(1)と同じ。
- (4): ファイルを指定する引数の型が[`std::filesystem::path`](/reference/filesystem/path.md)である点を除き、(1)と同じ。C++23では、`path`へ暗黙変換可能な型（[`std::string_view`](/reference/string_view/basic_string_view.md)など）が渡されたときの高コストな暗黙変換を防ぐため、`filesystem::path`とまったく同じ型のみを受け取る制約付きテンプレートとして定義される。

## テンプレートパラメータ制約
- (4) C++23 : [`is_same_v`](/reference/type_traits/is_same.md)`<T, filesystem::path>`が`true`であること

## 事前条件
- (1), (2) :
    - C++20 : `s`はヌル終端文字列 (NTCTS) を指していること。


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

- [LWG Issue 2676. Provide `filesystem::path` overloads for File-based streams](https://cplusplus.github.io/LWG/issue2676)
    - C++17で、`filesystem::path`および`filesystem::path::value_type*`を受け取るオーバーロードが追加された（`basic_filebuf`は`open`のみ、`basic_ifstream`/`basic_ofstream`/`basic_fstream`はコンストラクタと`open`）
- [LWG Issue 3430. `std::fstream` & co. should be constructible from `string_view`](https://cplusplus.github.io/LWG/issue3430)
    - C++23で、`filesystem::path`を受け取る`open`(4)が、`path`へ暗黙変換可能な型による高コストな変換を防ぐため、`is_same_v<T, filesystem::path>`を制約とする制約付きテンプレートに変更された
- [LWG Issue 2943. Problematic specification of the wide version of `basic_filebuf::open`](https://cplusplus.github.io/LWG/issue2943)
    - C++20で、ワイド版`open`の効果が、`fopen`をモード文字列付きで呼び出したかのように振る舞うと明確化された
