# status
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  file_status status(const path& p);                          // (1)
  file_status status(const path& p, error_code& ec) noexcept; // (2)
}
```
* path[link path.md]
* file_status[link file_status.md]
* error_code[link /reference/system_error/error_code.md]

## 概要
ファイル状態を取得する。

パスがシンボリックリンクを指している場合、シンボリックリンクが指すファイルの状態を取得する。シンボリックリンク自体の状態を取得する場合は、[`std::filesystem::symlink_status()`](symlink_status.md)関数を使用すること。


## 効果
- (1) : 以下を行う：

```cpp
error_code ec;
file_status result = status(p, ec);
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
    - 可能なら、ファイルパス`p`が指すファイルの属性を決定する
        - POSIX環境であれば[`stat()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/stat.2.html)関数を使用する
    - OSのファイルシステムAPIによってエラーが報告された場合、`ec`にエラー情報が�定される。そうでなければ、[`ec.clear()`](/reference/system_error/error_code/clear.md)を呼び出し、エラー情報をクリアする


## 戻り値
- (1) : ファイルパス`p`が指すファイルの状態を返す
- (2) :
    - `ec`にエラー情報が�定された場合、
        - ファイルパス`p`が見つからなかった場合、[`file_status`](file_status.md)`{`[`file_type::not_found`](file_type.md)`,` [`perms::unknown`](perms.md)`}`が返る
        - ファイルパス`p`は見つかったが属性を決定できなかった場合、[`file_status`](file_status.md)`{`[`file_type::unknown`](file_type.md)`,` [`perms::unknown`](perms.md)`}`が返る
        - そのいずれでもなければ、[`file_status`](file_status.md)`{`[`file_type::none`](file_type.md)`,` [`perms::unknown`](perms.md)`}`が返る
    - �常にファイル属性を取得できた場合、ファイル種別とファイル権限が�定された[`file_status`](file_status.md)オブジェクトが返る


## 備考
- ファイルパスの解決でシンボリックリンクが検出された場合、シンボリックリンクのリンク先を使用してファイルパスの解決が継続される


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

  // (1)
  {
    try {
      fs::file_status status = fs::status("a.txt");
      assert(status.type() == fs::file_type::regular);
      assert((status.permissions() & fs::perms::owner_write) != fs::perms::none);
    }
    catch (fs::filesystem_error& fe) {
      std::cout << fe.what() << std::endl;
    }
  }

  // (2)
  {
    std::error_code ec;
    fs::file_status status = fs::status("a.txt", ec);
    if (ec) {
      std::cout << ec.message() << std::endl;
    }
    else {
      assert(status.type() == fs::file_type::regular);
      assert((status.permissions() & fs::perms::owner_write) != fs::perms::none);
    }
  }
}
```
* fs::status[color ff0000]
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
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
