# env-promise
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Env>
  struct env-promise : with-await-transform<env-promise<Env>> {  // exposition only
    unspecified get_return_object() noexcept;
    unspecified initial_suspend() noexcept;
    unspecified final_suspend() noexcept;
    void unhandled_exception() noexcept;
    void return_void() noexcept;
    coroutine_handle<> unhandled_stopped() noexcept;

    const Env& get_env() const noexcept;
  };
}
```
* with-await-transform[link with-await-transform.md]
* coroutine_handle<>[link /reference/coroutine/coroutine_handle.md]
* unspecified[italic]

## 概要
`env-promise`は、実行制御ライブラリの仕様定義で用いられる説明専用のクラステンプレートである。


## 備考
`env-promise`の特殊化は型導出のみで利用されるため、各メンバ関数の定義は必要ない。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::sender`](sender.md)
- [`execution::get_completion_signatures`](get_completion_signatures.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
