# create_directories
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool create_directories(const path& p);                      // (1)
  bool create_directories(const path& p, std::error_code& ec); // (2)
}
```
* path[link path.md]

## 概要
ディレクトリ階層を作成する。

[`create_directory()`](create_directory.md)関数は、指定されたパスの単一ディレクトリを作成するが、間のディレクトリが存在しない場合はエラーとなる。この関数は、間のディレクトリも作成する。


## 効果
- パス`p`に含まれるディレクトリのうち、存在しないディレクトリを全て作成する


## 戻り値
- (1) : 新たなディレクトリが作成されたら`true`、されなければ`false`が返る
- (2) : 新たなディレクトリが作成されたら`true`、されなければ`false`が返る。エラーが発生した場合も`false`が返る


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : ディレクトリを走査する際にメモリ確保に失敗した場合、例外を送出する可能性がある


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  bool result = fs::create_directories("a/b/c");

  assert(result);
  assert(fs::exists("a/b/c"));
  assert(fs::is_directory("a/b/c"));

  // すでに存在するディレクトリを指定した場合、falseは返るがエラーにはならない
  bool result2 = fs::create_directories("a/b/c");
  assert(!result2);
}
```
* fs::create_directories[color ff0000]
* fs::exists[link exists.md]
* fs::is_directory[link is_directory.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [LWG Issue 3014. More `noexcept` issues with filesystem operations](https://wg21.cmeerw.net/lwg/issue3014)
