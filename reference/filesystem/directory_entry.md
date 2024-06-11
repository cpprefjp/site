# directory_entry
* filesystem[meta header]
* std::filesystem[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  class directory_entry;
}
```

## 概要
`directory_entry`は、[`directory_iterator`](directory_iterator.md)クラスもしくは[`recursive_directory_iterator`](recursive_directory_iterator.md)クラスによってディレクトリ走査をした際に取得できる、ディレクトリ内要素を表すクラスである。

ディレクトリの走査では、オペレーティングシステムのファイルシステムごとに、異なる追加の属性が取得できる。このクラスは、オペレーティングシステムごとの差異を吸収し、ディレクトリ走査を効率的に行えるようさまざまな属性をキャッシュする。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](directory_entry/op_constructor.md) | コンストラクタ | C++17 |
| `~directory_entry();` | デストラクタ | C++17 |
| `directory_entry& operator=(const directory_entry&) = default;`<br/> `directory_entry& operator=(directory_entry&&) noexcept = default;` | 代入演算子 | C++17 |


### 変更

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`assign`](directory_entry/assign.md) | パスを再代入する | C++17 |
| [`replace_filename`](directory_entry/replace_filename.md) | ファイル名を置き換える | C++17 |
| [`refresh`](directory_entry/refresh.md) | キャッシュを更新する | C++17 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`path`](directory_entry/path.md) | パスを取得する | C++17 |
| [`operator path`](directory_entry/op_path.md) | `path`型に変換する | C++17 |
| [`exists`](directory_entry/exists.md) | パスが存在するか確認する | C++17 |
| [`file_size`](directory_entry/file_size.md) | ファイルサイズを取得する | C++17 |
| [`hard_link_count`](directory_entry/hard_link_count.md) | ハードリンク数を取得する | C++17 |
| [`is_regular_file`](directory_entry/is_regular_file.md) | 通常ファイルを指しているか確認する | C++17 |
| [`is_directory`](directory_entry/is_directory.md) | ディレクトリを指しているか確認する | C++17 |
| [`is_symlink`](directory_entry/is_symlink.md) | シンボリックリンクを指しているか確認する | C++17 |
| [`is_block_file`](directory_entry/is_block_file.md) | ブロックデバイスのスペシャルファイルを指しているか確認する | C++17 |
| [`is_character_file`](directory_entry/is_character_file.md) | キャラクタデバイスのスペシャルファイル指しているか確認する | C++17 |
| [`is_fifo`](directory_entry/is_fifo.md) | FIFOまたはパイプを指しているか確認する | C++17 |
| [`is_socket`](directory_entry/is_socket.md) | ソケットを指しているか確認する | C++17 |
| [`is_other`](directory_entry/is_other.md) | パスが存在していない、もしくはシステム依存の種別のファイルを指しているかを確認する | C++17 |
| [`last_write_time`](directory_entry/last_write_time.md) | 最終更新日時を取得する | C++17 |
| [`status`](directory_entry/status.md) | ファイル状態を取得する | C++17 |
| [`symlink_status`](directory_entry/symlink_status.md) | シンボリックリンクの状態を取得する | C++17 |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator==`](directory_entry/op_equal.md)         | 等値比較 | C++17 |
| [`operator!=`](directory_entry/op_not_equal.md)     | 非等値比較 | C++17 |
| [`operator<=>`](directory_entry/op_compare_3way.md) | 三方比較 | C++20 |
| [`operator<`](directory_entry/op_less.md)           | 左辺が右辺より小さいかの判定を行う | C++17 |
| [`operator<=`](directory_entry/op_less_equal.md)    | 左辺が右辺以下かの判定を行う | C++17 |
| [`operator>`](directory_entry/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | C++17 |
| [`operator>=`](directory_entry/op_greater_equal.md) | 左辺が右辺以上かの判定を行う | C++17 |


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir");
  fs::create_directory("dir/inner_dir");
  std::ofstream{"dir/a.txt"};

  // dirディレクトリ内のファイルを列挙する
  for (const fs::directory_entry& x : fs::directory_iterator("dir")) {
    std::cout << x.path() << std::endl;
  }
}
```
* fs::directory_entry[color ff0000]
* fs::create_directory[link create_directory.md]
* fs::directory_iterator[link directory_iterator.md]
* x.path()[link directory_entry/path.md]

### 出力例
```
"dir/inner_dir"
"dir/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [P0317R1 Directory entry caching for filesystem](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0317r1.html)
