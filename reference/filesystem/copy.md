# copy
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  void copy(const path& from, const path& to);                       // (1)
  void copy(const path& from, const path& to, std::error_code& ec);  // (2)

  void copy(const path& from, const path& to, copy_options options); // (3)
  void copy(const path& from, const path& to, copy_options options,
            std::error_code& ec);                                    // (4)
}
```
* path[link path.md]
* copy_options[link copy_options.md]

## 概要
ファイル・ディレクトリ・シンボリックリンクをコピーする。


## 要件
- `options`は、各グループのオプションが最大ひとつまで設定されていること


## 効果
- (1) : `return copy(from, to,` [`copy_options::none`](copy_options.md)`);`
- (2) : `return copy(from, to,` [`copy_options::none`](copy_options.md)`, ec);`
- (3), (4) :
    - まず、コピー元のファイル状態`f`とコピー先のファイル状態`t`を、以下のように取得する：
        ```cpp
        file_status f;
        file_status t;
        if ((options & copy_options::create_symlinks) != copy_options::none ||
            (options & copy_options::skip_symlinks) != copy_options::none) {
          f = symlink_status(from);
          t = symlink_status(to);
        }
        else if ((options & copy_options::copy_symlinks) != copy_options::none) {
          f = symlink_status(from);
          t = status(to);
        }
        else {
          f = status(from);
          t = status(to);
        }
        ```
        * file_status[link file_status.md]
        * copy_options[link copy_options.md]
        * symlink_status[link symlink_status.md]
        * status[link status.md]

    - `f.`[`type()`](file_status/type.md)もしくは`t.`[`type()`](file_status/type.md)が実装定義のファイル種別であった場合、その効果は実装定義となる
    - 以下のいずれかの場合、エラーを報告する。(3)の場合は例外、(4)の場合は`ec`にエラー情報を設定することでエラー報告とする：
        - `!`[`exists`](exists.md)`(f)`
        - [`equivalent`](equivalent.md)`(from, to)`
        - [`is_other`](is_other.md)`(f) ||` [`is_other`](is_other.md)`(t)`
        - [`is_directory`](is_directory.md)`(f) &&` [`is_regular_file`](is_regular_file.md)`(t)`
        - また、それ以外に、ファイルコピー、シンボリックリンクのコピー、ディレクトリ作成などにおいてエラーが報告される可能性がある
    - コピー元がシンボリックリンクである場合、
        - `(options & copy_options::skip_symlinks) != copy_options::none`であれば、なにもしないで終了する
        - `!exists(t) && (options & copy_options::copy_symlinks) != copy_options::none`であれば、[`copy_symlink`](copy_symlink.md)`(from, to)`を実行する
        - いずれの条件にも合致しない場合は、エラーを報告する
    - コピー元が通常ファイルである場合、
        - `(options & copy_options::directories_only) != copy_options::none`であれば、なにもしないで終了する
        - `(options & copy_options::create_symlinks) != copy_options::none`であれば、コピー元ファイルのシンボリックリンクを、コピー先に作成する
        - `(options & copy_options::create_hard_links) != copy_options::none`であれば、コピー元ファイルのハードリンクを、コピー先に作成する
        - コピー先がディレクトリである場合、[`copy_file`](copy_file.md)`(from, to/`[`from.filename()`](path/filename.md)`, options)`を実行する
        - いずれの条件にも合致しない場合は、[`copy_file`](copy_file.md)`(from, to, options)`を実行する
    - コピー元がディレクトリであり、`(options & copy_options::create_symlinks) != copy_options::none`である場合、[`make_error_code`](/reference/system_error/make_error_code.md)`(`[`errc::is_a_directory`](/reference/system_error/errc.md)`)`と等値な[`error_code`](/reference/system_error/error_code.md)オブジェクトをエラーとして報告する
    - コピー元がディレクトリであり、`((options & copy_options::recursive) != copy_options::none || options == copy_options::none)`である場合、
        - コピー先にディレクトリが存在しない場合は、[`create_directory`](create_directory.md)`(to, from)`を実行する
        - その後、コピー元ディレクトリの全ての要素を、以下のようにコピーする (`in-recursive-copy`は、[`copy_options`](copy_options.md)には含まれないビットマスク要素)：

        ```cpp
        for (const directory_entry& x : directory_iterator(from))
            copy(x.path(), to/x.path().filename(), options | copy_options::in-recursive-copy)
        ```
        * directory_entry[link directory_entry.md]
        * directory_iterator[link directory_iterator.md]
        * x.path()[link directory_entry/path.md]
        * filename()[link path/filename.md]
        * copy_options[link copy_options.md]
        * in-recursive-copy[italic]

    - いずれでもない場合、
        - (3) であれば、なにもしない
        - (4) であれば[`ec.clear()`](/reference/system_error/error_code/clear.md)を呼び出し、エラー情報をクリアする


## 例外
- (1), (3) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2), (4) : OSがファイルコピーの直接のAPIを定義していない場合、この関数の実装として動的なバッファを確保する可能性がある。その際、メモリ確保で例外が発生する可能性がある


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  // 単純なファイルのコピー。
  // コピー先にはファイルが存在していない
  // (コピー先にファイルが存在していたらエラー)
  {
    std::ofstream{"regular1.txt"};

    // ファイル"regular1.txt"を、"copy1.txt"にコピーする
    fs::copy("regular1.txt", "copy1.txt");

    assert(fs::exists("regular1.txt"));
    assert(fs::exists("copy1.txt"));
  }

  // ファイルのコピー。
  // コピー先にすでにファイルがある場合は、上書きする
  {
    std::ofstream{"regular2.txt"};

    // ファイル"regular2.txt"を、"copy2.txt"にコピーする
    fs::copy("regular2.txt", "copy2.txt", fs::copy_options::overwrite_existing);

    assert(fs::exists("regular2.txt"));
    assert(fs::exists("copy2.txt"));
  }

  // ファイルのコピーを、シンボリックリンクの作成として行う
  {
    std::ofstream{"regular3.txt"};

    // ファイル"regular3.txt"へのシンボリックリンクとして、"copy3.txt"を作成する
    fs::copy("regular3.txt", "copy3.txt", fs::copy_options::create_symlinks);

    assert(fs::exists("regular3.txt"));
    assert(fs::exists("copy3.txt"));
    assert(fs::is_symlink("copy3.txt"));
  }

  // シンボリックリンクファイルのコピー
  {
    fs::create_symlink("regular3.txt", "regular4.symlink");

    // シンボリックリンクファイル"regular4.symlink"を、"copy4.symlink"にコピーする
    fs::copy("regular4.symlink", "copy4.symlink");

    assert(fs::exists("regular4.symlink"));
    assert(fs::exists("copy4.symlink"));
  }

  // ディレクトリのコピー
  {
    fs::create_directory("dir");
    fs::create_directory("dir/sub_dir");
    std::ofstream{"dir/a.txt"};
    std::ofstream{"dir/sub_dir/b.txt"};

    fs::copy("dir", "copy_dir", fs::copy_options::recursive);

    assert(fs::exists("copy_dir"));
    assert(fs::exists("copy_dir/sub_dir"));
    assert(fs::exists("copy_dir/a.txt"));
    assert(fs::exists("copy_dir/sub_dir/b.txt"));
  }
}
```
* fs::copy[color ff0000]
* fs::exists[link exists.md]
* fs::copy_options[link copy_options.md]
* fs::is_symlink[link is_symlink.md]
* fs::create_symlink[link create_symlink.md]
* fs::create_directory[link create_directory.md]

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
- [LWG Issue 3015. `copy_options::unspecified` underspecified](https://wg21.cmeerw.net/lwg/issue3015)
- [LWG Issue 2682. `filesystem::copy()` won't create a symlink to a directory](https://wg21.cmeerw.net/lwg/issue2682)
    - C++17策定同時の仕様では、`copy("/", "root", copy_options::create_symlinks);`のような状況 (コピー元がディレクトリで、`create_symlinks`オプション付き) でコピー先ディレクトリにシンボリックリンクが作られない問題があった。GNUの`cp -s`コマンドでは「ディレクトリ`"/"`の処理は省略された」と表示されてエラー終了する。この問題に対する仕様変更ではその動作に合わせて、コピー元がディレクトリで`create_symlinks`オプションが指定された場合、エラーを報告するようになった
    - この問題は2016年4月に報告された。仕様としてはC++20に含まれるが、過去に遡ってC++17のコンパイラでもこの仕様に対応している可能性がある
- [LWG Issue 3013. `(recursive_)directory_iterator` construction and traversal should not be `noexcept`](https://wg21.cmeerw.net/lwg/issue3013)
