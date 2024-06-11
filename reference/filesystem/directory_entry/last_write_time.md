# last_write_time
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
file_time_type last_write_time() const;                             // (1)
file_time_type last_write_time(std::error_code& ec) const noexcept; // (2)
```
* file_time_type[link /reference/filesystem/file_time_type.md]

## 概要
最終更新日時を取得する。


## 戻り値
値がキャッシュされている場合は、それを返す。キャッシュされていない場合は、

- (1) : [`std::filesystem::last_write_time`](/reference/filesystem/last_write_time.md)`(`[`path()`](path.md)`)`を返す
- (2) : [`std::filesystem::last_write_time`](/reference/filesystem/last_write_time.md)`(`[`path()`](path.md)`, ec)`を返す


## 例外
- (1) : [`std::filesystem::last_write_time()`](/reference/filesystem/last_write_time.md)関数が例外を送出する可能性がある
- (2) : 投げない


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>
#include <ctime>
#include <iomanip>

namespace fs = std::filesystem;

std::string datetime_to_string(fs::file_time_type tp)
{
  namespace chrono = std::chrono;
  auto sec = chrono::duration_cast<chrono::seconds>(tp.time_since_epoch());

  std::time_t t = sec.count();
  const std::tm* lt = std::localtime(&t);

  std::ostringstream ss;
  ss << std::put_time(lt, "%c");
  return ss.str();
}

int main()
{
  fs::create_directory("dir");
  fs::create_directory("dir/inner_dir");
  std::ofstream{"dir/a.txt"};

  for (const fs::directory_entry& x : fs::directory_iterator("dir")) {
    std::cout << x.path() << " : " << datetime_to_string(x.last_write_time()) << std::endl;
  }
}
```
* x.last_write_time()[color ff0000]
* x.path()[link path.md]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::directory_iterator[link /reference/filesystem/directory_iterator.md]
* fs::file_time_type[link /reference/filesystem/file_time_type.md]
* tp.time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* sec.count()[link /reference/chrono/duration/count.md]
* std::time_t[link /reference/ctime/time_t.md]
* std::tm[link /reference/ctime/tm.md.nolink]
* std::localtime[link /reference/ctime/localtime.md.nolink]

### 出力例
```
"dir/inner_dir" : Tue Aug 28 14:20:58 2018
"dir/a.txt" : Tue Aug 28 14:20:58 2018
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
