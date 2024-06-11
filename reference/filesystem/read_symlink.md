# read_symlink
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  path read_symlink(const path& p);                      // (1)
  path read_symlink(const path& p, std::error_code& ec); // (2)
}
```
* path[link path.md]

## 概要
シンボリックリンクが指すパスを取得する。


## 戻り値
パス`p`がシンボリックリンクに解決される場合、そのシンボリックリンクが指す先のコンテンツのパスを返す。

(2)でエラーが発生した場合、`ec`にエラー情報が設定され、`path()`オブジェクトが返る。


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、パス`p`がシンボリックリンクに解決されなかった場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : `path`オブジェクトのメモリ確保に失敗した場合、例外を送出する可能性がある


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};
  fs::create_symlink("regular.txt", "regular.symlink");

  fs::path result = fs::read_symlink("regular.symlink");
  std::cout << result << std::endl;
}
```
* fs::read_symlink[color ff0000]
* fs::create_symlink[link create_symlink.md]

### 出力
```
"regular.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
