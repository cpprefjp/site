# set_value
* future[meta header]
* std[meta namespace]
* promise[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
// テンプレートパラメータRが下記特殊ケースでない場合
void promise::set_value(const R& r);
void promise::set_value(R&& r);

// テンプレートパラメータRが参照の場合
void promise<R&>::set_value(R& r);

// テンプレートパラメータRがvoidの場合
void promise<void>::set_value();
```

## 概要
結果の値を�定する


## 効果
値`r`をアトミックに共有状態に格納し、準備完了状態([`future_status::ready`](../future_status.md))にする。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`future_error`](../future_error.md)例外オブジェクトを送出する可能性がある：

- [`promise_already_satisfied`](../future_errc.md) ： すでに値もしくは例外が�定されている
- [`no_state`](../future_errc.md) ： `*this`が共有状態を持っていない(`promise`オブジェクトがムーブされると起こりうる)

また、以下のバージョンにおいてその他の例外オブジェクトが送出される可能性がある：

- `const R&`バージョン ：
    - C++11 : `R`型のコピーコンストラクタが、あらゆる例外を送出する可能性がある
    - C++14 : `R`型のオブジェクトをコピーするために選択されたコンストラクタが、あらゆる例外を送出する可能性がある
- `R&&`バージョン ：
    - C++11 : `R`型のムーブコンストラクタが、あらゆる例外を送出する可能性がある
    - C++14 : `R`型のオブジェクトをムーブするために選択されたコンストラクタが、あらゆる例外を送出する可能性がある


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
* set_value[color ff0000]
* std::future[link /reference/future/future.md]
* p.get_future()[link get_future.md]
* std::move[link /reference/utility/move.md]
* f.get()[link /reference/future/future/get.md]

### 出力
```
55
```

## 例 : `promise<R&>`
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
    return async_calc.get();
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
* set_value[color ff0000]

### 出力
```
55
```

## 例 : `promise<void>`
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
    async_calc.get();
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

### 出力
```
55
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照
- [LWG Issue 2098. Minor Inconsistency between `promise::set_value` and `promise::set_value_at_thread_exit`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2098)

