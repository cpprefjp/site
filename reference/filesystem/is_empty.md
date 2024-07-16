# is_empty
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool is_empty(const path& p);                      // (1)
  bool is_empty(const path& p, std::error_code& ec); // (2)
}
```
* path[link path.md]

## 概要
指定されたパスが空のファイル・ディレクトリかを確認する。


## 戻り値
- (1) : (2)でエラーが発生した場合に、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) :
    1. ファイル状態を取得する
        - 取得に失敗したらエラーとして、`ec`にエラー情報が書き込まれ、`false`が返る
    2. ファイルがディレクトリだった場合は、ディレクトリ状態を取得する
        - 取得に失敗したらエラーとして、`ec`にエラー情報が書き込まれ、`false`が返る
    3. ディレクトリが空だったら`true`、そうでなければ`false`が返る
        - 空のサブディレクトリがある場合、空ではないとみなされる
    4. ファイルがディレクトリでなければ、ファイルサイズを取得する
        - 取得に失敗したらエラーとして、`ec`にエラー情報が書き込まれ、`false`が返る
    5. ファイルサイズがゼロであれば`true`、そうでなければ`false`が返る


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたファイルの種別が[`file_type::none`](file_type.md)、[`file_type::not_found`](file_type.md)、[`file_type::unknown`](file_type.md)のいずれかである場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 例
```cpp example
#include <cassert>
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"empty_file"};
  fs::create_directory("empty_dir");

  // (2)
  // パスを指定して、空かを確認。
  assert(fs::is_empty("empty_dir"));
  assert(fs::is_empty("empty_file"));

  // (3)
  // エラー情報を例外ではなくerror_codeで受け取る
  std::error_code ec;
  bool result = fs::is_empty("empty_file", ec);
  assert(!ec);
  assert(result);
}
```
* fs::is_empty[color ff0000]
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
- [LWG Issue 3013. `(recursive_)directory_iterator` construction and traversal should not be `noexcept`](https://wg21.cmeerw.net/lwg/issue3013)
