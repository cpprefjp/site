# コンストラクタ
* filesystem[meta header]
* std::filesystem[meta namespace]
* recursive_directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
recursive_directory_iterator() noexcept;                         // (1)
explicit recursive_directory_iterator(const path& p);            // (2)
recursive_directory_iterator(const path& p,
                   directory_options options);                   // (3)
recursive_directory_iterator(const path& p,
                   std::error_code& ec);                         // (4)
recursive_directory_iterator(const path& p,
                   directory_options options,
                   std::error_code& ec);                         // (5)
recursive_directory_iterator(const directory_iterator& rhs);     // (6)
recursive_directory_iterator(directory_iterator&& rhs) noexcept; // (7)
```
* path[link /reference/filesystem/path.md]
* directory_options[link /reference/filesystem/directory_options.md]

## 概要
`recursive_directory_iterator`オブジェクトを構築する。

- (1) : 終端イテレータを構築する
- (2), (4) : 指定されたパスのディレクトリを再帰的に走査するイテレータを構築する
- (3), (5) : 走査オプション付きで、指定されたパスのディレクトリを再帰的に走査するイテレータを構築する
- (6) : コピーコンストラクタ
- (7) : ムーブコンストラクタ


## 効果
- (1) : 終端イテレータを構築する
- (2), (4) : パス`p`がディレクトリに解決される場合、そのディレクトリの最初の要素を指すイテレータを構築する。パス`p`がディレクトリではない場合、終端イテレータを構築する
- (3), (5) :
    - (2), (4)に加えて、
    - パス`p`へのアクセスが拒否された場合、`options`として[`directory_options::skip_permission_denied`](/reference/filesystem/directory_options.md)が指定されていれば、エラー報告をせず、終端イテレータを構築する
    - `options`として[`directory_options::follow_directory_symlink`](/reference/filesystem/directory_options.md)が指定されていれば、シンボリックリンクになっているディレクトリ内も走査する
- (6) : `rhs`を`*this`にコピーする。`rhs`と`*this`が同じオブジェクトである場合はなにもしない
- (7) : `rhs`の所有権を`*this`に移動する。`rhs`と`*this`が同じオブジェクトである場合はなにもしない


## 例外
- (2), (3) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](/reference/filesystem/filesystem_error.md)例外を送出する


## 備考
- 現在のディレクトリを走査する場合は、`recursive_directory_iterator("")`ではなく`recursive_directory_iterator(".")`を使用すること
- このイテレータは、デフォルトではディレクトリのシンボリックリンクには従わない。ディレクトリのシンボリックリンクも再帰的に走査する場合は、走査オプションに[`directory_options::follow_directory_symlink`](/reference/filesystem/directory_options.md)を指定すること


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

  // (1) 終端イテレータを構築する
  {
    fs::recursive_directory_iterator it;
  }

  // (2) 指定したディレクトリの先頭要素を指すイテレータを構築する
  {
    fs::recursive_directory_iterator it{"dir"};
    assert(it->path() == "dir/a.txt");
  }

  // (3) 走査オプション付きで、指定したディレクトリの先頭要素を指すイテレータを構築する
  {
    fs::recursive_directory_iterator it{"dir", fs::directory_options::skip_permission_denied};
    assert(it->path() == "dir/a.txt");
  }

  // (4) エラー時 (アクセス拒否された場合) に例外ではなくerror_codeオブジェクトに書き込む
  {
    std::error_code ec;
    fs::recursive_directory_iterator it{"dir", ec};
    assert(!ec);
    assert(it->path() == "dir/a.txt");
  }

  // (5) 同上
  {
    std::error_code ec;
    fs::recursive_directory_iterator it{"dir", fs::directory_options::skip_permission_denied, ec};
    assert(!ec);
    assert(it->path() == "dir/a.txt");
  }
}
```
* fs::create_directory[link /reference/filesystem/create_directory.md]
* it->path()[link /reference/filesystem/directory_entry/path.md]
* fs::directory_options::skip_permission_denied[link /reference/filesystem/directory_options.md]

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


## 参照
- [LWG Issue 3013. `(recursive_)directory_iterator` construction and traversal should not be `noexcept`](https://wg21.cmeerw.net/lwg/issue3013)
