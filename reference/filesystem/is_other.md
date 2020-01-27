# is_other
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool is_other(file_status s) noexcept;                      // (1)
  bool is_other(const path& p);                               // (2)
  bool is_other(const path& p, std::error_code& ec) noexcept; // (3)
}
```
* file_status[link file_status.md]
* path[link path.md]

## 概要
指定されたパスが�在していない、もしくはシステム依�の種別のファイルを指しているかを確認する。


## 戻り値
- (1) :
    ```cpp
    return exists(s) && !is_regular_file(s) && !is_directory(s) && !is_symlink(s);
    ```
    * exists[link exists.md]
    * is_regular_file[link is_regular_file.md]
    * is_directory[link is_directory.md]
    * is_symlink[link is_symlink.md]

- (2) : `return is_other(`[`status`](status.md)`(p));`
- (3) :
    ```cpp
    file_status s = status(p, ec);
    if (ec) {
      return false;
    }

    ec.clear();
    return is_other(s);
    ```
    * file_status[link file_status.md]
    * status[link status.md]
    * ec.clear()[link /reference/system_error/error_code/clear.md]


## 例外
- (1) : 投げない
- (2) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (3) : 投げない


## 例
### Linux環境の例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // (1)
  // 取得済みのファイル状態を使用して、システム依�のファイルかを確認
  assert(fs::is_other(fs::status("/dev/urandom")));

  // (2)
  // パスを指定して、システム依�のファイルかを確認。
  assert(fs::is_other("/dev/urandom"));
  assert(fs::is_other("/dev/null"));

  // (3)
  // エラー情報を例外ではなくerror_codeで受け取る
  std::error_code ec;
  bool result = fs::is_other("/dev/urandom", ec);
  assert(!ec);
  assert(result);
}
```
* fs::is_other[color ff0000]
* fs::status[link status.md]

#### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
