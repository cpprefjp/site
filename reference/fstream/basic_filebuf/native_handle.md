# native_handle
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
native_handle_type native_handle() const noexcept;
```

## 概要
処理系定義のネイティブハンドルを取得する。


## 事前条件
- [`is_open()`](is_open.md)が`true`を返すこと


## 戻り値
`*this`が指すファイルに対するネイティブハンドルを返す。


## 備考
- ネイティブハンドルは、ファイルが閉じられると無効になる


## 例
```cpp example
// POSIX環境
#include <fstream>
#include <print>
#include <chrono>

#include <sys/types.h>
#include <sys/stat.h>

int main() {
  std::fstream fs("example.txt", std::ios_base::in);
  std::filebuf* buf = fs.rdbuf();

  if (!buf->is_open()) {
    std::println("ファイルを開けなかった");
    return 1;
  }

  // ネイティブハンドルから、POSIXのAPIでファイルの最終更新日時を取得する
  int fd = buf->native_handle();
  struct ::stat s{};
  ::fstat(fd, &s);

  std::chrono::sys_seconds last_modified {std::chrono::seconds(s.st_mtim.tv_sec)};
  std::chrono::zoned_time zoned{"Asia/Tokyo", last_modified};
  std::println("Last modified: {}", zoned);
}
```
* native_handle[color ff0000]
* std::fstream[link /reference/fstream/basic_fstream.md]
* fs.rdbuf()[link /reference/fstream/basic_fstream/rdbuf.md]
* buf->is_open()[link is_open.md]
* std::chrono::sys_seconds[link /reference/chrono/sys_time.md]
* std::chrono::zoned_time[link /reference/chrono/zoned_time.md]

### 出力例
```
Last modified: 2025-05-28 17:56:55 JST
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 18 [mark verified]
- [GCC](/implementation.md#gcc): 14 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P1759R6 Native handles and file streams](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1759r6.html)