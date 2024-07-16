# remote_version
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  std::string remote_version();
}
```

## 概要
リモートタイムゾーンデータベースの最新バージョン番号を取得する。

この関数は、ローカルで保持しているタイムゾーンデータベースのバージョン番号と、リモートのバージョン番号を比較し、新しいバージョンがリリースされていたらダウンロードするために使用する。

```cpp
// 10日に一度などの周期で以下の処理を実行する
if (get_tzdb().version != remote_version()) {
  reload_tzdb(); // get_tzdb()で取得されるタイムゾーンデータベースを更新する
}
```
* get_tzdb()[link get_tzdb.md]
* reload_tzdb()[link reload_tzdb.md]


## 戻り値
最新のリモートデータベースのバージョンを返す。


## 備考
- IANAのタイムゾーンデータベースは、以下からダウンロードできる：
    - [Time Zone Database - IANA](https://www.iana.org/time-zones)


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  const std::string version = chrono::remote_version();
  std::cout << version << std::endl;
}
```
* chrono::remote_version()[color ff0000]

### 出力例
```
2019c
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
