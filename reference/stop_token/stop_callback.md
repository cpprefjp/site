# stop_callback
* stop_token[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class CallbackFn>
  class stop_callback;
}
```

## 概要
`stop_callback`クラステンプレートは、停止要求が作成された際に呼び出されるコールバックを表す。


## 適格要件
テンプレート引数`CallbackFn`が[`invocable`](/reference/concepts/invokable.md.nolink)および[`destructible`](/reference/concepts/destructible.md)を満たすこと。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](stop_callback/op_constructor.md)| コンストラクタ | C++20 |
| [`(destructor)`](stop_callback/op_destructor.md)  | デストラクタ | C++20 |
| `operator=(const stop_callback&) = delete;`       | 代入演算子 | C++20 |
| `operator=(stop_callback&&) = delete;`            | 代入演算子 | C++20 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| `callback_type` | `CallbackFn` | C++20 |

## 推論補助

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(deduction_guide)`](stop_callback/op_deduction_guide.md) | クラステンプレートの推論補助 | C++20 |


## 例
```cpp example
#include <cassert>
#include <stop_token>
#include <string>

int main()
{
  std::string msg;

  std::stop_source ss;
  std::stop_token st = ss.get_token();
  std::stop_callback cb1(st, [&] { msg += "hello"; });

  assert(msg == "");

  ss.request_stop();

  // 停止要求が作成される前に登録されていたコールバック関数は、
  // 停止要求が作成された際にその中で呼び出される
  assert(msg == "hello");

  std::stop_callback cb2(st, [&] { msg += " world"; });

  // 停止要求が作成されたあとに登録されたコールバック関数は、
  // std::stop_callback クラスのコンストラクタの中で即座に呼び出される
  assert(msg == "hello world");
}
```
* std::stop_callback[color ff0000]
* std::stop_token[link stop_token.md]
* std::stop_source[link stop_source.md]
* request_stop()[link stop_source/request_stop.md]
* get_token()[link stop_source/get_token.md]

### 出力
```
```

## バージョン
### 言語
- C++20


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`stop_token`](stop_token.md)
- [`stop_source`](stop_source.md)


## 参照
- [P0660R10 Stop token and joining thread](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0660r10.pdf)
