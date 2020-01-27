# depth
* filesystem[meta header]
* std::filesystem[meta namespace]
* recursive_directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
int depth() const;
```

## 概要
ディレクトリの深さを取得する。


## 戻り値
横�している現在のディレクトリの深さを返す。

初期のディレクトリは深さ0、その下のディレクトリが深さ1である。


## 例外
投げない


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
  fs::create_directory("dir/inner_dir");
  std::ofstream{"dir/inner_dir/b.txt"};

  fs::recursive_directory_iterator it{"dir"};
  fs::recursive_directory_iterator last{};
  for (; it != last; ++it) {
    std::cout << it->path() << " : " << it.depth() << std::endl;
  }
}
```
* depth()[color ff0000]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* it->path()[link /reference/filesystem/directory_entry/path.md]

### 出力例
```
"dir/inner_dir" : 0
"dir/inner_dir/b.txt" : 1
"dir/a.txt" : 0
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
