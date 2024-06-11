# noop_coroutine_handle
* coroutine[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  struct noop_coroutine_promise {};

  template<>
  struct coroutine_handle<noop_coroutine_promise>
  {
    constexpr operator coroutine_handle<>() const noexcept;

    constexpr explicit operator bool() const noexcept;
    constexpr bool done() const noexcept;

    constexpr void operator()() const noexcept;
    constexpr void resume() const noexcept;
    constexpr void destroy() const noexcept;

    noop_coroutine_promise& promise() const noexcept;

    constexpr void* address() const noexcept;

  private:
    coroutine_handle(unspecified);
  };

  using noop_coroutine_handle = coroutine_handle<noop_coroutine_promise>;
}
```
* coroutine_handle[link coroutine_handle.md]
* unspecified[italic]


## 概要
中断／再開時に何もしないコルーチンへのハンドル。

「何もしないコルーチン」は、非対称コルーチン動作と対称コルーチン動作を実行時に制御するケースで利用される。


## メンバ関数
### 変換
| 名前            | 説明          | 対応バージョン |
|-----------------|---------------|----------------|
| `operator coroutine_handle<>` | 型消去されたコルーチンハンドルを返す | C++20 |

### 観測

| 名前            | 説明          | 対応バージョン |
|-----------------|---------------|----------------|
| `operator bool` | `true`を返す  | C++20 |
| `done`          | `false`を返す | C++20 |

### 再開

| 名前         | 説明       | 対応バージョン |
|--------------|------------|----------------|
| `operator()` | 何もしない | C++20 |
| `resume`     | 何もしない | C++20 |
| `destroy`    | 何もしない | C++20 |

### Promiseアクセス

| 名前      | 説明           | 対応バージョン |
|-----------|----------------|----------------|
| `promise` | Promiseオブジェクトへの参照を返す | C++20 |

### アドレス

| 名前      | 説明           | 対応バージョン |
|-----------|----------------|----------------|
| `address` | コルーチンハンドルに対応するアドレス値を返す | C++20 |


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)
- [`coroutine_handle`](coroutine_handle.md)
- [`noop_coroutine`](noop_coroutine.md)


## 参照
- [P0913R1 Add symmetric coroutine control transfer](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0913r1.html)
- [LWG3460 Unimplementable `noop_coroutine_handle` guarantees](https://cplusplus.github.io/LWG/issue3460)
