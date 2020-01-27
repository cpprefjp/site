# notify_all_at_thread_exit
* condition_variable[meta header]
* std[meta namespace]
* condition_variable[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  void notify_all_at_thread_exit(condition_variable& cond, unique_lock<mutex> lk);
}
```
* unique_lock[link /reference/mutex/unique_lock.md]
* mutex[link /reference/mutex/mutex.md]

## 概要
現在のスレッド終了時に、条件変数が待っている全てのスレッドを起床させる


## 要件
- `lk`が呼び出し元スレッドによって�ック取得されていること
- `*this`の`condition_variable`オブジェクトが他スレッドで待機していないか、もしくは並行に待機している全てのスレッドで`lock`パラメータが同じミューテックスオブジェクトを参照していること


## 効果
`lk`の�ック所有権を（スレッドライブラリの）内部ストレージへと移し、スレッド終了時、スレッド�ーカルなデータを解放した後、`cond`を使って通知する。通知は以下のように行う：

```cpp
// ここでスレッド�ーカルストレージを解放
lk.unlock();
cond.notify_all();
```
* lk.unlock()[link /reference/mutex/unique_lock/unlock.md]
* cond.notify_all()[link notify_all.md]

## 戻り値
なし


## 備考
�ックはスレッド終了まで保持され続けるため、デッド�ックを避けるためにできるだけ早くスレッドを終了させることを推奨する。


## 例
```cpp example
#include <iostream>
#include <condition_variable>
#include <mutex>
#include <thread>

struct ProcessData {
  std::mutex mtx_;
  std::condition_variable cond_;

  bool data_ready_;

public:
  ProcessData() : data_ready_(false) {}

  // 処理に必要なデータの準備をする
  void prepare_data_for_processing()
  {
    // ...準備処理...

    {
      std::unique_lock<std::mutex> lk(mtx_);
      data_ready_ = true;

      // このスレッドが終了したら、cond_を待機している全てのスレッドを起床させる
      std::notify_all_at_thread_exit(cond_, std::move(lk));
    }
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
    std::cout << std::boolalpha << "data is ready: " << data_ready_ << std::endl;
  }
};

int main()
{
  ProcessData p;

  std::thread t1([&] { p.prepare_data_for_processing(); });
  std::thread t2([&] { p.wait_for_data_to_process(); });
  std::thread t3([&] { p.wait_for_data_to_process(); });

  t1.detach(); // 準備スレッドの管理を手放す

  t2.join();
  t3.join();
}
```
* std::notify_all_at_thread_exit[color ff0000]
* std::unique_lock[link /reference/mutex/unique_lock.md]
* cond_.wait[link wait.md]
* std::move[link /reference/utility/move.md]
* t1.detach()[link /reference/thread/thread/detach.md]

### 出力
```
data is ready: true
data is ready: true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [_at_thread_exit系の関数が�在している理由](/article/lib/at_thread_exit.md)
- [N3070 - Handling Detached Threads and thread_local Variables](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3070.html)

