# get
* future[meta header]
* std[meta namespace]
* shared_future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const R& shared_future::get() const;
R& shared_future<R&>::get() const;
void shared_future<void>::get() const;
```

## 概要
結果を取得する


## 効果
共有状態が準備完了状態([`future_status::ready`](../future_status.md))になるまで[`wait()`](wait.md)で待機し、共有状態に格納されている値を取得する。


## 戻り値
- `future::get()` ： 共有状態に格納されている値への`const`左辺値参照を返す。<br/>備考：共有状態が破壊された後、その参照を介してのアクセスは未定義の振る舞いをする。`shared_future`オブジェクトの寿命よりも長いオブジェクトに参照を保持しないこと。
- `future<R&>::get()` ： 共有状態に格納されている参照を返す。
- `future<void>::get()` ： 何も返さない。


## 例外
共有状態に例外が格納されていた場合、格納されている例外を送出する。


## 例
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void calc(std::promise<int> p)
{
  int sum = 0;
  for (int i = 0; i < 10; ++i) {
    sum += i + 1;
  }

  p.set_value(sum); // 結果値を書き込む
}

int main()
{
  std::promise<int> p;
  std::shared_future<int> f = p.get_future().share();

  // 別スレッドで計算を行う
  std::thread t(calc, std::move(p));

  // calc()によって書き込まれた結果を取得
  std::cout << f.get() << std::endl;

  t.join();
}
```
* get()[color ff0000]
* std::promise[link /reference/future/promise.md]
* p.set_value[link /reference/future/promise/set_value.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* share()[link /reference/future/future/share.md]
* std::move[link /reference/utility/move.md]

### 出力
```
55
```

## 例：`shared_future<void>`
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <mutex>
#include <vector>
#include <utility>
#include <numeric>

std::mutex print_mtx_;
void print(int value, int thread_no)
{
  std::lock_guard<std::mutex> lk(print_mtx_);
  std::cout << "thread:" << thread_no << " sum:" << value << std::endl;
}

class X {
  std::vector<int> data_;
  std::vector<std::thread> process_threads_;
public:
  void start()
  {
    std::promise<void> p;
    std::shared_future<void> f = p.get_future().share();

    for (int i = 0; i < 2; ++i) {
      process_threads_.push_back(std::thread([&f, i, this] { process(f, i); }));
    }

    std::thread t3([&p, this] { read_data(std::move(p)); });
    t3.join();
  }

  void join()
  {
    for (std::thread& t : process_threads_) {
      t.join();
    }
  }

private:
  void read_data(std::promise<void> p)
  {
    // 1. データ�み込むj
    for (int i = 0; i < 10; ++i) {
      data_.push_back(i + 1);
    }

    // 2. �み込みが完了したことを通知する
    p.set_value();
  }

  void process(std::shared_future<void> f, int thread_no)
  {
    // 3. データの準備ができるまで待機する
    f.get();

    // 4. 準備ができたデータをスレッドごとに使用する
    if (thread_no == 0) {
      // 半分ずつ合計値を計算する
      int sum = std::accumulate(data_.begin(), data_.begin() + data_.size() / 2, 0);
      print(sum, thread_no);
    }
    else {
      int sum = std::accumulate(data_.begin() + data_.size() / 2, data_.end(), 0);
      print(sum, thread_no);
    }
  }
};

int main()
{
  X x;
  x.start();
  x.join();
}
```
* set_value[color ff0000]

### 出力例
```
thread:0 sum:15
thread:1 sum:40
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照


