# condition_variable_any
* condition_variable[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class condition_variable_any;
}
```

## 概要
`condition_variable_any`は、特定のイベントもしくは条件を満たすまでスレッドの実行を待機するためのクラスである。

[`wait()`](condition_variable_any/wait.md)／[`wait_for()`](condition_variable_any/wait_for.md)／[`wait_until()`](condition_variable_any/wait_until.md)を使用してスレッドを待機させ、[`notify_one()`](condition_variable_any/notify_one.md)／[`notify_all()`](condition_variable_any/notify_all.md)によって待機しているスレッドを起床させる。

[`condition_variable`](/reference/condition_variable/condition_variable.md)は�ック型として[`unique_lock`](/reference/mutex/unique_lock.md)`<`[`mutex`](/reference/mutex/mutex.md)`>`のみをサポートしているが、`condition_variable_any`はあらゆる�ック型をサポートしている。

`condition_variable_any`の適切な利用については、[条件変数の利用方法](/article/lib/how_to_use_cv.md)も参照のこと。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------------------|----------------------------------------------------------|-------|
| [`(constructor)`](condition_variable_any/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](condition_variable_any/op_destructor.md) | デストラクタ | C++11 |
| `operator=(const condition_variable_any&) = delete;`                   | 代入演算� | C++11 |
| [`notify_one`](condition_variable_any/notify_one.md)                | 待機しているスレッドをひとつ起床させる | C++11 |
| [`notify_all`](condition_variable_any/notify_all.md)                | 待機している全てのスレッドを起床させる | C++11 |
| [`wait`](condition_variable_any/wait.md)                            | 起床されるまで待機する | C++11 |
| [`wait_for`](condition_variable_any/wait_for.md)                    | 相対時間のタイムアウトを指定して、起床されるまで待機する | C++11 |
| [`wait_until`](condition_variable_any/wait_until.md)                | 絶対時間のタイムアウトを指定して、起床されるまで待機する | C++11 |

## 例
```cpp example
#include <iostream>
#include <condition_variable>
#include <mutex>
#include <thread>

struct ProcessData {
  std::recursive_mutex mtx_;
  std::condition_variable_any cond_;

  bool data_ready_ = false;

public:
  // 処理に必要なデータの準備をする
  void prepare_data_for_processing()
  {
    // ...準備処理...

    {
      std::lock_guard<std::recursive_mutex> lk(mtx_);
      data_ready_ = true;
    }

    // 準備完了したので待機スレッドを起床させる
    cond_.notify_one();
  }

  void wait_for_data_to_process()
  {
    std::unique_lock<std::recursive_mutex> lk(mtx_);

    // データの準備ができるまで待機してから処理する
    cond_.wait(lk, [this] { return data_ready_; });
    process_data();
  }

private:
  void process_data()
  {
    // ...データを処理する...
    std::cout << "process data" << std::endl;
  }
};

int main()
{
  ProcessData p;

  std::thread t1([&] { p.prepare_data_for_processing(); });
  std::thread t2([&] { p.wait_for_data_to_process(); });

  t1.join();
  t2.join();
}
```
* std::condition_variable_any[color ff0000]
* std::recursive_mutex[link /reference/mutex/recursive_mutex.md]
* std::unique_lock[link /reference/mutex/unique_lock.md]
* cond_.notify_one()[link condition_variable_any/notify_one.md]
* cond_.wait[link condition_variable_any/wait.md]

### 出力
```
process data
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照

