# operator==
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration1, class Duration2, class TimeZonePtr>
  bool operator==(const zoned_time<Duration1, TimeZonePtr>& x,
                  const zoned_time<Duration2, TimeZonePtr>& y); // (1) C++20
}
```

## 概要
`zoned_time`同士の等値比較を行う。


## 戻り値
コンストラクタで設定されたタイムゾーンオブジェクトへのポインタ`zone`、およびシステム時間の時間点`tp`があるとして、以下を返す：

- (1) :

```cpp
return x.zone == y.zone && x.tp == y.tp;
```


## 備考
- この演算子により、`operator!=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();

  chrono::zoned_time zt1{"Asia/Tokyo", now};
  chrono::zoned_time zt2{chrono::locate_zone("Asia/Tokyo"), now};
  chrono::zoned_time zt3{"UTC", now};

  assert(zt1 == zt2);
  assert(zt1 != zt3);
}
```
* chrono::locate_zone[link /reference/chrono/locate_zone.md]

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
