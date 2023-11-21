# create_directory
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool create_directory(const path& p);                               // (1)
  bool create_directory(const path& p, std::error_code& ec) noexcept; // (2)

  bool create_directory(const path& p, const path& existing_p);       // (3)
  bool create_directory(const path& p, const path& existing_p,
                        std::error_code& ec) noexcept;                // (4)
}
```
* path[link path.md]

## 概要
ディレクトリを作成する。

- (1), (2) : パス`p`で指定された単一のディレクトリを作成する
- (3), (4) : パス`existing_p`の属性 (権限, 圧縮、暗号化など) を引き継いで、パス`p`で指定された単一のディレクトリを作成する


## 効果
- (1), (2) : パス`p`のディレクトリを作成する
    - POSIX環境では、[`mkdir()`](https://web.archive.org/web/20231009095236/https://linuxjm.osdn.jp/html/LDP_man-pages/man2/mkdir.2.html)関数に、第2引数に権限として`static_cast<int>(`[`perms::all`](perms.md)`)`を指定して実行する
    - (2) では、OSのファイルシステムAPIによってエラーが報告された場合、`ec`にエラー情報が設定される。そうでなければ、[`ec.clear()`](/reference/system_error/error_code/clear.md)を呼び出し、エラー情報をクリアする
- (3), (4) : パス`existing_p`の属性を取得し、その属性を付加してパス`p`のディレクトリを作成する
    - POSIX環境では、[`stat`](https://web.archive.org/web/20230827123440/https://linuxjm.osdn.jp/html/LDP_man-pages/man2/stat.2.html)`(existing_p.c_str(), &attributes_stat)`の呼び出し後に、[`mkdir`](https://web.archive.org/web/20231009095236/https://linuxjm.osdn.jp/html/LDP_man-pages/man2/mkdir.2.html)`(p.c_str(), attributes_stat.st_mode)`の呼び出しでディレクトリを作成する
    - Windows環境では、`CreateDirectoryExW(existing_p.c_str(), p.c_str(), 0)`を呼び出す


## 戻り値
- (1), (3) : 新たなディレクトリが作成されたら`true`、されなければ`false`が返る
- (2), (4) : 新たなディレクトリが作成されたら`true`、されなければ`false`が返る。エラーが発生した場合も`false`が返る


## 例外
- (1), (3) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2), (4) : 投げない


## 備考
- 作成するディレクトリとして`"a/b/c"`を指定した場合、`a/b`ディレクトリがなければ、この関数はエラーとなる。ディレクトリ階層を作成する場合は、[`create_directories()`](create_directories.md)関数を使用すること


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  bool result = fs::create_directory("dir");

  assert(result);
  assert(fs::exists("dir"));
  assert(fs::is_directory("dir"));

  // すでに存在するディレクトリを指定した場合、falseは返るがエラーにはならない
  bool result2 = fs::create_directory("dir");
  assert(!result2);
}
```
* fs::create_directory[color ff0000]
* fs::exists[link exists.md]
* fs::is_directory[link is_directory.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
