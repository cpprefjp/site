# operator!=
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool operator!=(const directory_iterator& a, const directory_iterator& b) noexcept;
}
```

## 概要
2つの`directory_iterator`オブジェクトが非等値かを判定する。


## 戻り値
2つの`directory_iterator`オブジェクトが非等値である場合は`true`、そうでなければ`false`を返す。


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

  fs::directory_iterator a{"dir"};
  fs::directory_iterator end{};
  assert(a != end);

  ++a;
  assert(!(a != end));
}
```
* fs::create_directory[link /reference/filesystem/create_directory.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
