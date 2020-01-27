# perm_options
* filesystem[meta header]
* std::filesystem[meta namespace]
* enum[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  enum class perm_options {
    replace,
    add,
    remove,
    nofollow
  };
}
```

## 概要
権限オプションを表す、ビットマスクの列挙型。それぞれの列挙�は、以下の意味を持つ：

| 列挙� | 説明 |
|--------|------|
| `replace`  | 指定された[`perms`](perms.md)値でファイルの権限を置き換える |
| `add`      | 指定された[`perms`](perms.md)値と現在のファイルの権限で論理和 (OR) をとり、ファイルの権限を�定する |
| `remove`   | 指定された[`perms`](perms.md)値と現在のファイルの権限で論理積 (AND) をとり、ファイルの権限を�定する |
| `unfollow` | リンクが解決された結果のファイルではなく、シンボリックリンク自身の権限を�定する |


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};

  // regular.txtファイルの権限を、owner_all (0700) に変更する
  fs::permissions("regular.txt", fs::perms::owner_all, fs::perm_options::replace);

  // regular.txtファイルの権限に、others_read (07) を追加する
  fs::permissions("regular.txt", fs::perms::others_read, fs::perm_options::add);
}
```
* fs::perm_options::replace[color ff0000]
* fs::perm_options::add[color ff0000]
* fs::permissions[link permissions.md]
* fs::perms::owner_all[link perms.md]
* fs::perms::others_read[link perms.md]

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
