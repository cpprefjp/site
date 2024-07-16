# operator path
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
operator const path&() const noexcept;
```

## 概要
[`path`](/reference/filesystem/path.md)型に変換する。


## 戻り値
保持している[`path`](/reference/filesystem/path.md)オブジェクトへの参照を返す。


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
  fs::create_directory("dir/inner_dir");
  std::ofstream{"dir/a.txt"};

  // dirディレクトリ内のファイルを列挙する
  for (const fs::path& p : fs::directory_iterator("dir")) {
    std::cout << p << std::endl;
  }
}
```
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::directory_iterator[link /reference/filesystem/directory_iterator.md]

### 出力例
```
"dir/inner_dir"
"dir/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
