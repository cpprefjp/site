# replace_filename
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void replace_filename(const path& p);                      // (1)
void replace_filename(const path& p, std::error_code& ec); // (2)
```
* path[link /reference/filesystem/path.md]

## 概要
ファイル名を置き換える。


## 効果
`*this`が保持している[`path`](/reference/filesystem/path.md)オブジェクトを`pathobject`として、

- (1) : 以下と�価の処理を行う：
    ```cpp
    pathobject.replace_filename(p);
    refresh();
    ```
    * pathobject.replace_filename[link /reference/filesystem/path/replace_filename.md]
    * refresh()[link refresh.md]

- (2) : 以下と�価の処理を行う：
    ```cpp
    pathobject.replace_filename(p);
    refresh(ec);
    ```
    * pathobject.replace_filename[link /reference/filesystem/path/replace_filename.md]
    * refresh[link refresh.md]


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir");
  std::ofstream{"dir/a.txt"};
  std::ofstream{"dir/b.txt"};

  fs::directory_entry x{"dir/a.txt"};
  x.replace_filename("b.txt");

  std::cout << x.path() << std::endl;
}
```
* x.replace_filename[color ff0000]
* x.path()[link path.md]
* fs::create_directory[link /reference/filesystem/create_directory.md]

### 出力
```
"dir/b.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
