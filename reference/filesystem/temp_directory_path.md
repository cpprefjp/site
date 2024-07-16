# temp_directory_path
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  path temp_directory_path();                    // (1)
  path temp_directory_path(std::error_code& ec); // (2)
}
```
* path[link path.md]

## 概要
一時ファイル用ディレクトリのパスを取得する。


## 戻り値
一時ファイルを保存するディレクトリを指す、未規定の適切なパスを返す。

この関数によって返されるパスが、存在しない、あるいはディレクトリではない場合は、エラーを報告する。(2)では、エラーの場合は`path()`が返る。


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、この関数によって返されるパスが、存在しない、あるいはディレクトリではない場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 仕様上は未規定だが、パスのメモリ確保で例外が発生する可能性がある


## 備考
- POSIXベースOS上では、実装は環境変数`TMPDIR`、`TMP`、`TEMP`、`TEMPDIR`が見つかったらそれを返し、なければ`"/tmp"`を返すだろう
- WindowsベースOS上では、実装は`GetTempPath()` APIの戻り値を返すだろう


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = fs::temp_directory_path();
  std::cout << p << std::endl;
}
```
* fs::temp_directory_path[color ff0000]

### 出力例
```
"/tmp"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
