# symlink_status
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  file_status symlink_status(const path& p);                          // (1)
  file_status symlink_status(const path& p, error_code& ec) noexcept; // (2)
}
```
* path[link path.md]
* file_status[link file_status.md]
* error_code[link /reference/system_error/error_code.md]

## 概要
シンボリックリンクの状態を取得する。

[`std::filesystem::status()`](status.md)関数にシンボリックリンクのパスを指定した場合、シンボリックリンクが指すファイルの状態を取得するが、この関数はリンク自体の状態を取得する。シンボリックリンク以外のファイルに対しては、[`std::filesystem::status()`](status.md)関数と同じ動作をする。


## 効果
- (1) : 以下を行う：

```cpp
error_code ec;
file_status result = symlink_status(p, ec);
if (result.type() == file_type::none)
    throw filesystem_error(実装定義のメッセージ, p, ec);

return result;
```
* error_code[link /reference/system_error/error_code.md]
* file_status[link file_status.md]
* result.type()[link file_status/type.md]
* file_type[link file_type.md]
* filesystem_error[link filesystem_error.md]

- (2) :
    - 可能なら、ファイルパス`p`が指すファイルの属性を決定する。シンボリックリンクに対しては、シンボリックリンクが指すファイルではなく、シンボリックリンク自体のファイル属性を決定する
        - POSIX環境であれば[`lstat()`](https://web.archive.org/web/20230827123440/https://linuxjm.osdn.jp/html/LDP_man-pages/man2/stat.2.html)関数を使用する
    - OSのファイルシステムAPIによってエラーが報告された場合、`ec`にエラー情報が設定される。そうでなければ、[`ec.clear()`](/reference/system_error/error_code/clear.md)を呼び出し、エラー情報をクリアする


## 戻り値
- (1) : ファイルパス`p`が指すファイルの状態を返す
- (2) :
    - `ec`にエラー情報が設定された場合、
        - ファイルパス`p`が見つからなかった場合、[`file_status`](file_status.md)`{`[`file_type::not_found`](file_type.md)`,` [`perms::unknown`](perms.md)`}`が返る
        - ファイルパス`p`は見つかったが属性を決定できなかった場合、[`file_status`](file_status.md)`{`[`file_type::unknown`](file_type.md)`,` [`perms::unknown`](perms.md)`}`が返る
        - そのいずれでもなければ、[`file_status`](file_status.md)`{`[`file_type::none`](file_type.md)`,` [`perms::unknown`](perms.md)`}`が返る
    - 正常にファイル属性を取得できた場合、シンボリックリンク以外のファイルに対しては、そのファイル種別とファイル権限。シンボリックリンクに対しては、ファイル種別として[`file_type::symlink`](file_type.md)と、ファイル権限が設定された[`file_status`](file_status.md)オブジェクトが返る


## 例外
- (1) : ファイルが見つからない場合、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"a.txt"};
  fs::create_symlink("a_symlink.txt", "a.txt");

  // (1)
  {
    try {
      fs::file_status status = fs::symlink_status("a_symlink.txt");
      assert(status.type() == fs::file_type::symlink);
      assert((status.permissions() & fs::perms::owner_write) != fs::perms::none);
    }
    catch (fs::filesystem_error& fe) {
      std::cout << fe.what() << std::endl;
    }
  }

  // (2)
  {
    std::error_code ec;
    fs::file_status status = fs::symlink_status("a_symlink.txt", ec);
    if (ec) {
      std::cout << ec.message() << std::endl;
    }
    else {
      assert(status.type() == fs::file_type::symlink);
      assert((status.permissions() & fs::perms::owner_write) != fs::perms::none);
    }
  }
}
```
* fs::symlink_status[color ff0000]
* fs::create_symlink[link create_symlink.md]
* fs::file_status[link file_status.md]
* status.type()[link file_status/type.md]
* status.permissions()[link file_status/permissions.md]
* fs::file_type[link file_type.md]
* fs::perms[link perms.md]

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
