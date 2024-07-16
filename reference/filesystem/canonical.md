# canonical
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  path canonical(const path& p);                      // (1)
  path canonical(const path& p, std::error_code& ec); // (2)
}
```
* path[link path.md]

## 概要
パスを正規化する。

この関数は、オペレーティング・システムのファイルシステムを介して、パスの正規化を行う。ファイルシステムを使用せず、文字列処理として正規化したい場合は、[`path::lexically_normal()`](path/lexically_normal.md)関数を使用する。

この関数は、正規化対象となるパスが指すファイルが存在していなければならない。存在しないファイルのパスを正規化したい場合は、[`weakly_canonical()`](weakly_canonical.md)関数を使用する。


## 効果
パス`p`に含まれる`"."` (ドットx1)、`".."` (ドットx2) を解決し、絶対パスに変換する。

パス`p`のファイル・ディレクトリが存在しない場合はエラーとなる。(2)ではエラーとなった場合、`ec`にエラー情報が書き込まれる。


## 戻り値
正規化された絶対パスが返る。

(2)ではエラーとなった場合、`path()`が返る。


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたファイルが存在しない場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 仕様上は未規定だが、パスのメモリ確保で例外が発生する可能性がある


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"a.txt"};
  fs::create_directory("dir");

  // "." (ドットx1) を解決
  fs::path p1 = fs::canonical("./a.txt");
  std::cout << p1 << std::endl;

  // ".." (ドットx2) を解決
  fs::path p2 = fs::canonical("dir/../a.txt");
  std::cout << p2 << std::endl;
}
```
* fs::canonical[color ff0000]
* fs::create_directory[link create_directory.md]

### 出力例
```
"/home/my_app/a.txt"
"/home/my_app/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [LWG Issue 2956. `filesystem::canonical()` still defined in terms of `absolute(p, base)`](https://wg21.cmeerw.net/lwg/issue2956)
