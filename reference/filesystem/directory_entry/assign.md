# assign
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void assign(const path& p);                      // (1)
void assign(const path& p, std::error_code& ec); // (2)
```
* path[link /reference/filesystem/path.md]

## 概要
パスを再代入する。


## 戻り値
- (1) : `p`を`*this`に保持し、[`refresh()`](refresh.md)を実行する
- (2) : `p`を`*this`に保持し、[`refresh`](refresh.md)`(ec)`を実行する

エラーが発生した場合は、�ャッシュされた属性の値は未規定となる (更新前の�ャッシュの値のままかもしれないし、�ャッシュが破棄されるかもしれない)。(2)の場合は、エラー情報が`ec`に�定される。


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
  x.assign("dir/b.txt");

  std::cout << x.path() << std::endl;
}
```
* x.assign[color ff0000]
* x.path()[link path.md]
* fs::create_directory[link /reference/filesystem/create_directory.md]

### 出力例
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
