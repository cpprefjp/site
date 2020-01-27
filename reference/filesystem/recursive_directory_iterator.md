# recursive_directory_iterator
* filesystem[meta header]
* std::filesystem[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  class recursive_directory_iterator;
}
```

## 概要
`recursive_directory_iterator`は、ディレクトリ内を再帰的に走査する入力イテレータクラスである。

[`std::filesystem::directory_iterator`](directory_iterator.md)クラスは指定されたディレクトリ直下のファイルを走査するが、このイテレータはディレクトリ内のディレクトリも再帰的に走査する。

ファイルの走査順序は未規定であり、ファイル名の辞書順に走査される保証はない。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](recursive_directory_iterator/op_constructor.md) | コンストラクタ | C++17 |
| `~recursive_directory_iterator();`                                | デストラクタ | C++17 |
| [`operator=`](recursive_directory_iterator/op_assign.md)          | 代入演算� | C++17 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`options`](recursive_directory_iterator/options.md) | 走査オプションを取得する | C++17 |
| [`depth`](recursive_directory_iterator/depth.md) | ディレクトリの深さを取得する | C++17 |
| [`recursion_pending`](recursive_directory_iterator/recursion_pending.md) | 再帰しないかどうかが未決定かを確認する | C++17 |


### 変更

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`operator*`](recursive_directory_iterator/op_deref.md)      | 間接参照演算� | C++17 |
| [`operator->`](recursive_directory_iterator/op_arrow.md)     | メンバアクセス演算� | C++17 |
| [`operator++`](recursive_directory_iterator/op_increment.md) | イテレータを進める | C++17 |
| [`increment`](recursive_directory_iterator/increment.md)     | イテレータを進める | C++17 |
| [`pop`](recursive_directory_iterator/pop.md)                 | そのディレクトリの走査を��する | C++17 |
| [`disable_recursion_pending`](recursive_directory_iterator/disable_recursion_pending.md) | 再帰を�める | C++17 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `iterator_category` | イテレータ種別 [`input_iterator_tag`](/reference/iterator/iterator_tag.md) | C++17 |
| `value_type` | 要素型 [`directory_entry`](directory_entry.md) | C++17 |
| `difference_type` | イテレータの差を表す符号付き整数型 [`std::ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++17 |
| `pointer` | 要素へのポインタ型 `const` [`directory_entry`](directory_entry.md)`*` | C++17 |
| `reference` | 要素へのポインタ型 `const` [`directory_entry`](directory_entry.md)`&` | C++17 |


## 非メンバ関数
### 範囲

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`begin`](recursive_directory_iterator/begin_free.md) | 先�要素へのイテレータを取得する | C++17 |
| [`end`](recursive_directory_iterator/end_free.md)     | 最後尾要素の次を指すイテレータを取得する | C++17 |

### 比較演算�

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator==`](recursive_directory_iterator/op_equal.md)     | �値比較 | C++17 |
| [`operator!=`](recursive_directory_iterator/op_not_equal.md) | 非�値比較 | C++17 |


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir_a");
  std::ofstream{"dir_a/a.txt"};

  fs::create_directory("dir_a/dir_b");
  std::ofstream{"dir_a/dir_b/b.txt"};

  // dir_aディレクトリに含まれる全ファイルを再帰的に出力
  for (const fs::directory_entry& x : fs::recursive_directory_iterator("dir_a")) {
    std::cout << x.path() << std::endl;
  }
}
```
* fs::recursive_directory_iterator[color ff0000]
* fs::directory_entry[link directory_entry.md]
* x.path()[link directory_entry/path.md]
* fs::create_directory[link create_directory.md]

### 出力例
```
"dir_a/a.txt"
"dir_a/dir_b"
"dir_a/dir_b/b.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp):
