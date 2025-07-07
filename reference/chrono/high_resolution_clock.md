# high_resolution_clock
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  class high_resolution_clock;
}}
```

## 概要
`high_resolution_clock`は、そのプラットフォームでの最も短い間隔のクロックである。

このクラスは、[`system_clock`](/reference/chrono/system_clock.md)か[`steady_clock`](/reference/chrono/steady_clock.md)の別名として定義される場合がある。


## メンバ関数
### 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|----------------|-------|
| [`now`](high_resolution_clock/now.md) | 現在日時を取得する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|--------------------------------|-------|
| `rep`        | 時間間隔の内部表現となる算術型 | C++11 |
| `period`     | 時間の周期を表す`ratio`型      | C++11 |
| `duration`   | 時間間隔の型                   | C++11 |
| `time_point` | 時間の一点を指す型             | C++11 |


## メンバ定数

| 名前        | 説明 | 対応バージョン |
|-------------|--------------------------------------------------------|-------|
| `static const bool is_steady` | 逆行しないクロックかどうかを表す`bool`値。値は未規定。 | C++11まで |
| `static constexpr bool is_steady` | 逆行しないクロックかどうかを表す`bool`値。値は未規定。 | C++14から |


## 例
```cpp example
#include <chrono>
#include <iostream>
#include <thread>

using namespace std::chrono;

int main()
{
  // 1. 現在日時を取得
  high_resolution_clock::time_point begin = high_resolution_clock::now();

  // 2. 時間のかかる処理...
  std::this_thread::sleep_for(seconds(3));

  // 3. 現在日時を再度取得
  high_resolution_clock::time_point end = high_resolution_clock::now();

  // 経過時間を取得
  seconds elapsed_time = duration_cast<seconds>(end - begin);
  std::cout << elapsed_time.count() << "秒" << std::endl;
}
```
* now()[link high_resolution_clock/now.md]
* count()[link duration/count.md]

### 出力例
```
3秒
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- 2015で`steady_clock`の別名に実装が変更された。これはWindows APIの`QueryPerformanceCounter`関数を使用した実装である。
		- MSDNライブラリ: [QueryPerformanceCounter](https://docs.microsoft.com/ja-jp/windows/win32/api/profileapi/nf-profileapi-queryperformancecounter)

## 参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

