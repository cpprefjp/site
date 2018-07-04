# copy_options
* filesystem[meta header]
* std::filesystem[meta namespace]
* enum[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  enum class copy_options {
    none,
    skip_existing,
    overwrite_existing,
    update_existing,
    recursive,
    copy_symlinks,
    skip_symlinks,
    directories_only,
    create_symlinks,
    create_hard_links
  };
}
```

## 概要
コピーオプションを表す、ビットマスクの列挙型。以下に、オプションのグループごとに列挙子の意味を記載する：

### `copy_file()`関数での、存在するファイルに対する動作

| 列挙子 | 説明 |
|--------|------|
| `none`               | すでにファイルが存在している場合はエラー (デフォルト) |
| `skip_existing`      | すでに存在しているファイルは、上書きせず、エラー報告しない |
| `overwrite_existing` | すでに存在しているファイルを上書きする |
| `update_existing`    | すでに存在しているファイルがコピー元よりも古ければ上書きする |

### `copy()`関数での、サブディレクトリに対する動作

| 列挙子 | 説明 |
|--------|------|
| `none`      | サブディレクトリはコピーしない (デフォルト) |
| `recursive` | サブディレクトリのコンテンツを再帰的にコピーする |

### `copy()`関数でのコピー形態を選択

| 列挙子 | 説明 |
|--------|------|
| `none`             | コンテンツをコピーする (デフォルト) |
| `directories_only` | ディレクトリ構造のみをコピーし、非ディレクトリファイルをコピーしない |
| `create_symlinks`  | ファイルのコピーをする代わりに、シンボリックリンクを作成する。<br/> コピー元のパスは、コピー先がカレントディレクトリでない限り、絶対パスであること |
| `create_hard_links` | ファイルのコピーをする代わりに、ハードリンクを作成する |


## 例
TODO

### 出力


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
