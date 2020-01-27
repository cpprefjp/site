# this_thread
* thread[meta header]
* std[meta namespace]
* namespace[meta id-type]
* cpp11[meta cpp]

名前空間 `std::this_thread` では現在のスレッドに対する制御関数を提供する。

```cpp
namespace std {
namespace this_thread {

thread::id get_id() noexcept;

void yield() noexcept;

template <class Clock, class Duration>
void sleep_until(const chrono::time_point<Clock, Duration>& abs_time);

template <class Rep, class Period>
void sleep_for(const chrono::duration<Rep, Period>& rel_time);
}}
```


| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|--------------------------------------------------------------------------|-------|
| [`get_id`](this_thread/get_id.md)           | 現スレッドのスレッド�別�を取得する (function)                          | C++11 |
| [`yield`](this_thread/yield.md)             | 処理系に再スケジュールの機会を与える (function)                          | C++11 |
| [`sleep_until`](this_thread/sleep_until.md) | 指定した絶対時刻を過ぎるまで現スレッドをブ�ックする (function template) | C++11 |
| [`sleep_for`](this_thread/sleep_for.md)     | 指定した相対時間だけ現スレッドをブ�ックする (function template)         | C++11 |

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
