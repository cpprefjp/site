# with_error
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class E>
  struct with_error {
    using type = remove_cvref_t<E>;
    type error;
  };

  template<class E>
  with_error(E) -> with_error<E>;
}
```

## 概要
タスク[`execution::task`](task.md)を戻り値型とする[コルーチン](/lang/cpp20/coroutines.md)において、`co_yield`式で[エラー完了](set_error.md)すること表現するタグ型。

```cpp
co_yield with_error{err}
```

型`Err`のエラー完了シグネチャ[`set_error_t`](set_error.md)`(Err)`を持つタスクコルーチンにおいて、非同期操作を`Err`型のエラー値`err`によってエラー完了させる。この`co_yield`式は決して再開(resume)されない。

詳細仕様は[`task::promise_type::yield_value`](./task/promise_type/yield_value.md)を参照のこと。


## 例
```cpp example
#include <execution>
#include <print>
namespace ex = std::execution;

enum class MyErrCode { InvalidParam, OutOfMemory };

struct Context {
  using error_types = ex::completion_signatures<ex::set_error_t(MyErrCode)>;
};

ex::task<int, Context> work(int arg) noexcept
{
  if (arg < 0) {
    co_yield ex::with_error{MyErrCode::InvalidParam};
  }
  co_return arg;
}

int main()
{
  std::this_thread::sync_wait(
    work(-1)
    | ex::upon_error([](MyErrCode ec) {
      std::println("error");
    })
  );
}
```
* ex::with_error[color ff0000]
* ex::completion_signatures[link completion_signatures.md]
* ex::set_error_t[link set_error.md]
* ex::task[link task.md]
* ex::upon_error[link upon_error.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]

### 出力
```
error
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::task`](task.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
