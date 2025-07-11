# future_error
* future[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class future_error : public logic_error;
}
```
* logic_error[link /reference/stdexcept.md]

## 概要
`future_error`は、[`future`](future.md)/[`promise`](promise.md)操作でのエラーを扱うための例外クラスである。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `future_error(`[`error_code`](/reference/system_error/error_code.md) `ec);` | [`error_code`](/reference/system_error/error_code.md)オブジェクトから`future_error`オブジェクトを生成する。<br/>注：このクラスは標準ライブラリの内部で送出される例外クラスで、ユーザーが使用するものではないため、コンストラクタは説明のためにのみ記載されている。 | C++11<br/>C++14まで |
| `future_error(`[`future_errc`](/reference/future/future_errc.md) `e);` | [`future_errc`](/reference/future/future_errc.md)オブジェクトから`future_error`オブジェクトを生成する。<br/>包含している[`error_code`](/reference/system_error/error_code.md)オブジェクトを[`make_error_code`](/reference/system_error/make_error_code.md)`(e)`から初期化する。| C++17 |
| `const` [`error_code`](/reference/system_error/error_code.md)`& code() const noexcept;` | 包含している[`error_code`](/reference/system_error/error_code.md)オブジェクトへの参照を取得する | C++11 |
| `virtual const char* what() const noexcept;` | エラー理由となる実装依存文字列(`code.`[`message`](/reference/system_error/error_code/message.md)`()`)を返す | C++11 |


## 例
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void foo(std::promise<int> p)
{
  p.set_value(3);

  try {
    p.set_value(1); // promiseに2回以上書き込むとエラー
  }
  catch (std::future_error& e) {
    std::cout << "value:" << e.code().value() << std::endl;
    std::cout << "what:" << e.what() << std::endl;
  }
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  std::thread t(foo, std::move(p));

  std::cout << f.get() << std::endl;

  t.join();
}
```
* std::future_error[color ff0000]
* std::promise[link promise.md]
* p.set_value[link promise/set_value.md]
* p.get_future()[link promise/get_future.md]
* std::future[link future.md]
* f.get()[link future/get.md]
* std::move[link /reference/utility/move.md]

### 出力例
```
3
value:3
what:Promise already satisfied
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
- [P0517r0 Make future_error Constructible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0517r0.html)
