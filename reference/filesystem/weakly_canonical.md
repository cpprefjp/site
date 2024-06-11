# weakly_canonical
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  path weakly_canonical(const path& p);                      // (1)
  path weakly_canonical(const path& p, std::error_code& ec); // (2)
}
```
* path[link path.md]

## 概要
パスを正規化する。

この関数は、同じくパスの正規化をする[`canonical()`](canonical.md)関数よりも、要件が弱い。この関数は、指定されたパスのファイルが存在していなくても、パスの正規化ができる。そのため、これから作るファイルの絶対パスを構築する、という用途に使用できる。


## 効果
パス`p`の部分パスのうち、存在してるところまでを[`canonical`](canonical.md)関数に渡して正規化し、残った存在しない部分パスを後ろに結合して返す。

パス`p`に含まれるいずれの部分パスも存在しない場合は、エラーとなる。エラーになった場合、(2)では`ec`にエラー情報が書き込まれる。


## 戻り値
シンボリックリンクを解決し、正規化された絶対パスが返る。

(2)ではエラーとなった場合、`path()`が返る。


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたパスのいずれの部分パスも存在しない場合でもエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
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
  fs::path p1 = fs::weakly_canonical("./a.txt");
  std::cout << p1 << std::endl;

  // ".." (ドットx2) を解決
  fs::path p2 = fs::weakly_canonical("dir/../a.txt");
  std::cout << p2 << std::endl;

  // 存在しないファイルへの相対パス文字を解決
  fs::path p3 = fs::weakly_canonical("dir/../b.txt");
  std::cout << p3 << std::endl;
}
```
* fs::weakly_canonical[color ff0000]
* fs::create_directory[link create_directory.md]

### 出力例
```
"/home/my_app/a.txt"
"/home/my_app/a.txt"
"/home/my_app/b.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [LWG Issue 3026. `filesystem::weakly_canonical` still defined in terms of `canonical(p, base)`](https://wg21.cmeerw.net/lwg/issue3026)
