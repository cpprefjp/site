# file_time_type
* filesystem[meta header]
* std::filesystem[meta namespace]
* type-alias[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  using file_time_type = chrono::time_point<実装定義のク�ック型>;
}
```
* chrono::time_point[link /reference/chrono/time_point.md]

## 概要
ファイル情報で使用する時間の型。

時間の分解能はOS依�。


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

  // ファイルの最終更新日時として、現在日時を�定
  fs::last_write_time("regular.txt", fs::file_time_type::clock::now());
}
```
* fs::last_write_time[color ff0000]
* fs::file_time_type[link file_time_type.md]
* fs::create_directory[link create_directory.md]
* tp.time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* sec.count()[link /reference/chrono/duration/count.md]

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


## 関連項目
- [`last_write_time`](last_write_time.md)
