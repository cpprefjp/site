# try_lock_for
* shared_mutex[meta header]
* std[meta namespace]
* shared_timed_mutex[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
template <class Rep, class Period>
bool try_lock_for(const chrono::duration<Rep, Period>& rel_time);
```
* duration[link /reference/chrono/duration.md]

## 概要
タイムアウトする相対時間を指定して排他ロックの取得を試みる


## 要件
この関数を呼び出したスレッドが、ミューテックスの排他所有権と共有所有権のいずれもを保持していないこと。


## 効果
`rel_time`パラメータで指定された相対時間の間、ミューテックスの排他所有権の取得を試みる。

排他所有権が取得できるまで、もしくは`rel_time`時間が経過するまでこの関数はブロッキングする。

`rel_time`が`rel_time.`[`zero()`](/reference/chrono/duration/zero.md)より小さい場合、この関数は[`try_lock()`](/reference/mutex/timed_mutex/try_lock.md)と同じ効果をもち、ブロッキングせずにミューテックスの排他所有権の取得を試みる。


## 戻り値
排他所有権が取得できた場合は`true`を返す。

`rel_time`パラメータで指定された相対時間の間に排他所有権が取得できなかった場合はタイムアウトとなり、`false`を返す。


## 例外
時計クラス、[`time_point`](/reference/chrono/time_point.md)クラス、[`duration`](/reference/chrono/duration.md)クラスの構築が例外を送出する場合、この関数はそれらの例外を送出する。


## 備考
この関数の実装が、ミューテックスの排他所有権を保持しているスレッドがひとつもない場合でも、排他所有権の取得に失敗する可能性がある。


## 例
```cpp example
#include <thread>
#include <shared_mutex>

class X {
  mutable std::shared_timed_mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    // 排他ロックの取得を試みる(3秒でタイムアウト)
    if (!mtx_.try_lock_for(std::chrono::seconds(3))) {
      // 排他ロックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

    value_ = value;
    mtx_.unlock(); // 排他ロックを手放す
  }

  // メンバ変数value_の値を読み込む
  int get_value() const
  {
    int result = 0;
    mtx_.lock_shared(); // 共有ロックを取得する
    result = value_;
    mtx_.unlock_shared(); // 共有ロックを手放す
    return result;
  }
};

int main()
{
  X x;

  std::thread t1([&x]{ x.add_value(1); int value = x.get_value(); });
  std::thread t2([&x]{ x.add_value(2); int value = x.get_value(); });

  t1.join();
  t2.join();
}
```
* try_lock_for[color ff0000]
* unlock()[link unlock.md]
* lock_shared()[link lock_shared.md]
* unlock_shared()[link unlock_shared.md]
* std::thread[link /reference/thread/thread.md]
* join()[link /reference/thread/thread/join.md]
* std::chrono::seconds[link /reference/chrono/seconds.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]

### 出力
```
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++14 mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015
