# get
* future[meta header]
* std[meta namespace]
* future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
R future::get();
R& future<R&>::get();
void future<void>::get();
```

## 概要
結果を取得する


## 効果
共有状態が準備完了状態([`future_status::ready`](../future_status.md))になるまで[`wait()`](wait.md)で待機し、共有状態に格納されている値を取得する。


## 戻り値
- `future::get()` ： 共有状態に格納されている値`v`を[`std::move`](/reference/utility/move.md)`(v)`で返す。
- `future<R&>::get()` ： 共有状態に格納されている参照を返す。
- `future<void>::get()` ： 何も返さない。


## 例外
共有状態に例外が格納されていた場合、格納されている例外を送出する。


## 事後条件
この関数呼び出し後は共有状態が破棄され、[`valid()`](valid.md) `== false`となること。

つまりこの関数は1オブジェクトにつき1回しか呼び出せない。


## 例
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void calc(std::promise<int> p)
{
  int sum = 0;
  for (int i = 0; i < 10; ++i) {
    sum += i + 1;
  }

  p.set_value(sum); // 結果値を書き込む
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  // 別スレッドで計算を行う
  std::thread t(calc, std::move(p));

  // calc()によって書き込まれた結果を取得
  std::cout << f.get() << std::endl;

  t.join();
}
```
* get()[color ff0000]
* std::promise[link /reference/future/promise.md]
* p.set_value[link /reference/future/promise/set_value.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* std::move[link /reference/utility/move.md]

### 出力
```cpp
55
```

## 例：`std::future<R&>`
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>

class Calculator {
  int sum_ = 0;
  std::future<int&> async_calc;

public:
  void start()
  {
    std::promise<int&> p;
    async_calc = p.get_future();

    std::thread t(&Calculator::calc, this, std::move(p));
    t.detach();
  }

  int get()
  {
    return async_calc.get(); // 結果値への参照を取得する
  }

  void calc(std::promise<int&> p)
  {
    int sum = 0;
    for (int i = 0; i < 10; ++i) {
      sum += i + 1;
    }

    sum_ = sum;
    p.set_value(sum_); // メンバ変数への参照を結果値として書き込む
  }
};

int main()
{
  Calculator c;

  // 非同期に計算を開始する
  c.start();

  // 計算結果を取得する
  int result = c.get();

  std::cout << result << std::endl;
}
```
* get[color ff0000]

### 出力
```
55
```

## 例：`std::future<void>`
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>

class Calculator {
  int sum_ = 0;
  std::future<void> async_calc;

public:
  void start()
  {
    std::promise<void> p;
    async_calc = p.get_future();

    std::thread t(&Calculator::calc, this, std::move(p));
    t.detach();
  }

  int get()
  {
    async_calc.get(); // 終了待機のみを行う
    return sum_;
  }

  void calc(std::promise<void> p)
  {
    int sum = 0;
    for (int i = 0; i < 10; ++i) {
      sum += i + 1;
    }

    // メンバ変数として結果を保持し、promiseでは計算終了の通知のみ行う
    sum_ = sum;
    p.set_value();
  }
};

int main()
{
  Calculator c;

  // 非同期に計算を開始する
  c.start();

  // 計算結果を取得する
  int result = c.get();

  std::cout << result << std::endl;
}
```
* get[color ff0000]

### 出力
```
55
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012
	- 2012段階の`std::thread`クラスは、コンストラクタに引数をムーブで渡すことができない。そのため、`promise`オブジェクトはスレッド間の共有オブジェクトにする必要がある。(所有権が曖昧になるため、スタイルとしてはよくない)
		[#737812 - std::thread does not accept std::move](https://connect.microsoft.com/VisualStudio/feedback/details/737812)


## 参照
- [LWG Issue 2096. Incorrect constraints of `future::get` in regard to `MoveAssignable`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2096)
    - C++14から、`future::get()`の戻り値が変更された。C++11では「ムーブ代入可能ならムーブで返し、そうでなければコピーで返す」となっていたが、これは現実的ではない制約だった。

