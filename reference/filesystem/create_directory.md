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
- (1)〜(4) : パス`p`がすでにディレクトリとして存在する場合、ディレクトリの作成は行われず、これはエラーとして扱われない（戻り値は`false`となる）


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
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [LWG Issue 2935. What should `create_directories` do when `p` already exists but is not a directory?](https://cplusplus.github.io/LWG/issue2935)
    - 事後条件`is_directory(p)`が削除された
    - この修正は欠陥報告(DR)であり、C++17に遡及して適用される。元の事後条件は、ディレクトリ作成の失敗後に状態を取得する追加のシステムコールを発行しなければ保証できない意図しない規定であり、処理系の挙動は変わらないため
    - なお本issueは「パスが既に存在する場合はエラーとしない」形にも緩和したが、これは同じC++20でP1164R1により差し戻された。現在は「既存のディレクトリとして解決されたために作成が失敗した場合はエラーとしない」という本ページの記述となっている
- [LWG Issue 3079. LWG 2935 forgot to fix the `existing_p` overloads of `create_directory`](https://cplusplus.github.io/LWG/issue3079)
    - C++20で、既存アタッチメントを取る`existing_p`版オーバーロードも、指定したパスがすでにディレクトリとして存在する場合にエラーとしないよう修正された
