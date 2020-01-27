# disable_recursion_pending
* filesystem[meta header]
* std::filesystem[meta namespace]
* recursive_directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void disable_recursion_pending();
```

## 概要
再帰を�める。


## 効果
ディレクトリパスを指している際にこの関数を呼び出すことによって、そのディレクトリに入らないようになる。


## 事後条件
- [`recursion_pending()`](recursion_pending.md) `== false`


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

  std::cout << std::boolalpha;
  for (; it != last; ++it) {
    if (it->path().filename() == "inner_dir")
        it.disable_recursion_pending();

    std::cout << it->path() << " : " << it.recursion_pending() << std::endl;
  }
}
```
* it.disable_recursion_pending()[color ff0000]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* it->path()[link /reference/filesystem/directory_entry/path.md]
* it.recursion_pending()[link recursion_pending.md]

### 出力例
```
"dir/inner_dir" : false
"dir/a.txt" : true
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
