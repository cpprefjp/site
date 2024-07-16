# is_fifo
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool is_fifo(file_status s) noexcept;                      // (1)
  bool is_fifo(const path& p);                               // (2)
  bool is_fifo(const path& p, std::error_code& ec) noexcept; // (3)
}
```
* file_status[link file_status.md]
* path[link path.md]

## 概要
指定されたパスがFIFOもしくはパイプを指しているかを確認する。


## 戻り値
- (1) : `return` [`s.type()`](file_status/type.md) `==` [`file_type::fifo`](file_type.md)`;`
- (2) : `return is_fifo(`[`status`](status.md)`(p));`
- (3) :
    ```cpp
    file_status s = status(p, ec);
    if (ec) {
      return false;
    }

    // ファイルが見つからなかったらエラー
    file_type type = s.type();
    if (type == file_type::none || file_type::not_found || file_type::unknown) {
      ec = implementation-defined;
      return false;
    }
    ec.clear();
    return is_fifo(s);
    ```
    * file_status[link file_status.md]
    * status[link status.md]
    * file_type[link file_type.md]
    * s.type()[link file_status/type.md]
    * ec.clear()[link /reference/system_error/error_code/clear.md]


## 例外
- (1) : 投げない
- (2) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたファイルの種別が[`file_type::none`](file_type.md)、[`file_type::not_found`](file_type.md)、[`file_type::unknown`](file_type.md)のいずれかである場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (3) : 投げない


## 例
### Linux環境の例
```cpp example
#include <cassert>
#include <filesystem>
#include <sys/stat.h>

namespace fs = std::filesystem;

int main()
{
  // FIFOスペシャルファイル (名前付きパイプ) を作成
  mkfifo("fifo", static_cast<int>(fs::perms::owner_read | fs::perms::owner_write));

  // (1)
  // 取得済みのファイル状態を使用して、FIFOスペシャルファイルかを確認
  assert(fs::is_fifo(fs::status("fifo")));

  // (2)
  // パスを指定して、FIFOペシャルファイルかを確認。
  assert(fs::is_fifo("fifo"));

  // (3)
  // エラー情報を例外ではなくerror_codeで受け取る
  std::error_code ec;
  bool result = fs::is_fifo("fifo", ec);
  assert(!ec);
  assert(result);
}
```
* fs::is_fifo[color ff0000]
* fs::perms[link perms.md]
* fs::status[link status.md]

#### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
