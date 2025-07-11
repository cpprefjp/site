# file_clock
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  using file_clock = see below;
}
```
* see below[italic]

## 概要
`file_clock`は、ファイル時間を作るために使用されるクロックである。この時刻系は[`<filesystem>`](/reference/filesystem.md)ライブラリにおいてファイル作成日時やファイル更新日時を表現する[`file_time_type`](/reference/filesystem/file_time_type.md)のために定義される。

このクロックは、TrivialClock要件を満たすクロック型の別名として定義される。別名の元となるクロックは、`std::chrono`や`std::filesystem`とは異なる名前空間で定義される可能性がある。

この型がもつ`now()`静的メンバ関数は、`noexcept(true)`である。


## メンバ関数
`file_clock`は、以下の2つ組の静的メンバ関数のいずれかを提供する：

```cpp
// utc_clockに相当するクラスの別名として定義される場合
template<class Duration>
static sys_time<see below>
  to_sys(const file_time<Duration>&);

template<class Duration>
static file_time<see below>
  from_sys(const sys_time<Duration>&);
```
* see below[italic]
* utc_clock[link utc_clock.md]
* sys_time[link sys_time.md]
* file_time[link file_time.md]

もしくは

```cpp
// tai_clock, gps_clockに相当するクラスの別名として定義される場合
template<class Duration>
static utc_time<see below>
  to_utc(const file_time<Duration>&);

template<class Duration>
static file_time<see below>
  from_utc(const utc_time<Duration>&);
```
* see below[italic]
* tai_clock[link tai_clock.md]
* gps_clock[link gps_clock.md]
* utc_time[link utc_time.md]
* file_time[link file_time.md]

これらの戻り値となる[`time_point`](time_point.md)の`Duration`は、入力の[`time_point`](time_point.md)から計算される。


### エポック
未規定


### うるう秒の扱い
未規定


## 例
```cpp example
#include <fstream>
#include <chrono>
#include <filesystem>

namespace chrono = std::chrono;
namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};

  // ファイルの最終更新日時を変更する
  fs::file_time_type tp = chrono::file_clock::now();
  fs::last_write_time("regular.txt", tp);
}
```
* chrono::file_clock[color ff0000]
* fs::file_time_type[link /reference/filesystem/file_time_type.md]
* fs::last_write_time[link /reference/filesystem/last_write_time.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [`file_clock` breaks ABI for C++17 implementations](https://wg21.cmeerw.net/lwg/issue3145)
    - `file_clock`は当初、独立したクラスとして定義することを予定していたが、C++17のファイルシステムライブラリで定義される[`file_time_type`](/reference/filesystem/file_time_type.md)のABI互換性を破壊してしまうことがわかったため、実装定義されるクロックの別名として`file_clock`が定義されることになった
