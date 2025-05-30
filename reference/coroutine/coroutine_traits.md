# coroutine_traits
* coroutine[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class R, class... ArgTypes>
  struct coroutine_traits;
}
```

## 概要
コルーチンのPromise型を指定するためのトレイト。

- `ArgTypes`が型のパラメータパックかつ非修飾の`R::promise_type`が有効な型を表すとき、`coroutine_traits<R,ArgTypes...>`は下記の公開アクセスメンバを持つ。
```cpp
using promise_type = typename R::promise_type;
```

- それ以外では、`coroutine_traits<R,ArgTypes...>`はメンバを持たない。

このクラステンプレートをプログラム定義型で特殊化する場合、`promise_type`は公開アクセスのネスト型とする必要がある。


## メンバ型

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `promise_type` | コルーチンのPromise型 | C++20 |

## 例
```cpp example
#include <coroutine>
#include <iostream>
#include <utility>

struct task;

struct task_promise {
  task get_return_object();
  auto initial_suspend() { return std::suspend_never{}; }
  auto final_suspend() noexcept { return std::suspend_always{}; }
  auto yield_value(int) { return std::suspend_always{}; }
  void return_void() {}
  void unhandled_exception() { std::terminate(); }
};

struct task {
  using coro_handle = std::coroutine_handle<task_promise>;
  explicit task(task_promise& p)
    : coro_(coro_handle::from_promise(p)) {}
  task(task const&) = delete;
  task(task&& rhs)
    : coro_(std::exchange(rhs.coro_, nullptr)) {}
  ~task()
  {
    if (coro_)
      coro_.destroy();
  }

  void next()
  {
    if (!coro_.done())
      coro_.resume();
  }

private:
  coro_handle coro_;
};

task task_promise::get_return_object()
{
  return task{*this};
}

// 戻り値taskの関数をコルーチンにアダプトする
template <typename... ArgTypes>
struct std::coroutine_traits<task, ArgTypes...> {
  using promise_type = task_promise;
};

task coro()
{
  std::cout << "coro#1" << std::endl;
  co_yield {};
  std::cout << "coro#2" << std::endl;
}

int main()
{
  auto t = coro();
  std::cout << "main#1" << std::endl;
  t.next();
  std::cout << "main#2" << std::endl;
}
```
* std::coroutine_traits[color ff0000]
* std::suspend_never[link suspend_never.md]
* std::suspend_always[link suspend_always.md]
* std::coroutine_handle[link coroutine_handle.md]
* resume()[link coroutine_handle/resume.md]
* done()[link coroutine_handle/done.md]
* from_promise[link coroutine_handle/from_promise.md]

### 出力
```
coro#1
main#1
coro#2
main#2
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
