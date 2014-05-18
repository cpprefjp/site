#steady_clock (C++11)
```cpp
namespace std {
namespace chrono {
  class steady_clock;
}}
```

##概要
`steady_clock`は、物理的な時間と同様、決して逆行することがない時間を表現するためのクロックである。


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------|----------------|-------|
| [`now`](./steady_clock/now.md) | 現在日時の取得 | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|---------------------------|-------|
| `rep`        | 内部表現となる算術型      | C++11 |
| `period`     | 時間の間隔を表す`ratio`型 | C++11 |
| `duration`   | 経過時間の型              | C++11 |
| `time_point` | 時間の一点を指す型        | C++11 |


##メンバ定数

| 名前        | 説明 | 対応バージョン |
|-------------|--------------------------------------------------------|-------|
| `is_steady` | 逆行しないクロックかどうかを表す`bool`値。値は`true`。 | C++11 |


##例
```cpp
#include <iostream>
#include <chrono>
#include <thread>

using namespace std::chrono;

int main()
{
  // 1. 現在日時を取得
  steady_clock::time_point begin = steady_clock::now();

  // 2. 時間のかかる処理...
  std::this_thread::sleep_for(seconds(3));

  // 3. 現在日時を再度取得
  // 1～3の間にシステム時計が変更されても時間が逆行することはない
  steady_clock::time_point end = steady_clock::now();

  // 経過時間を取得
  seconds elapsed_time = duration_cast<seconds>(end - begin);
  std::cout << elapsed_time.count() << "秒" << std::endl;
}
```

###出力例
```
3秒
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1

