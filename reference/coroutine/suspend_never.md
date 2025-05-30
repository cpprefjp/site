# suspend_never
* coroutine[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  struct suspend_never {
    constexpr bool await_ready() const noexcept { return true; }
    constexpr void await_suspend(coroutine_handle<>) const noexcept {}
    constexpr void await_resume() const noexcept {}
  };
}
```
* coroutine_handle<>[link coroutine_handle.md]

## 概要
コルーチンを中断させない、トリビアルAwaitable型。


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `await_ready`   | コルーチンを常に中断しない   | C++20 |
| `await_suspend` | コルーチン中断時に何もしない | C++20 |
| `await_resume`  | コルーチン再開時に何もしない | C++20 |


## 例
```cpp example
#include <coroutine>
#include <iostream>
#include <utility>

struct task {
  struct promise_type {
    int value_;
    auto get_return_object() { return task{*this}; }
    auto initial_suspend()
    {
      return std::suspend_never{};
    }
    auto final_suspend() noexcept
    {
      return std::suspend_always{};
    }
    void return_value(int x) { value_ = x; }
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

  int get()
  {
    if (!coro_.done()) {
      coro_.resume();
    }
    return coro_.promise().value_;
  }

private:
  explicit task(promise_type& p)
    : coro_(coro_handle::from_promise(p)) {}

  coro_handle coro_;
};

task f()
{
  std::cout << "coroutine" << std::endl;
  co_return 42;
}

int main()
{
  auto c = f();
  std::cout << "main" << std::endl;
  int r = c.get();
  std::cout << "result=" << r << std::endl;
}
```
* std::suspend_never[color ff0000]
* std::suspend_always[link suspend_always.md]
* std::coroutine_handle[link coroutine_handle.md]
* resume()[link coroutine_handle/resume.md]
* done()[link coroutine_handle/done.md]
* from_promise[link coroutine_handle/from_promise.md]
* promise()[link coroutine_handle/promise.md]

### 出力
```
coroutine
main
result=42
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
- [`suspend_always`](suspend_always.md)
