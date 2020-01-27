# condition_variable
* condition_variable[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class condition_variable;
}
```

## 概要

`condition_variable`は、特定のイベントもしくは条件を満たすまでスレッドの実行を待機するためのクラスである。

[`wait()`](condition_variable/wait.md)／[`wait_for()`](condition_variable/wait_for.md)／[`wait_until()`](condition_variable/wait_until.md)を使用してスレッドを待機させ、[`notify_one()`](condition_variable/notify_one.md)／[`notify_all()`](condition_variable/notify_all.md)によって待機しているスレッドを起床させる。

`condition_variable`は[`condition_variable_any`](/reference/condition_variable/condition_variable_any.md)と違い、�ック型として[`unique_lock`](/reference/mutex/unique_lock.md)`<`[`mutex`](/reference/mutex/mutex.md)`>`のみをサポートしている。これは、処理系に`condition_variable`クラスに最も効率の良い実装を許可するためである。（例：POSIXスレッド環境においては`condition_variable`が`pthread_cond_t`の、[`mutex`](/reference/mutex/mutex.md)が`pthread_mutex_t`の単純なラッパクラスとして実装されうる）


`condition_variable`の適切な利用については、[条件変数の利用方法](/article/lib/how_to_use_cv.md)も参照のこと。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|----------------------------------------------------------|-------|
| [`(constructor)`](condition_variable/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](condition_variable/op_destructor.md) | デストラクタ | C++11 |
| `operator=(const condition_variable&) = delete;`              | 代入演算� | C++11 |
| [`notify_one`](condition_variable/notify_one.md)            | 待機しているスレッドをひとつ起床させる | C++11 |
| [`notify_all`](condition_variable/notify_all.md)            | 待機している全てのスレッドを起床させる | C++11 |
| [`wait`](condition_variable/wait.md)                        | 起床されるまで待機する | C++11 |
| [`wait_for`](condition_variable/wait_for.md)                | 相対時間のタイムアウトを指定して、起床されるまで待機する | C++11 |
| [`wait_until`](condition_variable/wait_until.md)            | 絶対時間のタイムアウトを指定して、起床されるまで待機する | C++11 |
| [`native_handle`](condition_variable/native_handle.md)      | 条件変数のハンドルを取得する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------------|----------------------|-------|
| `native_handle_type` | 実装依�のハンドル型 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------------------------------|------------------------------------------------------------------------|-------|
| [`notify_all_at_thread_exit`](condition_variable/notify_all_at_thread_exit.md) | 現在のスレッド終了時に、条件変数が待っている全てのスレッドを起床させる | C++11 |


## 例
```cpp example
#include <iostream>
#include <condition_variable>
#include <mutex>
#include <thread>

struct ProcessData {
  std::mutex mtx_;
  std::condition_variable cond_;

  bool data_ready_ = false;

public:
  // 処理に必要なデータの準備をする
  void prepare_data_for_processing()
  {
    // ...準備処理...

    {
      std::lock_guard<std::mutex> lk(mtx_);
      data_ready_ = true;
    }

    // 準備完了したので待機スレッドを起床させる
    cond_.notify_one();
  }

  void wait_for_data_to_process()
  {
    std::unique_lock<std::mutex> lk(mtx_);

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
* std::condition_variable[color ff0000]
* std::unique_lock[link /reference/mutex/unique_lock.md]
* cond_.notify_one()[link condition_variable/notify_one.md]
* cond_.wait[link condition_variable/wait.md]

### 出力
```
process data
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [Condition Variables - Operating Systems: Three Easy Pieces](http://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf)

