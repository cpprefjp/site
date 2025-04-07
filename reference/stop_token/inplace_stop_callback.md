# inplace_stop_callback
* stop_token[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class CallbackFn>
  class inplace_stop_callback;
}
```

## 概要
`inplace_stop_callback`クラステンプレートは、停止要求が作成された際に呼び出されるコールバックを表す。


## 適格要件
テンプレート引数`CallbackFn`が[`invocable`](/reference/concepts/invokable.md.nolink)および[`destructible`](/reference/concepts/destructible.md)を満たすこと。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](inplace_stop_callback/op_constructor.md)| コンストラクタ | C++26 |
| [`(destructor)`](inplace_stop_callback/op_destructor.md)  | デストラクタ | C++26 |
| `operator=(const inplace_stop_callback&) = delete;` | 代入演算子 | C++26 |
| `operator=(inplace_stop_callback&&) = delete;`      | 代入演算子 | C++26 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| `callback_type` | `CallbackFn` | C++26 |

## 推論補助

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(deduction_guide)`](inplace_stop_callback/op_deduction_guide.md) | クラステンプレートの推論補助 | C++26 |


## 例
```cpp example
#include <cassert>
#include <stop_token>
#include <string>

int main()
{
  std::string msg;

  std::inplace_stop_source ss;
  std::inplace_stop_token st = ss.get_token();
  std::inplace_stop_callback cb1(st, [&] { msg += "hello"; });

  assert(msg == "");

  ss.request_stop();

  // 停止要求が作成される前に登録されていたコールバック関数は、
  // 停止要求が作成された際にその中で呼び出される
  assert(msg == "hello");

  std::inplace_stop_callback cb2(st, [&] { msg += " world"; });

  // 停止要求が作成されたあとに登録されたコールバック関数は、
  // std::inplace_stop_callback クラスのコンストラクタの中で即座に呼び出される
  assert(msg == "hello world");
}
```
* std::inplace_stop_callback[color ff0000]
* std::inplace_stop_token[link inplace_stop_token.md]
* std::inplace_stop_source[link inplace_stop_source.md]
* request_stop()[link inplace_stop_source/request_stop.md]
* get_token()[link inplace_stop_source/get_token.md]

### 出力
```
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
- [`inplace_stop_token`](inplace_stop_token.md)
- [`inplace_stop_source`](inplace_stop_source.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
