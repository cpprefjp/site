# operator->
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
const directory_entry& operator->() const;
```
* directory_entry[link /reference/filesystem/directory_entry.md]

## 概要
メンバアクセス演算子。


## 戻り値
`*this`によってキャッシュされたファイルの各種属性を付加した[`directory_entry`](/reference/filesystem/directory_entry.md)オブジェクトを返す。


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

  fs::directory_iterator it{"dir"};

  std::cout << it->path() << std::endl;
}
```
* fs::create_directory[link /reference/filesystem/create_directory.md]
* it->path()[link /reference/filesystem/directory_entry/path.md]

### 出力
```
"dir/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
