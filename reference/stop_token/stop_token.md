# stop_token
* stop_token[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  class stop_token;
}
```

## 概要
`stop_token`クラスは、停止要求が作成されたかどうか、あるいは停止要求が作成されうるかどうかなど、停止状態を問い合わせるためのインターフェースを提供する。

`stop_token`は[`stoppable_token`](stoppable_token.md)のモデルである。

[`stop_source`](stop_source.md)クラスの[`get_token()`](stop_source/get_token.md)メンバ関数を呼び出すと、その`stop_source`クラスのオブジェクトと停止状態を共有する`stop_token`クラスのオブジェクトを構築できる。これによって、`stop_source`側から停止要求を作成したときに、この`stop_token`を通じて停止状態を問い合わせられるようになる。

また、`stop_token`クラスは以下のクラスでも利用される：

- [`stop_callback`](stop_callback.md)
    - 停止要求に応じて呼び出されるコールバックを登録する際に、コンストラクタで`stop_token`を受け取る。
- [`condition_variable_any`](/reference/condition_variable/condition_variable_any.md)
    - 割り込み可能な待機処理を行う際に、[`wait()`](/reference/condition_variable/condition_variable_any/wait.md)メンバ関数で`stop_token`を受け取る。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](stop_token/op_constructor.md) | コンストラクタ | C++20 |
| [`(destructor)`](stop_token/op_destructor.md)   | デストラクタ | C++20 |
| [`operator=`](stop_token/op_assign.md)          | 代入演算子 | C++20 |
| [`swap`](stop_token/swap.md)                    | 別の`stop_token`と交換する | C++20 |
| [`stop_requested`](stop_token/stop_requested.md)| 停止要求が作成されたかどうかを取得する | C++20 |
| [`stop_possible`](stop_token/stop_possible.md)  | 停止要求が作成されうるかどうかを取得する | C++20 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`callback_type`](stop_token/callback_type.md) | 対応するコールバック型 | C++26 |

## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`operator==`](stop_token/op_equal.md)     | 等値演算子 | C++20 |
| [`operator!=`](stop_token/op_not_equal.md) | 非等値演算子 | C++20 |
| [`swap`](stop_token/swap_free.md)          | 2つの`stop_token`オブジェクトを入れ替える | C++20 |


## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss;
  std::stop_token st = ss.get_token();
  assert(st.stop_requested() == false);

  ss.request_stop();

  assert(st.stop_requested() == true);
}
```
* std::stop_token[color ff0000]
* std::stop_source[link stop_source.md]
* stop_requested()[link stop_token/stop_requested.md]
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
- [`stop_source`](stop_source.md)
- [`stop_callback`](stop_callback.md)


## 参照
- [P0660R10 Stop token and joining thread](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0660r10.pdf)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
