# _at_thread_exit系の関数が�在している理由

[`<future>`](/reference/future.md) や [`<condition_variable>`](/reference/condition_variable.md) には、`*_at_thread_exit` という名前の関数が定義されている。

```cpp
namespace std {
  void notify_all_at_thread_exit(condition_variable& cond, unique_lock<mutex> lk);

  template <class R>
  class promise {
  public:
    ...
    void set_value_at_thread_exit(const R& r);
    void set_exception_at_thread_exit(exception_ptr p);
  };

  template <class R, class... ArgTypes>
  class packaged_task<R(ArgTypes...)> {
  public:
    ...
    void make_ready_at_thread_exit(ArgTypes... args);
  };
}
```
* notify_all_at_thread_exit[link /reference/condition_variable/condition_variable/notify_all_at_thread_exit.md]
* condition_variable[link /reference/condition_variable/condition_variable.md]
* unique_lock[link /reference/mutex/unique_lock.md]
* mutex[link /reference/mutex/mutex.md]
* promise[link /reference/future/promise.md]
* set_value_at_thread_exit[link /reference/future/promise/set_value_at_thread_exit.md]
* set_exception_at_thread_exit[link /reference/future/promise/set_exception_at_thread_exit.md]
* exception_ptr[link /reference/exception/exception_ptr.md]
* packaged_task[link /reference/future/packaged_task.md]
* make_ready_at_thread_exit[link /reference/future/packaged_task/make_ready_at_thread_exit.md]

これらの関数は、スレッド�ーカル記憶域が破棄された後に通知を行なったり、状態を変更する。 

また、[`thread`](/reference/thread/thread.md)`::`[`detach`](/reference/thread/thread/detach.md)`()` されたスレッド上で、
スレッド�ーカル記憶域との同期を取る唯一の方法でもある。

デタッチされたスレッドにおいて、スレッド�ーカル記憶域にあるオブジェクトがいつ破棄されるかという規定は無い。
そのため、未定義動作を含まずにこれらのオブジェクトを破棄するのは難しい。 

例えば、以下のようなケースで問題になる。

```cpp example
#include <type_traits>
#include <future>
#include <thread>
#include <iostream>

template<class F>
std::future<typename std::result_of<F()>::type> spawn_task(F f) {
  using result_type = typename std::result_of<F()>::type;
  std::packaged_task<result_type ()> task(std::move(f));
  std::future<result_type> future(task.get_future());
  std::thread th(std::move(task));
  th.detach();
  return future;
}


struct Hoge {
  ~Hoge() { std::cout << "Hoge destructor" << std::endl; }
};

int f() {
  thread_local Hoge h;
  return 42;
}

int main() {
  std::future<int> res(spawn_task(f));
  std::cout << res.get() << std::endl;
}
```

出力:
```
42Hoge destructor

```

`spawn_task` は、渡された任意の処理を別スレッドで行なう一般的な関数である。関数内部でスレッドを作り、デタッチを行なっている。 

出力は、`main()` 関数での出力と、`Hoge` デストラクタでの出力が混在している。これはスレッド�ーカル記憶域と `future` オブジェクトが�しく同期されていないからである。そのため、これ以外の出力も起こり得る。

これは `*_at_thread_exit` 系の関数を利用することで修�できる。

```cpp example
#include <type_traits>
#include <future>
#include <thread>
#include <iostream>

struct task_executor
{
  template <class R>
  void operator()( std::packaged_task<R> task )
  {
    task.make_ready_at_thread_exit(); // operator() を呼び出す代わりに make_ready_at_thread_exit() を呼び出す。
  }
};

template<class F>
std::future<typename std::result_of<F()>::type> spawn_task(F f) {
  using result_type = typename std::result_of<F()>::type;
  std::packaged_task<result_type ()> task(std::move(f));
  std::future<result_type> future(task.get_future());
  std::thread th(task_executor{}, std::move(task));
  th.detach();
  return future;
}


struct Hoge {
  ~Hoge() { std::cout << "Hoge destructor" << std::endl; }
};

int f() {
  thread_local Hoge h;
  return 42;
}

int main() {
  std::future<int> res(spawn_task(f));
  std::cout << res.get() << std::endl;
}
```
* make_ready_at_thread_exit[color ff0000]

出力:
```
Hoge destructor
42
```

このプ�グラムの出力は、必ずこの通りになる。つまり、確実にスレッド�ーカル記憶域のオブジェクトが破棄された後に `res.get()` の結果が出力される。


## 参考
- [futureとpromiseのあれこれ（理論編） - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120131/p1)
- [N3070 - Handling Detached Threads and thread_local Variables](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3070.html)

