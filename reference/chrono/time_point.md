# time_point
* chrono[meta header]
* std::chrono[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class Clock, class Duration = typename Clock::duration>
  class time_point;
}}
```

## 概要
`time_point`は、時間軸上の一点を表現するクラスである。

エポックと呼ばれるUNIX誕生の日時(1970年1月1日 0時0分0秒)からの経過時間によって現在の時間を表す。


## メンバ関数
### 構築／コピー／破棄

| 名前                                          | 説明           | 対応バージョン |
|-----------------------------------------------|----------------|----------------|
| [`(constructor)`](time_point/op_constructor.md) | コンストラクタ | C++11          |


### 観測

| 名前                                                   | 説明                             | 対応バージョン |
|--------------------------------------------------------|----------------------------------|----------------|
| [`time_since_epoch`](time_point/time_since_epoch.md) | エポックからの経過時間を取得する | C++11          |


### 算術演算

| 名前                                            | 説明         | 対応バージョン |
|-------------------------------------------------|--------------|----------------|
| [`operator+=`](time_point/op_plus_assign.md)  | 時間を進める | C++11          |
| [`operator-=`](time_point/op_minus_assign.md) | 時間を戻す   | C++11          |


### 特別な値

| 名前                         | 説明   | 対応バージョン |
|------------------------------|--------|----------------|
| [`min`](time_point/min.md) | 最小値 | C++11          |
| [`max`](time_point/max.md) | 最大値 | C++11          |


## メンバ型

| 名前       | 説明                                  | 対応バージョン |
|------------|---------------------------------------|----------------|
| `clock`    | 時計型 `Clock`                        | C++11          |
| `duration` | 時間間隔の型 `Duration`               | C++11          |
| `rep`      | 時間間隔の数値型 `Duration::rep`      | C++11          |
| `period`   | 時間の周期を表す型 `Duration::period` | C++11          |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`operator+`](op_plus.md)                      | 加算(function template) | C++11 |
| [`operator-`](op_minus.md)                     | 減算(function template) | C++11 |
| [`operator==`](time_point/op_equal.md)         | 等値判定を行う(function template) | C++11 |
| [`operator!=`](time_point/op_not_equal.md)     | 非等値判定を行う(function template) | C++11 |
| [`operator<`](time_point/op_less.md)           | 左辺が右辺より小さいか判定を行う(function template) | C++11 |
| [`operator<=`](time_point/op_less_equal.md)    | 左辺が右辺以下かの判定を行う(function template) | C++11 |
| [`operator>`](time_point/op_greater.md)        | 左辺が右辺より大きいか判定を行う(function template) | C++11 |
| [`operator>=`](time_point/op_greater_equal.md) | 左辺が右辺以上かの判定を行う(function template) | C++11 |


## 例
```cpp example
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
* system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* to_time_t[link system_clock/to_time_t.md]

### 出力例
```
Thu Jul 18 13:46:26 2013
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 参照

