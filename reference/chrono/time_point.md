#time_point(C++11)
```cpp
namespace std {
namespace chrono {
  template <class Clock, class Duration = typename Clock::duration>
  class time_point;
}}
```

###概要
`time_point`は、時間軸上の一点を表現するクラスである。
エポックと呼ばれるUNIX誕生の日時からの経過時間によって現在の時間を表す。


###メンバ関数
####構築／コピー／破棄

| | |
|---------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [`(constructor)`](./time_point/time_point.md) | コンストラクタ |

####観測
| | |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [`time_since_epoch`](./time_point/time_since_epoch.md) | エポックからの経過時間を取得する |

####算術演算
| | |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| [`operator+=`](./time_point/add_assign.md) | 時間を進める |
| [`operator-=`](./time_point/substract_assign.md) | 時間を戻す |


####特別な値
| | |
|-----------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| [`min`](./time_point/min.md) | 最小値 |
| [`max`](./time_point/max.md) | 最大値 |


###メンバ型
| clock | 時計型`Clock` |
|-----------------------------------------------------|-----------------------------------------------------|
| `duration` | 経過時間の型 `Duration` |
| `rep` | 経過時間の数値型 `Duration::rep` |
| `period` | 経過時間の単位 `Duration::period` |


###例
```cpp
#include <iostream>
#include <chrono>
#include <ctime>
#include <iomanip>

using std::chrono::system_clock;

int main() {
  // 現在日時を取得
  system_clock::time_point p = system_clock::now();

  // 出力
  std::time_t t = system_clock::to_time_t(p);
  const tm* lt = std::localtime(&t);
  std::cout << std::put_time(lt, "%c") << std::endl;
}
```

###出力例
```
Thu Jul 18 13:46:26 2013
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0

##参照

