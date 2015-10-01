#notify_one
* condition_variable[meta header]
* std[meta namespace]
* condition_variable[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void notify_one() noexcept;
```

##概要
待機しているスレッドをひとつ起床させる


##効果
`*this`の`condition_variable`オブジェクトを待機しているスレッドがある場合、その一つをブロッキング解除する。


##戻り値
なし


##例外
投げない


##例
```cpp
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
* notify_one[color ff0000]

###出力
```
process data
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照


