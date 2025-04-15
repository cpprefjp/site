# copy_file
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool copy_file(const path& from, const path& to);                       // (1)
  bool copy_file(const path& from, const path& to, std::error_code& ec);  // (2)

  bool copy_file(const path& from, const path& to, copy_options options); // (3)
  bool copy_file(const path& from, const path& to, copy_options options,
                 std::error_code& ec);                                    // (4)
}
```
* path[link path.md]
* copy_options[link copy_options.md]

## 概要
ファイルをコピーする。


## 要件
- `options`は、各グループのオプションが最大ひとつまで設定されていること


## 効果
- (1) : `return copy_file(from, to,` [`copy_options::none`](copy_options.md)`);`
- (2) : `return copy_file(from, to,` [`copy_options::none`](copy_options.md)`, ec);`
- (3) :
    - 以下のいずれか場合にエラーとなる：
        - `!`[`is_regular_file`](is_regular_file.md)`(from)` (コピー元のファイルが存在しない)
        - [`exists`](exists.md)`(to) && !`[`is_regular_file`](is_regular_file.md)`(to)` (コピー先に、通常ファイルではないファイルが存在している)
        - [`exists`](exists.md)`(to) &&` [`equivalent`](equivalent.md)`(from, to)` (コピー先にファイルが存在しており、それがコピー元と等価)
        - [`exists`](exists.md)`(to) && (options & (`[`copy_options::skip_existing`](copy_options.md) `|` [`copy_options::overwrite_existing`](copy_options.md) `|` [`copy_options::update_existing`](copy_options.md)`)) ==` [`copy_options::none`](copy_options.md) (コピー先にファイルが存在しており、その場合にエラーにならないオプションが指定されていない)
    - 以下の条件のいずれかに合致する場合、パス`from`が解決したファイルを、パス`to`が解決した先にコピーする
        - `!`[`exists`](exists.md)`(to)`
        - `(options &` [`copy_options::overwrite_existing`](copy_options.md)`) !=` [`copy_options::none`](copy_options.md)
        - `(options &` [`copy_options::update_existing`](copy_options.md)`) !=` [`copy_options::none`](copy_options.md)、かつパス`from`のファイルが、パス`to`のファイルよりも最終更新日時が新しい
    - そうでない場合、なにもしない
- (4) : (3)でエラーが発生した場合に、`false`を返し、エラー情報を`ec`に設定する


## 戻り値
ファイルのコピーが行われたら`true`、そうでなければ`false`が返る。

(2)と(4)でエラーが発生した場合も`false`が返る。


## 計算量
直接的もしくは間接的な[`status`](status.md)`(to)`の呼び出しは、最大で一回


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
  std::ofstream{"regular.txt"};

  // ファイル"regular.txt"を、"copy.txt"にコピーする
  fs::copy_file("regular.txt", "copy.txt");

  assert(fs::exists("regular.txt"));
  assert(fs::exists("copy.txt"));

  // 同じパスではなく、シンボリックリンク／ハードリンクでもないので、等価ではない
  assert(!fs::equivalent("regular.txt", "copy.txt"));
}
```
* fs::copy_file[color ff0000]
* fs::exists[link exists.md]
* fs::equivalent[link equivalent.md]

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
- [LWG Issue 2849. Why does `!is_regular_file(from)` cause `copy_file` to report a "file already exists" error?](https://wg21.cmeerw.net/lwg/issue2849)
- [LWG Issue 3014. More `noexcept` issues with filesystem operations](https://wg21.cmeerw.net/lwg/issue3014)
