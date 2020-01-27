# last_write_time
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  file_time_type last_write_time(const path& p);                // (1)
  file_time_type last_write_time(const path& p,
                                 std::error_code& ec) noexcept; // (2)

  void last_write_time(const path& p, file_time_type new_time); // (3)
  void last_write_time(const path& p, file_time_type new_time,
                       std::error_code& ec) noexcept;           // (4)
}
```
* path[link path.md]
* file_time_type[link file_time_type.md]

## 概要
エンティティの最終更新日を取得・更新する。

- (1), (2) : 最終更新日時を取得する
- (3), (4) : 最終更新日時を更新する


## 効果
- (1), (2) : パス`p`が指すエンティティのデータが最後に変更された時間を返す
    - POSIX環境では[`stat()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/stat.2.html)関数によって返される`st_mtime`メンバを使用する
    - (2) : エラーが発生した場合は、`ec`にエラー情報が�定され、`file_time_type::min()`が返る
- (3), (4) : パス`p`のエンティティに、最終更新日時として`new_time`を�定する
    - POSIX環境では[`futimens()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/utimensat.2.html)関数を使用する
    - この関数を実行した結果として、`last_write_time(p) == new_time`となることは保証されない。これはOSのファイルシステムの制限による
    - (4) : エラーが発生した場合は、`ec`にエラー情報が�定される


## 例外
- (1), (3) : エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2), (4) : 投げない


## 例
```cpp example
#include <iostream>
#include <fstream>
#include <filesystem>
#include <ctime>
#include <iomanip>

namespace fs = std::filesystem;

void print_datetime(const char* name, fs::file_time_type tp)
{
  namespace chrono = std::chrono;
  auto sec = chrono::duration_cast<chrono::seconds>(tp.time_since_epoch());

  std::time_t t = sec.count();
  const std::tm* lt = std::localtime(&t);
  std::cout << name << " : " << std::put_time(lt, "%c") << std::endl;
}

int main()
{
  std::ofstream{"regular.txt"};
  fs::create_directory("dir");

  // ファイル・ディレクトリの最終更新日時を取得
  fs::file_time_type file_time = fs::last_write_time("regular.txt");
  fs::file_time_type dir_time = fs::last_write_time("dir");

  print_datetime("file time", file_time);
  print_datetime("dir time", dir_time);

  // ファイルの最終更新日時として、現在日時を�定
  fs::last_write_time("regular.txt", fs::file_time_type::clock::now());
}
```
* fs::last_write_time[color ff0000]
* fs::file_time_type[link file_time_type.md]
* fs::create_directory[link create_directory.md]
* tp.time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* sec.count()[link /reference/chrono/duration/count.md]
* std::time_t[link /reference/ctime/time_t.md]
* std::tm[link /reference/ctime/tm.md.nolink]
* std::localtime[link /reference/ctime/localtime.md.nolink]

### 出力例
```
file time : Fri Jun 15 14:19:03 2018
dir time : Fri Jun 15 14:19:03 2018
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
