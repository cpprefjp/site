# directory_options
* filesystem[meta header]
* std::filesystem[meta namespace]
* enum[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  enum class directory_options {
    none,
    follow_directory_symlink,
    skip_permission_denied
  };
}
```

## 概要
ディレクトリの走査オプションを表す、ビットマスクの列挙型。

それぞれの列挙�の値は未規定。

| 列挙� | 説明 |
|--------|------|
| `none` | ディレクトリのシンボリックリンクを無視し、アクセス許可されないファイルはエラーとなる (デフォルト) |
| `follow_directory_symlink` | ディレクトリのシンボリックリンクを無視せずに従う |
| `skip_permission_denied` | アクセス許可されないファイルを無視する |


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir_a");
  std::ofstream{"dir_a/a.txt"};

  fs::create_directory("dir_b");
  std::ofstream{"dir_b/b.txt"};
  fs::create_directory_symlink("../dir_a", "dir_b/dir_a");

  // シンボリックリンクのディレクトリも走査する
  for (const fs::directory_entry& x : fs::recursive_directory_iterator(
                                        "dir_b",
                                        fs::directory_options::follow_directory_symlink)) {
    std::cout << x.path() << std::endl;
  }
}
```
* fs::directory_options[color ff0000]
* fs::create_directory[link create_directory.md]
* fs::create_directory_symlink[link create_directory_symlink.md]
* fs::recursive_directory_iterator[link recursive_directory_iterator.md]
* fs::directory_entry[link directory_entry.md]
* x.path()[link directory_entry/path.md]

### 出力例
```
"dir_b/b.txt"
"dir_b/dir_a"
"dir_b/dir_a/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.2
- [Visual C++](/implementation.md#visual_cpp):
