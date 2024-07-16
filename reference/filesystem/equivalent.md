# equivalent
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool equivalent(const path& p1, const path& p2);                               // (1)
  bool equivalent(const path& p1, const path& p2, std::error_code& ec) noexcept; // (2)
}
```
* path[link path.md]

## 概要
2つのエンティティが等価かを確認する。

2つのエンティティが、ファイルシステムとして等価かを確認する。2つが同じパスの場合は等価、それに加えてシンボリックリンクと元のファイルも等価、同じinodeを参照するハードリンクも等価と判断される。


## 戻り値
- [`status`](status.md)`(p1)`を`s1`、[`status`](status.md)`(p2)`を`s2`として、
- `s1 == s2`かつ`p1`と`p2`がファイルシステムとして等価のエンティティに解決される場合、`true`を返し、そうでなければ`false`を返す
- `p1`と`p2`両方のエンティティが存在しない、`p1`と`p2`両方が[`is_other()`](is_other.md)で`true`を返す種別のエンティティである場合、およびファイルシステムでエラーが発生した場合、 (1) では[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出し、 (2) では`ec`にエラー情報が設定されて`false`が返る


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、`p1`と`p2`両方のエンティティが存在しない、`p1`と`p2`両方が[`is_other()`](is_other.md)で`true`を返す種別のエンティティである場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};
  fs::create_symlink("regular.txt", "regular.symlink");
  fs::create_hard_link("regular.txt", "regular-2.txt");

  fs::create_directory("dir");
  fs::create_directory_symlink("dir", "dir_symlink");

  // パスを正規化した結果として等価のパスを指している
  assert(fs::equivalent("regular.txt", "./regular.txt"));

  // シンボリックリンクとその元は等価
  assert(fs::equivalent("regular.txt", "regular.symlink"));
  assert(fs::equivalent("regular-2.txt", "regular.symlink"));
  assert(fs::equivalent("dir", "dir_symlink"));

  // 同じinodeを参照するハードリンクは等価
  assert(fs::equivalent("regular.txt", "regular-2.txt"));
}
```
* fs::equivalent[color ff0000]
* fs::create_symlink[link create_symlink.md]
* fs::create_hard_link[link create_hard_link.md]
* fs::create_directory[link create_directory.md]
* fs::create_directory_symlink[link create_directory_symlink.md]

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
