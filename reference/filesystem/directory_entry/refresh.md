# refresh
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void refresh();                             // (1)
void refresh(std::error_code& ec) noexcept; // (2)
```

## 概要
キャッシュを更新する。


## 効果
このオブジェクトが対象とするパスの属性をキャッシュする。

エラーが発生した場合は、キャッシュされた属性の値は未規定となる (更新前のキャッシュの値のままかもしれないし、キャッシュが破棄されるかもしれない)。(2)の場合は、エラー情報が`ec`に設定される。


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。エラーが発生した場合は、[`std::filesystem::filesystem_error`](/reference/filesystem/filesystem_error.md)例外を送出する
- (2) : 投げない


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>
#include <thread>
#include <ctime>
#include <iomanip>

namespace fs = std::filesystem;
namespace chrono = std::chrono;

void heavy_function(const fs::path&) {
  std::this_thread::sleep_for(chrono::seconds(1));
}

std::string datetime_to_string(fs::file_time_type tp)
{
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

  for (fs::directory_entry x : fs::directory_iterator("dir")) {
    // 時間のかかる計算をする
    heavy_function(x.path());

    // 計算をしている間にファイルの状態が変わっているかもしれないので、キャッシュを更新する
    x.refresh();
    std::cout << x.path() << " : " << datetime_to_string(x.last_write_time()) << std::endl;
  }
}
```
* x.refresh()[color ff0000]
* x.path()[link path.md]
* x.last_write_time()[link last_write_time.md]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* fs::directory_iterator[link /reference/filesystem/directory_iterator.md]
* tp.time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* sec.count()[link /reference/chrono/duration/count.md]
* std::time_t[link /reference/ctime/time_t.md]
* std::tm[link /reference/ctime/tm.md.nolink]
* std::localtime[link /reference/ctime/localtime.md.nolink]

### 出力例
```
"dir/inner_dir" : Fri Aug 31 15:14:36 2018
"dir/a.txt" : Fri Aug 31 15:14:36 2018
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
