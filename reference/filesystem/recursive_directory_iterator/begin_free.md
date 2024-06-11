# begin
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  recursive_directory_iterator begin(recursive_directory_iterator iter) noexcept;
}
```

## 概要
先頭要素を指すイテレータを取得する。

この関数は、`recursive_directory_iterator`クラスのオブジェクトを範囲for文に適用するために定義されている。


## 戻り値
```cpp
return iter;
```


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

  fs::recursive_directory_iterator it{"dir"};

  fs::recursive_directory_iterator first = fs::begin(it);
  fs::recursive_directory_iterator last = fs::end(it);

  for (; first != last; ++first) {
    std::cout << first->path() << std::endl;
  }
}
```
* fs::begin[color ff0000]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::end[link end_free.md]
* first->path()[link /reference/filesystem/directory_entry/path.md]

### 出力例
```
"dir/b.txt"
"dir/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
