# directory_iterator
* filesystem[meta header]
* std::filesystem[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  class directory_iterator;
}
```

## 概要
`directory_iterator`は、ディレクトリ内を走査する入力イテレータクラスである。

このイテレータは指定されたディレクトリ内のファイルを走査するが、ディレクトリ内のディレクトリをさらに走査はしない。再帰的にディレクトリを走査する場合は、[`std::filesystem::recursive_directory_iterator`](recursive_directory_iterator.md)クラスを使用する。

ファイルの走査順序は未規定であり、ファイル名の辞書順に走査される保証はない。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](directory_iterator/op_constructor.md) | コンストラクタ | C++17 |
| `~directory_iterator();`                                | デストラクタ | C++17 |
| [`operator=`](directory_iterator/op_assign.md)          | 代入演算子 | C++17 |
| [`operator*`](directory_iterator/op_deref.md)           | 間接参照演算子 | C++17 |
| [`operator->`](directory_iterator/op_arrow.md)          | メンバアクセス演算子 | C++17 |
| [`operator++`](directory_iterator/op_increment.md)      | イテレータを進める | C++17 |
| [`increment`](directory_iterator/increment.md)          | イテレータを進める | C++17 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `iterator_category` | イテレータ種別 [`input_iterator_tag`](/reference/iterator/iterator_tag.md) | C++17 |
| `value_type` | 要素型 [`directory_entry`](directory_entry.md) | C++17 |
| `difference_type` | イテレータの差を表す符号付き整数型 [`std::ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++17 |
| `pointer` | 要素へのポインタ型 `const` [`directory_entry`](directory_entry.md)`*` | C++17 |
| `reference` | 要素へのポインタ型 `const` [`directory_entry`](directory_entry.md)`&` | C++17 |


## 非メンバ関数
### イテレータ範囲

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`begin`](directory_iterator/begin_free.md) | 先頭要素へのイテレータを取得する | C++17 |
| [`end`](directory_iterator/end_free.md)     | 最後尾要素の次を指すイテレータを取得する | C++17 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator==`](directory_iterator/op_equal.md)     | 等値比較 | C++17 |
| [`operator!=`](directory_iterator/op_not_equal.md) | 非等値比較 | C++17 |


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

  // dir_aディレクトリ直下に含まれる全ファイル・ディレクトリを出力
  for (const fs::directory_entry& x : fs::directory_iterator("dir_a")) {
    std::cout << x.path() << std::endl;
  }
}
```
* fs::directory_iterator[color ff0000]
* fs::directory_entry[link directory_entry.md]
* x.path()[link directory_entry/path.md]
* fs::create_directory[link create_directory.md]

### 出力例
```
"dir_a/a.txt"
"dir_a/dir_b"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp):
