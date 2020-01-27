# space
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  space_info space(const path& p);                               // (1)
  space_info space(const path& p, std::error_code& ec) noexcept; // (2)
}
```
* path[link path.md]
* space_info[link space_info.md]

## 概要
指定されたパスの残り容量を取得する。


## 戻り値
- POSIX環境であれば、[`statvfs()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/statvfs.3.html)関数を使用して、残り容量を取得する。
    - [`space_info::capacity`](space_info.md)の値は`statvfs::f_blocks * statvfs::f_frsize`
    - [`space_info::free`](space_info.md)の値は`statvfs::f_bfree * statvfs::f_frsize`
    - [`space_info::available`](space_info.md)の値は`statvfs::f_bavail * statvfs::f_frsize`
- 容量を決定できない場合、[`space_info`](space_info.md)クラスのそのメンバ変数の値としては、`static_cast<`[`uintmax_t`](/reference/cstdint/uintmax_t.md)`>(-1)`を�定する
- 容量をすべて取得できなかった場合は、
    - (1) : [`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
    - (2) : `ec`にエラー情報を�定し、[`space_info`](space_info.md)クラスの全てのメンバ変数に、値として`static_cast<`[`uintmax_t`](/reference/cstdint/uintmax_t.md)`>(-1)`を�定する


## 例外
- (1) : 容量を取得できなかった場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 投げない


## 例
### Linux環境の例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

void print_space(const char* name, std::uintmax_t bytes)
{
  std::uintmax_t mega_bytes = bytes / (1024 * 1024);
  std::cout << name << " : " << bytes << "[B]"
            << " (" << mega_bytes << "[MB])" << std::endl;
}

int main()
{
  fs::path p = "/";
  fs::space_info info = fs::space(p);

  std::cout << p << std::endl;
  print_space("capacity", info.capacity);
  print_space("free", info.free);
  print_space("available", info.available);
}
```
* fs::space_info[color ff0000]
* fs::space[link space.md]
* std::uintmax_t[link /reference/cstdint/uintmax_t.md]

#### 出力例
```
"/"
capacity : 1048580096[B] (1000[MB])
free : 1048580096[B] (1000[MB])
available : 1048580096[B] (1000[MB])
```

仮想環境で実行しているため、空き容量が減っていない。実環境で動かせるようになったら出力例を更新する。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
