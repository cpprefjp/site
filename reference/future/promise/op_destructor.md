# デストラクタ
* future[meta header]
* std[meta namespace]
* promise[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~promise();
```

## 概要
`promise`オブジェクトの破棄


## 効果
1. まず共有状態が準備完了状態([`future_status::ready`](../future_status.md))でなければ、error conditionとして[`broken_promise`](../future_errc.md)を持つ[`future_error`](../future_error.md)例外オブジェクトを格納したのち、準備完了状態にする。
2. 共有状態を解放する。

## 例
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void calc(std::promise<int> p)
{
  // 通常行う p.set_value() をしなかったとする

  // ここで promise のデストラクタが例外オブジェクトを書き込む
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  std::thread t(calc, std::move(p));

  try {
    // 上で書き込まれた例外が送出される
    std::cout << f.get() << std::endl;
  }
  catch (std::future_error& e) {
    std::cout << e.what() << std::endl;
  }

  t.join();
}
```
* std::future[link /reference/future/future.md]
* p.get_future()[link get_future.md]
* std::move[link /reference/utility/move.md]
* f.get()[link /reference/future/future/get.md]

### 出力例
```
std::future_error: Broken promise
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
