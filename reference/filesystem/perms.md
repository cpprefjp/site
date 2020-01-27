# perms
* filesystem[meta header]
* std::filesystem[meta namespace]
* enum[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  enum class perms {
    none         = 0,
    owner_read   = 0400,
    owner_write  = 0200,
    owner_exec   = 0100,
    owner_all    = 0700,  // owner_read | owner_write | owner_exec
    group_read   = 040,
    group_write  = 020,
    group_exec   = 010,
    group_all    = 070,   // group_read | group_write | group_exec
    others_read  = 04,
    others_write = 02,
    others_exec  = 01,
    others_all   = 07,    // others_read | others_write | others_exec
    all          = 0777,  // owner_all | group_all | others_all
    set_uid      = 04000,
    set_gid      = 02000,
    sticky_bit   = 01000,
    mask         = 07777, // all | set_uid | set_gid | sticky_bit
    unknown      = 0xFFF
  };
}
```

## 概要
権限を表す、ビットマスクの列挙型。それぞれの列挙�は、以下の意味を持つ：

| 列挙�         | 値 (基本的に8進数) | 対応するPOSIXマク� | 説明 |
|----------------|-------------------:|---------------------|------|
| `none`         | `0`                |                     | ファイルに権限が�定されていない |
| `owner_read`   | `0400`             | `S_IRUSR`           | 所有者による�み取り許可 |
| `owner_write`  | `0200`             | `S_IWUSR`           | 所有者による書き込み許可 |
| `owner_exec`   | `0100`             | `S_IXUSR`           | 所有者による実行および検索の許可 |
| `owner_all`    | `0700`             | `S_IRWXU`           | 所有者による�み取り、書き込み、実行および検索の許可 |
| `group_read`   | `040`              | `S_IRGRP`           | グループによる�み取り許可 |
| `group_write`  | `020`              | `S_IWGRP`           | グループによる書き込み許可 |
| `group_exec`   | `010`              | `S_IXGRP`           | グループによる実行および検索の許可 |
| `group_all`    | `070`              | `S_IRWXG`           | グループによる�み取り、書き込み、実行および検索の許可 |
| `others_read`  | `04`               | `S_IROTH`           | 所有者以外による�み取り許可 |
| `others_write` | `02`               | `S_IWOTH`           | 所有者以外による書き込み許可 |
| `others_exec`  | `01`               | `S_IXOTH`           | 所有者以外による実行および検索の許可 |
| `others_all`   | `07`               | `S_IRWXO`           | 所有者以外による�み取り、書き込み、実行および検索の許可 |
| `all`          | `0777`             |                     | 所有者、グループ、所有者以外による�み取り、書き込み、実行および検索の許可 |
| `set_uid`      | `04000`            | `S_ISUID`           | 実行するユーザーIDを�定 |
| `set_gid`      | `02000`            | `S_ISGID`           | 実行するグループIDを�定 |
| `sticky_bit`   | `01000`            | `S_ISVTX`           | OS依�の権限 |
| `mask`         | `07777`            |                     | とりうる値が収まるビットマスク値 |
| `unknown`      | `0xFFFF`           |                     | 権限を指定せずに[`file_status`](file_status.md)オブジェクトを生成した際の、権限不明の状態 |


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"a.txt"};

  fs::file_status status = fs::status("a.txt");
  fs::perms perm = status.permissions();

  if ((perm & fs::perms::owner_read) == fs::perms::owner_read) {
    std::cout << "owner can read the file" << std::endl;
  }
  if ((perm & fs::perms::owner_write) == fs::perms::owner_write) {
    std::cout << "owner can write the file" << std::endl;
  }
}
```
* fs::perms[color ff0000]
* fs::status[link status.md]
* fs::file_status[link file_status.md]
* status.permissions()[link file_status/permissions.md]

### 出力
```
owner can read the file
owner can write the file
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
