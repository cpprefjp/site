#コンストラクタ (C++11)
```cpp
time_point();

explicit time_point(const duration& d);

template <class Duration2>
time_point(const time_point<clock, Duration2>& t);
```

##time_pointの構築
- `time_point()`<br/>デフォルトコンストラクタ。エポックの`time_point(duration::zero())`を生成する。
- `explicit time_point(const duration& d)`<br/>エポックからの経過時間から`time_point`を生成する。
- `template <class Duration2>`<br/>`time_point(const time_point<clock, Duration2>& t)`<br/>他のテンプレートパラメータを持つ`time_point`からの変換コンストラクタ。


##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  {
    time_point<system_clock> p; // エポック
    std::cout << p.time_since_epoch().count() << std::endl;
  }
  {
    time_point<system_clock> p(seconds(3)); // エポックから3秒後
    std::cout << p.time_since_epoch().count() << std::endl;
  }
  {
    time_point<system_clock, seconds> s(seconds(5)); // エポックから5秒後
    time_point<system_clock, milliseconds> m = s;    // 他のtime_pointに変換
    std::cout << m.time_since_epoch().count() << std::endl;
  }
}
```

###出力
```
0
3000000
5000
```

##バージョン
###言語
- C++11

###処理系
- GCC: 4.6.1

