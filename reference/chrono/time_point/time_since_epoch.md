#time_since_epoch
```cpp
duration time_since_epoch() const;
```

##概要
エポックからの経過時間を取得する


##戻り値
エポックからの経過時間


##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  system_clock::time_point p = system_clock::now(); // 現在日時を取得

  seconds s = duration_cast<seconds>(p.time_since_epoch()); // エポックからの経過時間(秒)を取得
  std::cout << s.count() << std::endl;
}
```
* time_since_epoch()[color ff0000]

###出力例
```
1314322091
```

##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.1, 4.6.1

