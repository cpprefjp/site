# operator=
* filesystem[meta header]
* std::filesystem[meta namespace]
* recursive_directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
recursive_directory_iterator& operator=(const recursive_directory_iterator& rhs);     // (1)
recursive_directory_iterator& operator=(recursive_directory_iterator&& rhs) noexcept; // (2)
```

## 概要
- (1) : コピー代入演算�
- (2) : ムーブ代入演算�


## 効果
`rhs`と`*this`が同じオブジェクトである場合はなにもしない

- (1) : `rhs`が保持するデータを`*this`にコピーする
- (2) : `rhs`が保持するデータを`*this`にムーブする


## 戻り値
`*this`


## 事後条件
- (1) :
    - `this->`[`options()`](options.md) `== rhs.`[`options()`](options.md) であること
    - `this->`[`depth()`](depth.md) `== rhs.`[`depth()`](depth.md) であること
    - `this->`[`recursion_pending()`](recursion_pending.md) `== rhs.`[`recursion_pending()`](recursion_pending.md) であること
- (2) : [`options()`](options.md)、[`depth()`](depth.md)、[`recursion_pending()`](recursion_pending.md)の値が、この関数を呼び出す前の`rhs.`[`options()`](options.md)、`rhs.`[`depth()`](depth.md)、`rhs.`[`recursion_pending()`](recursion_pending.md)の値を持つこと


## 備考
未規定だが、GCC 8.2およびClang 7.0環境では、この代入演算�はコピー元とコピー先で所有権を共有する。そのため、コピー・ムーブに関わらず、代入元のイテレータは代入後に再構築以外の操作をしてはならない


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

  fs::recursive_directory_iterator it1{"dir"};
  fs::recursive_directory_iterator it2;

  it2 = it1;

  std::cout << it2->path() << std::endl;
  ++it2;
  std::cout << it2->path() << std::endl;
}
```
* fs::create_directory[link /reference/filesystem/create_directory.md]
* it2->path()[link /reference/filesystem/directory_entry/path.md]

### 出力例
```
"dir/b.txt"
"dir/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
