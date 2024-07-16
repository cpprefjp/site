# operator++
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
directory_iterator& operator++();
directory_iterator operator++(int);
```

## 概要
イテレータを進める。


## 効果
コンストラクタで指定された[`std::filesystem::directory_options`](/reference/filesystem/directory_options.md)の値に基づいて、次のファイルを指すようイテレータを進める。

例外が発生した場合は、終端を指す状態になる。


## 戻り値
- (1) : 進めたあとのイテレータ自身への参照を返す
- (2) : 進める前のイテレータのコピーを返す


## 例外
ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](../filesystem_error.md)例外を送出する


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

  fs::directory_iterator it{"dir"};

  std::cout << "before : " << it->path() << std::endl;
  ++it;
  std::cout << "after  : " << it->path() << std::endl;
}
```
* fs::create_directory[link /reference/filesystem/create_directory.md]
* it->path()[link /reference/filesystem/directory_entry/path.md]

### 出力
```
before : "dir/b.txt"
after  : "dir/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
