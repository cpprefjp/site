# file_time_type
* filesystem[meta header]
* std::filesystem[meta namespace]
* type-alias[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  using file_time_type = chrono::time_point<実装定義のクロック型>; // (1) C++17
  using file_time_type = chrono::time_point<chrono::file_clock>;   // (1) C++20
}
```
* chrono::time_point[link /reference/chrono/time_point.md]
* chrono::file_clock[link /reference/chrono/file_clock.md]

## 概要
ファイル情報で使用する時間の型。

時間の分解能はOS依存。


## 備考
- C++17とC++20では標準ライブラリの実装によって、この型を[`std::time_t`](/reference/ctime/time_t.md)型に変換する方法が異なる場合がある


## 例
### C++17での使用例
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
  const tm* lt = std::localtime(&t);
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

  // ファイルの最終更新日時として、現在日時を設定
  fs::last_write_time("regular.txt", fs::file_time_type::clock::now());
}
```
* fs::file_time_type[color ff0000]
* fs::last_write_time[link last_write_time.md]
* fs::create_directory[link create_directory.md]
* tp.time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* sec.count()[link /reference/chrono/duration/count.md]

#### 出力例
```
file time : Fri Jun 15 14:19:03 2018
dir time : Fri Jun 15 14:19:03 2018
```

### C++20での使用例
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
  chrono::sys_time st = chrono::file_clock::to_sys(tp);

  std::time_t t = chrono::system_clock::to_time_t(st);
  const tm* lt = std::localtime(&t);
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

  // ファイルの最終更新日時として、現在日時を設定
  fs::last_write_time("regular.txt", fs::file_time_type::clock::now());
}
```
* fs::last_write_time[color ff0000]
* fs::file_time_type[link file_time_type.md]
* fs::create_directory[link create_directory.md]
* chrono::sys_time[link /reference/chrono/sys_time.md]
* chrono::file_clock[link /reference/chrono/file_clock.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* to_time_t[link /reference/chrono/system_clock/to_time_t.md]

#### 出力例
```
file time : Wed Jul 15 23:08:06 2020
dir time : Wed Jul 15 23:08:06 2020
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [`last_write_time`](last_write_time.md)
- [P0355R7 Extending `<chrono>` to Calendars and Time Zones](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0355r7.html)
- [`file_clock` breaks ABI for C++17 implementations](https://wg21.cmeerw.net/lwg/issue3145)
