# coroutine_handle
* coroutine[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Promise = void>
  struct coroutine_handle;

  template<>
  struct coroutine_handle<void> {
    // (メンバ宣言は省略)
  };

  template<class Promise>
  struct coroutine_handle {
    // (メンバ宣言は省略)
  };
}
```

## 概要
コルーチンに対応するコルーチンハンドル。
テンプレートパラメータ`Promise`には、コルーチンのPromise型を指定する。

コルーチンハンドルはアプリケーションコードからの直接アクセスを想定した機能ではなく、コルーチンライブラリ提供クラス内部に隠蔽される構造が一般的である。
例: 後述サンプルコードでは`task`クラス内に隠蔽されており、コルーチン`f`や関数`main`から間接的に利用される。

`coroutine_handle<void>`または単に`coroutine_handle<>`は、Promise型について型消去(Type-erased)されたコルーチンハンドルとして取り扱える。
コルーチンのPromise型を明示した`coroutine_handle<Promise>`から`coroutine_handle<>`へと暗黙変換が可能となっている。

C++コルーチンとC API（コールバック関数へのポインタと`void*`をとる関数）との組合せ利用を可能とするため、`coroutine_handle`とポインタ型`void*`との相互変換がサポートされる。

ユーザプログラムが`coroutine_handle`の明示特殊化または部分特殊化を宣言した場合、その動作は未定義とされる。


## メンバ関数
### 構築・リセット

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](coroutine_handle/op_constructor.md) | コンストラクタ | C++20 |
| [`operator=`](coroutine_handle/op_assign.md) | 代入演算子 | C++20 |

### エクスポート

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`address`](coroutine_handle/address.md) | コルーチンハンドルに対応するアドレス値 | C++20 |

### 変換

| 名前            | 説明          | 対応バージョン |
|-----------------|---------------|----------------|
| `operator coroutine_handle<>` | 型消去されたコルーチンハンドルを返す | C++20 |

### 観測

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator bool`](coroutine_handle/op_bool.md) | 有効なコルーチンか確認 | C++20 |
| [`done`](coroutine_handle/done.md) | 最終サスペンドポイントで中断状態にあるか確認 | C++20 |

### 再開

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator()`](coroutine_handle/resume.md) | 中断状態にあるコルーチンを再開 | C++20 |
| [`resume`](coroutine_handle/resume.md)     | 中断状態にあるコルーチンを再開 | C++20 |
| [`destroy`](coroutine_handle/destroy.md)   | 中断状態にあるコルーチンを破棄 | C++20 |

### Promiseアクセス

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`promise`](coroutine_handle/promise.md) | Promiseオブジェクトの参照（`coroutine_handle<Promise>`のみ） | C++20 |


## 静的メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`from_promise`](coroutine_handle/from_promise.md) | Promiseオブジェクトから対応するコルーチンハンドルへ変換（`coroutine_handle<Promise>`のみ） | C++20 |
| [`from_address`](coroutine_handle/from_address.md) | アドレス値から対応するコルーチンハンドルへ変換 | C++20 |


## 非メンバ関数
### ハッシュサポート

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `template<class T> struct hash` | 先行宣言(class template) | C++20 |
| `template<class P> struct hash<coroutine_handle<P>>` | `hash`の`coroutine_handle<P>`に対する特殊化 | C++20 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|-----|-----|-----|
| `bool operator==(coroutine_handle<>, coroutine_handle<>);` | 等値比較 | C++20 |
| `bool operator!=(coroutine_handle<>, coroutine_handle<>);` | 非等値比較 (`==`により使用可能) | C++20 |
| `strong_ordering operator<=>(coroutine_handle<>, coroutine_handle<>);` | 三方比較 | C++20 |
| `bool operator<(coroutine_handle<>, coroutine_handle<>);`  | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator<=(coroutine_handle<>, coroutine_handle<>);` | 左辺が右辺以下を判定する (`<=>`により使用可能) | C++20 |
| `bool operator>(coroutine_handle<>, coroutine_handle<>);`  | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator>=(coroutine_handle<>, coroutine_handle<>);` | 左辺が右辺以上かを判定する (`<=>`により使用可能) | C++20 |

`coroutine_handle`同士の比較は、[`address`](coroutine_handle/address.md)が返すアドレス値を用いて比較演算が行われる。


## 例
```cpp example
#include <coroutine>
#include <iostream>
#include <utility>

struct task {
  struct promise_type {
    int value_;
    auto get_return_object() { return task{*this}; }
    auto initial_suspend() { return std::suspend_never{}; }
    auto final_suspend() noexcept { return std::suspend_always{}; }
    void return_value(int x) { value_ = x; }
    void unhandled_exception() { std::terminate(); }
  };

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
    : coro_(std::coroutine_handle<promise_type>::from_promise(p)) {}

  std::coroutine_handle<promise_type> coro_;
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
* std::coroutine_handle<promise_type>[color ff0000]
* std::suspend_never[link suspend_never.md]
* std::suspend_always[link suspend_always.md]
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


## 参照
- [LWG3460 Unimplementable `noop_coroutine_handle` guarantees](https://cplusplus.github.io/LWG/issue3460)
