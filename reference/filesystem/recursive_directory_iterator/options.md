# options
* filesystem[meta header]
* std::filesystem[meta namespace]
* recursive_directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
directory_options options() const;
```
* directory_options[link /reference/filesystem/directory_options.md]

## 概要
走査オプションを取得する。


## 戻り値
コンストラクタで�定されたオプションを返す。コンストラクタで明示的にオプションを指定していない場合は、[`directory_options::none`](/reference/filesystem/directory_options.md)を返す。


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir");
  std::ofstream{"dir/a.txt"};
  std::ofstream{"dir/b.txt"};

  fs::recursive_directory_iterator it{"dir", fs::directory_options::follow_directory_symlink};
  fs::directory_options opt = it.options();

  assert(opt == fs::directory_options::follow_directory_symlink);
}
```
* options()[color ff0000]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::directory_options[link /reference/filesystem/directory_options.md]

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
