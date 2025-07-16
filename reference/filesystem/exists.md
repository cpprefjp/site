# exists
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool exists(file_status s) noexcept;                      // (1)
  bool exists(const path& p);                               // (2)
  bool exists(const path& p, std::error_code& ec) noexcept; // (3)
}
```
* file_status[link file_status.md]
* path[link path.md]

## 概要
ファイルが存在するか確認する。


## 戻り値
- (1) : `return` [`status_known`](status_known.md)`(s) &&` [`s.type()`](file_status/type.md) `!=` [`file_type::not_found`](file_type.md)`;`
- (2) : `return exists(`[`status`](status.md)`(p));`
- (3) :
    ```cpp
    file_status s = status(p, ec);
    if (status_known(s)) {
      ec.clear();
    }
    return exists(s);
    ```
    * file_status[link file_status.md]
    * status[link status.md]
    * status_known[link status_known.md]
    * ec.clear()[link /reference/system_error/error_code/clear.md]


## 例外
- (1) : 投げない
- (2) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたファイルの種別が[`file_type::unknown`](file_type.md)のいずれかである場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (3) : 投げない


## 例
```cpp example
#include <cassert>
#include <fstream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};
  fs::create_directory("dir");

  // (1)
  // 取得済みのファイル状態を使用して、ファイルの存在確認
  assert(fs::exists(fs::status("regular.txt")));

  // (2)
  // パスを指定してファイル／ディレクトリの存在確認
  assert(fs::exists("regular.txt"));
  assert(fs::exists("dir"));

  // (3)
  // エラー情報を例外ではなくerror_codeで受け取る
  std::error_code ec;
  bool result = fs::exists("regular.txt", ec);
  assert(!ec);
  assert(result);
}
```
* fs::exists[color ff0000]
* fs::create_directory[link create_directory.md]
* fs::status[link status.md]

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
