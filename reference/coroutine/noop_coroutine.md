# noop_coroutine
* coroutine[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
noop_coroutine_handle noop_coroutine() noexcept;
```
* noop_coroutine_handle[link noop_coroutine_handle.md]

## 概要
中断／再開時に何もしないコルーチンへのハンドルを取得する。

「何もしないコルーチン」は、非対称コルーチン動作と対称コルーチン動作を実行時に制御するケースで利用される。


## 戻り値
中断／再開時に何もしないコルーチンへのハンドル


## 例外
投げない


## 備考
`noop_coroutine()`が返したハンドルと、別の`noop_coroutine()`呼び出しで返されたハンドルとの等値性は規定されない。
（両者は等しいかもしれないし、等しくないかもしれない。）


## 例
```cpp example
#include <coroutine>
#include <iostream>
#include <utility>

struct task {
  struct promise_type {
    std::coroutine_handle<> next_;
    auto get_return_object() { return task{*this}; }
    auto initial_suspend() { return std::suspend_always{}; }
    auto final_suspend() noexcept { return std::suspend_always{}; }
    auto yield_value(bool cont)
    {
      struct awaiter {
        std::coroutine_handle<> next_;
        bool await_ready() { return false; }
        auto await_suspend(std::coroutine_handle<>) { return next_; }
        void await_resume() {}
      };
      // 継続条件condを満たす場合は次コルーチンnext_に制御を移し、
      // そうでない場合は再開元に制御を戻すAwaiterオブジェクトを返す。
      return awaiter{cont ? next_ : std::noop_coroutine()};
    }
    void return_void() {}
    void unhandled_exception() { std::terminate(); }
  };

  using coro_handle = std::coroutine_handle<promise_type>;

  ~task()
  {
    if (coro_)
      coro_.destroy();
  }

  task(task const&) = delete;
  task(task&& rhs)
    : coro_(std::exchange(rhs.coro_, nullptr)) {}

  void set_next(task& t)
  {
    coro_.promise().next_ = t.coro_;
  }

  void start()
  {
    if (!coro_.done())
      coro_.resume();
  }

private:
  explicit task(promise_type& p)
    : coro_(coro_handle::from_promise(p)) {}

  coro_handle coro_;
};

task coro(int id)
{
  int n = id * 10;
  for (;;) {
    std::cout << "coro#" << id << " " << n << std::endl;
    // 継続条件(0 < n)を満たす間はco_yield式により
    // 自コルーチンを中断して次のコルーチンを再開する。
    co_yield (0 < n);
    n /= 2;
  }
}

int main()
{
  // コルーチン3個の巡回グラフ(c1→c2→c3→c1...)を構成する
  auto c1 = coro(1);
  auto c2 = coro(2);
  auto c3 = coro(3);
  c1.set_next(c2);
  c2.set_next(c3);
  c3.set_next(c1);

  // コルーチン動作を開始
  c1.start();
}
```
* std::noop_coroutine()[color ff0000]
* std::suspend_always[link suspend_always.md]
* std::coroutine_handle[link coroutine_handle.md]
* resume()[link coroutine_handle/resume.md]
* done()[link coroutine_handle/done.md]
* from_promise[link coroutine_handle/from_promise.md]
* promise()[link coroutine_handle/promise.md]

### 出力
```
coro#1 10
coro#2 20
coro#3 30
coro#1 5
coro#2 10
coro#3 15
coro#1 2
coro#2 5
coro#3 7
coro#1 1
coro#2 2
coro#3 3
coro#1 0
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)


## 参照
- [P0913R1 Add symmetric coroutine control transfer](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0913r1.html)
