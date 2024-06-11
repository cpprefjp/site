# コンストラクタ
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
directory_entry() noexcept = default;                  // (1)
directory_entry(const directory_entry&) = default;     // (2)
directory_entry(directory_entry&&) noexcept = default; // (3)
explicit directory_entry(const path& p);               // (4)
directory_entry(const path& p, std::error_code& ec);   // (5)
```
* path[link /reference/filesystem/path.md]

## 概要
`directory_entry`オブジェクトを構築する。

このクラスは`directory_iterator`クラスを`friend`宣言している。そのため、そのクラスはこれらのコンストラクタを介することなく、メンバ変数として保持するキャッシュを代入できる。

- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ
- (4), (5) : パスを指定して構築するコンストラクタ


## 効果
- (4) : パスを`*this`に保持し、[`refresh()`](refresh.md)を実行する
- (5) : パスを`*this`に保持し、[`refresh`](refresh.md)`(ec)`を実行する。エラー発生時には、[`path()`](path.md)メンバ関数が返す値は[`std::filesystem::path`](/reference/filesystem/path.md)`{}`となる


## 例外
- (4) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](/reference/filesystem/filesystem_error.md)例外を送出する


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

  fs::directory_entry x{"dir/a.txt"};
  std::cout << x.path() << std::endl;
}
```
* fs::create_directory[link /reference/filesystem/create_directory.md]
* x.path()[link path.md]

### 出力
```
"dir/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
