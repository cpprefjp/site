# open
* fstream[meta header]
* std[meta namespace]
* basic_ifstream[meta class]
* function[meta id-type]

```cpp
void open(
  const char* s,
  ios_base::openmode mode = ios_base::in); // (1)
void open(
  const filesystem::path::value_type* s,
  ios_base::openmode mode = ios_base::in); // (2) C++17
void open(
  const string& s,
  ios_base::openmode mode = ios_base::in); // (3)
void open(
  const filesystem::path& s,
  ios_base::openmode mode = ios_base::in); // (4) C++17
```

## 概要

ファイルを開く

## 効果

- (1) : 仮引数`s`で指定したファイルを開く。
    - [`rdbuf()->open(s, mode | std::ios_base::in)`](/reference/fstream/basic_filebuf/open.md)を呼び出す(少なくとも�み取り操作ができる)。その結果が成功だった（戻り値がヌルポインタではなかった）場合、[`clear()`](/reference/ios/basic_ios/clear.md)を呼び出す。その結果が失敗だった（戻り値がヌルポインタだった）場合、[`setstate(failbit)`](/reference/ios/basic_ios/setstate.md)を呼び出す。
- (2) : [`std::filesystem​::​path​::​value_type`](/reference/filesystem/path.md)の型が`char`ではないときのみ定義される。効果は(1)と同じ。
- (3) : ファイルを指定する引数の型が`std::string`である点を除き、(1)と同じ。
- (4) : ファイルを指定する引数の型が[`std::filesystem::path`](/reference/filesystem/path.md)である点を除き、(1)と同じ。

## 例

```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::ifstream s1;
  s1.open("file.txt");
  if (!s1) {
    std::cerr << "ファイルを開けませんでした。" << std::endl;
  }

  try
  {
    std::ifstream s2;
    s2.open("internal.dat", std::ios_base::in | std::ios_base::out | std::ios_base::binary);
    s2.exceptions(std::ios_base::failbit);
  } catch (const std::exception& e) {
    std::cerr << "ファイルを開けませんでした。" << std::endl;
  }
}
```
* std::ifstream[link /reference/fstream/basic_ifstream.md]
* exceptions[link /reference/ios/basic_ios/exceptions.md]
* open()[color ff0000]

### 出力
```
ファイルを開けませんでした。
ファイルを開けませんでした。
```

## バージョン
### 言語
- C++98
- C++17: `std::filesystem::path`への対応

## 参照

- [LGW issue 2676. Provide filesystem::path overloads for File-based streams](https://wg21.cmeerw.net/lwg/issue2676)
